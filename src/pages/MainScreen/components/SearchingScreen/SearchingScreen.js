import React, { useEffect, useState } from 'react';
import styles from './SearchingScreen.module.css';
import ItemOfHistory from './ItemOfHistory';
import clsx from 'clsx';

const SearchingScreen = ({ isOpen, namePlaylist, searchQuery, onSearch }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            return;
        }

        const fetchSearchResults = async () => {
            setIsLoading(true);
            try {
                const response = await onSearch(searchQuery);
                if (response.status === 200) {
                    const data = await response.json();
                    setSearchResults(data);
                } else {
                    setSearchResults([]);
                }

            } catch (error) {
                console.error('Error searching songs:', error);
            } finally {
                setIsLoading(false);
            }
        }

        const delayDebounceFn = setTimeout(() => {
            fetchSearchResults();
        }, 500); // Đợi 500ms sau khi gõ xong để giảm số lần gọi API

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, onSearch])


    if (!isOpen) return null;

    return (
        <div className={styles.searchingWrapper}>
            <div className={styles.topicContainer}>
                <h3>Tìm kiếm gần đây</h3>
                <button>
                    <p className='uiSemibold o75'>Xóa lịch sử tìm kiếm</p>
                </button>
            </div>

            {searchQuery.length === 0 ?
                <ItemOfHistory /> : (
                    <div className={styles.resultSearchContainer}>
                        {isLoading && <p>Đang tìm kiếm...</p>}
                        {!isLoading && searchResults.length === 0 && searchQuery.trim() !== '' && (
                            <p className={clsx('uiRegular', 'o50')}>Không tìm thấy kết quả phù hợp.</p>
                        )}
                        {!isLoading && searchResults.map((song, index) => (
                            <div key={index} className={styles.itemResult}>
                                <div className={styles.itemContainer}>
                                    <img src={song.cover || ''} alt="picSong" />
                                    <div className={styles.infoSong}>
                                        <p className="uiSemibold" style={{ fontSize: 16 }}>
                                            {song.title.length > 20 ? `${song.title.substring(0, 20)}...` : song.title}
                                        </p>
                                        <p className={clsx('uiRegular', 'o50')} style={{ fontSize: 12 }}>
                                            {song.artist}
                                        </p>
                                    </div>
                                </div>
                                <p className={clsx('uiRegular', 'o50')}>{song.dateAdded}</p>
                            </div>
                        ))}
                    </div>
                )}

        </div>
    );
};

export default SearchingScreen;