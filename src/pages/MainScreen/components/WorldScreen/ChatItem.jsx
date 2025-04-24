import React from 'react';
import styles from './WorldScreen.module.css';

const ChatItem = ({ userName, songName, time, content }) => {
    return (
        <div className={styles.itemContainer}>
            <p className="uiMedium">{userName}</p>
            <div className={styles.infoContainer}>
                <p className="uiRegular o50">{time}</p>
                <p className="uiMedium o75">{songName}</p>
            </div>
            <p className="uiRegular">{content}</p>
        </div>
    );
};

export default ChatItem;