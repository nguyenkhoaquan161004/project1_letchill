import React, { useEffect, useState } from 'react';
import styles from './LyricsScreen.module.css';

const LyricsScreen = ({ isOpen, currentSongId }) => {
    const [lyrics, setLyrics] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!currentSongId) return; // Bỏ qua nếu currentSongId không tồn tại

            try {
                const response = await fetch(`http://localhost:4000/api/songInformation/${currentSongId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json(); // Chuyển đổi phản hồi thành JSON
                if (data.lyric) {
                    setLyrics(data.lyric); // Lưu dữ liệu vào state
                } else {
                    setLyrics([]);
                }
            } catch (err) {
                console.error('Error fetching song information:', err.message);
            }
        };

        fetchData();
    }, [currentSongId]);


    if (!isOpen) return null;

    return (
        <div className={styles.lyricsContainer} >
            <div className={styles.lyricsOfSong}>
                {lyrics.length === 0 ? <h2>Không có lời cho bài hát này!</h2> : (
                    lyrics.map((line, index) => <h4 key={index}>{line}</h4>)
                )}
            </div>
        </div>
    );
};

export default LyricsScreen;