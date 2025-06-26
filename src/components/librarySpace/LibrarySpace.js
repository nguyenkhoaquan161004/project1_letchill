import React, { useCallback, useEffect, useState } from 'react';
import styles from './LibrarySpace.module.css';
import Playlist from './components/Playlist/Playlist';
import { InlineIcon } from '@iconify/react';
import clsx from 'clsx';
import AddPlaylistBox from './components/AddPlaylistBox/AddPlaylistBox';
import UploadSongBox from './components/UploadSongBox/UploadSongBox';
import favoritePlaylist from './assets/favoritePlaylist.svg';
import { useAdmin } from '../../contexts/AdminContext';
import { AnimatePresence, motion } from 'framer-motion';
import { useCreator } from '../../contexts/CreatorContext';
import SingerItem from './components/Playlist/SingerItem';
import AddSingerBox from './components/AddSingerBox/AddSingerBox';
import UpdateSingerBox from './components/UpdateSingerBox/UpdateSongBox';
import DeleteSingerBox from './components/DeleteSingerBox/DeleteSingerBox';

const LibrarySpace = ({ onSelectedPlaylist, playlistsDatas, onReportManagerButtonClick,
    onRefreshPlaylists, onUserManagerButtonClick, onSelectedArtist,
    onSongManagerButtonClick, uid, followedSingers, singerChanged, setSingerChanged,
    selectedSinger, setSelectedSinger }) => {
    const [isAddPlaylistOpen, setIsAddPlaylistOpen] = useState(false);
    const [isUploadSongOpen, setIsUploadSongOpen] = useState(false);
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [showFollowedSingers, setShowFollowedSingers] = useState(false);
    const [isAddSingerOpen, setIsAddSingerOpen] = useState(false);
    const [isUpdateSingerOpen, setIsUpdateSingerOpen] = useState(false);
    const [isDeleteSingerOpen, setIsDeleteSingerOpen] = useState(false);
    const [singers, setSingers] = useState([]);

    //const [playlists, setPlaylists] = useState([]);
    const { isAdmin } = useAdmin();
    const { isCreator } = useCreator();

    const [mp3File, setMp3File] = useState(null);

    // State cho menu admin
    // const [showSongManage, setShowSongManage] = useState(true);
    // const [showAccountManage, setShowAccountManage] = useState(false);
    // const [showReportProcess, setShowReportProcess] = useState(false);
    // const [showCommentManage, setShowCommentManage] = useState(false);

    const [activeAdminBox, setActiveAdminBox] = useState('song'); // 'song', 'account', 'report', 'comment', hoặc null

    const handleToggleAdminBox = (box) => {
        setActiveAdminBox(prev => prev === box ? null : box);
    };

    const handleOpenAddPlaylistBox = () => {
        setIsAddPlaylistOpen(true);
    }

    const handleCloseAddPlaylistBox = () => {
        setIsAddPlaylistOpen(false);
    }

    // const fetchPlaylists = useCallback(async () => {
    //     try {
    //         const response = await fetch('http://localhost:4000/api/playlist',{
    //             method: 'GET',
    //         });
    //         if (!response.ok) throw new Error("Failed to fetch playlists");
    //         const data = await response.json();
    //         setPlaylists(data.playlist);

    //         onRefreshPlaylists(data.playlist);
    //     } catch (err) {
    //         console.log('Error fetching playlists: ', err);
    //     }
    // }, [onRefreshPlaylists]);  // Memoizing fetchPlaylists, including onRefreshPlaylists as a dependency

    // useEffect(() => {
    //     fetchPlaylists();
    // }, [fetchPlaylists]);

    const handlePlaylistSelect = (playlistId) => {
        onSelectedPlaylist(playlistId);
    };

    const handleAddPlaylist = async () => {
        try {
            // Fetch lại danh sách playlist từ server
            onRefreshPlaylists();
            setIsAddPlaylistOpen(false); // Đóng AddPlaylistBox
        } catch (err) {
            console.error('Error updating playlists: ', err);
        }
    };

    const handleOpenUploadSongBox = (e) => {
        if (!isAdmin) {
            alert("Bạn cần phải đăng ký Premium để sử dụng tính năng này.");
            return;
        } else if (!isCreator) {
            alert("Bạn cần phải đăng ký Premium để sử dụng tính năng này.");
            return;
        }
        e.stopPropagation();
        setIsUploadSongOpen(true);
    };

    const handleAddMenuClick = () => {
        setShowAddMenu((prev) => !prev);
    };

    const handleCloseUploadSongBox = () => {
        setIsUploadSongOpen(false);
    };

    const handleFileChange = (e) => {
        setMp3File(e.target.files[0]);
    };

    const handleArtistSelect = (artistId) => {
        onSelectedArtist(artistId);
    }

    const handleOpenAddSingerBox = () => setIsAddSingerOpen(true);
    const handleCloseAddSingerBox = () => setIsAddSingerOpen(false);

    const handleOpenUpdateSingerBox = () => {
        setIsUpdateSingerOpen(true);
    };
    const handleCloseUpdateSingerBox = () => setIsUpdateSingerOpen(false);

    const handleOpenDeleteSingerBox = () => {
        setIsDeleteSingerOpen(true);
    };
    const handleCloseDeleteSingerBox = () => setIsDeleteSingerOpen(false);

    const handleSingerActionSuccess = () => {
        setIsAddSingerOpen(false);
        setIsUpdateSingerOpen(false);
        setIsDeleteSingerOpen(false);
        setSingerChanged(prev => prev + 1);
        console.log(singerChanged);
    };

    if (isAdmin) {
        return (
            <div id={styles.leftBarAdmin} className={clsx('w24')}>
                <div className={styles.leftBarAdminContainer}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <AnimatePresence mode="wait">
                            {/* Quản lý bài hát */}
                            <motion.div
                                initial={{ opacity: 0, height: 0, y: -16 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -16 }}
                                transition={{ duration: 1, ease: 'easeInOut' }}
                                style={{ overflow: 'hidden', cursor: 'pointer' }}
                                className={styles.adminBox}
                                onClick={() => { handleToggleAdminBox('song'); onSongManagerButtonClick() }
                                }
                            >
                                <div style={{ fontWeight: 700, fontSize: 24, textAlign: 'center', padding: 16 }}>
                                    Quản lý bài hát
                                </div>

                                {activeAdminBox === 'song' && (
                                    <div
                                        onClick={() => handleToggleAdminBox('song')}
                                        style={{
                                            padding: '0 0 16px 0',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 20,
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <div
                                            style={{ display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 24, cursor: 'pointer' }}
                                            onClick={handleOpenUploadSongBox}
                                        >
                                            <InlineIcon style={{ width: 26, height: 26, backgroundColor: 'transparent' }} icon="ic:round-add" width={24} />
                                            <span className='uiSemibold'>Thêm bài hát</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 24 }}>
                                            <InlineIcon style={{ width: 26, height: 26, backgroundColor: 'transparent' }} icon="mdi:playlist-music" width={24} />
                                            <span className='uiSemibold'>Duyệt bài hát</span>
                                        </div>
                                    </div>
                                )}

                            </motion.div>
                            {/* Quản lý tài khoản */}
                            <motion.div
                                initial={{ opacity: 0, height: 0, y: -16 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -16 }}
                                transition={{ duration: 0.3, ease: 'linear' }}
                                className={styles.adminBox}
                                style={{ cursor: 'pointer' }}
                                onClick={() => { handleToggleAdminBox('account'); onUserManagerButtonClick() }
                                }
                            >
                                <div
                                    style={{ fontWeight: 700, fontSize: 24, textAlign: 'center', padding: 16 }}>
                                    Quản lý ca sĩ
                                </div>

                                {activeAdminBox === 'account' && (
                                    <div
                                        onClick={() => handleToggleAdminBox('account')}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 16,
                                            padding: '0 0 16px 0',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <button
                                            style={{
                                                display: 'flex',
                                                border: 'none',
                                                alignItems: 'center',
                                                gap: 12,
                                                paddingLeft: 24,
                                            }}
                                            onClick={handleOpenAddSingerBox}>
                                            <InlineIcon style={{ width: 26, height: 26, backgroundColor: 'transparent' }} icon="ic:round-add" width={24} />
                                            <span className='uiSemibold'>Thêm ca sĩ</span>
                                        </button>
                                        <button
                                            style={{
                                                display: 'flex',
                                                border: 'none',
                                                alignItems: 'center',
                                                gap: 12,
                                                paddingLeft: 24,
                                                opacity: selectedSinger.length === 1 ? 1 : 0.5,
                                            }}
                                            disabled={selectedSinger.length !== 1}
                                            onClick={handleOpenUpdateSingerBox}>
                                            <InlineIcon style={{ width: 26, height: 26, backgroundColor: 'transparent' }} icon="ic:round-edit" width={24} />
                                            <span className='uiSemibold'>Cập nhật tài khoản ca sĩ</span>
                                        </button>
                                        <button
                                            style={{
                                                display: 'flex',
                                                border: 'none',
                                                alignItems: 'center',
                                                gap: 12,
                                                paddingLeft: 24,
                                                opacity: selectedSinger.length > 0 ? 1 : 0.5,
                                            }}
                                            disabled={selectedSinger.length <= 0}
                                            onClick={handleOpenDeleteSingerBox}>
                                            <InlineIcon style={{ width: 26, height: 26, backgroundColor: 'transparent' }} icon="ic:round-delete" width={24} />
                                            <span className='uiSemibold'>Xóa ca sĩ</span>
                                        </button>
                                    </div>
                                )}

                            </motion.div>
                            {/* Xử lý báo cáo */}
                            <div
                                className={styles.adminBox}
                                style={{ cursor: 'pointer' }}
                                onClick={() => { handleToggleAdminBox('report'); onReportManagerButtonClick() }}
                            >
                                <div
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 24,
                                        textAlign: 'center',
                                        padding: 16
                                    }}
                                    onClick={() => handleToggleAdminBox('account')}
                                >
                                    Xử lý báo cáo
                                </div>
                                {/* Nếu muốn có submenu cho báo cáo, thêm ở đây */}
                                {/* {activeAdminBox === 'report' && (...)} */}
                            </div>
                        </AnimatePresence>
                    </div>
                </div>
                {/* Box upload bài hát */}
                <UploadSongBox
                    isOpen={isUploadSongOpen}
                    onClose={handleCloseUploadSongBox}
                    onFileChange={handleFileChange}
                />
                <AddSingerBox
                    isOpen={isAddSingerOpen}
                    onClose={handleCloseAddSingerBox}
                    onSuccess={handleSingerActionSuccess}
                />
                <UpdateSingerBox
                    isOpen={isUpdateSingerOpen}
                    onClose={handleCloseUpdateSingerBox}
                    onSuccess={handleSingerActionSuccess}
                    selectedSinger={selectedSinger}
                    setSelectedSinger={setSelectedSinger}
                />
                <DeleteSingerBox
                    isOpen={isDeleteSingerOpen}
                    onClose={handleCloseDeleteSingerBox}
                    singer={selectedSinger}
                    onSuccess={handleSingerActionSuccess}
                    selectedSinger={selectedSinger}
                    setSelectedSinger={setSelectedSinger}
                />
            </div >
        );
    }

    return (
        <div id={styles.leftBar}
            className={clsx('w24')}
            style={{
                zIndex: (isAddPlaylistOpen ? 3 : 1) + (isUploadSongOpen ? 3 : 1)
            }} >
            <div className={styles.leftBarContainer}>
                <div className={styles.topicContainer}>
                    <header>
                        <div className={styles.topic}>
                            <InlineIcon icon="fluent:library-24-filled" style={{ width: 26, height: 26, backgroundColor: 'transparent' }}></InlineIcon>
                            <h4>Thư viện</h4>
                        </div>
                        <div
                            style={{ position: 'relative', display: 'inline-block' }}
                            onClick={handleAddMenuClick}
                        >
                            <button
                                style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                            >
                                <InlineIcon icon="ic:round-add" style={{ width: 26, height: 26 }} />
                            </button>

                            {showAddMenu && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        background: '#000',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                        borderRadius: 8,
                                        zIndex: 10,
                                        minWidth: 140,
                                        padding: 8,
                                        right: 0,
                                        top: 30, // giảm khoảng cách nếu muốn liền khối
                                    }}
                                >
                                    <button
                                        style={{
                                            width: '100%',
                                            padding: 8,
                                            border: 'none',
                                            background: 'none',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            color: '#fff',
                                        }}
                                        onClick={handleOpenAddPlaylistBox}
                                    >
                                        Thêm playlist
                                    </button>
                                    <button
                                        style={{
                                            width: '100%',
                                            padding: 8,
                                            border: 'none',
                                            background: 'none',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            color: '#fff',
                                        }}
                                        onClick={handleOpenUploadSongBox}
                                    >
                                        Thêm bài hát
                                    </button>
                                </div>
                            )}
                        </div>
                    </header>

                    <nav>
                        <div className={styles.optionFill}>
                            <p className={clsx('uiSemibold')} style={{ margin: '5px 16px', textWrap: 'nowrap' }}>Playlist</p>
                        </div>
                        <div className={styles.optionFill}>
                            <p className={clsx('uiSemibold')} style={{ margin: '5px 16px', textWrap: 'nowrap' }}>Nghệ sĩ</p>
                        </div>
                    </nav>
                </div>

                <div className={styles.listOfPlaylist}>
                    {Array.isArray(playlistsDatas) && playlistsDatas.length > 0 ? (
                        playlistsDatas.map((playlistsData) => (
                            <Playlist
                                key={playlistsData.id}
                                onSelectedPlaylist={() => {
                                    onSelectedPlaylist({
                                        playlistId: playlistsData.id,
                                        playlistPic: playlistsData.avatarUrl,
                                        namePlaylist: playlistsData.name,
                                        description: playlistsData.description,
                                    });
                                    handlePlaylistSelect(playlistsData.id);
                                    console.log(playlistsData.id);
                                }}
                                playlistId={playlistsData.id}
                                playlistPic={playlistsData.avatarUrl}
                                namePlaylist={playlistsData.name}
                                description={playlistsData.description}
                                countPlaylist={playlistsData.countPlaylist}
                            />
                        ))
                    ) : (
                        <p>Không có playlist nào để hiển thị.</p>
                    )}

                    {Array.isArray(followedSingers) && followedSingers.length > 0 ? (
                        followedSingers.map((artist) => (
                            <SingerItem
                                key={artist.id}
                                artist={artist}
                                onSelectedArtist={() => {
                                    onSelectedArtist(
                                        artist.artist_id,
                                    );
                                    handleArtistSelect(artist.artist_id);
                                    console.log(artist.artist_id);
                                }}
                                name={artist.name}
                                avatarUrl={artist.avatarUrl}
                            />
                        ))
                    ) : (
                        <p></p>
                    )}
                </div>

            </div>
            <AddPlaylistBox
                isOpen={isAddPlaylistOpen}
                onClose={handleCloseAddPlaylistBox}
                onAddPlaylist={handleAddPlaylist}
            ></AddPlaylistBox>
            {/* Box upload bài hát */}
            <UploadSongBox
                isOpen={isUploadSongOpen}
                onClose={handleCloseUploadSongBox}
                onFileChange={handleFileChange}
                uid={uid}
            />
        </div >
    );
};

export default LibrarySpace;