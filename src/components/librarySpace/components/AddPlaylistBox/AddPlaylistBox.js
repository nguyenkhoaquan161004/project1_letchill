import React, { useEffect, useState } from 'react';
import styles from './AddPlaylistBox.module.css';
import { InlineIcon } from '@iconify/react/dist/iconify.js';
import clsx from 'clsx';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const AddPlaylistBox = ({ isOpen, onClose, onAddPlaylist }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [searchParams] = useSearchParams();

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
            const imageUrl = response.data.secure_url;
            console.log('Image URL:', imageUrl);

            // Lưu hình ảnh vào state
            setSelectedImage(imageUrl);

            console.log('Image uploaded and link sent to backend:', imageUrl);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };


    const handleCreatePlaylist = () => {
        setIsSubmitting(true);

        const uid = searchParams.get('uid') || 'Awx8TDFrgwReln0QQefF';
        const name = playlistName.trim();
        const description = playlistDescription.trim();

        // Log để kiểm tra giá trị
        console.log('Playlist Name:', name);
        console.log('User ID:', uid);
        console.log('AvtUrl:', selectedImage);

        if (name && uid) {
            const newPlaylist = {
                uid: uid,  // Đảm bảo 'uid' được gửi đi
                name: name,  // Đảm bảo 'name' được gửi đi
                avtUrl: selectedImage || '',
                description: description,  // Kiểm tra xem 'description' có bắt buộc hay không
            };

            console.log('New Playlist:', newPlaylist);  // Log lại payload gửi đi

            fetch('http://localhost:4000/api/playlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPlaylist),
            })
                .then(async response => {
                    const responseData = await response.json();
                    console.log('Response Status:', response.status);
                    console.log('Response Data:', responseData);

                    if (!response.ok) {
                        throw new Error(responseData.message || 'Failed to create playlist');
                    }
                    return responseData;
                })
                .then(data => {
                    console.log('Playlist created successfully:', data);
                    onAddPlaylist(newPlaylist);
                    alert('Tạo danh sách phát thành công.');
                    setPlaylistName('');
                    setPlaylistDescription('');
                    setSelectedImage(null);
                    onClose();
                })
                .catch(err => {
                    console.error('Error creating playlist:', err);
                    alert(`Lỗi: ${err.message}`);
                })
                .finally(() => {
                    setIsSubmitting(false);
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
