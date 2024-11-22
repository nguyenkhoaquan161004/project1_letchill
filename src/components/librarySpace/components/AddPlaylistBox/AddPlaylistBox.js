import React, { useState } from 'react';
import styles from './AddPlaylistBox.module.css';
import { InlineIcon } from '@iconify/react/dist/iconify.js';
import clsx from 'clsx';

const AddPlaylistBox = ({ isOpen, onClose }) => {
    const [selectedImage, setSelectedImage] = useState(null);

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
                        src={selectedImage || ''}
                        alt=''
                        className={clsx(styles.avatarPlaylistPic)}
                        style={{ background: selectedImage ? 'transparent' : '' }} />
                </div>

                <div className={styles.createContainer}>
                    <div className={styles.inputFillContainer}>
                        <div className={styles.nameInputContainer}>
                            <p className='uiSemibold'>Tên danh sách phát</p>
                            <input type='text' className={styles.inputName}></input>
                        </div>

                        <div className={styles.nameInputContainer}>
                            <p className='uiSemibold'>Mô tả</p>
                            <textarea type='text' className={styles.inputDiscription}></textarea>
                        </div>
                    </div>

                    <button className={styles.createBtn}>
                        <p className='uiSemibold'>Tạo</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPlaylistBox;