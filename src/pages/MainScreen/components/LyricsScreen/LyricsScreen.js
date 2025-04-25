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
                {lyrics.length === 0 ? <h3 style={{ lineHeight: 1.5 }}>Không có lời cho bài hát này!</h3> :
                    (
                        lyrics.map((line, index) => {
                            return (
                                <div className={styles.lyricsSpace}>
                                    <h4>LỜI BÀI HÁT</h4>
                                    <p className={styles.lyrics} key={index}>{line}</p>
                                </div>

                            )
                        })
                    )}
            </div>
        </div>
    );
};

export default LyricsScreen;