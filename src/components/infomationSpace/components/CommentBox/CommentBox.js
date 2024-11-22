import React, { useState } from 'react';
import styles from './CommentBox.module.css';
import { InlineIcon } from '@iconify/react';
import Comment from '../Comment/Comment';
import CommentCanChange from '../Comment/CommentCanChange';


const CommentBox = ({ isOpen, onClose }) => {
    const ratingsData = [
        {
            name: "Nguyễn Văn A",
            stars: 5,
            comment: "Bài hát thật sự chạm đến trái tim tôi. Giai điệu tuyệt vời và ca từ đầy cảm xúc!"
        },
        {
            name: "Trần Thị B",
            stars: 4,
            comment: "Giai điệu rất bắt tai, nhưng phần lời có thể sâu sắc hơn một chút."
        },
        {
            name: "Lê Hoàng C",
            stars: 3,
            comment: "Nghe ổn nhưng không có gì đặc biệt. Phần điệp khúc hơi lặp lại."
        },
        {
            name: "Phạm Thu D",
            stars: 5,
            comment: "Quá xuất sắc! Bài hát này khiến tôi muốn nghe đi nghe lại nhiều lần."
        },
        {
            name: "Hoàng Minh E",
            stars: 2,
            comment: "Không ấn tượng lắm. Cảm giác như giai điệu đã nghe ở đâu đó rồi."
        },
        {
            name: "Ngô Lan F",
            stars: 4,
            comment: "Bài hát rất hay, nhưng chất lượng thu âm cần được cải thiện."
        },
        {
            name: "Đỗ Quốc G",
            stars: 5,
            comment: "Một bài hát hoàn hảo từ giai điệu đến ca từ. Tôi rất thích!"
        },
        {
            name: "Vũ Khánh H",
            stars: 1,
            comment: "Không hợp gu của tôi, cảm giác như bài hát này không có điểm nhấn."
        },
        {
            name: "Phan Bảo I",
            stars: 3,
            comment: "Giọng ca sĩ khá hay nhưng bản phối chưa thực sự nổi bật."
        },
        {
            name: "Hà Yến J",
            stars: 5,
            comment: "Giọng ca nội lực, cảm xúc dâng trào! Tôi đã khóc khi nghe bài này."
        },
        {
            name: "Lý Thành K",
            stars: 4,
            comment: "Rất thích phần nhạc nền, phù hợp để thư giãn. Cảm ơn ca sĩ và ekip!"
        },
        {
            name: "Nguyễn Tú L",
            stars: 2,
            comment: "Phần lời khá khó hiểu, cảm giác bài hát hơi rời rạc."
        },
        {
            name: "Bùi Minh M",
            stars: 5,
            comment: "Tuyệt phẩm! Tôi sẽ giới thiệu bài hát này cho bạn bè của mình."
        },
        {
            name: "Trịnh Quỳnh N",
            stars: 4,
            comment: "Rất hay, nhưng mong có bản remix để nghe trong các buổi tiệc."
        },
        {
            name: "Hoàng Đăng O",
            stars: 3,
            comment: "Nghe được, nhưng không để lại ấn tượng mạnh cho tôi."
        },
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