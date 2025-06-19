import React, { createContext, useState } from 'react';

export const HomeDataContext = createContext();

export const HomeDataProvider = ({ children }) => {
    const [songs, setSongs] = useState([]);
    const [artists, setArtists] = useState([]);
    const [topSongs, setTopSongs] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    return (
        <HomeDataContext.Provider value={{ songs, setSongs, artists, setArtists, topSongs, setTopSongs, isDataLoaded, setIsDataLoaded }}>
            {children}
        </HomeDataContext.Provider>
    );
};