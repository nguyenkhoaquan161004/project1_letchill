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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    }

    const handleUpdatePlaylist = async () => {
        if (!playlistId) {
            console.error("Không tìm thấy playlistId.");
            return;
        }

        const updatedPlaylist = {
            name: playlistName.trim(),
            description: playlistDescription.trim(),
            avtUrl: selectedImage || playlistPic, // Cập nhật ảnh nếu có
        };

        setIsLoading(true);

        try {
            const response = await fetch(`http://localhost:4000/api/playlist/${playlistId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPlaylist),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Không thể cập nhật danh sách phát: ${errorMessage}`);
            }

            const data = await response.json();
            onUpdatePlaylist(data); // Gửi dữ liệu cập nhật thành công về PlaylistScreen
            alert('Cập nhật danh sách phát thành công.');
            onClose(); // Đóng modal sau khi hoàn thành
        } catch (err) {
            console.error('Lỗi khi cập nhật playlist:', err);
            alert(`Cập nhật danh sách phát thất bại: ${err.message}`);
        } finally {
            setIsLoading(false); // Dừng trạng thái loading
        }
    };


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