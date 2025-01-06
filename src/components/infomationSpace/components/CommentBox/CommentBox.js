import React, { useState } from 'react';
import styles from './CommentBox.module.css';
import { InlineIcon } from '@iconify/react';
import Comment from '../Comment/Comment';
import CommentCanChange from '../Comment/CommentCanChange';


const CommentBox = ({ isOpen, onClose }) => {
    const ratingsData = [
        { name: 'Nguyen Khoa Quan', stars: 3, comment: 'good' },
        { name: 'Năng Tiến Thành', stars: 5, comment: 'excellent' },
        { name: 'Kim Yến', stars: 4, comment: 'quite good' },
    ];
    const [newComment, setNewComment] = useState('');
    const [newStars, setNewStars] = useState(0);
    const [ratings, setRatings] = useState([...ratingsData]);

    if (!isOpen) return null;

    const handleCloseInBackground = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    const handleStarChange = (stars) => {
        setNewStars(stars);
    }

    const handleAddComment = () => {
        if (newComment.trim() === '') {
            alert('Vui lòng nhập bình luận');
            return;
        }

        const newRating = {
            name: "Nguyen Khoa Quan",
            stars: newStars,
            comment: newComment,
        };

        setRatings([...ratings, newRating]);
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
                                {ratings.map((rating, i) => (
                                    <Comment
                                        key={i}
                                        name={rating.name}
                                        numberOfStar={rating.stars}
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