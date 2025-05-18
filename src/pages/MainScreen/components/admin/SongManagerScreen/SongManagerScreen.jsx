import React from 'react';
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
    return (
        <div className={styles.container}>
            <h3>DANH SÁCH BÀI HÁT CẦN DUYỆT</h3>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>
                            <input type='checkbox' className={styles.checkbox} style={{ visibility: 'hidden' }} />
                        </th>
                        <th className='uiMedium'>#</th>
                        <th className='uiMedium'>Tên bài hát</th>
                        <th className='uiMedium'>Thể loại</th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map((song, idx) => (
                        <tr key={song.id}>
                            <td>
                                <input type='checkbox' className={styles.checkbox} />
                            </td>
                            <td>{idx + 1}</td>
                            <td>
                                <div className={styles.songInfoContainer}>
                                    <img src={song.image} alt={song.name} className={styles.songImg} />
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