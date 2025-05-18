import React, { useEffect, useState } from 'react';
import styles from './HomeScreen.module.css';
import { Icon } from '@iconify/react';
import { popularSongs } from './components/Slider/DataSlider';
import Author from '../../../../assets/Author/Author';
import { popularAuthor } from '../../../../assets/Author/DataAuthor';
import ItemSongs from './components/ItemSongs';
import ItemSongsRCM from './components/ItemSongsRCM';

const HomeScreen = ({ isOpen, onSelectedArtist, onCurrentSongId, onRefreshPlaylists, playlistsData }) => {
    const [songs, setSongs] = useState(null);
    const [artists, setArtist] = useState(null);
    const items = songs === null ? popularSongs : songs;
    const fetchHometData = async () => {
        try {

            const response = await fetch('http://localhost:4000/api');
            if (!response.ok) {
                // throw new Error('Error fetching home data');
            }

            const data = await response.json();

            setSongs(data.topSongs);  // Đảm bảo xử lý cho 'favorite'
            setArtist(data.topSingers);
            console.log(songs);
            console.log(artists);

        } catch (err) {
            console.error('Error fetching home data:', err);
            // alert('An error occurred while fetching the home data.');
        }
    };
    useEffect(() => {
        fetchHometData();
    }, []);

    if (!isOpen) return null;

    return (
        <div id={styles.mainHomeScreen}>
            <div className={styles.trendingSong}>
                <div className={styles.textTrendingSong}>
                    <Icon icon="solar:fire-bold" className={styles.icon}></Icon>
                    <h3>Top bài hát <span>thịnh hành</span></h3>
                </div>
                {/* <Slider
                    items={songs || popularSongs}></Slider> */}
                <main>
                    {items.length > 0 ? (
                        items.map((song, index) => (
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
                        items={items}
                    ></ItemSongsRCM>
                </div>
            </div>

            <div className={styles.popularAuthor}>
                <h4>Nghệ sĩ phổ biến</h4>
                <div className={styles.authorContainer}>
                    <Author
                        items={artists || popularAuthor}
                        onSelectedArtist={onSelectedArtist}
                    ></Author>
                </div>
            </div>

        </div>
    );
};

export default HomeScreen;