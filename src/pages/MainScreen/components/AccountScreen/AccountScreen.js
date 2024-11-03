import React, { useState } from 'react';
import styles from './AccountScreen.module.css';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import favoritePlaylist from '../../../../components/librarySpace/assets/favoritePlaylist.svg'

const AccountScreen = ({ isOpen }) => {
    const [selectedImage, setSelectedImage] = useState(null);
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

    if (!isOpen) { return null; }

    const handleImageCHange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    }

    return (
        <div id={styles.accountScreen}>
            <div className={styles.infoAccountContainer}>
                <div className={styles.infoAccountWrapper}>
                    <div className={styles.avatarContainer}>
                        <button onClick={() => document.getElementById('imageInput').click()}>
                            <Icon className={styles.icon} icon="mingcute:pencil-fill"></Icon>
                            <p className='uiSemibold'>Chọn ảnh</p>
                        </button>
                        <input
                            id='imageInput'
                            type='file'
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageCHange}></input>
                        <img
                            src={selectedImage || ''}
                            alt=''
                            className={clsx(styles.avatarPic)}
                            style={{ background: selectedImage ? 'transparent' : '' }} />
                    </div>

                    <div className={styles.textSpace}>
                        <p className='p1'>Hồ sơ</p>
                        <div className={styles.infoUser}>
                            <h3 className={styles.nameOfUsesr}>NK.Kinq</h3>
                            <p className='uiSemibold o50'>
                                <span className='uiSemibold o50'>4</span> danh sách phát</p>
                        </div>
                    </div>
                </div>
                <button>
                    <Icon icon="ri:more-fill" className={styles.icon}></Icon>
                </button>
            </div>

            <div className={styles.playlistOfAccount}>
                <h3>Danh sách phát</h3>
                <div className={styles.listOfPlaylist}>
                    {playlists.map((playlist, i) => {
                        return (
                            <div key={i} className={styles.itemOfPlaylist}>
                                <img className={styles.playlistPic} src={playlist.playlistPic} alt='' />
                                <p className={clsx(styles.nameOfPlaylist, 'uiSemibold')}>{playlist.name}</p>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    );
};

export default AccountScreen;