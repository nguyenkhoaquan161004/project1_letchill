import React, { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { Icon } from '@iconify/react';
import styles from './ListeningSpace.module.css';
import songsData from '../../assets/songsData';

const ListeningSpace = ({ onInfoButtonClick, onLyricsButtonClick, isRightBarOpen, isLyricsOpen }) => {
    const audioPlayer = useRef(null);
    const progressRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');
    const [volume, setVolume] = useState(1);

    const [songs, setSongs] = useState([]);
    const [currentSongData, setCurrentSongData] = useState(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const currentSong = songsData[currentSongIndex];



    // Các state quản lý trạng thái icon
    const [lyricsActive, setLyricsActive] = useState(false);
    const [returnActive, setReturnActive] = useState(false);
    const [infoActive, setInfoActive] = useState(false);
    const [outputActive, setOutputActive] = useState(true); // Mặc định âm thanh bật

    const fetchSongs = async (songId) => {
        try {
            console.log("Fetching song information...");
            // Chuyển từ POST sang GET và truyền songId vào URL
            const response = await axios.get(`http://localhost:4000/api/songInformation/${songId}`);

            console.log('Fetched song:', response.data);

            if (response.data && response.data.name) {
                console.log('Fetched song:', response.data);
                setCurrentSongData(response.data);
                // Nếu cần thêm bài hát vào danh sách
                setSongs([response.data]);
            } else {
                throw new Error('Invalid song data from API');
            }
        } catch (error) {
            console.error('Error fetching song:', error.response?.data || error.message);

            setCurrentSongData({
                image: '/path/to/default-image.jpg',
                name: 'Unknown Song',
                artist: 'Unknown Artist',
                audio: null,
            });

            // Thêm bài hát mặc định vào danh sách
            setSongs([
                { id: 1, name: 'Default Song', artist: 'Unknown Artist', audio: '/path/to/default.mp3' },
            ]);
        }
    };

    const fetchSongInformation = async (songId) => {
        if (!songId) {
            console.error('songId is missing or invalid:', songId);
            return; // Tránh gọi API với giá trị không hợp lệ
        }

        try {
            // Gọi API để lấy thông tin chi tiết về bài hát
            const response = await axios.get(`http://localhost:4000/api/songInformation/${songId}`);
            const songData = response.data;
            console.log('Song information:', songData);

            if (!songData) {
                throw new Error('No song data returned from API');
            }

            setCurrentSongData(songData); // Cập nhật thông tin bài hát
            setSongs([songData]); // Cập nhật danh sách bài hát (nếu cần)
        } catch (error) {
            console.error('Failed to fetch song information:', error.response ? error.response.data : error.message);

            setCurrentSongData({
                image: '/path/to/default-image.jpg',
                name: 'Unknown Song',
                artist: 'Unknown Artist',
                audio: null,
            });
        }
    };

    const fetchRandomSongId = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/songInformation/random-id');
            const randomSongId = response.data.id; // ID bài hát ngẫu nhiên từ backend
            console.log('Random song ID:', randomSongId);
            await fetchSongInformation(randomSongId); // Lấy thông tin bài hát ngẫu nhiên
        } catch (error) {
            console.error('Error fetching random song:', error.response?.data || error.message);
        }
    };

    useEffect(() => {
        if (audioPlayer.current) {
            audioPlayer.current.load();
            if (isPlaying) {
                audioPlayer.current.play();
            }
        }
    }, [currentSongIndex, isPlaying]);

    useEffect(() => {
        const loadInitialSong = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/songInformation/random-id'); // Gọi API không có id
                const randomSongId = response.data.id;

                if (!randomSongId) {
                    throw new Error("No random song ID returned from API");
                }

                console.log("Random Song ID:", randomSongId);
                await fetchSongs(randomSongId); // Gọi fetchSongs với songId ngẫu nhiên
            } catch (error) {
                console.error('Error loading initial song:', error.response?.data || error.message);
            }
        };

        loadInitialSong();
    }, []);

    const handleNext = async () => {
        try {
            console.log("Fetching a random song ID...");
            // Gọi API để lấy một ID bài hát ngẫu nhiên
            const response = await axios.get('http://localhost:4000/api/songInformation/random-id');
            const randomSongId = response.data.id; // ID ngẫu nhiên từ API

            if (!randomSongId) {
                throw new Error("No song ID returned from API");
            }

            console.log("Random Song ID:", randomSongId);

            // Gọi fetchSongs để lấy thông tin bài hát ngẫu nhiên từ ID
            await fetchSongs(randomSongId); // Gọi hàm fetchSongs với ID bài hát ngẫu nhiên

        } catch (error) {
            console.error('Error fetching random song:', error.response?.data || error.message);
        }
    };

    const handleBack = async () => {
        if (songs.length === 0) return; // Nếu không có bài hát, không làm gì

        const prevIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1; // Tính chỉ số bài hát trước
        setCurrentSongIndex(prevIndex); // Cập nhật chỉ số bài hát hiện tại

        const prevSongId = songs[prevIndex].id; // Lấy ID bài hát trước
        await fetchSongInformation(prevSongId); // Gọi API để lấy thông tin bài hát
    };


    // TIME PROGRESS OF SONG
    useEffect(() => {
        const updateProgress = () => {
            const audio = audioPlayer.current;
            if (audio) {
                const progressPercent = (audio.currentTime / audio.duration) * 100;
                if (progressRef.current) {
                    progressRef.current.style.width = `${progressPercent}%`;

                }
            }

            setCurrentTime(formatTime(audio.currentTime));
            setDuration(formatTime(audio.duration));
        };

        const audio = audioPlayer.current;
        if (audio) {
            audio.addEventListener('timeupdate', updateProgress);
        }

        return () => {
            if (audio) {
                audio.removeEventListener('timeupdate', updateProgress);
            }
        };
    }, []);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const togglePlay = () => {
        const audio = audioPlayer.current;
        if (audio.paused) {
            audio.play().catch((error) => {
                console.log('Error: ', error);
            });
        } else {
            audio.pause();
        }
        setIsPlaying(!audio.paused);
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
                <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                    <img
                        src={currentSongData?.image || '/path/to/default-image.jpg'}
                        alt="Song cover"
                        className={styles.picOfSong}
                    />
                    <div className={styles.infoText}>
                        <p className={clsx(styles.name, 'uiSemibold')}>
                            {currentSongData?.name || 'Unknown Song'}
                        </p>
                        <p className={clsx(styles.author, 'uiRegular', 'o75')}>
                            {currentSongData?.artist || 'Unknown Artist'}
                        </p>
                    </div>
                </div>


                <div className={styles.addToPlaylist}>
                    <Icon className={styles.iconAdd} icon="ic:round-plus" />
                </div>
            </div>

            <div className={styles.musicPlayer}>
                <audio ref={audioPlayer} src={currentSongData?.audio || ''} />


                <div className={styles.controlbar}>
                    <button onClick={() => { setLyricsActive(!lyricsActive); onLyricsButtonClick() }}>
                        <Icon
                            className={clsx(styles.icon, { [styles.iconActive]: isLyricsOpen })}
                            icon="maki:karaoke"
                        />
                    </button>

                    <button className={styles.backBtn} onClick={handleBack}>
                        <Icon className={styles.icon} icon="solar:skip-previous-bold" />
                    </button>

                    <button onClick={togglePlay} style={{ background: '#fff', borderRadius: 30 }}>
                        <Icon
                            className={clsx(styles.icon, styles.iconMain)}
                            icon={isPlaying ? 'material-symbols:pause-rounded' : 'solar:play-bold'}
                        />
                    </button>

                    <button className={styles.nextBtn} onClick={handleNext}>
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
