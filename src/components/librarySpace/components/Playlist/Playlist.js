import React from 'react';
import styles from './Playlist.module.css';
import clsx from 'clsx';


const Playlist = ({ playlistPic, namePlaylist, onSelectedPlaylist, countPlaylist }) => {
    const shortenedName =
        namePlaylist.length > 20
            ? `${namePlaylist.substring(0, 17)}...`
            : namePlaylist;


    return (
        <div className={styles.itemContainer} onClick={onSelectedPlaylist}>
            <img src={playlistPic} alt='picSong'></img>
            <div className={styles.infoSong}>
                <p className='uiSemibold'>
                    {shortenedName} </p>
                {/* <p className={clsx('uiRegular', 'o50')}>Playlist</p> */}
                <p className={clsx('uiRegular', 'o50')}>{countPlaylist} bài hát</p>

            </div>
        </div>
    );
};

export default Playlist;