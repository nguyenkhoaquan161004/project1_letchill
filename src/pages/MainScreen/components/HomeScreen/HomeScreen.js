import React, { useContext, useEffect, useState } from 'react';
import styles from './HomeScreen.module.css';
import { Icon } from '@iconify/react';
import { popularSongs } from './components/Slider/DataSlider';
import Author from '../../../../assets/Author/Author';
import { popularAuthor } from '../../../../assets/Author/DataAuthor';
import ItemSongs from './components/ItemSongs';
import ItemSongsRCM from './components/ItemSongsRCM';
import { HomeDataContext } from '../../../../contexts/HomeDataContext';

const HomeScreen = ({ isOpen, onSelectedArtist, onCurrentArtist, onCurrentSongId, onRefreshPlaylists, playlistsData, uid }) => {
    const { songs, setSongs, artists, setArtists, topSongs, setTopSongs, isDataLoaded, setIsDataLoaded } = useContext(HomeDataContext);

    const fetchHometData = async (top_n1 = 5, top_n2 = 8) => {
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

            const response2 = await fetch(`http://localhost:4000/api/dashboard?user_id=${uid}&top_n=${top_n2}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data2 = await response2.json();
            setTopSongs(data2.songsByRateRecommentation || []);

            setIsDataLoaded(true); // Đánh dấu dữ liệu đã được tải
        } catch (err) {
            console.error('Error fetching home data:', err);
        }
    };

    useEffect(() => {
        if (!isDataLoaded) {
            fetchHometData();
        }
    }, [isDataLoaded, uid]); // Chỉ chạy khi `isDataLoaded` là `false`

    const handleArtistSelect = (artistId) => {
        onSelectedArtist(artistId);
    };

    if (!isOpen) return null;

    return (
        <div id={styles.mainHomeScreen}>
            <div className={styles.trendingSong}>
                <div className={styles.textTrendingSong}>
                    <Icon icon="solar:fire-bold" className={styles.icon}></Icon>
                    <h3>Top bài hát <span>thịnh hành</span></h3>
                </div>
                <main>
                    {songs.length > 0 ? (
                        songs.map((song, index) => (
                            <div
                                key={song.id}
                                className={styles.itemPlaylistContainer}
                                style={{ padding: '12px 32px', borderRadius: 8, width: "auto" }}
                                onClick={() => onCurrentSongId(song.id)}
                            >
                                <ItemSongs
                                    index={index + 1}
                                    songId={song.id}
                                    cover={song.avatarUrl}
                                    title={song.name}
                                    artist={song.artist}
                                    dateAdded={song.releaseDate}
                                    views={song.views}
                                    onRefreshPlaylists={onRefreshPlaylists}
                                    playlistsData={playlistsData}
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
                    <ItemSongsRCM
                        items={topSongs}
                    ></ItemSongsRCM>
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
                                            onSelectedArtist({
                                                artistId: item.artist_id,
                                            });
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