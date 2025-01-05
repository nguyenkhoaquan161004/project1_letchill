import React, { useEffect, useState } from 'react';
import styles from './PlaylistScreen.module.css';
import { InlineIcon } from '@iconify/react/dist/iconify.js';
import clsx from 'clsx';
import { use } from 'react';
import axios from 'axios';

const UpdatePlaylist = ({ playlistId, isOpen, onClose, onUpdatePlaylist, playlistPic, namePlaylist, description }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setPlaylistName(namePlaylist || '');
        setPlaylistDescription(description || '');
    }, [namePlaylist, description]);

    if (!isOpen) return null;

    const handleClose = (e) => {
        if (e.target === e.currentTarget)
            onClose();
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const compressedImage = await compressedImage(file);
        const formData = new FormData();
        formData.append('file', compressedImage);
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
        } catch (error) {
            console.error('Lỗi khi nén ảnh:', error);
        }


        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    const handleUpdatePlaylist = async () => {
        if (!playlistId) {
            console.error('Playlist ID không tồn tại.');
            return;
        }

        console.log(playlistId);

        setIsLoading(true);

        try {
            // Chuẩn bị dữ liệu
            const updatedData = {

                name: playlistName.trim(),
                ...(selectedImage && { avtUrl: selectedImage }), // Chỉ gửi ảnh nếu có thay đổi
                description: playlistDescription.trim(),
            };

            console.log('Dữ liệu gửi đi:', updatedData); // Kiểm tra dữ liệu

            // Gửi request PATCH đến API
            const response = await fetch(`http://localhost:4000/api/playlist/${playlistId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Cập nhật danh sách phát thất bại.');
            }

            const result = await response.json();

            // Gọi callback để cập nhật giao diện hoặc thông báo
            onUpdatePlaylist(result);
            // Đóng modal
            onClose();

            alert('Cập nhật danh sách phát thành công!');
        } catch (error) {
            console.error('Lỗi khi cập nhật danh sách phát:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={styles.backgroundSpace} onClick={handleClose}>
            <div className={styles.mainBoxContainer}>
                <header>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <InlineIcon icon="ic:round-arrow-back-ios" className={styles.iconBack} />
                    </button>
                </header>
                <h4>Cập nhật danh sách mới</h4>
                <div className={styles.avatarContainer}>
                    <button
                        onClick={() => document.getElementById('imageInput').click()}
                        style={{
                            opacity: selectedImage ? '10%' : 'inherit'
                        }}>
                        <InlineIcon className={styles.icon} icon="mingcute:pencil-fill"></InlineIcon>
                        <p className='uiSemibold'>Chọn ảnh</p>
                    </button>
                    <input
                        id='imageInput'
                        type='file'
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}></input>
                    <img
                        src={selectedImage || playlistPic || ''}
                        alt=''
                        className={clsx(styles.avatarPlaylistPic)}
                        style={{ background: selectedImage ? 'transparent' : '' }} />
                </div>

                <div className={styles.updateContainer}>
                    <div className={styles.inputFillContainer}>
                        <div className={styles.nameInputContainer}>
                            <p className='uiSemibold'>Tên danh sách phát</p>
                            <input
                                type='text'
                                className={styles.inputName}
                                value={playlistName}
                                onChange={(e) => setPlaylistName(e.target.value)}
                                placeholder={namePlaylist}></input>
                        </div>

                        <div className={styles.nameInputContainer}>
                            <p className='uiSemibold'>Mô tả</p>
                            <textarea
                                type='text'
                                className={styles.inputDiscription}
                                value={playlistDescription}
                                onChange={(e) => setPlaylistDescription(e.target.value)}
                                placeholder={description}></textarea>
                        </div>
                    </div>

                    <button className={styles.updateBtn} onClick={handleUpdatePlaylist} disabled={isLoading}>
                        <p className="uiSemibold">{isLoading ? 'Đang cập nhật...' : 'Cập nhật'}</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdatePlaylist;