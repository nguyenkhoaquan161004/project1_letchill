import React, { useEffect, useState } from 'react';
import styles from './LibrarySpace.module.css';
import Playlist from './components/Playlist/Playlist';
import { InlineIcon } from '@iconify/react';
import clsx from 'clsx';
import AddPlaylistBox from './components/AddPlaylistBox/AddPlaylistBox';
import favoritePlaylist from './assets/favoritePlaylist.svg';

const LibrarySpace = ({ onPlaylistClick, onAddPlaylist, onDeletePlaylist, onRefreshPlaylists }) => {
    const [isAddPlaylistOpen, setIsAddPlaylistOpen] = useState(false);
    const [playlistsData, setPlaylistsData] = useState([]);

    const handleOpenAddPlaylistBox = () => {
        setIsAddPlaylistOpen(true);
    }

    const handleCloseAddPlaylistBox = () => {
        setIsAddPlaylistOpen(false);
    }

    const fetchPlaylists = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/playlist');
            if (!response.ok) throw new Error("Failed to fetch playlists");
            const data = await response.json();
            setPlaylistsData(data.playlist);
            onRefreshPlaylists(data);
        } catch (err) {
            console.log('Error fetching playlists: ', err);
        }
    }

    useEffect(() => {
        fetchPlaylists(); // Gọi khi component mount
    }, []);

    const handleAddPlaylist = async () => {
        try {
            // Fetch lại danh sách playlist từ server
            await fetchPlaylists(); // Gọi lại hàm fetch để đồng bộ dữ liệu
            setIsAddPlaylistOpen(false); // Đóng AddPlaylistBox
        } catch (err) {
            console.error('Error updating playlists: ', err);
        }
    };


    return (
        <div id={styles.leftBar}
            className={clsx('w24')}
            style={{
                zIndex: isAddPlaylistOpen ? 3 : 1
            }} >
            <div className={styles.leftBarContainer}>
                <div className={styles.topicContainer}>
                    <header>
                        <div className={styles.topic}>
                            <InlineIcon icon="fluent:library-24-filled" style={{ width: 26, height: 26, backgroundColor: 'transparent' }}></InlineIcon>
                            <h4>Thư viện</h4>
                        </div>
                        <button onClick={handleOpenAddPlaylistBox} style={{ border: 'none' }}>
                            <InlineIcon icon="ic:round-add" style={{ width: 26, height: 26, backgroundColor: 'transparent' }}></InlineIcon>
                        </button>
                    </header>

                    <nav>
                        <div className={styles.optionFill}>
                            <p className={clsx('uiSemibold')} style={{ margin: '5px 16px', textWrap: 'nowrap' }}>Playlist</p>
                        </div>
                        <div className={styles.optionFill}>
                            <p className={clsx('uiSemibold')} style={{ margin: '5px 16px', textWrap: 'nowrap' }}>Nghệ sĩ</p>
                        </div>
                    </nav>
                </div>

                <div className={styles.listOfPlaylist}>
                    <div>
                        <Playlist
                            playlistPic={favoritePlaylist}
                            namePlaylist="Danh sách yêu thích"
                            description=""
                            onPlaylistClick={() =>
                                onPlaylistClick({
                                    playlistPic: favoritePlaylist,
                                    namePlaylist: "Danh sách yêu thích",
                                    description: "",
                                })}
                        ></Playlist>
                    </div>
                    {playlistsData.map((playlist) => (
                        <Playlist
                            key={playlist.id}
                            onPlaylistClick={() =>
                                onPlaylistClick({
                                    playlistPic: playlist.avtUrl,
                                    namePlaylist: playlist.name,
                                    description: playlist.description,
                                })}
                            playlistPic={playlist.avtUrl}
                            namePlaylist={playlist.name}
                            description={playlist.description}></Playlist>
                    ))}
                </div>

            </div>
            <AddPlaylistBox
                isOpen={isAddPlaylistOpen}
                onClose={handleCloseAddPlaylistBox}
                onAddPlaylist={handleAddPlaylist}></AddPlaylistBox>
        </div>
    );
};

export default LibrarySpace;