import React from 'react';
import Seenderella from '../../assets/Slider/Seenderella.jpg';
import DLTTAD from '../../assets/Slider/DLTTAD.jpg';
import NgaoNgo from '../../assets/Slider/NgaoNgo.jpg';
import MongYu from '../../assets/Slider/MongYu.jpg';
import NewWoman from '../../assets/Slider/NewWoman.jpg';
import styles from './SearchingScreen.module.css';

const ItemOfHistory = () => {
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

    return (
        <div className={styles.listOfHistory}>
            {songs.map((song, i) => {
                return (
                    <div key={i} className={styles.itemContainer}>
                        <img src={song.image} alt={song.title} />
                        <div className={styles.infoContainer}>
                            <h4>{song.title}</h4>
                            <p className='uiRegular'>{song.artist}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default ItemOfHistory;