import React from 'react';
import styles from '../HomeScreen.module.css';

const ItemSongsRCM = ({ songId, avatarUrl, name, artist, onCurrentSongId }) => {


    // const handleArtistSelect = (artistId) => {
    //     window.scrollTo(0, 0);
    //     onSelectedArtist(artistId);
    // };

    return (
        <div onClick={onCurrentSongId}>
            <img className={styles.songPic} src={avatarUrl} alt='songPic'></img>
            <div className={styles.songInfoWrapper}>
                <p className='uiSemibold'>{name}</p>
                <p className='uiRegular o75'>{artist}</p>
            </div>
        </div>
    )
};

export default ItemSongsRCM;