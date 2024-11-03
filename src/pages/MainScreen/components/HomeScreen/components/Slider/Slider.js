import React from 'react';
import styles from './Slider.module.css';
import clsx from 'clsx';
import Slider from "react-slick"; // Make sure this import is present
import "slick-carousel/slick/slick.css"; // Import CSS for slick slider
import "slick-carousel/slick/slick-theme.css";

function SliderMain({ items }) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div>
            <div className={styles.sliderContainer}>
                {items.map((item, index) => {
                    return (
                        <div key={index}
                            className={clsx(styles.itemSongContainer)}>
                            <div className={styles.infoSongContainer}>
                                <h3>{item.name}</h3>
                                <p>{item.author}</p>
                            </div>


                            {/* <div className={styles.shadow} /> */}
                            <div className={styles.shadow}></div>
                            <img className={styles.picSong} src={item.image} alt='songPic'></img>
                        </div>
                    );
                })}

            </div >
            <ui className={styles.dots}>
                <li className={styles.active}></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ui>
        </div>

    );
};

export default SliderMain;