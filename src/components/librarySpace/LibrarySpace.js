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

const LibrarySpace = ({ onSelectedPlaylist, playlistsDatas, onRefreshPlaylists, onUserManagerButtonClick, onSongManagerButtonClick }) => {
    const [isAddPlaylistOpen, setIsAddPlaylistOpen] = useState(false);
    const [isUploadSongOpen, setIsUploadSongOpen] = useState(false);
    //const [playlists, setPlaylists] = useState([]);
    const { isAdmin } = useAdmin();

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
        e.stopPropagation();
        setIsUploadSongOpen(true);
    };

    const handleCloseUploadSongBox = () => {
        setIsUploadSongOpen(false);
    };

    const handleUploadSong = async (songData) => {
        try {
            const token = localStorage.getItem('token'); // hoặc lấy từ context
            const songData = {
                uid: 'user_id',
                name: 'Tên bài hát',
                link: 'https://link.mp3',
                download: 'https://download.mp3',
                avatarUrl: 'https://img.jpg',
                releaseDate: '2024-01-01',
                lyric: 'Lời bài hát',
                composer: 'Nhạc sĩ',
                artist: 'Nghệ sĩ',
                genre: 'Thể loại'
            };

            fetch('http://localhost:4000/api/song/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(songData)
            })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => alert('Lỗi upload: ' + err.message));
        } catch (err) {
            alert('Lỗi upload: ' + err.message);
        }
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
                                    Quản lý tài khoản
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
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 24 }}>
                                            <InlineIcon style={{ width: 26, height: 26, backgroundColor: 'transparent' }} icon="ic:round-add" width={24} />
                                            <span className='uiSemibold'>Thêm tài khoản</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 24 }}>
                                            <InlineIcon style={{ width: 26, height: 26, backgroundColor: 'transparent' }} icon="ic:round-edit" width={24} />
                                            <span className='uiSemibold'>Cập nhật tài khoản</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 24 }}>
                                            <InlineIcon style={{ width: 26, height: 26, backgroundColor: 'transparent' }} icon="ic:round-delete" width={24} />
                                            <span className='uiSemibold'>Xóa tài khoản</span>
                                        </div>
                                    </div>
                                )}

                            </motion.div>
                            {/* Xử lý báo cáo */}
                            <div
                                className={styles.adminBox}
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleToggleAdminBox('report')}
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
                            {/* Duyệt bình luận */}
                            <div
                                className={styles.adminBox}
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleToggleAdminBox('comment')}
                            >
                                <div style={{ fontWeight: 700, fontSize: 24, textAlign: 'center', padding: 16 }}>
                                    Duyệt bình luận
                                </div>
                                {/* Nếu muốn có submenu cho bình luận, thêm ở đây */}
                                {/* {activeAdminBox === 'comment' && (...)} */}
                            </div>
                        </AnimatePresence>
                    </div>
                </div>
                {/* Box upload bài hát */}
                <UploadSongBox
                    isOpen={isUploadSongOpen}
                    onClose={handleCloseUploadSongBox}
                    onUploadSong={handleUploadSong}
                />
            </div >
        );
    }

    return (
        <div id={styles.leftBar}
            className={clsx('w24')}
            style={{
                zIndex: isAddPlaylistOpen ? 3 : 1
            }} >
            <div className={styles.leftBarContainer}>
                <div className={styles.topicContainer}>
                    <header>
                        <div className={styles.topic}>
                            <InlineIcon icon="fluent:library-24-filled" style={{ width: 26, height: 26, backgroundColor: 'transparent' }}></InlineIcon>
                            <h4>Thư viện</h4>
                        </div>
                        <button onClick={handleOpenAddPlaylistBox} style={{ border: 'none' }}>
                            <InlineIcon icon="ic:round-add" style={{ width: 26, height: 26, backgroundColor: 'transparent' }}></InlineIcon>
                        </button>
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
                </div>

            </div>
            <AddPlaylistBox
                isOpen={isAddPlaylistOpen}
                onClose={handleCloseAddPlaylistBox}
                onAddPlaylist={handleAddPlaylist}
            ></AddPlaylistBox>
        </div >
    );
};

export default LibrarySpace;