import React from 'react';
import styles from './Playlist.module.css';
import clsx from 'clsx';


const SingerItem = ({ avatarUrl, name, onSelectedArtist, countPlaylist }) => {
    const shortenedName =
        name.length > 20
            ? `${name.substring(0, 17)}...`
            : name;


    return (
        <div className={styles.itemContainer} onClick={onSelectedArtist}>
            <img src={avatarUrl} alt='picSong' className={styles.singerPic}></img>
            <div className={styles.infoSong}>
                <p className='uiSemibold'>
                    {shortenedName} </p>
                {/* <p className={clsx('uiRegular', 'o50')}>Playlist</p> */}
                <p className={clsx('uiRegular', 'o50')}> Nghệ sĩ</p>

            </div>
        </div>
    );
};

export default SingerItem;