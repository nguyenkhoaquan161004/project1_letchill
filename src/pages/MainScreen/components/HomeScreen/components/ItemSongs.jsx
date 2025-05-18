import React, { useState, useRef, useEffect } from 'react';
import styles from '../HomeScreen.module.css';
import { Icon } from '@iconify/react';
import axios from 'axios';
import Playlist from '../../../../../components/listeningSpace/Playlist';

const ItemSongs = ({ index, playlistId, songId, cover, title, artist, dateAdded, views, onRefreshPlaylists, playlistsData }) => {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const popupRef = useRef(null); // Tham chiếu đến popup
    // Quản lí danh sách phát được chọn để thêm nhạc 
    const [selectedPlaylists, setSelectedPlaylists] = useState({});
    // Mở Box thêm bài hát vào danh sách phát
    const [isAddSongBoxOpen, setIsAddSongBoxOpen] = useState(false);
    const [currentSongData, setCurrentSongData] = useState(null);

    const handleCheckboxChange = (playlistId) => {
        setSelectedPlaylists((prev) => ({
            ...prev,
            [playlistId]: !prev[playlistId], // Đảo ngược trạng thái
        }));
    };

    // Bật tắt Box thêm bài hát vào playlist
    const handleAddSongButtonClick = () => {
        setIsAddSongBoxOpen((prev) => !prev);
    };

    const addSongToPlaylist = async () => {
        const selectedPlaylistIds = Object.keys(selectedPlaylists).filter((id) => selectedPlaylists[id]);
        if (selectedPlaylistIds.length === 0 || !currentSongData.id) {
            console.error('No playlist selected or no song is playing');
            alert("Vui lòng chọn ít nhất một danh sách phát và bài hát hợp lệ.");
            return;
        }

        try {
            const response = await axios.patch(`http://localhost:4000/api/playlist-detail/${selectedPlaylistIds}`, {
                playlistIds: selectedPlaylistIds,
                songId: currentSongData.id,
            });
            console.log("Song added to playlists:", response.data);
            alert("Bài hát đã được thêm vào các danh sách phát thành công!");
            setSelectedPlaylists({}); // Reset trạng thái chọn
            onRefreshPlaylists();
            setIsAddSongBoxOpen(false); // Đóng box
        } catch (error) {
            console.error("Failed to add song to playlists:", error.response?.data || error.message);
            alert("Không thể thêm bài hát vào danh sách phát.");
        }
    }
    // Đóng popup khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsDeleteOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const isAnySelected = Object.values(selectedPlaylists).some((isSelected) => isSelected);

    return (
        <div className={styles.itemPlaylist}>
            <div className={styles.leftItemPlaylist}>
                <h5 style={{ width: 50 }}>{index}</h5>
                <div className={styles.infoItemPlaylist}>
                    <img src={cover} alt='cover' />
                    <div className={styles.textInfoPlaylist}>
                        <h5>{title}</h5>
                        <p className='p3 o75'>{artist}</p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <div className={styles.rightItemPlaylist}>
                    {views !== null ? (<p>{views}</p>) : null}
                    {dateAdded !== null ? (<p>{dateAdded}</p>) : null}
                    <button className={styles.btnDelete}>
                        <Icon className={styles.icon} icon="ri:more-fill" onClick={handleAddSongButtonClick} />
                    </button>
                    {/* ADD SONG TO PLAYLIST BOX */}
                    <div className={styles.addSongToPlaylistContainer}
                        style={{
                            display: isAddSongBoxOpen ? 'flex' : 'none'
                        }}>
                        <p className="uiSemibold o75" style={{ fontSize: 12 }}>Thêm bài hát vào danh sách phát</p>
                        <hr style={{ width: '70%', position: 'relative', left: 0, right: 0, border: "1px solid rgba(255, 255, 255, 0.5)" }} />
                        <div className={styles.listOfPlaylists}>
                            {playlistsData.map((playlist, i) => (

                                <div className={styles.itemPlaylistContainer}>
                                    <Playlist
                                        key={playlist.id}
                                        playlistId={playlist.id}
                                        playlistPic={playlist.avtUrl}
                                        namePlaylist={playlist.name}
                                        description={playlist.description}></Playlist>
                                    <input
                                        type='checkbox'
                                        checked={!!selectedPlaylists[playlist.id]}
                                        onChange={() => handleCheckboxChange(playlist.id)}></input>
                                </div>

                            ))}
                        </div>
                        <div className={styles.listOfBtns}>
                            <button
                                onClick={handleAddSongButtonClick}
                                className={styles.cancelBtn}>Hủy</button>
                            {isAnySelected && (
                                <button className={styles.addBtn} onClick={addSongToPlaylist}>Thêm</button>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
};

export default ItemSongs;
