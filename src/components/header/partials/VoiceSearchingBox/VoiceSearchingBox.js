import React, { useState } from 'react';
import styles from './VoiceSearchingBox.module.css';
import { InlineIcon } from '@iconify/react/dist/iconify.js';
import clsx from 'clsx';

const VoiceSearchingBox = ({ isOpen, onClose, onSearchInput, onSearchingSpaceClick }) => {
    const [isActive, setIsActive] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [language, setLanguage] = useState('vi-VN');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    if (!isOpen) return null;

    const handleCloseBox = (e) => {
        if (e.target === e.currentTarget) {
            setTranscript('');
            onClose();
        }
    };

    const handleVoiceSearchingButtonClick = () => {
        if (!recognition) {
            alert('Trình duyệt của bạn không hỗ trợ giọng nói.');
            return;
        }

        if (isListening) {
            recognition.stop();
            setIsListening(false);
            setIsActive(false);
        } else {
            recognition.lang = language;
            recognition.start();
            setIsListening(true);
            setIsActive(true);
        }

        recognition.onstart = () => {
            console.log('Hãy nói gì đó')
        };

        recognition.onresult = (e) => {
            const speechToText = e.results[0][0].transcript;
            setTranscript(speechToText);
            console.log('Văn bản: ', speechToText);
            onSearchInput(speechToText);
        };

        recognition.onend = () => {
            setIsListening(false);
            setIsActive(false);
            console.log('Kết thúc nhận giọng nói')

            setTimeout(() => {
                onClose();
                onSearchingSpaceClick();
            }, 3000); // Gọi onClose sau 3 giây
        };

        recognition.onerror = (e) => {
            console.error('Error: ', e);
            setIsListening(false);
            setIsActive(false);
        };
    }

    const handleBlur = () => {
        setIsActive(false);
    }

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    }

    return (
        <div className={styles.backgroundSpace} onClick={handleCloseBox}>
            <div className={styles.mainBox} >
                <header>
                    <button
                        className={styles.buttonClose}
                        onClick={onClose}>
                        <InlineIcon icon="ic:round-close" className={styles.iconClose}></InlineIcon>
                    </button>
                </header>


                <div className={styles.searchingContainer}>
                    <header>
                        <h4>Tìm kiếm bằng giọng nói</h4>
                        <select
                            className={clsx("uiSemibold", styles.languageSelector)}
                            value={language}
                            onChange={handleLanguageChange}>
                            <option value="vi-VN">Tiếng Việt</option>
                            <option value="en-US">English</option>
                        </select>
                    </header>
                    <button className={`${styles.buttonVoiceSearching} ${isActive ? styles.active : ''}
                    `}
                        onClick={handleVoiceSearchingButtonClick}>
                        <InlineIcon
                            icon="lets-icons:mic-fill"
                            className={`${styles.iconVoiceSearching} ${isActive ? styles.iconActive : ''}`
                            }
                            style={{
                                color: isActive ? 'black' : 'white'
                            }}></InlineIcon>
                    </button>
                    <p className="p3" style={{ marginBottom: 20 }}>{transcript}</p>
                </div>
            </div>
        </div>
    );
};

export default VoiceSearchingBox;