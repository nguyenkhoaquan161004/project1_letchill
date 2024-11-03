import React from 'react';
import styles from './HomeScreen.module.css';
import { Icon } from '@iconify/react';
import Slider from './components/Slider/Slider';
import { popularSongs } from './components/Slider/DataSlider';
import Author from './components/Author/Author';
import { popularAuthor } from './components/Author/DataAuthor';

const HomeScreen = ({ isOpen }) => {
    if (!isOpen) return null;

    return (
        <div id={styles.mainHomeScreen}>
            <div className={styles.trendingSong}>
                <div className={styles.textTrendingSong}>
                    <Icon icon="solar:fire-bold" className={styles.icon}></Icon>
                    <h3>Top bài hát <span>thịnh hành</span></h3>
                </div>
                <Slider
                    items={popularSongs}></Slider>
            </div>

            <div className={styles.popularAuthor}>
                <h4>Nghệ sĩ phổ biến</h4>
                <div className={styles.authorContainer}>
                    <Author items={popularAuthor}></Author>
                </div>
            </div>

        </div>
    );
};

export default HomeScreen;