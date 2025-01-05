import React,{useEffect, useState} from 'react';
import styles from './HomeScreen.module.css';
import { Icon } from '@iconify/react';
import Slider from './components/Slider/Slider';
import { popularSongs } from './components/Slider/DataSlider';
import Author from './components/Author/Author';
import { popularAuthor } from './components/Author/DataAuthor';

const HomeScreen = ({ isOpen }) => {
    const [songs, setSongs] = useState(null);
    const [artists, setArtist] = useState(null);
    const fetchHometData = async () => {
            try {
    
                const response = await fetch('http://localhost:4000/api');
                if (!response.ok) {
                    throw new Error('Error fetching home data');
                }
    
                const data = await response.json();

                setSongs(data.topSongs);  // Đảm bảo xử lý cho 'favorite'
                setArtist(data.topSingers);
                console.log(songs);
                console.log(artists);
    
            } catch (err) {
                console.error('Error fetching home data:', err);
                alert('An error occurred while fetching the home data.');
            }
        };
        useEffect(() => {
            fetchHometData();
        }, []);
    if (!isOpen) return null;

    return (
        <div id={styles.mainHomeScreen}>
            <div className={styles.trendingSong}>
                <div className={styles.textTrendingSong}>
                    <Icon icon="solar:fire-bold" className={styles.icon}></Icon>
                    <h3>Top bài hát <span>thịnh hành</span></h3>
                </div>
                <Slider
                    items={songs||popularSongs}></Slider>
            </div>

            <div className={styles.popularAuthor}>
                <h4>Nghệ sĩ phổ biến</h4>
                <div className={styles.authorContainer}>
                    <Author items={artists||popularAuthor}></Author>
                </div>
            </div>

        </div>
    );
};

export default HomeScreen;