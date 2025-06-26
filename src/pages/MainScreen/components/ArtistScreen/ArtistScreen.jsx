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

const ArtistScreen = ({ isOpen, artistId, artists, onSelectedArtist, onCurrentSongId, onFollowChange, uid }) => {
    const [selectedArtist, setSelectedArtist] = useState({});
    const [songs, setSongs] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followers, setFollowers] = useState(0);

    const [visibleSongsCount, setVisibleSongsCount] = useState(5); // Số lượng bài hát hiển thị ban đầu

    const fetchArtistData = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/singer/${artistId}`);
            if (!response.ok) {
                throw new Error('Error fetching artist data');
            }
            const data = await response.json();
            setSelectedArtist(data);
            setFollowers(data.followers || 0);
            console.log(data);
        } catch (error) {
            console.error('Error fetching artist data:', error);
        }
    };

    useEffect(() => {
        fetchArtistData();
    }, [artistId]);


    const fetchSongsByArtist = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/singer/${artistId}/songs`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error fetching songs by artist');
            }

            const data = await response.json();
            setSongs(data.songs || []);
            console.log(data.songs);
        } catch (error) {
            console.error('Error fetching songs by artist:', error);
        }
    };

    useEffect(() => {
        fetchSongsByArtist();
    }, [artistId]); // Fetch songs when artistId or isOpen changes

    useEffect(() => {
        const artist = popularAuthor.find(author => author.id === artistId);
        setSelectedArtist(artist);
        window.scrollTo(0, 0);
    }, [artistId]);

    const handleArtistSelect = (artistId) => {
        onSelectedArtist(artistId);
    };

    const handleSongSelect = (songId) => {
        onCurrentSongId(songId);
    }

    // Check follow status
    const checkIsFollowing = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/singer/${artistId}/follows/${uid}`);
            if (response.ok) {
                const data = await response.json();
                setIsFollowing(data.isFollowing === true || data.message === "ALREADY_FOLLOWED");
            } else {
                setIsFollowing(false);
            }
        } catch {
            setIsFollowing(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchArtistData();
            checkIsFollowing();
        }
    }, [artistId, isOpen]);

    // Follow
    const handleFollowArtist = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/singer/${artistId}/follows/${uid}`, {
                method: 'POST',
            });
            const data = await response.json();
            if (response.ok && data.message === "ALREADY_FOLLOWED") {
                setIsFollowing(true);
                if (onFollowChange) onFollowChange();
                setFollowers(f => f + 1);
            }
        } catch {
            alert('Lỗi khi theo dõi nghệ sĩ');
        }
    };

    // Unfollow
    const handleUnfollowArtist = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/singer/${artistId}/follows/${uid}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setIsFollowing(false);
                if (onFollowChange) onFollowChange();
                setFollowers(f => Math.max(0, f - 1));
            }
        } catch {
            alert('Lỗi khi hủy theo dõi nghệ sĩ');
        }
    };

    if (!isOpen) return null;

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
                            src={selectedArtist?.avatarUrl || null}
                            alt=''
                            className={clsx(styles.avatarPic)} />

                    </div>

                    <div className={styles.textSpace}>
                        <p className='p1'>Nghệ sĩ</p>
                        <div className={styles.infoUser}>
                            <h3 className={styles.nameOfUsesr}>{selectedArtist?.name || 'Artist'}</h3>
                            {selectedArtist?.description && (
                                <p className='uiRegular o50'>{selectedArtist?.description}</p>
                            )}

                            <p className='uiSemibold o50'>
                                <span className='uiSemibold o75'>{followers}</span> người theo dõi</p>
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
                    <button
                        className={styles.followBtn}
                        onClick={isFollowing ? handleUnfollowArtist : handleFollowArtist}
                    >
                        <p className="uiMedium">{isFollowing ? "Đã theo dõi" : "Theo dõi"}</p>
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
                    {songs.length > 0 ? (
                        songs.slice(0, visibleSongsCount).map((song, index) => (
                            <div
                                key={song.id}
                                className={styles.itemPlaylistContainer}
                                style={{
                                    padding: '8px 12px',
                                    borderRadius: 8
                                }}
                                onClick={() => onCurrentSongId(song.id)}
                            >
                                <PlaylistItem
                                    index={index + 1}
                                    // playlistId={playlistId}
                                    songId={song.id}
                                    cover={song.avatarUrl}
                                    title={song.name}
                                    artist={selectedArtist?.name || 'Unknown Artist'}
                                    dateAdded={song.releaseDay}
                                // onCurrentSongId={() => {
                                //     onCurrentSongId({
                                //         songId: song.id
                                //     })
                                //     handleSongSelect(song.id)
                                // }}
                                // fetchPlaylistData={fetchPlaylistData}
                                />
                            </div>
                        ))
                    ) : (
                        <p className={styles.noSongsMessage}>Danh sách phát hiện không có bài hát.</p>
                    )}
                </main>

                <button
                    className={styles.showMoreButton}
                    onClick={() => {
                        setVisibleSongsCount(
                            visibleSongsCount === 5 ? songs.length : 5 // Chuyển đổi giữa hiển thị 5 bài hát và toàn bộ bài hát
                        );
                        window.scrollTo(0, 0);
                    }} // Hiển thị toàn bộ bài hát
                >
                    {songs.length > visibleSongsCount ? 'Xem thêm' : 'Thu gọn'}
                </button>
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
                                            onSelectedArtist(item.artist_id);
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

export default ArtistScreen;