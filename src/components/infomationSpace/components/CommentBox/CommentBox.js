import React, { useState } from 'react';
import styles from './CommentBox.module.css';
import { InlineIcon } from '@iconify/react';
import Comment from '../Comment/Comment';
import CommentCanChange from '../Comment/CommentCanChange';


const CommentBox = ({ isOpen, onClose, ratings, songId, uid, fetchRating }) => {
    // const ratingsData = [
    //     { name: 'Nguyen Khoa Quan', stars: 3, comment: 'good' },
    //     { name: 'Năng Tiến Thành', stars: 5, comment: 'excellent' },
    //     { name: 'Kim Yến', stars: 4, comment: 'quite good' },
    // ];
    const token = localStorage.getItem('token');

    const [newComment, setNewComment] = useState('');
    const [newStars, setNewStars] = useState(0);
    // const [ratings, setRatings] = useState([...ratingsData]);

    if (!isOpen) return null;

    const handleCloseInBackground = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    const handleStarChange = (stars) => {
        setNewStars(stars);
    }

    const handleAddComment = async () => {
        if (newComment.trim() === '') {
            alert('Vui lòng nhập bình luận');
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/api/rate-and-comment?songId=${songId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    rate: newStars,
                    comment: newComment
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('❌ Lỗi từ server:', data.error || data);
                alert(`Gửi bình luận thất bại: ${data.error || 'Lỗi không xác định'}`);
                return;
            }

            console.log('✅ Bình luận thành công:', data);

            fetchRating();

        } catch (error) {
            console.error('Error adding comment:', error.message);
            alert('Có lỗi xảy ra khi thêm bình luận. Vui lòng thử lại.');
        }
        // setRatings([...ratings, newRating]);
        setNewComment('');
        setNewStars(0);
    }

    return (
        <div className={styles.backgroundSpace} onClick={handleCloseInBackground}>
            <div className={styles.commentBoxMainContainer}>
                <div className={styles.commentBoxContentSpace}>
                    <header>
                        <p className='uiSemibold'>Đánh giá</p>
                        <button className={styles.buttonClose} onClick={onClose}>
                            <InlineIcon icon="ic:round-close" className={styles.icon}></InlineIcon>
                        </button>
                    </header>

                    <main>
                        <div className={styles.allOfComments} viewOnly={true}>
                            <div className={styles.commentContainer}>
                                {(!Array.isArray(ratings) || ratings.length === 0) && (
                                    <p className={styles.noComment}>Chưa có bình luận nào</p>
                                )}
                                {Array.isArray(ratings) && ratings.map((rating, i) => (
                                    <Comment
                                        key={i}
                                        name={rating.creator.name}
                                        numberOfStar={rating.rate}
                                        comment={rating.comment}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className={styles.inputComment}>
                            <CommentCanChange
                                stars={newStars}
                                onStarsChange={handleStarChange}></CommentCanChange>
                            <div className={styles.commentBar}>
                                <input
                                    className={styles.fillComment}
                                    type="text"
                                    placeholder='Thêm bình luận của bạn'
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}></input>
                                <button
                                    className={styles.buttonComment}
                                    onClick={handleAddComment}>
                                    <InlineIcon icon="hugeicons:sent" className={styles.icon}></InlineIcon>
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>

    );
};

export default CommentBox;