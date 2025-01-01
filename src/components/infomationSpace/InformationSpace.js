import React, { useState } from 'react';
import styles from '../infomationSpace/InformationSpace.module.css'
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import Comment from './components/Comment/Comment';
import CommentBox from './components/CommentBox/CommentBox.js';

const InformationSpace = ({ isOpen, onClose }) => {

    const ratings = [
        { name: 'Nguyen Khoa Quan', stars: 3, comment: 'good' },
    ]

    const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);

    const handleOnClickShowAllCommentButton = () => {
        setIsCommentBoxOpen(true);
    }

    const handleCloseCommentBox = () => {
        setIsCommentBoxOpen(false);
    }

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
                            src="https://upload.wikimedia.org/wikipedia/en/0/0d/Taylor_Swift_-_I_Can_Do_It_With_a_Broken_Heart.png"
                            alt="songPic"
                            className={styles.songPic}></img>

                        <div className={styles.nameAndSinger}>
                            <h4>I can do it with the broken heart</h4>
                            <p className={clsx('p3', 'o75')}>Taylor Swift</p>
                        </div>

                        <div className={styles.authorName}>
                            <p className='uiRegular'>Thể loại</p>
                            <h5>Pop</h5>
                        </div>

                        <div className={styles.authorName}>
                            <p className='uiRegular'>Nhạc sĩ</p>
                            <h5>Taylor Swift</h5>
                        </div>

                        <div className={styles.rating} onClick={handleOnClickShowAllCommentButton}>
                            <header>
                                <p className={clsx('uiSemibold')}>Đánh giá</p>
                                <button onClick={handleOnClickShowAllCommentButton}>
                                    <p className={clsx('uiSemibold', styles.active)} >Tất cả</p>
                                </button>
                            </header>

                            <div viewOnly={true}>
                                {ratings.map((rating, index) => (
                                    <Comment
                                        key={index}
                                        name={rating.name}
                                        numberOfStar={rating.stars}
                                        comment={rating.comment} />
                                ))}
                            </div>
                        </div>

                        <div className={styles.authorInfo}>
                            <div className={styles.authorPic}>
                                <p className={clsx('uiSemibold')}>Nghệ sĩ</p>
                            </div>

                            <div className={styles.authorName}>
                                <h4 className={styles.active}>Taylor Swift</h4>
                                <button className='uiRegular'>Theo dõi</button>
                            </div>
                        </div>
                    </div>


                </main>
            </div>
            <CommentBox
                isOpen={isCommentBoxOpen}
                onClose={handleCloseCommentBox} ></CommentBox>
        </div>
    );
};

export default InformationSpace;