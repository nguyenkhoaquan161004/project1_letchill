import React, { useEffect, useState } from 'react';
import Seenderella from '../../assets/Slider/Seenderella.jpg';
import DLTTAD from '../../assets/Slider/DLTTAD.jpg';
import NgaoNgo from '../../assets/Slider/NgaoNgo.jpg';
import MongYu from '../../assets/Slider/MongYu.jpg';
import NewWoman from '../../assets/Slider/NewWoman.jpg';
import styles from './SearchingScreen.module.css';

const ItemOfHistory = ({ historyItem, uid, onCurrentSongId }) => {

    const [historySongs, setHistorySongs] = useState([]);

    const songs = [
        {
            image: Seenderella,
            title: 'Seenderella',
            artist: 'Chi Xê'
        },
        {
            image: DLTTAD,
            title: 'Đừng làm trái tim anh đau',
            artist: 'Sơn Tùng MTP'
        },
        {
            image: NewWoman,
            title: 'New Woman',
            artist: 'Lisa ft. Rosalia'
        },
        {
            image: MongYu,
            title: 'Mộng yu',
            artist: 'AMEE'
        },
        {
            image: NgaoNgo,
            title: 'Ngáo ngơ',
            artist: 'Erik, Jsol, Orange, HIEUTHUHAI, Anh Tú Atus'
        },
        {
            image: Seenderella,
            title: 'Song 1',
            artist: 'Artist 1'
        },
    ]

    const fetchHistorySong = async () => {
        try {
            const historyItemInfo = await Promise.all(
                historyItem.map(async (item) => {
                    try {
                        const songRes = await fetch(`http://localhost:4000/api/song/${item}/${uid}`);
                        if (!songRes.ok) throw new Error();
                        const songData = await songRes.json();
                        return {
                            ...item,
                            songId: songData.id || 'Không rõ',
                            songName: songData.name || 'Không rõ',
                            artist: songData.artist || 'Không rõ',
                            avatarUrl: songData.avatarUrl || 'Không rõ',
                        };
                    } catch {
                        return {
                            ...item,
                            songId: 'Không rõ',
                            songName: 'Không rõ',
                            artist: 'Không rõ',
                            avatarUrl: 'Không rõ',
                        };
                    }
                })
            );
            setHistorySongs(historyItemInfo);
        } catch (error) {
            console.error('Error calling search API:', error);
        }
    }

    useEffect(() => {
        fetchHistorySong();
    }, [historyItem]);

    return (
        <div className={styles.listOfHistory}>
            {historySongs.map((song, i) => {
                return (
                    <div
                        key={i}
                        className={styles.itemContainer}
                        onClick={() => onCurrentSongId(song.songId)}
                    >
                        <img src={song.avatarUrl} alt={song.songName} />
                        <div className={styles.infoContainer}>
                            <h4>{song.songName}</h4>
                            <p className='uiRegular'>{song.artist}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default ItemOfHistory;