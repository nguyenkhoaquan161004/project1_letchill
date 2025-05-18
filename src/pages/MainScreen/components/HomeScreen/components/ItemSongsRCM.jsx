import React from 'react';
import styles from '../HomeScreen.module.css';

const ItemSongsRCM = ({ items }) => {
    // const handleArtistSelect = (artistId) => {
    //     window.scrollTo(0, 0);
    //     onSelectedArtist(artistId);
    // };

    return (
        <div className={styles.songWrapper}>
            <div className={styles.songContainer}>
                {items.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={styles.songItem}
                            onClick={() => {

                            }} >
                            <img className={styles.songPic} src={item.avatarUrl} alt='songPic'></img>
                            <div className={styles.songInfoWrapper}>
                                <p className='uiSemibold'>{item.name}</p>
                                <p className='uiRegular o75'>{item.artist}</p>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    );
};

export default ItemSongsRCM;