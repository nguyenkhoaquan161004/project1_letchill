import React, { useState } from 'react';
import styles from './VoiceSearchingBox.module.css';
import { InlineIcon } from '@iconify/react/dist/iconify.js';
import clsx from 'clsx';

const VoiceSearchingBox = ({ isOpen, onClose }) => {
    const [isActive, setIsActive] = useState(false);

    if (!isOpen) return null;

    const handleCloseBox = (e) => {
        if (e.target === e.currentTarget.value)
            return;
        onClose();
    }

    const handleVoiceSearchingButtonClick = () => {
        setIsActive(true);
    }

    const handleBlur = () => {
        setIsActive(false);
    }

    return (
        <div className={styles.backgroundSpace} onClick={handleCloseBox}>
            <div className={styles.mainBox}>
                <header>
                    <button
                        className={styles.buttonClose}
                        onClick={onClose}>
                        <InlineIcon icon="ic:round-close" className={styles.iconClose}></InlineIcon>
                    </button>
                </header>


                <div className={styles.searchingContainer}>
                    <h4>Tìm kiếm bằng giọng nói</h4>
                    <button className={`${styles.buttonVoiceSearching} ${isActive ? styles.active : ''}
                    `}
                        onClick={handleVoiceSearchingButtonClick}
                        onBlur={handleBlur}>
                        <InlineIcon
                            icon="lets-icons:mic-fill"
                            className={`${styles.iconVoiceSearching} ${isActive ? styles.iconActive : ''}`
                            }
                            style={{
                                color: isActive ? 'black' : 'white'
                            }}></InlineIcon>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VoiceSearchingBox;