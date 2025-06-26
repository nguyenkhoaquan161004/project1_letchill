import React, { memo, useCallback, useEffect, useState } from 'react';
import Header from '../../components/header/Header.js';
import ListeningSpace from '../../components/listeningSpace/ListeningSpace.js';
import LeftBar from '../../components/librarySpace/LibrarySpace.js'
import RightBar from '../../components/infomationSpace/InformationSpace.js';
// USER SCREENS
import HomeScreen from './components/HomeScreen/HomeScreen.js';
import LyricsScreen from './components/LyricsScreen/LyricsScreen.js';
import SearchingScreen from './components/SearchingScreen/SearchingScreen.js';
import AccountScreen from './components/AccountScreen/AccountScreen.js';
import PlaylistScreen from './components/PlaylistScreen/PlaylistScreen.js';
import WorldScreen from './components/WorldScreen/WorldScreen.jsx';
import PremiumChooseScreen from './components/PremiumChooseScreen';
import ArtistScreen from './components/ArtistScreen';
// ADMIN SCREENS
import UserManagerScreen from './components/admin/UserManagerScreen/UserManagerScreen.jsx';
import SongManagerScreen from './components/admin/SongManagerScreen/SongManagerScreen.jsx';

import clsx from 'clsx';
import styles from '../MainScreen/MainScreen.module.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// CONTEXT
import { useAdmin } from '../../contexts/AdminContext.jsx';
import { HomeDataProvider } from '../../contexts/HomeDataContext.jsx';
import ReportManagerScreen from './components/admin/ReportManagerScreen/ReportManagerScreen.jsx';

const MainScreen = memo(() => {
    const [isRightBarOpen, setIsRightBarOpen] = useState(false);
    const [isHomeScreenOpen, setIsHomeScreenOpen] = useState(true);
    const [isLyricsScreenOpen, setIsLyricsScreenOpen] = useState(false);
    const [isSearchingScreenOpen, setIsSearchingScreenOpen] = useState(false);
    const [isAccountScreenOpen, setIsAccountScreenOpen] = useState(false);
    const [isPlaylistScreenOpen, setIsPlaylistScreenOpen] = useState(false);
    const [isWorldScreenOpen, setIsWorldScreenOpen] = useState(false);
    const [isPremiumChooseScreenOpen, setIsPremiumChooseScreenOpen] = useState(false);
    const [isArtistScreenOpen, setIsArtistScreenOpen] = useState(false);
    const [followedSingers, setFollowedSingers] = useState([]);

    // ADMIN CONTROL VALUES
    const [isUserManagerScreenOpen, setIsUserManagerScreenOpen] = useState(false);
    const [isSongManagerScreenOpen, setIsSongManagerScreenOpen] = useState(true);
    const [isReportManagerScreenOpen, setIsReportManagerScreenOpen] = useState(false);
    const [singerChanged, setSingerChanged] = useState(0);
    const [selectedSinger, setSelectedSinger] = useState([]);

    const [currentSongId, setCurrentSongId] = useState(null);

    // ADMIN CONTEXT 
    const { isAdmin } = useAdmin();

    // Nhận dữ liệu khi nhập tìm kiếm
    const [isSearchQuery, setIsSearchQuery] = useState("");

    const [previousScreen, setPreviousScreen] = useState("home");

    const [playlists, setPlaylists] = useState([]);
    const [favoritePlaylist, setFavoritePlaylist] = useState();
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [selectedArtist, setSelectedArtist] = useState(null);

    const [artists, setArtists] = useState([]);
    const [topSongs, setTopSongs] = useState([]);
    const [recommentSongs, setRecommentSongs] = useState([]);
    const [followArtists, setFollowArtists] = useState([]);


    const nav = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const uid = queryParams.get('uid'); // Lấy UID từ URL

    const toggleRightBar = () => {
        setIsRightBarOpen((prev) => !prev);
    }

    const handleCloseRightBar = () => {
        setIsRightBarOpen(false);
    }

    // USER'S CONTROL FUNCTION
    const toggleLyricsScreen = () => {
        if (isLyricsScreenOpen) {
            if (previousScreen === "home") {
                toggleHomeScreen();
            }
            else if (previousScreen === "search") {
                toggleSearchingScreen();
            }
            else if (previousScreen === "account") {
                toggleAccountScreen();
            }
            else if (previousScreen === "worldChat") {
                toggleWorldOpenScreen();
            }
            else if (previousScreen === "playlist") {
                togglePlaylistScreen();
            }
            else if (previousScreen === "premium") {
                togglePremiumChooseScreen();
            }
            else if (previousScreen === "artist") {
                toggleArtistScreen();
            }
        } else {
            if (isHomeScreenOpen) setPreviousScreen("home");
            else if (isLyricsScreenOpen) setPreviousScreen("search");
            else if (isPremiumChooseScreenOpen) setPreviousScreen("premium");
            else if (previousScreen === "playlist") {
                togglePlaylistScreen();
            }

            setIsLyricsScreenOpen((prev) => !prev);
            setIsHomeScreenOpen(false);
            setIsAccountScreenOpen(false);
            setIsWorldScreenOpen(false)
            setIsSearchingScreenOpen(false);
            setIsPlaylistScreenOpen(false);
            setIsPremiumChooseScreenOpen(false);
            setIsArtistScreenOpen(false);
        }
    }

    const toggleWorldOpenScreen = () => {
        if (isWorldScreenOpen) {
            if (previousScreen === "home") {
                toggleHomeScreen();
            }
            else if (previousScreen === "search") {
                toggleSearchingScreen();
            }
            else if (previousScreen === "account") {
                toggleAccountScreen();
            }
            else if (previousScreen === "lyrics") {
                toggleLyricsScreen();
            }
            else if (previousScreen === "playlist") {
                togglePlaylistScreen();
            }
            else if (previousScreen === "premium") {
                togglePremiumChooseScreen();
            }
            else if (previousScreen === "artist") {
                toggleArtistScreen();
            }
        } else {
            if (isHomeScreenOpen) setPreviousScreen("home");
            else if (isWorldScreenOpen) setPreviousScreen("search");
            else if (isPremiumChooseScreenOpen) setPreviousScreen("premium");
            else if (previousScreen === "playlist") {
                togglePlaylistScreen();
            }

            setIsWorldScreenOpen((prev) => !prev);
            setIsHomeScreenOpen(false);
            setIsAccountScreenOpen(false);
            setIsLyricsScreenOpen(false)
            setIsSearchingScreenOpen(false);
            setIsPremiumChooseScreenOpen(false);
            setIsPlaylistScreenOpen(false);
            setIsArtistScreenOpen(false);
        }
    }

    const toggleSearchingScreen = () => {
        setIsSearchingScreenOpen(true);
        setIsHomeScreenOpen(false);
        setIsLyricsScreenOpen(false);
        setIsAccountScreenOpen(false);
        setIsWorldScreenOpen(false)
        setIsPlaylistScreenOpen(false);
        setIsPremiumChooseScreenOpen(false);
        setIsArtistScreenOpen(false);
        setPreviousScreen("search");
    }

    const togglePremiumChooseScreen = () => {
        setIsPremiumChooseScreenOpen(true);
        setIsSearchingScreenOpen(false);
        setIsHomeScreenOpen(false);
        setIsLyricsScreenOpen(false);
        setIsAccountScreenOpen(false);
        setIsWorldScreenOpen(false)
        setIsPlaylistScreenOpen(false);
        setIsArtistScreenOpen(false);
        setPreviousScreen("premium");
    }

    const toggleHomeScreen = () => {
        setIsHomeScreenOpen(true);
        setIsLyricsScreenOpen(false);
        setIsSearchingScreenOpen(false);
        setIsAccountScreenOpen(false);
        setIsWorldScreenOpen(false)
        setIsPlaylistScreenOpen(false);
        setSelectedPlaylist(null);
        setIsPremiumChooseScreenOpen(false);
        setIsArtistScreenOpen(false);
        setPreviousScreen("home");
    }

    const toggleAccountScreen = () => {
        setIsAccountScreenOpen(true);
        setIsHomeScreenOpen(false);
        setIsLyricsScreenOpen(false);
        setIsSearchingScreenOpen(false);
        setIsWorldScreenOpen(false)
        setIsPlaylistScreenOpen(false);
        setIsPremiumChooseScreenOpen(false);
        setIsArtistScreenOpen(false);
        setPreviousScreen("account");
    }

    // const toggleWorldOpenScreen = () => {
    //     setIsAccountScreenOpen(false);
    //     setIsHomeScreenOpen(false);
    //     setIsLyricsScreenOpen(false);
    //     setIsSearchingScreenOpen(false);
    //     setIsWorldScreenOpen(true)
    //     setIsPlaylistScreenOpen(false);
    //     setPreviousScreen("worldChat");
    // }

    const togglePlaylistScreen = (playlistId) => {
        setIsPlaylistScreenOpen(true);
        setSelectedPlaylist(playlistId);
        setIsHomeScreenOpen(false);
        setIsLyricsScreenOpen(false);
        setIsSearchingScreenOpen(false);
        setIsWorldScreenOpen(false)
        setIsAccountScreenOpen(false);
        setIsPremiumChooseScreenOpen(false);
        setIsArtistScreenOpen(false);
        setPreviousScreen("playlist");
    }

    const toggleArtistScreen = (artistId) => {
        window.scrollTo(0, 0);
        setIsArtistScreenOpen(true);
        setSelectedArtist(artistId);
        setIsHomeScreenOpen(false);
        setIsLyricsScreenOpen(false);
        setIsSearchingScreenOpen(false);
        setIsWorldScreenOpen(false)
        setIsAccountScreenOpen(false);
        setIsPremiumChooseScreenOpen(false);
        setIsPlaylistScreenOpen(false);
        setPreviousScreen("artist");

        window.scrollTo(0, 0);
    }

    // ADMIN'S CONTROL FUNCTION
    const toggleUserManagerScreen = () => {
        setIsUserManagerScreenOpen(true);
        setIsSongManagerScreenOpen(false);
        setIsReportManagerScreenOpen(false);

    }

    const toggleSongManagerScreen = () => {
        setIsSongManagerScreenOpen(true);
        setIsUserManagerScreenOpen(false);
        setIsReportManagerScreenOpen(false);
    }

    const toggleReportManagerScreen = () => {
        setIsReportManagerScreenOpen(true);
        setIsSongManagerScreenOpen(false);
        setIsUserManagerScreenOpen(false);
    }

    const fetchPlaylists = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/playlist');
            if (!response.ok) {
                // const errorMessage = await response.text();
                // throw new Error(`Không thể tải playlists: ${errorMessage}`);
            }

            const data = await response.json();

            // Lọc playlist của user
            const myPlaylistsData = data.playlist.filter((item) => item.creator === uid);
            setPlaylists(myPlaylistsData);

            // Xác định playlist yêu thích
            const favoriteItem = myPlaylistsData.find((item) => item.name === "Danh sách yêu thích");
            const filteredData = myPlaylistsData.filter((item) => item.name !== "Danh sách yêu thích");

            if (favoriteItem) {
                filteredData.unshift(favoriteItem); // Đưa vào đầu danh sách
            }

            // Đặt currentSongId
            const defaultSongId = '39698';
            setCurrentSongId(favoriteItem?.songIds?.[0] || '');

            // Cập nhật danh sách phát yêu thích
            setFavoritePlaylist(filteredData);
            console.log(filteredData);
        } catch (err) {
            console.error('Error fetching playlists:', err);
            // alert('Lỗi khi tải lại danh sách phát.');
        }
    };


    useEffect(() => {
        fetchPlaylists();
    }, []);

    const handleAddPlaylist = (newPlaylist) => {
        setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);
    }

    const handleUpdatePlaylist = (updatedPlaylist) => {

    };

    const handleRefreshPlaylists = (updatedPlaylists) => {
        setPlaylists(updatedPlaylists);
    };

    const handleDeletePlaylist = async (deletedPlaylistName) => {
        if (!Array.isArray(playlists)) {
            return;
        }

        // Lọc ra playlist mới sau khi xóa playlist có tên deletedPlaylistName
        const updatedPlaylists = playlists.filter(
            (playlist) => playlist.namePlaylist !== deletedPlaylistName
        );
        setPlaylists(updatedPlaylists);  // Cập nhật lại state playlists sau khi xóa

        // Gửi yêu cầu xóa playlist từ backend
        try {
            const response = await fetch(`http://localhost:4000/api/playlist/${deletedPlaylistName}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                // const errorMessage = await response.text();
                // throw new Error(`Không thể xóa playlist: ${errorMessage}`);
            }

            // Fetch lại dữ liệu playlists từ server sau khi xóa thành công
            fetchPlaylists();

            handleRefreshPlaylists(updatedPlaylists);
            setSelectedPlaylist(null);
            toggleHomeScreen();
        } catch (err) {
            console.error('Error deleting playlist:', err);
            alert('Xóa danh sách phát thất bại.');
        }
    };

    const handleSongChange = (songId) => {
        setCurrentSongId(songId);
    }

    // Xử lý search 
    const handleSearchQueryChange = (query) => {
        setIsSearchQuery(query);
        console.log(isSearchQuery);
    }

    const handleArtistChange = (artistId) => {
        setSelectedArtist(artistId);
    }

    const handleFollowArtist = (artistId) => {
        setFollowArtists((prevFollowArtists) => [...prevFollowArtists, artistId]);
    }

    // Hàm fetch danh sách nghệ sĩ đã theo dõi
    const updateFollowedSingers = useCallback(async () => {
        if (!uid) return;
        try {
            const response = await fetch(`http://localhost:4000/api/singer/followed/${uid}`, {
                method: 'GET'
            });
            if (!response.ok) throw new Error("Failed to fetch followed singers");
            const data = await response.json();
            console.log(data);
            setFollowedSingers(data);
        } catch (err) {
            setFollowedSingers([]);
            console.error(err)
        }
    }, [uid]);

    // Gọi khi mở danh sách nghệ sĩ đã theo dõi
    useEffect(() => {
        updateFollowedSingers();
    }, [updateFollowedSingers]);


    if (isAdmin) {
        return (
            <div id={styles.main}>
                <Header
                ></Header>
                <div className={clsx(styles.mainContainer)}>
                    <LeftBar
                        onUserManagerButtonClick={toggleUserManagerScreen}
                        onSongManagerButtonClick={toggleSongManagerScreen}
                        onReportManagerButtonClick={toggleReportManagerScreen}
                        selectedSinger={selectedSinger}
                        setSelectedSinger={setSelectedSinger}
                        setSingerChanged={setSingerChanged}
                    ></LeftBar>
                    <div className={styles.mainSpace}>
                        <div className={styles.mainContainer}>
                            <AnimatePresence mode='wait'>
                                {isUserManagerScreenOpen && (
                                    <motion.div
                                        key="home"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.15 }}
                                        style={{ height: '100%', width: '100%', overflowY: 'auto' }}
                                    >
                                        <UserManagerScreen
                                            isOpen={isUserManagerScreenOpen}
                                            singerChanged={singerChanged}
                                            setSingerChanged={setSingerChanged}
                                            selectedSinger={selectedSinger}
                                            setSelectedSinger={setSelectedSinger}
                                        ></UserManagerScreen>
                                    </motion.div>
                                )}

                                {isSongManagerScreenOpen && (
                                    <motion.div
                                        key="home"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.15 }}
                                        style={{ height: '100%', width: '100%', overflowY: 'auto' }}
                                    >
                                        <SongManagerScreen
                                            isOpen={isSongManagerScreenOpen}
                                        ></SongManagerScreen>
                                    </motion.div>
                                )}

                                {isReportManagerScreenOpen && (
                                    <motion.div
                                        key="home"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.15 }}
                                        style={{ height: '100%', width: '100%', overflowY: 'auto' }}
                                    >
                                        <ReportManagerScreen
                                            isOpen={isReportManagerScreenOpen}
                                        ></ReportManagerScreen>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div id={styles.main}>
            <Header
                isOpen={isHomeScreenOpen}
                uid={uid}
                isPremiumChooseScreenOpen={isPremiumChooseScreenOpen}
                onPremiumChooseButtonClick={togglePremiumChooseScreen}
                onLogoAndHomeButtonClick={toggleHomeScreen}
                onSearchingSpaceClick={toggleSearchingScreen}
                onSearchInput={handleSearchQueryChange}
                onAccountButtonClick={toggleAccountScreen}></Header>
            <div className={clsx(styles.mainContainer)}>
                <LeftBar
                    onSelectedPlaylist={togglePlaylistScreen}
                    onAddPlaylist={handleAddPlaylist}
                    playlistsDatas={playlists}
                    onRefreshPlaylists={fetchPlaylists}
                    uid={uid}
                    followedSingers={followedSingers}
                    onSelectedArtist={toggleArtistScreen}
                ></LeftBar>
                <div className={styles.mainSpace}>
                    <div className={styles.mainContainer}>
                        <AnimatePresence mode='wait'>
                            {isHomeScreenOpen && (
                                <motion.div
                                    key="home"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.15 }}
                                    style={{ height: '100%', overflowY: 'auto', width: '100%' }}
                                >
                                    <HomeDataProvider>
                                        <HomeScreen
                                            isOpen={isHomeScreenOpen}
                                            uid={uid}
                                            onCurrentSongId={handleSongChange}
                                            onSelectedArtist={toggleArtistScreen}
                                            onRefreshPlaylists={fetchPlaylists}
                                            playlistsData={playlists}
                                            songs={topSongs}
                                            setSongs={setTopSongs}
                                            artists={artists}
                                            setArtists={setArtists}
                                            recommentSongs={recommentSongs}
                                            setRecommentSongs={setRecommentSongs}
                                        />
                                    </HomeDataProvider>
                                </motion.div>
                            )}
                            {isLyricsScreenOpen && (
                                <motion.div
                                    key="lyrics"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.15 }}
                                    style={{ height: '100%', overflowY: 'auto' }}
                                >
                                    <LyricsScreen
                                        isOpen={true}
                                        currentSongId={currentSongId}
                                        uid={uid} />
                                </motion.div>
                            )}

                            {isSearchingScreenOpen && (
                                <motion.div
                                    key="search"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.15 }}
                                    style={{ height: '100%', width: '100%' }}
                                >
                                    <SearchingScreen
                                        isOpen={true}
                                        uid={uid}
                                        searchQuery={isSearchQuery}
                                        onCurrentSongId={handleSongChange}
                                    ></SearchingScreen>
                                </motion.div>
                            )}
                            {isAccountScreenOpen && (
                                <motion.div
                                    key="account"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.15 }}
                                    style={{ height: '100%', overflowY: 'auto', width: '100%' }}
                                >
                                    <AccountScreen
                                        isOpen={true}
                                        uid={uid}
                                        onSelectedPlaylist={togglePlaylistScreen}
                                        onCurrentSongId={handleSongChange}
                                        onRefreshPlaylists={fetchPlaylists}
                                        playlistsData={playlists}
                                    ></AccountScreen>
                                </motion.div>
                            )}

                            {selectedPlaylist && isPlaylistScreenOpen && (
                                <motion.div
                                    key="playlist"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.15 }}
                                    style={{ height: '100%', overflowY: 'auto', width: '100%' }}
                                >
                                    <PlaylistScreen
                                        isOpen={isPlaylistScreenOpen}
                                        uid={uid}
                                        playlistId={selectedPlaylist}
                                        comebackHome={toggleHomeScreen}
                                        onCurrentSongId={handleSongChange}
                                        onUpdatePlaylist={handleUpdatePlaylist}
                                        onRefreshPlaylists={fetchPlaylists}
                                        onDeletePlaylist={handleDeletePlaylist}></PlaylistScreen>
                                </motion.div>
                            )}

                            {isWorldScreenOpen && (
                                <motion.div
                                    key="world"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.15 }}
                                    style={{ height: '100%', overflowY: 'auto', width: '100%' }}
                                >
                                    <WorldScreen
                                        isOpen={isWorldScreenOpen}
                                        uid={uid}>
                                    </WorldScreen>
                                </motion.div>
                            )}

                            {isPremiumChooseScreenOpen && (
                                <motion.div
                                    key="premium"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.15 }}
                                    style={{ height: '100%', overflowY: 'auto' }}
                                >
                                    <PremiumChooseScreen
                                        isOpen={isPremiumChooseScreenOpen}
                                        uid={uid}>
                                    </PremiumChooseScreen>
                                </motion.div>
                            )}

                            {isArtistScreenOpen && selectedArtist && (
                                <motion.div
                                    key="artist"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.15 }}
                                    style={{ height: '100%', overflowY: 'auto', width: '100%' }}
                                >
                                    <ArtistScreen
                                        uid={uid}
                                        isOpen={isArtistScreenOpen}
                                        artistId={selectedArtist}
                                        artists={artists}
                                        onCurrentSongId={handleSongChange}
                                        onSelectedArtist={toggleArtistScreen}
                                        followArtists={followArtists}
                                        onFollowArtist={handleFollowArtist}
                                        onFollowChange={updateFollowedSingers}
                                    >
                                    </ArtistScreen>
                                </motion.div>
                            )}

                        </AnimatePresence>
                    </div>

                </div>
                <RightBar
                    isOpen={isRightBarOpen}
                    onClose={handleCloseRightBar}
                    songId={currentSongId}
                    onSelectedArtist={toggleArtistScreen}
                    uid={uid}></RightBar>
            </div>
            <ListeningSpace
                onInfoButtonClick={toggleRightBar}
                isRightBarOpen={isRightBarOpen}
                playlistsData={playlists}
                isLyricsOpen={isLyricsScreenOpen}
                isWorldScreenOpen={isWorldScreenOpen}
                currentSongId={currentSongId}
                onWorldScreenButtonClick={toggleWorldOpenScreen}
                onChangeSong={handleSongChange}
                onCurrentArtistId={handleArtistChange}
                onRefreshPlaylists={fetchPlaylists}
                onLyricsButtonClick={toggleLyricsScreen}
                uid={uid}></ListeningSpace>
            <div className={styles.graBG}></div>
        </div >

    );
});

export default MainScreen;