import React from 'react';
import styles from './Playlist.module.css';
import clsx from 'clsx';

const Playlist = ({ playlistPic, namePlaylist, onSelectedPlaylist }) => {
    return (
        <div className={styles.itemContainer} onClick={onSelectedPlaylist}>
            <img src={playlistPic} alt='picSong'></img>
            <div className={styles.infoSong}>
                <p className='uiSemibold'>
                    {namePlaylist.length > 20 ? `${namePlaylist.substring(0, 20)}...` : namePlaylist}</p>
                <p className={clsx('uiRegular', 'o50')}>Playlist</p>
            </div>
        </div>
    );
};

export default Playlist;