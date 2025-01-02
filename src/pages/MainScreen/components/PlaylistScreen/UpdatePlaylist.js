import React, { useEffect, useState } from 'react';
import styles from './PlaylistScreen.module.css';
import { InlineIcon } from '@iconify/react/dist/iconify.js';
import clsx from 'clsx';
import { use } from 'react';

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

    const compressImage = (file, maxWidth = 1000, maxHeight = 1000) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const reader = new FileReader();

            reader.onload = () => {
                img.src = reader.result;
            };

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                let { width, height } = img;
                if (width > maxWidth || height > maxHeight) {
                    const scaleFactor = Math.min(maxWidth / width, maxHeight / height);
                    width = width * scaleFactor;
                    height = height * scaleFactor;
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                const compressedImage = canvas.toDataURL('image/jpeg', 0.8); // Chuyển thành Base64
                resolve(compressedImage);
            };

            img.onerror = reject;
            reader.onerror = reject;

            reader.readAsDataURL(file);
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const compressedImage = await compressImage(file);
                setSelectedImage(compressedImage); // Lưu Base64 đã giảm kích thước vào state
            } catch (error) {
                console.error('Lỗi khi nén ảnh:', error);
            }
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