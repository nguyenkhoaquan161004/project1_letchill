import React, { useEffect, useState } from 'react';
import styles from './SearchingScreen.module.css';
import ItemOfHistory from './ItemOfHistory';
import clsx from 'clsx';

const SearchingScreen = ({ isOpen, searchQuery, onCurrentSongId, uid }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [historyItem, setHistoryItem] = useState([]);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            return;
        }


        const fetchSearchResults = async () => {
            setIsLoading(true);
            try {
                // Gửi yêu cầu GET đến API với query được truyền trong URL
                const response = await fetch(`http://localhost:4000/api/search?query=${searchQuery}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                // Kiểm tra phản hồi từ API
                if (response.ok) {
                    const data = await response.json(); // Parse kết quả JSON
                    console.log('Search results:', data); // In kết quả tìm kiếm ra console
                    if (Array.isArray(data)) {
                        setSearchResults(data); // Chỉ đặt nếu là mảng
                    } else {
                        console.error('API did not return an array:', data);
                        setSearchResults([]); // Xử lý fallback
                    }
                } else if (response.status === 404) {
                    console.warn('No songs found for the query.');
                    setSearchResults([]); // Trả về mảng rỗng nếu không tìm thấy bài hát
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error calling search API:', error); // Log lỗi ra console
                return null; // Trả về null nếu có lỗi xảy ra
            } finally {
                setIsLoading(false);
            }
        }

        const delayDebounceFn = setTimeout(() => {
            fetchSearchResults();
        }, 500); // Đợi 500ms sau khi gõ xong để giảm số lần gọi API

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery])

    const handleSongItemClick = (songId) => {
        console.log(songId);
        onCurrentSongId(songId); // Xóa ID của bài hát hiện tại
        setHistoryItem((prev) => [...prev, songId]);
    }

    if (!isOpen) return null;

    return (
        <div className={styles.searchingWrapper}>
            <div className={styles.topicContainer}>
                <h3> {searchQuery.length === 0 ? "Tìm kiếm gần đây" : "Kết quả tìm kiếm"}</h3>
                {searchQuery.length === 0 && (
                    <button onClick={() => setHistoryItem([])}>
                        <p className='uiSemibold o75'>Xóa lịch sử tìm kiếm</p>
                    </button>
                )}
            </div>

            {searchQuery.length === 0 ?
                <ItemOfHistory
                    setHistoryItem={setHistoryItem}
                    historyItem={historyItem}
                    uid={uid}
                    onCurrentSongId={onCurrentSongId}
                /> : (
                    <div className={styles.resultSearchContainer}>
                        {isLoading && <p>Đang tìm kiếm...</p>}
                        {!isLoading && Array.isArray(searchResults) && searchResults.length === 0 ? <p>Không tìm thấy kết quả cho tự khóa "{searchQuery}"</p>
                            : searchResults.map((song, index) => (
                                <div key={song.id}
                                    className={styles.itemResult}
                                    onClick={() => handleSongItemClick(song.id)}>
                                    <div className={styles.itemContainer}>
                                        <img src={song.avatarUrl} alt="picSong" />
                                        <div className={styles.infoSong}>
                                            <p className="uiSemibold" style={{ fontSize: 18, letterSpacing: 2 }}>
                                                {song.name.length > 20 ? `${song.name.substring(0, 20)}...` : song.name}
                                            </p>
                                            <p className={clsx('uiRegular', 'o50')} style={{ fontSize: 12 }}>
                                                {song.artist}
                                            </p>
                                        </div>
                                    </div>
                                    <p className={clsx('uiRegular', 'o50')} style={{ fontSize: 14 }}>{song.releaseDate}</p>
                                </div>
                            ))}
                    </div>
                )}

        </div>
    );
};

export default SearchingScreen;