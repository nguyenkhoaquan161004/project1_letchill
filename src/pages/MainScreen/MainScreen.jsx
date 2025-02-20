import React, { memo, useEffect, useState } from 'react';
import Header from '../../components/header/Header.js';
import ListeningSpace from '../../components/listeningSpace/ListeningSpace.js';
import LeftBar from '../../components/librarySpace/LibrarySpace.js'
import RightBar from '../../components/infomationSpace/InformationSpace.js';
import HomeScreen from './components/HomeScreen/HomeScreen.js';
import LyricsScreen from './components/LyricsScreen/LyricsScreen.js';
import SearchingScreen from './components/SearchingScreen/SearchingScreen.js';
import AccountScreen from './components/AccountScreen/AccountScreen.js';
import PlaylistScreen from './components/PlaylistScreen/PlaylistScreen.js';
import playlistdData from '../../components/librarySpace/assets/playlistData.js';
import clsx from 'clsx';
import styles from '../MainScreen/MainScreen.module.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { query } from 'firebase/firestore';
import axios from 'axios';

const MainScreen = memo(() => {
    const [isRightBarOpen, setIsRightBarOpen] = useState(false);
    const [isHomeScreenOpen, setIsHomeScreenOpen] = useState(true);
    const [isLyricsScreenOpen, setIsLyricsScreenOpen] = useState(false);
    const [isSearchingScreenOpen, setIsSearchingScreenOpen] = useState(false);
    const [isAccountScreenOpen, setIsAccountScreenOpen] = useState(false);
    const [isPlaylistScreenOpen, setIsPlaylistScreenOpen] = useState(false);
    const [currentSongId, setCurrentSongId] = useState(null);

    // Nhận dữ liệu khi nhập tìm kiếm
    const [isSearchQuery, setIsSearchQuery] = useState("");

    const [previousScreen, setPreviousScreen] = useState("home");

    const [playlists, setPlaylists] = useState([]);
    const [favoritePlaylist, setFavoritePlaylist] = useState();
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);

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
            else if (previousScreen === "playlist") {
                togglePlaylistScreen();
            }
        } else {
            if (isHomeScreenOpen) setPreviousScreen("home");
            else if (isLyricsScreenOpen) setPreviousScreen("search");
            else if (previousScreen === "playlist") {
                togglePlaylistScreen();
            }

            setIsLyricsScreenOpen((prev) => !prev);
            setIsHomeScreenOpen(false);
            setIsAccountScreenOpen(false);
            setIsSearchingScreenOpen(false);
            setIsPlaylistScreenOpen(false);
        }
    }

    const toggleSearchingScreen = () => {
        setIsSearchingScreenOpen(true);
        setIsHomeScreenOpen(false);
        setIsLyricsScreenOpen(false);
        setIsAccountScreenOpen(false);
        setIsPlaylistScreenOpen(false);
        setPreviousScreen("search");
    }

    const toggleHomeScreen = () => {
        setIsHomeScreenOpen(true);
        setIsLyricsScreenOpen(false);
        setIsSearchingScreenOpen(false);
        setIsAccountScreenOpen(false);
        setIsPlaylistScreenOpen(false);
        setSelectedPlaylist(null);
        setPreviousScreen("home");
    }

    const toggleAccountScreen = () => {
        setIsAccountScreenOpen(true);
        setIsHomeScreenOpen(false);
        setIsLyricsScreenOpen(false);
        setIsSearchingScreenOpen(false);
        setIsPlaylistScreenOpen(false);
        setPreviousScreen("account");
    }

    const togglePlaylistScreen = (playlistId) => {
        setIsPlaylistScreenOpen(true);
        setSelectedPlaylist(playlistId);
        setIsHomeScreenOpen(false);
        setIsLyricsScreenOpen(false);
        setIsSearchingScreenOpen(false);
        setIsAccountScreenOpen(false);
        setPreviousScreen("playlist");
    }

    const fetchPlaylists = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/playlist');
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Không thể tải playlists: ${errorMessage}`);
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
            alert('Lỗi khi tải lại danh sách phát.');
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
                const errorMessage = await response.text();
                throw new Error(`Không thể xóa playlist: ${errorMessage}`);
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

    return (
        <div id={styles.main}>
            <Header
                isOpen={isHomeScreenOpen}
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
                ></LeftBar>
                <div className={styles.mainSpace}>
                    <div className={styles.mainContainer}>
                        <HomeScreen isOpen={isHomeScreenOpen}></HomeScreen>
                        <LyricsScreen
                            isOpen={isLyricsScreenOpen}
                            currentSongId={currentSongId}></LyricsScreen>
                        <SearchingScreen
                            isOpen={isSearchingScreenOpen}
                            searchQuery={isSearchQuery}
                            onCurrentSongId={handleSongChange}
                        ></SearchingScreen>
                        <AccountScreen
                            isOpen={isAccountScreenOpen}
                            uid={uid}
                            onSelectedPlaylist={togglePlaylistScreen}
                        ></AccountScreen>
                        {selectedPlaylist && (
                            <PlaylistScreen
                                isOpen={isPlaylistScreenOpen}
                                playlistId={selectedPlaylist}
                                comebackHome={toggleHomeScreen}
                                onCurrentSongId={handleSongChange}
                                onUpdatePlaylist={handleUpdatePlaylist}
                                onRefreshPlaylists={fetchPlaylists}
                                onDeletePlaylist={handleDeletePlaylist}></PlaylistScreen>
                        )}

                    </div>

                </div>
                <RightBar
                    isOpen={isRightBarOpen}
                    onClose={handleCloseRightBar}
                    songId={currentSongId}></RightBar>
            </div>
            <ListeningSpace
                onInfoButtonClick={toggleRightBar}
                isRightBarOpen={isRightBarOpen}
                playlistsData={playlists}
                isLyricsOpen={isLyricsScreenOpen}
                currentSongId={currentSongId}
                onChangeSong={handleSongChange}
                onRefreshPlaylists={fetchPlaylists}
                onLyricsButtonClick={toggleLyricsScreen}></ListeningSpace>
            <div className={styles.graBG}></div>
        </div>

    );
});

export default MainScreen;