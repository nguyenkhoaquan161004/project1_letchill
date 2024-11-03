import React, { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import styles from './ListeningSpace.module.css';

const ListeningSpace = ({ onInfoButtonClick, onLyricsButtonClick, isRightBarOpen, isLyricsOpen }) => {
    const audioPlayer = useRef(null);
    const progressRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');
    const [volume, setVolume] = useState(1);

    // Các state quản lý trạng thái icon
    const [lyricsActive, setLyricsActive] = useState(false);
    const [returnActive, setReturnActive] = useState(false);
    const [infoActive, setInfoActive] = useState(false);
    const [outputActive, setOutputActive] = useState(true); // Mặc định âm thanh bật

    useEffect(() => {
        const updateProgress = () => {
            const audio = audioPlayer.current;
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            if (progressRef.current) {
                progressRef.current.style.width = `${progressPercent}%`;
            }

            setCurrentTime(formatTime(audio.currentTime));
            setDuration(formatTime(audio.duration));
        };

        const audio = audioPlayer.current;
        audio.addEventListener('timeupdate', updateProgress);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
        };
    }, []);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const togglePlay = () => {
        const audio = audioPlayer.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleProgressClick = (e) => {
        const audio = audioPlayer.current;
        const width = e.currentTarget.clientWidth;
        const clickX = e.nativeEvent.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    };

    const handleVolumeChange = (e) => {
        const audio = audioPlayer.current;
        const volumeValue = e.target.value / 100;
        setVolume(volumeValue);
        audio.volume = volumeValue;
        audio.muted = volumeValue === 0;
        setOutputActive(volumeValue > 0);
    };

    return (
        <div className={styles.listeningSpace}>
            <div className={styles.info}>
                <img
                    src="https://upload.wikimedia.org/wikipedia/en/0/0d/Taylor_Swift_-_I_Can_Do_It_With_a_Broken_Heart.png"
                    alt=""
                    className={styles.picOfSong}
                />

                <div className={styles.infoText}>
                    <p className={clsx(styles.name, 'uiSemibold')}>I can do this with the broken heart</p>
                    <p className={clsx(styles.author, 'uiRegular', 'o75')}>Taylor Swift</p>
                </div>

                <div className={styles.addToPlaylist}>
                    <Icon className={styles.iconAdd} icon="ic:round-plus" />
                </div>
            </div>

            <div className={styles.musicPlayer}>
                <audio ref={audioPlayer} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />

                <div className={styles.controlbar}>
                    <button onClick={() => { setLyricsActive(!lyricsActive); onLyricsButtonClick() }}>
                        <Icon
                            className={clsx(styles.icon, { [styles.iconActive]: isLyricsOpen })}
                            icon="maki:karaoke"
                        />
                    </button>

                    <button onClick={() => console.log('Previous')}>
                        <Icon className={styles.icon} icon="solar:skip-previous-bold" />
                    </button>

                    <button onClick={togglePlay} style={{ background: '#fff', borderRadius: 30 }}>
                        <Icon
                            className={clsx(styles.icon, styles.iconMain)}
                            icon={isPlaying ? 'material-symbols:pause-rounded' : 'solar:play-bold'}
                        />
                    </button>

                    <button onClick={() => console.log('Next')}>
                        <Icon className={styles.icon} icon="solar:skip-next-bold" />
                    </button>

                    <button onClick={() => setReturnActive(!returnActive)}>
                        <Icon
                            className={clsx(styles.icon, { [styles.iconActive]: returnActive })}
                            icon="icon-park-outline:return"
                        />
                    </button>
                </div>

                <div className={styles.timeDisplay}>
                    <span>{currentTime}</span>
                    <div className={styles.progressContainer} onClick={handleProgressClick}>
                        <div className={styles.progress} ref={progressRef}></div>
                    </div>
                    <span>{duration}</span>
                </div>
            </div>

            <div className={styles.general}>
                <button onClick={() => { setInfoActive(!infoActive); onInfoButtonClick() }}>
                    <Icon
                        className={clsx(styles.icon, { [styles.iconActive]: isRightBarOpen })}
                        icon="ic:round-info"
                    />
                </button>

                <div className={styles.volumnSpace}>
                    <button onClick={() => setOutputActive(!outputActive)}>
                        <Icon
                            className={clsx(styles.icon, { [styles.iconActive]: outputActive })}
                            icon='solar:volume-loud-bold'
                        />
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume * 100}
                        onChange={handleVolumeChange}
                        className={styles.volumnContainer}
                    />
                </div>
            </div>
        </div>
    );
};

export default React.memo(ListeningSpace);
