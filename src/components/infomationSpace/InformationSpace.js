import React, { useEffect, useState } from 'react';
import styles from '../infomationSpace/InformationSpace.module.css'
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import Comment from './components/Comment/Comment';
import CommentBox from './components/CommentBox/CommentBox.js';

const InformationSpace = ({ isOpen, onClose, songId, uid, onSelectedArtist }) => {
    const token = localStorage.getItem('token');
    const [songData, setSongData] = useState([]);

    const [ratings, setRatings] = useState([]);
    const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
    const [isAddRating, setIsAddRating] = useState(false);

    const handleOnClickShowAllCommentButton = () => {
        setIsCommentBoxOpen(true);
    }

    const handleCloseCommentBox = () => {
        setIsCommentBoxOpen(false);
    }

    const shortenedName =
        songData?.artist?.length > 7
            ? `${songData.artist.substring(0, 7)}...`
            : songData?.artist || 'Unknown Artist'; // Giá trị mặc định nếu artist không tồn tại


    useEffect(() => {
        const fetchData = async () => {
            if (!songId) return; // Bỏ qua nếu songId không tồn tại

            try {

                const response = await fetch(`http://localhost:4000/api/song/${songId}/${uid}`);

                if (!response.ok) {
                    // throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json(); // Chuyển đổi phản hồi thành JSON
                setSongData(data); // Lưu dữ liệu vào state

            } catch (err) {
                console.error('Error fetching song information:', err.message);
            }
        };

        fetchData();
    }, [songId, uid]); // Chỉ gọi lại khi songId hoặc uid thay đổi

    const fetchRating = async () => {
        if (!songId) return; // Bỏ qua nếu songId không tồn tại

        try {
            const response = await fetch(`http://localhost:4000/api/rate-and-comment?songId=${songId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setRatings(data.rateAndComments.list); // Lưu danh sách đánh giá vào state
        } catch (error) {
            console.error('Error fetching ratings:', error.message);
        }
    };
    useEffect(() => {
        console.log(token);
        fetchRating();
    }, [songId, token]);

    return (
        <div
            id={styles.rightBar}
            className={clsx('w24')}
            style={{
                flex: isOpen ? '0 0 24vw' : '0 0 0',
                transition: 'flex 0.3s ease',
                border: isOpen ? '' : 'none',
                marginLeft: isOpen ? '' : '0'
            }} >
            <div className={styles.infoContainer}>
                <header>
                    <Icon className={styles.icon} icon="ic:round-add"></Icon>
                    <Icon
                        className={styles.icon} icon="ic:round-close"
                        onClick={onClose}></Icon>
                </header>

                <main>
                    <div className={styles.infoSong}>
                        <img
                            src={songData.avatarUrl}
                            alt="songPic"
                            className={styles.songPic}></img>

                        <div className={styles.nameAndSinger}>
                            <h4>{songData.name}</h4>
                            <p className={clsx('p3', 'o75')}>{songData.artist}</p>
                        </div>

                        <div className={styles.authorName}>
                            <p className='uiRegular'>Thể loại</p>
                            <h5>{songData.genre}</h5>
                        </div>

                        <div className={styles.authorName}>
                            <p className='uiRegular'>Nhạc sĩ</p>
                            <h5>{songData.composer}</h5>
                        </div>

                        <div className={styles.rating} onClick={handleOnClickShowAllCommentButton}>
                            <header>
                                <p className={clsx('uiSemibold')}>Đánh giá</p>
                                <button onClick={handleOnClickShowAllCommentButton}>
                                    <p className={clsx('uiSemibold', styles.active)} >Tất cả</p>
                                </button>
                            </header>

                            <div viewOnly={true}>
                                {Array.isArray(ratings) && ratings.length > 0 ? (
                                    <Comment
                                        key={0}
                                        name={ratings[0].creator.name}
                                        numberOfStar={ratings[0].rate}
                                        comment={ratings[0].comment}
                                    />
                                ) : (
                                    <p className={styles.noComment}>Chưa có bình luận nào</p>
                                )}
                            </div>
                        </div>

                        <div className={styles.authorInfo}>
                            <div
                                className={styles.authorPic}
                                style={{
                                    backgroundImage: `url(${songData.avatarUrl})`,
                                }}>
                                <p className={clsx('uiSemibold')}>Nghệ sĩ</p>
                            </div>

                            <div className={styles.authorName}>
                                <h4 className={styles.active}>{shortenedName}</h4>
                                <button className='uiRegular'>Theo dõi</button>
                            </div>
                        </div>
                    </div>


                </main>
            </div >
            <CommentBox
                isOpen={isCommentBoxOpen}
                uid={uid}
                ratings={ratings}
                songId={songId}
                fetchRating={fetchRating}
                onClose={handleCloseCommentBox} ></CommentBox>
        </div >
    );
};

export default InformationSpace;