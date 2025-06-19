import React, { useState, useRef, useEffect } from 'react';
import styles from './PlaylistScreen.module.css';
import { Icon } from '@iconify/react';

const PlaylistItem = ({ index, playlistId, songId, cover, title, artist, dateAdded, views, fetchPlaylistData }) => {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const popupRef = useRef(null); // Tham chiếu đến popup

    const handleClickDelete = async (e) => {
        e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn bài hát này khỏi danh sách phát?");
        if (!confirmDelete) return;
        try {
            console.log('Fetching playlist with ID:', songId);
            const response = await fetch(`http://localhost:4000/api/playlist-detail/${playlistId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ songId: songId }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Không thể xóa bài hát khỏi danh sách phát: ${errorMessage}`);
            }
            fetchPlaylistData()
            alert('Bài hát đã xóa khỏi danh sách phát thành công.');
        } catch (err) {
            console.error('Error deleting playlist:', err);
            alert('Xóa bài hát khỏi danh sách phát thất bại.');
        }
        setIsDeleteOpen(false);
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

    function formatDateToDDMMYYYY(date) {
        const d = new Date(date);
        if (isNaN(d)) return ''; // Invalid date
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <div className={styles.itemPlaylist}>
            <div className={styles.leftItemPlaylist}>
                <p className='uiSemibold' style={{ width: 50 }}>{index}</p>
                <div className={styles.infoItemPlaylist}>
                    <img src={cover} alt='cover' />
                    <div className={styles.textInfoPlaylist}>
                        <h5>{title}</h5>
                        <p className='p3 o75'>{artist}</p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <div className={styles.rightItemPlaylist}>
                    {views !== null ? (<p>{views}</p>) : null}
                    {dateAdded !== null ? (<p>{formatDateToDDMMYYYY(dateAdded)}</p>) : null}
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
