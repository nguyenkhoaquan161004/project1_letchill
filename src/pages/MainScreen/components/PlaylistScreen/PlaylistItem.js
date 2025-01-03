import React, { useState, useRef, useEffect } from 'react';
import styles from './PlaylistScreen.module.css';
import { Icon } from '@iconify/react';

const PlaylistItem = ({ index, cover, title, artist, dateAdded }) => {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const popupRef = useRef(null); // Tham chiếu đến popup

    const handleClickDelete = (e) => {
        e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
        setIsDeleteOpen((prev) => !prev);
    };

    // Đóng popup khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsDeleteOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.itemPlaylist}>
            <div className={styles.leftItemPlaylist}>
                <p className='uiSemibold' style={{ width: 50 }}>{index}</p>
                <div className={styles.infoItemPlaylist}>
                    <img src={cover} alt='cover' />
                    <div className={styles.textInfoPlaylist}>
                        <h4>{title}</h4>
                        <p className='p3 o75'>{artist}</p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <div className={styles.rightItemPlaylist}>
                    <p>{dateAdded}</p>
                    <button className={styles.btnDelete} onClick={handleClickDelete}>
                        <Icon className={styles.icon} icon="ri:more-fill" />
                    </button>
                </div>
                {isDeleteOpen && (
                    <div
                        ref={popupRef}
                        style={{
                            position: 'absolute',
                            right: 30,
                            backgroundColor: 'rgb(0, 0, 0)',
                            padding: 6,
                            borderRadius: 5,
                            zIndex: 1000
                        }}
                        onClick={(e) => e.stopPropagation()} // Ngăn tắt popup khi click vào chính popup
                    >
                        Xóa bài hát
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlaylistItem;
