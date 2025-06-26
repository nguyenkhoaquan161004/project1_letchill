import React, { useEffect, useState } from 'react';
import styles from './SongManagerScreen.module.css';

const songs = [
    {
        id: 1,
        name: 'The Macarons Project',
        genre: 'Acoustic',
        artist: 'Ariana Grande',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=96&h=96'
    },
    {
        id: 2,
        name: 'The Macarons Project',
        genre: 'Acoustic',
        artist: 'Ariana Grande',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=96&h=96'
    },
    {
        id: 3,
        name: 'The Macarons Project',
        genre: 'Acoustic',
        artist: 'Ariana Grande',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=96&h=96'
    },
    {
        id: 4,
        name: 'The Macarons Project',
        genre: 'Acoustic',
        artist: 'Ariana Grande',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=96&h=96'
    },
    {
        id: 5,
        name: 'The Macarons Project',
        genre: 'Acoustic',
        artist: 'Ariana Grande',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=96&h=96'
    },
    {
        id: 6,
        name: 'The Macarons Project',
        genre: 'Acoustic',
        artist: 'Ariana Grande',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=96&h=96'
    },
    {
        id: 7,
        name: 'The Macarons Project',
        genre: 'Acoustic',
        artist: 'Ariana Grande',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=96&h=96'
    },
    {
        id: 8,
        name: 'The Macarons Project',
        genre: 'Acoustic',
        artist: 'Ariana Grande',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=96&h=96'
    }
];

const SongManagerScreen = () => {
    const [allSongs, setAllSongs] = useState([]);

    const fetchAllSong = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/song/allsong`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            setAllSongs(data);
            console.log(allSongs);
        } catch (error) {
            console.error('Lỗi khi tải danh sách bài hát');
        }

    }

    useEffect(() => {
        fetchAllSong()
    }, [])

    return (
        <div className={styles.container}>
            <h3>DANH SÁCH BÀI HÁT</h3>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className='uiMedium'>#</th>
                        <th className='uiMedium'>Tên bài hát</th>
                        <th className='uiMedium'>Thể loại</th>
                    </tr>
                </thead>
                <tbody>
                    {allSongs.map((song, idx) => (
                        <tr key={song.id}>
                            <td>{idx + 1}</td>
                            <td>
                                <div className={styles.songInfoContainer}>
                                    <img src={song.avatarUrl} alt={song.name} className={styles.songImg} />
                                    <div className={styles.songInfo}>
                                        <h4>{song.name}</h4>
                                        <p className='p3 o50'>{song.artist}</p>
                                    </div>
                                </div>
                            </td>
                            <td className='uiMedium o75'>{song.genre}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SongManagerScreen;