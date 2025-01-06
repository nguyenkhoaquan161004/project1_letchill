import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import logo from '../../assets/logo_doan1.svg';
import VoiceSearchingBox from './partials/VoiceSearchingBox/VoiceSearchingBox';

const Header = memo(({ onLogoAndHomeButtonClick, onSearchingSpaceClick, onAccountButtonClick, onSearchInput }) => {

    const navigate = useNavigate();
    const [isVoiceSearchingBoxOpen, setIsVoiceSearchingBoxOpen] = useState(false);

    const handleOnClickVoiceSearching = () => {
        setIsVoiceSearchingBoxOpen(true);
    }

    const handleCloseVoiceSearching = () => {
        setIsVoiceSearchingBoxOpen(false);
    }

    return (
        <div id={styles.header} style={{
            zIndex: isVoiceSearchingBoxOpen ? 3 : 2
        }}>
            <div className={styles.headerContainer}>
                <div className="logo hoverPoiter" onClick={onLogoAndHomeButtonClick}>
                    <img src={logo} alt="logo" />
                </div>

                <div className={styles.searchingOption}>
                    <Icon onClick={onLogoAndHomeButtonClick} className={clsx(styles.icon, 'hoverPoiter')} icon="ic:round-home"></Icon>
                    <div className={styles.searchingInput}>
                        <Icon className={clsx(styles.nonBGIcon)} icon="mingcute:search-line"></Icon>
                        <input
                            type="text"
                            placeholder='Tìm kiếm nội dung của bạn'
                            onChange={(e) => {
                                onSearchInput(e.target.value)
                            }}
                            onClick={onSearchingSpaceClick}></input>
                    </div>
                    <button>
                        <Icon
                            className={styles.icon}
                            icon="lets-icons:mic-fill"
                            onClick={handleOnClickVoiceSearching}></Icon>
                    </button>
                </div>

                <div className={styles.otherOption}>
                    <Icon className={styles.nonBGIcon} icon="ri:notification-4-line"></Icon>
                    <Icon onClick={onAccountButtonClick} className={clsx(styles.icon, 'hoverPoiter')} icon="iconamoon:profile-fill"></Icon>
                    <div>
                        <button className='uiSemibold o50 btnLogin hoverPoiter'
                            onClick={() => navigate("/")}>ĐĂNG XUẤT
                        </button>
                    </div>
                </div>
            </div>
            <VoiceSearchingBox
                onSearchInput={onSearchInput}
                isOpen={isVoiceSearchingBoxOpen}
                onSearchingSpaceClick={onSearchingSpaceClick}
                onClose={handleCloseVoiceSearching} />
        </div>
    );
});

export default Header;
