import React from 'react';
import styles from './PlaylistScreen.module.css';
import { Icon } from '@iconify/react';

const PlaylistItem = ({ index, cover, title, artist, dateAdded }) => {
    return (
        <div className={styles.itemPlaylist}>
            <div className={styles.leftItemPlaylist}>
                <p className='uiSemibold' style={{ width: 50 }}>{index}</p>
                <div className={styles.infoItemPlaylist}>
                    <img src={cover} alt='cover' />
                    <div className={styles.textInfoPlaylist}>
                        <h4>{title}</h4>
                        <p className='p3 o75'>{artist}</p>
                    </div>
                </div>
            </div>

            <div className={styles.rightItemPlaylist}>
                <p>{dateAdded}</p>
                <button className={styles.btnDelete}>
                    <Icon className={styles.icon} icon="ri:more-fill" />
                </button>
            </div>
        </div>
    );
};

export default PlaylistItem;