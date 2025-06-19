import React, { useEffect, useState } from 'react';
import styles from './AccountScreen.module.css';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import favoritePlaylist from '../../../../components/librarySpace/assets/favoritePlaylist.svg'
import axios from 'axios';

const AccountScreen = ({ isOpen, uid, onSelectedPlaylist }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [user, setUser] = useState("");
    const [playlistCount, setPlaylistCount] = useState(null);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'playlistAvtUrl');  // Đảm bảo bạn đã tạo preset trong Cloudinary

        try {
            // Gửi hình ảnh lên Cloudinary
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/di4kdlfr3/image/upload',
                formData
            );

            // Lấy URL của hình ảnh từ Cloudinary
            const avatarUrl = response.data.secure_url;
            console.log('Image URL:', avatarUrl);

            // Lưu hình ảnh vào state
            setSelectedImage(avatarUrl);
            const updateUser = {
                uid: uid,
                name: user.name,
                avatarUrl: avatarUrl,
            }
            await fetch(`http://localhost:4000/api/profile/${uid}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateUser),
            });
            console.log('Image uploaded and link sent to backend:', avatarUrl);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const fetchUsertData = async () => {
        console.log('Fetching user data with ID:', uid);
        try {
            console.log('Fetching user data with ID:', uid);

            const response = await fetch(`http://localhost:4000/api/profile/${uid}`);
            if (!response.ok) {
                // throw new Error('Error fetching user data');
            }

            const data = await response.json();
            console.log(data);
            setPlaylists(data.playlist);  // Đảm bảo xử lý cho 'favorite'
            setUser({
                name: data.name,
            });
            console.log(data.name)
            setSelectedImage(data.avatarUrl);
            setPlaylistCount(data.playlistCount);
            console.log(user);


        } catch (err) {
            console.error('Error fetching user data:', err);
            // alert('An error occurred while fetching the user data.');
        }
    };
    useEffect(() => {
        fetchUsertData();
    }, []);

    const handlePlaylistSelect = (playlistId) => {
        onSelectedPlaylist(playlistId);
    };

    if (!isOpen) { return null; }

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
                            onChange={handleImageChange}></input>
                        <img
                            src={selectedImage}
                            alt=''
                            className={clsx(styles.avatarPic)}
                            style={{ background: selectedImage ? 'transparent' : '' }}
                        />

                    </div>

                    <div className={styles.textSpace}>
                        <p className='p1'>Hồ sơ</p>
                        <div className={styles.infoUser}>
                            <h3 className={styles.nameOfUsesr}>{user.name || 'User'}</h3>
                            <p className='uiSemibold o50'>
                                <span className='uiSemibold o50'>{playlistCount || 0}</span> danh sách phát</p>
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
                    {Array.isArray(playlists) && playlists.map((playlist, i) => {
                        return (
                            <div
                                key={i}
                                className={styles.itemOfPlaylist}
                                onClick={() => {
                                    onSelectedPlaylist({
                                        playlistId: playlist.id,
                                        playlistPic: playlist.avatarUrl,
                                        namePlaylist: playlist.name,
                                    })
                                    handlePlaylistSelect(playlist.id)
                                }}>
                                <img className={styles.playlistPic} src={playlist.avatarUrl} alt='' />
                                <p className={clsx(styles.nameOfPlaylist, 'uiSemibold')}>{playlist.name}</p>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div >
    );
};

export default AccountScreen;