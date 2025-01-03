import React, { useRef, useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { Icon } from '@iconify/react';
import styles from './ListeningSpace.module.css';
import songsData from '../../assets/songsData';
import Playlist from './Playlist';

const ListeningSpace = ({ onInfoButtonClick, onLyricsButtonClick, isRightBarOpen, isLyricsOpen, onChangeSong, onRefreshPlaylists }) => {
    const audioPlayer = useRef(null);
    const progressRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');
    const [volume, setVolume] = useState(1);
    const [isLooping, setIsLooping] = useState(false);

    const [playlists, setPlaylists] = useState([]);

    // Quản lí danh sách phát được chọn để thêm nhạc 
    const [selectedPlaylists, setSelectedPlaylists] = useState({});
    // Mở Box thêm bài hát vào danh sách phát
    const [isAddSongBoxOpen, setIsAddSongBoxOpen] = useState(false);

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
            onChangeSong(songId);
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
            onChangeSong(songId);
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

    // const fetchRandomSongId = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:4000/api/songInformation/random-id');
    //         const randomSongId = response.data.id; // ID bài hát ngẫu nhiên từ backend
    //         console.log('Random song ID:', randomSongId);
    //         await fetchSongInformation(randomSongId); // Lấy thông tin bài hát ngẫu nhiên
    //     } catch (error) {
    //         console.error('Error fetching random song:', error.response?.data || error.message);
    //     }
    // };

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
                const response = await axios.get('http://localhost:4000/api/songInformation/'); // Gọi API không có id
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
            const response = await axios.get('http://localhost:4000/api/songInformation/');
            const randomSongId = response.data.id;

            if (!randomSongId) {
                throw new Error("No song ID returned from API");
            }

            console.log("Random Song ID:", randomSongId);


            // Pause and reset before loading a new song
            if (audioPlayer.current) {
                togglePlay();
                audioPlayer.current.currentTime = 0;
            }

            await fetchSongs(randomSongId);
            onChangeSong(randomSongId);

            if (currentSongData?.audio) {
                // Start playing the new song after loading
                togglePlay()
            } else {
                console.error('No valid audio source for this song');
            }

        } catch (error) {
            console.error('Error fetching random song:', error.response?.data || error.message);
        }
    };

    const handleBack = async () => {
        if (songs.length === 0) return;

        const prevIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
        setCurrentSongIndex(prevIndex);

        const prevSongId = songs[prevIndex].id;

        // Pause and reset before loading a new song
        if (audioPlayer.current) {
            togglePlay();
            audioPlayer.current.currentTime = 0;
        }

        await fetchSongInformation(prevSongId);
        onChangeSong(prevSongId);

        // Start playing the new song after loading
        if (audioPlayer.current) {
            togglePlay();
        }
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

    const handleReturn = () => {
        const audio = audioPlayer.current;

        // Toggle trạng thái lặp
        const newLoopState = !isLooping;
        setIsLooping(newLoopState);

        // Cập nhật thuộc tính loop của audio element
        if (audio) {
            audio.loop = newLoopState;
        }

        setReturnActive(!returnActive)
        if (!newLoopState) {
            handleNext();
        }

        console.log(`Looping is now ${newLoopState ? 'enabled' : 'disabled'}`);
    };

    useEffect(() => {
        const audio = audioPlayer.current;

        if (audio) {
            // Khi bài hát kết thúc
            const handleSongEnd = () => {
                if (!isLooping) {
                    handleNext(); // Gọi hàm để chuyển sang bài hát tiếp theo
                    togglePlay();
                }
            };

            audio.addEventListener('ended', handleSongEnd);

            return () => {
                audio.removeEventListener('ended', handleSongEnd);
            };
        }
    }, [isLooping]);

    const fetchPlaylists = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:4000/api/playlist');
            if (!response.ok) throw new Error("Failed to fetch playlists");
            const data = await response.json();
            setPlaylists(data.playlist);

            onRefreshPlaylists(data.playlist);
        } catch (err) {
            console.log('Error fetching playlists: ', err);
        }
    }, [onRefreshPlaylists]);  // Memoizing fetchPlaylists, including onRefreshPlaylists as a dependency

    useEffect(() => {
        fetchPlaylists();
    }, [fetchPlaylists]);

    const handleCheckboxChange = (playlistId) => {
        setSelectedPlaylists((prev) => ({
            ...prev,
            [playlistId]: !prev[playlistId], // Đảo ngược trạng thái
        }));
    };

    // Bật tắt Box thêm bài hát vào playlist
    const handleAddSongButtonClick = () => {
        setIsAddSongBoxOpen((prev) => !prev);
    };

    const isAnySelected = Object.values(selectedPlaylists).some((isSelected) => isSelected);

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


                <div className={styles.addToPlaylist} onClick={handleAddSongButtonClick}>
                    <Icon className={styles.iconAdd} icon="ic:round-plus" />
                </div>

                <div className={styles.addSongToPlaylistContainer}
                    style={{
                        display: isAddSongBoxOpen ? 'flex' : 'none'
                    }}>
                    <p className="uiSemibold o75">Thêm bài hát vào danh sách phát</p>
                    <hr style={{ width: '70%', position: 'relative', left: 0, right: 0, border: "1px solid rgba(255, 255, 255, 0.5)" }} />
                    <div className={styles.listOfPlaylists}>
                        {playlists.map((playlist) => (
                            <div className={styles.itemPlaylistContainer}>
                                <Playlist
                                    key={playlist.id}
                                    playlistId={playlist.id}
                                    playlistPic={playlist.avtUrl}
                                    namePlaylist={playlist.name}
                                    description={playlist.description}></Playlist>
                                <input
                                    type='checkbox'
                                    checked={!!selectedPlaylists[playlist.id]}
                                    onChange={() => handleCheckboxChange(playlist.id)}></input>
                            </div>

                        ))}
                    </div>
                    <div className={styles.listOfBtns}>
                        <button
                            onClick={handleAddSongButtonClick}
                            className={styles.cancelBtn}>Hủy</button>
                        {isAnySelected && (
                            <button className={styles.addBtn}>Thêm</button>
                        )}
                    </div>

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

                    <button onClick={handleReturn}>
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
