import React, { useEffect, useState } from 'react';
import styles from './AddPlaylistBox.module.css';
import { InlineIcon } from '@iconify/react/dist/iconify.js';
import clsx from 'clsx';

const AddPlaylistBox = ({ isOpen, onClose, onAddPlaylist }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Cleanup the URL when the component unmounts or selectedImage changes
        return () => {
            if (selectedImage) {
                URL.revokeObjectURL(selectedImage);
            }
        };
    }, [selectedImage]);

    if (!isOpen) return null;

    const handleClose = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };


    const handleCreatePlaylist = () => {
        setIsSubmitting(true);

        const uid = localStorage.getItem('uid') || 'OXRsv6wJffNCNu0YXvhGRyAPNun1';
        const name = playlistName.trim();
        const description = playlistDescription.trim();

        // Log để kiểm tra giá trị
        console.log('Playlist Name:', name);
        console.log('User ID:', uid);

        if (name && uid) {
            const newPlaylist = {
                uid,  // Đảm bảo 'uid' được gửi đi
                avtUrl: selectedImage || '',
                name,  // Đảm bảo 'name' được gửi đi
                description,  // Kiểm tra xem 'description' có bắt buộc hay không
            };

            console.log('New Playlist:', newPlaylist);  // Log lại payload gửi đi

            fetch('http://localhost:4000/api/playlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPlaylist),
            })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(err => { throw new Error(err.message) });
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Playlist created:', data);
                    onAddPlaylist(newPlaylist);
                    alert('Tạo danh sách phát thành công.');
                    setPlaylistName('');
                    setPlaylistDescription('');
                    setSelectedImage(null);
                    onClose();
                })
                .catch(err => {
                    console.error('Error creating playlist:', err);
                });
        } else {
            console.error('Missing required fields: uid or name');
        }
        setIsSubmitting(false);
    };



    return (
        <div className={styles.backgroundSpace} onClick={handleClose}>
            <div className={styles.mainBoxContainer}>
                <header>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <InlineIcon icon="ic:round-arrow-back-ios" className={styles.iconBack} />
                    </button>
                </header>
                <h4>Tạo danh sách mới</h4>
                <div className={styles.avatarContainer}>
                    <button
                        onClick={() => document.getElementById('imageInput').click()}
                        style={{
                            opacity: selectedImage ? '10%' : 'inherit',
                        }}
                    >
                        <InlineIcon
                            className={styles.icon}
                            icon="mingcute:pencil-fill"
                        ></InlineIcon>
                        <p className="uiSemibold">Chọn ảnh</p>
                    </button>
                    <input
                        id="imageInput"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    ></input>
                    <img
                        src={selectedImage || ''}
                        alt=""
                        className={clsx(styles.avatarPlaylistPic)}
                        style={{ background: selectedImage ? 'transparent' : '' }}
                    />
                </div>

                <div className={styles.createContainer}>
                    <div className={styles.inputFillContainer}>
                        <div className={styles.nameInputContainer}>
                            <p className="uiSemibold">Tên danh sách phát</p>
                            <input
                                type="text"
                                className={styles.inputName}
                                value={playlistName}
                                onChange={(e) => setPlaylistName(e.target.value)}
                            ></input>
                        </div>

                        <div className={styles.nameInputContainer}>
                            <p className="uiSemibold">Mô tả</p>
                            <textarea
                                type="text"
                                className={styles.inputDiscription}
                                value={playlistDescription}
                                onChange={(e) => setPlaylistDescription(e.target.value)}
                            ></textarea>
                        </div>
                    </div>

                    <button
                        className={clsx(styles.createBtn, { [styles.disabled]: isSubmitting })}
                        onClick={handleCreatePlaylist}
                        disabled={isSubmitting}
                    >
                        <p className="uiSemibold">{isSubmitting ? 'Đang tạo...' : 'Tạo'}</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPlaylistBox;
