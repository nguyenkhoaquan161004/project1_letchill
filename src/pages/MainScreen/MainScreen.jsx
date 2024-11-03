import React, { memo, useState } from 'react';
import Header from '../../components/header/Header.js';
import ListeningSpace from '../../components/listeningSpace/ListeningSpace.js';
import LeftBar from '../../components/librarySpace/LibrarySpace.js'
import RightBar from '../../components/infomationSpace/InformationSpace.js';
import HomeScreen from './components/HomeScreen/HomeScreen.js';
import LyricsScreen from './components/LyricsScreen/LyricsScreen.js';
import SearchingScreen from './components/SearchingScreen/SearchingScreen.js';
import AccountScreen from './components/AccountScreen/AccountScreen.js';
import PlaylistScreen from './components/PlaylistScreen/PlaylistScreen.js';
import clsx from 'clsx';
import styles from '../MainScreen/MainScreen.module.css'

const MainScreen = memo(() => {
    const [isRightBarOpen, setIsRightBarOpen] = useState(false);
    const [isHomeScreenOpen, setIsHomeScreenOpen] = useState(true);
    const [isLyricsScreenOpen, setIsLyricsScreenOpen] = useState(false);
    const [isSearchingScreenOpen, setIsSearchingScreenOpen] = useState(false);
    const [isAccountScreenOpen, setIsAccountScreenOpen] = useState(false);
    const [isPlaylistScreenOpen, setIsPlaylistScreenOpen] = useState(false);

    const [previousScreen, setPreviousScreen] = useState("home");
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);

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
        setPreviousScreen("search");
    }

    const toggleHomeScreen = () => {
        setIsHomeScreenOpen(true);
        setIsLyricsScreenOpen(false);
        setIsSearchingScreenOpen(false);
        setIsAccountScreenOpen(false);
        setPreviousScreen("home");
    }

    const toggleAccountScreen = () => {
        setIsAccountScreenOpen(true);
        setIsHomeScreenOpen(false);
        setIsLyricsScreenOpen(false);
        setIsSearchingScreenOpen(false);
        setPreviousScreen("account");
    }

    const togglePlaylistScreen = (playlist) => {
        setIsPlaylistScreenOpen(true);
        setSelectedPlaylist(playlist);
        setIsHomeScreenOpen(false);
        setIsLyricsScreenOpen(false);
        setIsSearchingScreenOpen(false);
        setIsAccountScreenOpen(false);
        setPreviousScreen("playlist");
    }

    return (
        <div id={styles.main}>
            <Header
                isOpen={isHomeScreenOpen}
                onLogoAndHomeButtonClick={toggleHomeScreen}
                onSearchingSpaceClick={toggleSearchingScreen}
                onAccountButtonClick={toggleAccountScreen}></Header>
            <div className={clsx(styles.mainContainer)}>
                <LeftBar
                    onPlaylistClick={togglePlaylistScreen}
                ></LeftBar>
                <div className={styles.mainSpace}>
                    <div className={styles.mainContainer}>
                        <HomeScreen isOpen={isHomeScreenOpen}></HomeScreen>
                        <LyricsScreen isOpen={isLyricsScreenOpen}></LyricsScreen>
                        <SearchingScreen isOpen={isSearchingScreenOpen}></SearchingScreen>
                        <AccountScreen isOpen={isAccountScreenOpen}></AccountScreen>
                        {selectedPlaylist && (
                            <PlaylistScreen
                                isOpen={isPlaylistScreenOpen}
                                playlistPic={selectedPlaylist.playlistPic}
                                namePlaylist={selectedPlaylist.namePlaylist}></PlaylistScreen>
                        )}

                    </div>

                </div>
                <RightBar isOpen={isRightBarOpen} onClose={handleCloseRightBar}></RightBar>
            </div>
            <ListeningSpace
                onInfoButtonClick={toggleRightBar}
                isRightBarOpen={isRightBarOpen}
                isLyricsOpen={isLyricsScreenOpen}
                onLyricsButtonClick={toggleLyricsScreen}></ListeningSpace>
            <div className={styles.graBG}></div>
        </div>

    );
});

export default MainScreen;