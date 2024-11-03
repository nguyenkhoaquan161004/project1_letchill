import React, { useState, useRef } from 'react';
import styles from './PlaylistScreen.module.css';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import PlaylistItem from './PlaylistItem';

const PlaylistScreen = ({ isOpen, playlistPic, namePlaylist }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const playlistData = [
        {
            cover: 'https://images.genius.com/9420386437e633e438609a4ab103fc37.1000x1000x1.jpg', // Đường dẫn ảnh cho bài hát
            title: 'What a wonderful world',
            artist: 'The Macarons Project',
            dateAdded: '10/12/2024'
        },
        {
            cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrQBBWXUdsLOf207iiGhMTJU_7Zu-n8fFhfQ&s',
            title: 'Oh, Santa',
            artist: 'Mariah Carey ft. Ariana Grande, Jennifer Hudson',
            dateAdded: '10/12/2024'
        },
        {
            cover: 'https://www.boilerroomrecords.co.uk/cdn/shop/files/783f7ad7e57d5a07829ae62679f2037f.png?v=1727176454',
            title: 'All I want for Christmas is you',
            artist: 'Mariah Carey',
            dateAdded: '10/12/2024'
        },
        {
            cover: 'https://upload.wikimedia.org/wikipedia/vi/c/c0/Ariana_Grande_-_Santa_Tell_Me.png',
            title: 'Santa tell me',
            artist: 'Ariana Grande',
            dateAdded: '10/12/2024'
        },
        {
            cover: 'https://images.genius.com/f9680e3c876e1466fa1d240e8b7609c9.1000x1000x1.png',
            title: 'Last Christmas',
            artist: 'Wham!',
            dateAdded: '10/12/2024'
        },
        {
            cover: 'https://www.rap-up.com/article/2013/11/18/media_1f9c55f3c63264b4dbc6b054f854c9c82c6c28a3d.jpeg?width=1200&format=pjpg&optimize=medium',
            title: 'Last Christmas',
            artist: 'Ariana Grande',
            dateAdded: '10/12/2024'
        },
        {
            cover: 'https://upload.wikimedia.org/wikipedia/en/b/b5/Kelly_Clarkson_and_Ariana_Grande_-_Santa_Can%27t_You_Hear_Me_single_cover.jpeg',
            title: 'Santa, can you hear me?',
            artist: 'Kelly Clarkson & Ariana Grande',
            dateAdded: '10/12/2024'
        },
        {
            cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS85z2xwMS5z2akyjYwO-BWjhlidHZNpbAf_A&s',
            title: 'Snowman',
            artist: 'Sia',
            dateAdded: '10/12/2024'
        },
        {
            cover: 'https://i.discogs.com/vYJJiQAJPGaXuk09Zrny8eg6TG76R60Yu8Vh2LhnEew/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI1NTUz/NTQ1LTE2NzE4NjA4/MjctOTYxMy5qcGVn.jpeg',
            title: 'Save your tears',
            artist: 'The Weeknd ft. Ariana Grande',
            dateAdded: '10/12/2024'
        },
        {
            cover: 'https://avatar-ex-swe.nixcdn.com/song/2024/03/28/7/1/b/e/1711632303247_640.jpg',
            title: 'Too Sweet',
            artist: 'Hozier',
            dateAdded: '10/12/2024'
        },
        {
            cover: 'https://i.scdn.co/image/ab67616d00001e02db6ed492fdc27def8f979263',
            title: 'Honeymoon Avenue (Live from London)',
            artist: 'Ariana Grande',
            dateAdded: '10/12/2024'
        }
    ];

    const countPlaylist = playlistData.length;

    if (!isOpen) {
        return null;
    }

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div id={styles.playlistScreen}>
            <div className={styles.infoPlaylistWrapper}>
                <div className={styles.playlistContainer}>
                    <img
                        src={playlistPic}
                        alt=''
                        className={clsx(styles.playlistAvatarPic)} />
                </div>

                <div className={styles.textSpace}>
                    <p className='p1'>Danh sách phát</p>
                    <div className={styles.infoPlaylist}>
                        <h3 className={styles.nameOfUsesr}>{namePlaylist}</h3>
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

                    <button>
                        <Icon icon="ri:more-fill" className={styles.icon}></Icon>
                    </button>
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
                {playlistData.map((playlist, index) => {
                    return (
                        <div key={index} className={styles.itemPlaylistContainer} style={{ padding: "8px 12px", borderRadius: 8 }}>
                            <PlaylistItem
                                index={index + 1}
                                cover={playlist.cover}
                                title={playlist.title}
                                artist={playlist.artist}
                                dateAdded={playlist.dateAdded}></PlaylistItem>
                        </div>
                    )
                })}
            </main>

        </div>
    );
};

export default PlaylistScreen;