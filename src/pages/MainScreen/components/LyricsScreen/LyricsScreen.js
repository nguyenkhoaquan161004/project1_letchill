import React, { useEffect, useState } from 'react';
import styles from './LyricsScreen.module.css';

const LyricsScreen = ({ isOpen, currentSongId, uid }) => {
    const [lyrics, setLyrics] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!currentSongId) return; // Bỏ qua nếu currentSongId không tồn tại

            try {
                const response = await fetch(`http://localhost:4000/api/song/${currentSongId}/${uid}`);
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

    const lyricsLines = typeof lyrics === 'string'
        ? lyrics.split('.').map(line => line.trim()).filter(line => line !== '')
        : Array.isArray(lyrics)
            ? lyrics
            : [];

    if (!isOpen) return null;

    return (
        <div className={styles.lyricsContainer} >
            <div className={styles.lyricsOfSong}>
                {lyrics.length === 0 ? <h3 style={{ lineHeight: 1.5 }}>Không có lời cho bài hát này!</h3> :
                    (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <h4>LỜI BÀI HÁT</h4>
                            {lyricsLines.map((line, index) => {
                                return (
                                    <div className={styles.lyricsSpace}>
                                        <p className={styles.lyrics} key={index}>{line}</p>
                                    </div>

                                )
                            })}
                        </div>

                    )}
            </div>
        </div>
    );
};

export default LyricsScreen;