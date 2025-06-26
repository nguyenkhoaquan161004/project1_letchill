import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './HomeScreen.module.css';
import { Icon } from '@iconify/react';
import { popularSongs } from './components/Slider/DataSlider';
import Author from '../../../../assets/Author/Author';
import { popularAuthor } from '../../../../assets/Author/DataAuthor';
import ItemSongs from './components/ItemSongs';
import ItemSongsRCM from './components/ItemSongsRCM';
import { HomeDataContext } from '../../../../contexts/HomeDataContext';

const HomeScreen = ({ isOpen, onSelectedArtist, songs, setSongs, artists, setArtists,
    recommentSongs, setRecommentSongs, onCurrentSongId, onRefreshPlaylists, playlistsData, uid }) => {
    const calledRef = useRef(false);
    const { isDataLoaded, setIsDataLoaded } = useContext(HomeDataContext);

    const fetchHometData = async (top_n1 = 8) => {
        try {
            const response1 = await fetch(`http://localhost:4000/api/dashboard?user_id=${uid}&top_n=${top_n1}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data1 = await response1.json();
            setSongs(data1.songsRecommentation || []);
            setArtists(data1.singersRecommentation || []);
            setRecommentSongs(data1.songsByRateRecommentation || []);


            // const response2 = await fetch(`http://localhost:4000/api/dashboard?user_id=${uid}&top_n=${top_n2}`, {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // });

            // const data2 = await response2.json();
            // setRecommentSongs(data2.songsByRateRecommentation || []);

            // setIsDataLoaded(true); // Đánh dấu dữ liệu đã được tải
        } catch (err) {
            console.error('Error fetching home data:', err);
        }
    };

    useEffect(() => {
        if (uid && !calledRef.current) {
            calledRef.current = true;
            fetchHometData();
        }
    }, [uid]);

    const handleArtistSelect = (artistId) => {
        onSelectedArtist(artistId);
    };

    const handleSongSelected = (songId) => {
        onCurrentSongId(songId);
    }

    if (!isOpen) return null;

    return (
        <div id={styles.mainHomeScreen}>
            <div className={styles.trendingSong}>
                <div className={styles.textTrendingSong}>
                    <Icon icon="solar:fire-bold" className={styles.icon}></Icon>
                    <h3>Top bài hát <span>thịnh hành</span></h3>
                </div>
                <main>
                    <header>
                        <div className={styles.leftInfo}>
                            <span className='uiMedium o75' style={{ flex: 1, marginLeft: "3%" }}>#</span>
                            <span className='uiMedium o75' style={{ flex: 7 }}>Tên bài hát</span>
                        </div>

                        <span className='uiMedium o75' style={{ flex: 1 }}>Lượt nghe</span>
                    </header>
                    {songs.length > 0 ? (
                        songs.slice(0, 5).map((song, index) => (
                            <div
                                key={song.id}
                                className={styles.itemPlaylistContainer}
                                style={{ padding: '12px 32px', borderRadius: 8, width: "auto" }}
                            >
                                <ItemSongs
                                    index={index + 1}
                                    songId={song.id}
                                    cover={song.avatar_url}
                                    title={song.song_name}
                                    artist={song.artist}
                                    dateAdded={song.releaseDate}
                                    views={song.listens}
                                    onRefreshPlaylists={onRefreshPlaylists}
                                    playlistsData={playlistsData}
                                    onCurrentSongId={() => {
                                        onCurrentSongId({
                                            songId: song.song_id,
                                        });
                                        handleSongSelected(song.song_id)
                                        console.log(song.song_id)
                                    }}
                                />
                            </div>
                        ))
                    ) : (
                        <p className={styles.noSongsMessage}>Danh sách phát hiện không có bài hát.</p>
                    )}
                </main>
            </div>

            <div className={styles.popularAuthor}>
                <h4>Các đề xuất dành cho bạn</h4>
                <div className={styles.songContainer}>
                    <div className={styles.songWrapper}>
                        <div className={styles.songContainer}>
                            {recommentSongs.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={styles.songItem}>
                                        <ItemSongsRCM
                                            songId={item.song_id}
                                            avatarUrl={item.avatar_url}
                                            name={item.song_name}
                                            artist={item.artist}
                                            dateAdded={item.releaseDate}
                                            listens={item.listens}
                                            onCurrentSongId={() => {
                                                onCurrentSongId({
                                                    songId: item.song_id
                                                });
                                                handleSongSelected(item.song_id);
                                                console.log(item.song_id);
                                            }}
                                        ></ItemSongsRCM>
                                    </div>
                                )
                            })}

                        </div>
                    </div>

                </div>
            </div>

            <div className={styles.popularAuthor}>
                <h4>Nghệ sĩ phổ biến</h4>
                <div className={styles.authorContainer}>
                    <div className={styles.authorWrapper}>
                        <div className={styles.authorContainer}>
                            {artists.map((item, index) => {
                                return (
                                    <Author
                                        artistId={item.artist_id}
                                        artistPic={item.avatarUrl}
                                        nameArtist={item.name}
                                        description={item.description}
                                        followers={item.followers}
                                        onSelectedArtist={() => {
                                            onSelectedArtist(
                                                item.artist_id,
                                            );
                                            handleArtistSelect(item.artist_id);
                                            console.log(item.artist_id);
                                        }}
                                    ></Author>
                                )
                            })}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;