import React, { useCallback, useEffect, useRef } from 'react';
import styles from "./WorldScreen.module.css";

import ChatItem from './ChatItem';

function column(id, userName, songName, time, content) {
    return { id, userName, songName, time, content }
}

// const chatContents = [
//     column(1, 'Alice', 'Shape of You', '14:00', 'This song has such a great beat and the lyrics are so meaningful. I can listen to it all day! The way Ed Sheeran conveys emotions through the music is simply outstanding. Every time I hear this song, it takes me on an emotional journey. The combination of the melody and the heartfelt lyrics creates a powerful experience that resonates deeply with me.'),
//     column(2, 'Bob', 'Blinding Lights', '14:05', 'I love the way The Weeknd blends different genres in this track. It\'s so unique and refreshing. The fusion of classical and modern elements is done so seamlessly. The intricate layers of sound create a rich and immersive listening experience. It\'s like discovering something new with each listen, and it never gets old.'),
//     column(3, 'Charlie', 'Someone Like You', '14:10', 'The melody of this song is so soothing. It helps me relax after a long day. The instrumental arrangement is just perfect and complements Adele\'s vocals beautifully. The gentle harmonies and the smooth transitions between different sections of the song make it a perfect piece to unwind to. It\'s like a musical therapy session.'),
//     column(4, 'David', 'Rolling in the Deep', '14:15', 'The vocals in this song are absolutely stunning. Adele has such a powerful voice. The high notes are hit perfectly and the emotion in the voice is palpable. The raw passion and intensity in the performance make it a truly unforgettable experience. It\'s a song that gives me chills every time I listen to it.'),
//     column(5, 'Eva', 'Bohemian Rhapsody', '14:20', 'This song brings back so many memories. It\'s a classic that never gets old. The nostalgia it evokes is incredible and it always puts a smile on my face. The timeless quality of Queen\'s song makes it a favorite across generations. It\'s a reminder of simpler times and the joy of music that transcends eras.'),
//     column(6, 'Frank', 'Hotel California', '14:25', 'The production quality of this track is top-notch. Every instrument is perfectly balanced. The mixing and mastering are done so well that it sounds like a live performance. The attention to detail in the production process is evident, and it elevates the song to a whole new level. It\'s a sonic masterpiece by Eagles.'),
//     column(7, 'Grace', 'Stairway to Heaven', '14:30', 'I can\'t get enough of this song. It\'s been on repeat since I first heard it. The chorus is so catchy and the verses are equally impressive. The infectious energy and the memorable hooks make it an instant favorite. It\'s the kind of song that you can\'t help but sing along to, no matter how many times you hear it.'),
//     column(8, 'Hannah', 'Imagine', '14:35', 'The lyrics of this song are so deep and thought-provoking. It really makes you think. The storytelling in John Lennon\'s song is exceptional and it paints a vivid picture. The poetic nature of the lyrics and the way they are delivered with such conviction make it a powerful piece of art. It\'s a song that stays with you long after it\'s over.'),
//     column(9, 'Ian', 'Smells Like Teen Spirit', '14:40', 'This song is a masterpiece. The composition, the lyrics, the vocals - everything is perfect. It\'s a timeless piece by Nirvana that will be remembered for years to come. The seamless blend of different musical elements and the flawless execution make it a standout track. It\'s a song that defines an era and leaves a lasting impact.'),
//     column(10, 'Jane', 'Hey Jude', '14:45', 'I love the energy of this song. It always gets me pumped up and ready to go. The upbeat tempo and the lively instrumentation are just what I need to start my day. The driving rhythm and the infectious enthusiasm in The Beatles\' performance make it an instant mood booster. It\'s a song that fills you with positivity and motivation.')
// ];

const WorldScreen = ({ isOpen, uid }) => {
    const token = localStorage.getItem('token');
    const containerRef = useRef(null);
    const [chatContents, setChatContents] = React.useState([]);
    const [songData, setSongData] = React.useState([]);

    useEffect(() => {
        if (isOpen && containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [isOpen]);

    useEffect(() => {
        fetchRating();
    }, [isOpen]);

    const fetchRating = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/rate-and-comment/community`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setChatContents(data.rateAndComments); // Lưu danh sách đánh giá vào state
        } catch (error) {
            console.error('Error fetching ratings:', error.message);
        }
    }, [token]);

    useEffect(() => {
        const fetchAllSongData = async () => {
            if (!chatContents || !Array.isArray(chatContents)) return;

            try {
                const songRequests = chatContents.map(async (item) => {
                    if (!item.songId) return null;

                    const response = await fetch(`http://localhost:4000/api/song/${item.songId}/${uid}`);
                    if (!response.ok) {
                        console.warn(`Failed to fetch songId ${item.songId}: ${response.status}`);
                        return null;
                    }

                    const data = await response.json();
                    return { songId: item.songId, ...data };
                });

                const results = await Promise.all(songRequests);
                const validResults = results.filter(Boolean); // Bỏ các kết quả null (fetch lỗi)

                setSongData(validResults); // Lưu toàn bộ dữ liệu bài hát vào state
                console.log(validResults);
            } catch (err) {
                console.error('Error fetching song data:', err.message);
            }
        };

        fetchAllSongData();
    }, [isOpen, chatContents, uid]);

    if (!isOpen) return null;

    return (
        <div className={styles.worldContainer}>
            <h3>Kênh thế giới</h3>
            <div className={styles.commentContainer} ref={containerRef}>
                {chatContents.map((chatContent, i) => {
                    const matchedSong = songData.find(song => song.songId === chatContent.songId);
                    const songName = matchedSong ? matchedSong.name : 'Unknown Song';

                    return (
                        <ChatItem
                            key={i}
                            id={chatContent.id}
                            userName={chatContent.creator.name}
                            songName={songName}
                            time={chatContent.releaseDay}
                            content={chatContent.comment} />
                    );
                })}
            </div>
        </div>
    );
};

export default WorldScreen;