import React, { useState, useRef, useEffect } from 'react';
import styles from './PlaylistScreen.module.css';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import PlaylistItem from './PlaylistItem';
import UpdatePlaylist from './UpdatePlaylist';
import { useNavigate } from 'react-router-dom';
import favoritePlaylist from '../../../../components/librarySpace/assets/favoritePlaylist.svg';

const PlaylistScreen = ({ isOpen, playlistId, comebackHome, onDeletePlaylist, onCurrentSongId, onRefreshPlaylists }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [isUpdatePlaylistOpen, setIsUpdatePlaylistOpen] = useState(false);
    const [songsData, setSongsData] = useState([]);

    const [, setPlaylistId] = useState(playlistId);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [playlistData, setPlaylistData] = useState(playlistId);
    const [playlists, setPlaylists] = useState([]);

    // const combinedPlaylists = [
    //     {
    //         id: 'favorite',  // ID riêng biệt cho "Danh sách yêu thích"
    //         avtUrl: favoritePlaylist,  // Hình ảnh
    //         name: 'Danh sách yêu thích',  // Tên playlist
    //         description: '',  // Mô tả playlist
    //     },
    //     ...playlists,  // Các playlist từ backend
    // ];

    const nav = useNavigate();

    const countPlaylist = songsData.length;

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/playlist');
            console.log('Response Status:', response.status);

            if (!response.ok) {
                const errorMessage = await response.text();
                console.error('Failed to fetch playlists:', errorMessage);
                // throw new Error(errorMessage || 'Failed to fetch playlists');
            }

            const data = await response.json();
            setPlaylists(data);
        } catch (err) {
            console.error('Error fetching playlists:', err.message);
            // alert(`Error: ${err.message}`);
        }
    };

    const fetchPlaylistData = async () => {
        try {
            console.log('Fetching playlist with ID:', playlistId);

            const response = await fetch(`http://localhost:4000/api/playlistDetail/${playlistId}`);
            if (!response.ok) {
                // throw new Error('Error fetching playlist data');
            }

            const data = await response.json();
            setPlaylistData(data || { name: 'Danh sách yêu thích', avtUrl: favoritePlaylist });  // Đảm bảo xử lý cho 'favorite'
            setSongsData(data.songs || []); // Giả định API trả về danh sách bài hát trong `songs`
            console.log(playlistData.avtUrl); // Log dữ liệu để kiểm tra
            console.log(data.songs)

        } catch (err) {
            console.error('Error fetching playlist data:', err);
            // alert('An error occurred while fetching the playlist data.');
        }
    };

    useEffect(() => {
        fetchData();
        if (playlistId) {
            fetchPlaylistData();
        }
    }, [playlistId]);


    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const toggleOptions = () => {
        setIsOptionsOpen(!isOptionsOpen);
    }

    const handleOpenUpdatePlaylist = () => {
        setIsUpdatePlaylistOpen(true);
        setIsOptionsOpen(false);
    }

    const handleCloseUpdatePlaylist = () => {
        setIsUpdatePlaylistOpen(false);
        setIsOptionsOpen(false);
        setIsModalOpen(false);
        setPlaylistId(null);
    }

    const handleSaveChanges = (updatedPlaylist) => {
        console.log('Dữ liệu đã được cập nhật:', updatedPlaylist);
        fetchData(); // Fetch lại danh sách phát mới từ server
        fetchPlaylistData();
    };


    const handleDeletePlaylist = async () => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa danh sách phát này?");
        if (!confirmDelete) return;

        try {
            console.log('Fetching playlist with ID:', playlistId);
            const response = await fetch(`http://localhost:4000/api/playlist/${playlistId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Không thể xóa danh sách phát: ${errorMessage}`);
            }

            await fetchData();

            // Gọi callback để thông báo cho MainScreen
            if (onDeletePlaylist) {
                onDeletePlaylist(playlistId);
            }

            alert('Danh sách phát đã được xóa thành công.');
            comebackHome();
        } catch (err) {
            console.error('Error deleting playlist:', err);
            alert('Xóa danh sách phát thất bại.');
        }

        setIsOptionsOpen(false);
    };
    if (!isOpen) {
        return null;
    }

    return (
        <div id={styles.playlistScreen}>
            <div className={styles.infoPlaylistWrapper}>
                <div className={styles.playlistContainer}>
                    <img
                        src={playlistData.avtUrl}
                        alt=''
                        className={clsx(styles.playlistAvatarPic)} />
                </div>

                <div className={styles.textSpace}>
                    <p className='p1'>Danh sách phát</p>
                    <div className={styles.infoPlaylist}>
                        <h3 className={styles.nameOfUsesr}>{playlistData.name}</h3>
                        <p className="p3 o75">{playlistData.description}</p>
                        <p className='uiSemibold o50'>
                            <span className='uiSemibold o50'>{countPlaylist}</span> bài hát</p>
                    </div>
                </div>
            </div>

            <div className={styles.listOfTool}>
                <div className={styles.leftTools}>
                    <button onClick={togglePlay} className={styles.buttonPlay}>
                        <Icon
                            className={clsx(styles.icon, styles.iconMain)}
                            icon={isPlaying ? 'material-symbols:pause-rounded' : 'solar:play-bold'}
                        />
                    </button>

                    <div className={styles.optionsWrapper}>
                        <button onClick={toggleOptions} className={styles.btnOptions}>
                            <Icon icon="ri:more-fill" className={styles.icon}></Icon>
                        </button>
                        {isOptionsOpen && (
                            <div className={styles.optionsMenu}>
                                <button className={styles.optionItem} onClick={handleOpenUpdatePlaylist}>
                                    Cập nhật danh sách phát
                                </button>
                                <button className={styles.optionItem} onClick={handleDeletePlaylist}>
                                    Xóa danh sách phát
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <button>
                    <Icon icon="ic:round-sort" className={styles.icon}></Icon>
                </button>
            </div>

            <header>
                <div className={styles.leftInfo}>
                    <span className='uiMedium o50' style={{ width: 50 }}>#</span>
                    <span className='uiMedium o50' style={{ flex: 10 }}>Tên bài hát</span>
                </div>

                <span className='uiMedium o50' style={{ marginRight: 102 }}>Ngày thêm</span>
            </header>

            <main>
                {songsData.length > 0 ? (
                    songsData.map((song, index) => (
                        <div
                            key={song.id}
                            className={styles.itemPlaylistContainer}
                            style={{ padding: '8px 12px', borderRadius: 8 }}
                            onClick={() => onCurrentSongId(song.id)}
                        >
                            <PlaylistItem
                                index={index + 1}
                                playlistId={playlistId}
                                songId={song.id}
                                cover={song.image}
                                title={song.name}
                                artist={song.artist}
                                dateAdded={song.releaseDate}
                                fetchPlaylistData={fetchPlaylistData}
                            />
                        </div>
                    ))
                ) : (
                    <p className={styles.noSongsMessage}>Danh sách phát hiện không có bài hát.</p>
                )}
            </main>

            <UpdatePlaylist
                isOpen={isUpdatePlaylistOpen}
                playlistId={playlistId}
                onClose={handleCloseUpdatePlaylist}
                playlistPic={playlistData.avtUrl}
                namePlaylist={playlistData.name}
                description={playlistData.description}
                onUpdatePlaylist={handleSaveChanges}
                onRefreshPlaylists={onRefreshPlaylists}
            />
        </div>
    );
};

export default PlaylistScreen;