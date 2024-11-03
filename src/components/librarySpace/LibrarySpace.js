import React from 'react';
import styles from './LibrarySpace.module.css';
import Playlist from './components/Playlist/Playlist';
import { Icon } from '@iconify/react';
import favoritePlaylist from './assets/favoritePlaylist.svg';
import clsx from 'clsx';

const LibrarySpace = ({ onPlaylistClick }) => {
    const playlists = [
        {
            playlistPic: favoritePlaylist,
            name: "Danh sách yêu thích"
        },
        {
            playlistPic: 'https://www.neonvibes.co.uk/cdn/shop/products/NV-Chillneonvibes.co.ukLEDneonsignsMadeintheUK_8_2048x.jpg?v=1665760509',
            name: "Chilling"
        },
        {
            playlistPic: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-chill-buon.jpg',
            name: "focus time"
        },
        {
            playlistPic: 'https://xwatch.vn/upload_images/images/2023/03/29/anh-chill-nhac-lofi.jpg',
            name: "The sunset in my memory"
        },
        {
            playlistPic: 'https://i.pinimg.com/736x/3d/63/27/3d6327fde132c19c6481130a9d54b5b1.jpg',
            name: "Đôi ba câu chuyện tình yêu"
        },
        {
            playlistPic: 'https://www.thoughtco.com/thmb/beiCvc1QcvpjjJPXI6g0wG18MxI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/drops-of-rain-on-glass-838815210-5a823cc0a18d9e0036e325e2.jpg',
            name: "Một chút tâm trạng"
        },
        {
            playlistPic: 'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/2023_12_27_638392900179046358_slay-la-gi.jpg',
            name: "Hey! Slay Queen"
        },
    ]

    return (
        <div id={styles.leftBar} className={clsx('w24')}>
            <div className={styles.leftBarContainer}>
                <div className={styles.topicContainer}>
                    <header>
                        <div className={styles.topic}>
                            <Icon icon="fluent:library-24-filled" style={{ width: 26, height: 26, backgroundColor: 'transparent' }}></Icon>
                            <h4>Thư viện</h4>
                        </div>
                        <Icon icon="ic:round-add" style={{ width: 26, height: 26, backgroundColor: 'transparent' }}></Icon>
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
                    {playlists.map((playlist, index) => (
                        <Playlist
                            onPlaylistClick={() =>
                                onPlaylistClick({
                                    playlistPic: playlist.playlistPic,
                                    namePlaylist: playlist.name
                                })}
                            key={index}
                            playlistPic={playlist.playlistPic}
                            namePlaylist={playlist.name}></Playlist>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default LibrarySpace;