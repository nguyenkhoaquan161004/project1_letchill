import React from 'react';
import styles from './SearchingScreen.module.css';
import ItemOfHistory from './ItemOfHistory';

const SearchingScreen = ({ isOpen }) => {

    if (!isOpen) return null;
    return (
        <div className={styles.searchingWrapper}>
            <div className={styles.topicContainer}>
                <h3>Tìm kiếm gần đây</h3>
                <button>
                    <p className='uiSemibold o75'>Xóa lịch sử tìm kiếm</p>
                </button>
            </div>

            <ItemOfHistory />
        </div>
    );
};

export default SearchingScreen;