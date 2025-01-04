import React from 'react';
import styles from './ListeningSpace.module.css';
import clsx from 'clsx';

const Playlist = ({ playlistPic, namePlaylist, onSelectedPlaylist }) => {
    return (
        <div className={styles.itemContainer} onClick={onSelectedPlaylist}>
            <img src={playlistPic} alt='picSong'></img>
            <div className={styles.infoSong}>
                <p className='uiSemibold' style={{ fontSize: 12 }}>
                    </p>
                <p className={clsx('uiRegular', 'o50')} style={{ fontSize: 10 }}>Playlist</p>
            </div>
        </div>
    );
};
export default Playlist;