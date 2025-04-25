import React, { useEffect, useState } from 'react';
import styles from './ArtistScreen.module.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import { popularAuthor } from '../../../../assets/Author/DataAuthor.js'
import clsx from 'clsx';
import PlaylistItem from '../PlaylistScreen/PlaylistItem.js';
import Author from '../../../../assets/Author/Author.js';

const generateSongsData = () => {
    return [
        {
            id: 1,
            image: 'https://example.com/song1.jpg',
            name: 'Song 1',
            releaseDate: '2023-01-01',
            artist: 'Artist 1'
        },
        {
            id: 2,
            image: 'https://example.com/song2.jpg',
            name: 'Song 2',
            releaseDate: '2023-02-01',
            artist: 'Artist 2'
        },
        {
            id: 3,
            image: 'https://example.com/song3.jpg',
            name: 'Song 3',
            releaseDate: '2023-03-01',
            artist: 'Artist 3'
        },
        {
            id: 4,
            image: 'https://example.com/song4.jpg',
            name: 'Song 4',
            releaseDate: '2023-04-01',
            artist: 'Artist 4'
        },
        {
            id: 5,
            image: 'https://example.com/song5.jpg',
            name: 'Song 5',
            releaseDate: '2023-05-01',
            artist: 'Artist 5'
        }
    ];
};

const songsData = generateSongsData();

const ArtistScreen = ({ isOpen, artistId, onSelectedArtist }) => {
    const [selectedArtist, setSelectedArtist] = useState("");
    const [songs, setSongs] = useState(null);
    const [artists, setArtist] = useState(null);

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

    useEffect(() => {
        const artist = popularAuthor.find(author => author.id === artistId);
        setSelectedArtist(artist);
        window.scrollTo(0, 0);
    }, [artistId]);

    if (!isOpen) return null;

    if (!selectedArtist) return null;

    const { name, image, description, followers } = selectedArtist;

    return (
        <div id={styles.artistScreen}>
            <div className={styles.infoAccountContainer}>
                <div className={styles.infoAccountWrapper}>
                    <div className={styles.avatarContainer}>
                        <input
                            id='imageInput'
                            type='file'
                            accept="image/*"
                            style={{ display: 'none' }}></input>
                        <img
                            src={selectedArtist.avatarUrl}
                            alt=''
                            className={clsx(styles.avatarPic)} />

                    </div>

                    <div className={styles.textSpace}>
                        <p className='p1'>Nghệ sĩ</p>
                        <div className={styles.infoUser}>
                            <h3 className={styles.nameOfUsesr}>{selectedArtist.name || 'Artist'}</h3>
                            {selectedArtist.description && (
                                <p className='uiRegular o50'>{selectedArtist.description}</p>
                            )}

                            <p className='uiSemibold o50'>
                                <span className='uiSemibold o75'>{selectedArtist.followers || 0}</span> người theo dõi</p>
                        </div>
                    </div>
                </div>
                <div className={styles.listBtns}>
                    <button className={styles.playBtn}>
                        <Icon icon="mage:play-fill" className={clsx(styles.icon, styles.iconPlay)}></Icon>
                    </button>
                    <button>
                        <Icon icon="ri:more-fill" className={styles.icon}></Icon>
                    </button>
                    <button className={styles.followBtn}>
                        <p className="uiMedium">Theo dõi</p>
                    </button>
                </div>
            </div>
            <div className={styles.listSongPopular}>
                <h4>Phổ biển</h4>
                <header>
                    <div className={styles.leftInfo}>
                        <span className='uiMedium o50' style={{ width: 50 }}>#</span>
                        <span className='uiMedium o50' style={{ flex: 10 }}>Tên bài hát</span>
                    </div>

                    {/* <span className='uiMedium o50' style={{ marginRight: 102 }}>Lượt nghe</span> */}
                    <span className='uiMedium o50' style={{ marginRight: 102 }}>Ngày thêm</span>
                </header>

                <main>
                    {songsData.length > 0 ? (
                        songsData.map((song, index) => (
                            <div
                                key={song.id}
                                className={styles.itemPlaylistContainer}
                                style={{ padding: '8px 12px', borderRadius: 8 }}
                            // onClick={() => onCurrentSongId(song.id)}
                            >
                                <PlaylistItem
                                    index={index + 1}
                                    // playlistId={playlistId}
                                    songId={song.id}
                                    cover={selectedArtist.avatarUrl}
                                    title={song.name}
                                    artist={selectedArtist.name}
                                    dateAdded={song.releaseDate}
                                // fetchPlaylistData={fetchPlaylistData}
                                />
                            </div>
                        ))
                    ) : (
                        <p className={styles.noSongsMessage}>Danh sách phát hiện không có bài hát.</p>
                    )}
                </main>
                {/* <main>
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
            </main> */}
            </div>

            <div className={styles.sameArtists}>
                <h4>Các nghệ sĩ tương tự</h4>
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

export default ArtistScreen;