import React from 'react';
import styles from './Author.module.css';
import clsx from 'clsx';


const Author = ({ items, onSelectedArtist }) => {
    const handleArtistSelect = (artistId) => {
        window.scrollTo(0, 0);
        onSelectedArtist(artistId);
    };

    return (
        <div className={styles.authorWrapper}>
            <div className={styles.authorContainer}>
                {items.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={styles.authorItem}
                            onClick={() => {
                                onSelectedArtist({
                                    artistId: item.id,
                                    artistPic: item.image,
                                    nameArtist: item.name,
                                    description: item.description,
                                    followers: item.followers,
                                });
                                handleArtistSelect(item.id);
                            }} >
                            <img className={styles.authorPic} src={item.image} alt='authorPic'></img>
                            <div className={styles.authorInfoWrapper}>
                                <p className='uiSemibold'>{item.name}</p>
                                <p className='uiRegular o75'>Nghệ sĩ</p>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>

    );
};

export default Author;