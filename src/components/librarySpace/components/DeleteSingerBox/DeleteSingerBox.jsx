import React, { useEffect, useState } from 'react';
import styles from '../UploadSongBox/UploadSongBox.module.css';

const DeleteSingerBox = ({ isOpen, onClose, onSuccess, selectedSinger, setSelectedSinger }) => {
    const [artists, setArtists] = useState([]);
    const [form, setForm] = useState({ name: '', avatarUrl: '' });

    useEffect(() => {
        if (!isOpen || !selectedSinger || selectedSinger.length === 0) return;
        const fetchArtists = async () => {
            try {
                const results = await Promise.all(
                    selectedSinger.map(async (id) => {
                        const response = await fetch(`http://localhost:4000/api/singer/${id}`);
                        if (!response.ok) return null;
                        return await response.json();
                    })
                );
                setArtists(results.filter(Boolean));
            } catch (error) {
                setArtists([]);
                console.error('Error fetching artists:', error);
            }
        };
        fetchArtists();
    }, [isOpen, selectedSinger]);

    const handleDelete = async () => {
        try {
            for (const id of selectedSinger) {
                await fetch(`http://localhost:4000/api/singer/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            }
            alert('Xóa ca sĩ thành công!');
            onSuccess && onSuccess();
            setSelectedSinger([]);
            onClose();
        } catch {
            alert('Lỗi khi xóa ca sĩ');
        }
    };

    if (!isOpen || !selectedSinger || !artists) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.box}>
                <h3>Xóa ca sĩ</h3>
                <p>
                    {selectedSinger.length > 1
                        ? <>
                            Bạn có chắc chắn muốn xóa các ca sĩ sau?
                            <ul style={{ background: 'transparent', marginTop: 6 }}>
                                {artists.map(a => (
                                    <li
                                        style={{ background: 'transparent' }}
                                        key={a.id}
                                    >{a.name}</li>
                                ))}
                            </ul>
                        </>
                        : <>Bạn có chắc chắn muốn xóa ca sĩ <b>{artists[0]?.name}</b>?</>
                    }
                </p>
                <div className={styles.actions}>
                    <button onClick={handleDelete}>Xóa</button>
                    <button onClick={onClose}>Hủy</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteSingerBox;