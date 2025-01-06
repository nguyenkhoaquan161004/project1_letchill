import React, { useCallback, useEffect, useState } from 'react';
import styles from './LibrarySpace.module.css';
import Playlist from './components/Playlist/Playlist';
import { InlineIcon } from '@iconify/react';
import clsx from 'clsx';
import AddPlaylistBox from './components/AddPlaylistBox/AddPlaylistBox';
import favoritePlaylist from './assets/favoritePlaylist.svg';

const LibrarySpace = ({ onSelectedPlaylist, playlistsData, onRefreshPlaylists }) => {
    const [isAddPlaylistOpen, setIsAddPlaylistOpen] = useState(false);
    //const [playlists, setPlaylists] = useState([]);


    const handleOpenAddPlaylistBox = () => {
        setIsAddPlaylistOpen(true);
    }

    const handleCloseAddPlaylistBox = () => {
        setIsAddPlaylistOpen(false);
    }


    // const fetchPlaylists = useCallback(async () => {
    //     try {
    //         const response = await fetch('http://localhost:4000/api/playlist',{
    //             method: 'GET',
    //         });
    //         if (!response.ok) throw new Error("Failed to fetch playlists");
    //         const data = await response.json();
    //         setPlaylists(data.playlist);

    //         onRefreshPlaylists(data.playlist);
    //     } catch (err) {
    //         console.log('Error fetching playlists: ', err);
    //     }
    // }, [onRefreshPlaylists]);  // Memoizing fetchPlaylists, including onRefreshPlaylists as a dependency

    // useEffect(() => {
    //     fetchPlaylists();
    // }, [fetchPlaylists]);

    const handlePlaylistSelect = (playlistId) => {
        onSelectedPlaylist(playlistId);
    };

    const handleAddPlaylist = async () => {
        try {
            // Fetch lại danh sách playlist từ server
            onRefreshPlaylists();
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
                            playlistId='favorite'
                            playlistPic={favoritePlaylist}
                            namePlaylist="Danh sách yêu thích"
                            description=""
                            onSelectedPlaylist={() =>
                                onSelectedPlaylist({
                                    playlistId: 'favorite',
                                    playlistPic: favoritePlaylist,
                                    namePlaylist: "Danh sách yêu thích",
                                    description: "",
                                })}
                        ></Playlist>
                    </div>
                    {playlistsData.map((playlistsData) => (
                        <Playlist
                            key={playlistsData.id}
                            onSelectedPlaylist={() => {
                                onSelectedPlaylist({
                                    playlistId: playlistsData.id,
                                    playlistPic: playlistsData.avtUrl,
                                    namePlaylist: playlistsData.name,
                                    description: playlistsData.description,
                                })
                                handlePlaylistSelect(playlistsData.id)
                                console.log(playlistsData.id)
                            }}
                            playlistId={playlistsData.id}
                            playlistPic={playlistsData.avtUrl}
                            namePlaylist={playlistsData.name}
                            description={playlistsData.description}></Playlist>
                    ))}
                </div>

            </div>
            <AddPlaylistBox
                isOpen={isAddPlaylistOpen}
                onClose={handleCloseAddPlaylistBox}
                onAddPlaylist={handleAddPlaylist}
            ></AddPlaylistBox>
        </div >
    );
};

export default LibrarySpace;