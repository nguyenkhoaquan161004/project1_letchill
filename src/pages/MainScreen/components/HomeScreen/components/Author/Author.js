import React from 'react';
import styles from './Author.module.css';
import clsx from 'clsx';


const Author = ({ items }) => {
    return (
        <div className={styles.authorWrapper}>
            <div className={styles.authorContainer}>
                {items.map((item, index) => {
                    return (
                        <div key={index} className={styles.authorItem}>
                            <img className={styles.authorPic} src={item.image} alt='authorPic'></img>
                            <div className={styles.authorInfoWrapper}>
                                <p className='uiSemibold'>{item.name}</p>
                                <p className='uiRegular o75'>Nghệ sĩ</p>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>

    );
};

export default Author;