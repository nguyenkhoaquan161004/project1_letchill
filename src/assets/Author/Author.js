import React from 'react';
import styles from '../../pages/MainScreen/components/HomeScreen/HomeScreen.module.css';
import clsx from 'clsx';


const Author = ({ artistPic, nameArtist, onSelectedArtist }) => {
    return (
        <div onClick={onSelectedArtist}
            className={styles.authorItem}>
            <img className={styles.authorPic} src={artistPic} alt='authorPic'></img>
            <div className={styles.authorInfoWrapper}>
                <p className='uiSemibold'>{nameArtist}</p>
                <p className='uiRegular o75'>Nghệ sĩ</p>
            </div>
        </div>
    )
};

export default Author;