import React, { useState, useRef, useEffect } from 'react';
import styles from './PlaylistScreen.module.css';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import PlaylistItem from './PlaylistItem';
import UpdatePlaylist from './UpdatePlaylist';
import { useNavigate } from 'react-router-dom';
import favoritePlaylist from '../../../../components/librarySpace/assets/favoritePlaylist.svg';

const PlaylistScreen = ({ isOpen, playlistId, comebackHome, onDeletePlaylist, onRefreshPlaylists }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [isUpdatePlaylistOpen, setIsUpdatePlaylistOpen] = useState(false);

    const [updateName, setUpdateName] = useState('');
    const [updateDescription, setUpdateDescription] = useState('');
    const [updatePlaylistPic, setUpdatePlaylistPic] = useState('');

    const [, setPlaylistId] = useState(playlistId);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [playlistData, setPlaylistData] = useState(playlistId);
    const [playlists, setPlaylists] = useState([]);

    const combinedPlaylists = [
        {
            id: 'favorite',  // ID riêng biệt cho "Danh sách yêu thích"
            avtUrl: favoritePlaylist,  // Hình ảnh
            name: 'Danh sách yêu thích',  // Tên playlist
            description: '',  // Mô tả playlist
        },
        ...playlists,  // Các playlist từ backend
    ];

    const nav = useNavigate();

    const songsData = [
        {
            cover: 'https://images.genius.com/9420386437e633e438609a4ab103fc37.1000x1000x1.jpg', // Đường dẫn ảnh cho bài hát
            title: 'What a wonderful world',
            artist: 'The Macarons Project',
            dateAdded: '10/12/2024'
        },
        {
            cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrQBBWXUdsLOf207iiGhMTJU_7Zu-n8fFhfQ&s',
            title: 'Oh, Santa',
            artist: 'Mariah Carey ft. Ariana Grande, Jennifer Hudson',
            dateAdded: '10/12/2024'
        },
        {
            cover: 'https://www.boilerroomrecords.co.uk/cdn/shop/files/783f7ad7e57d5a07829ae62679f2037f.png?v=1727176454',
            title: 'All I want for Christmas is you',
            artist: 'Mariah Carey',
            dateAdded: '10/12/2024'
        },
        {
            cover: 'https://upload.wikimedia.org/wikipedia/vi/c/c0/Ariana_Grande_-_Santa_Tell_Me.png',
            title: 'Santa tell me',
            artist: 'Ariana Grande',
            dateAdded: '10/12/2024'
        },
        {
            cover: 'https://images.genius.com/f9680e3c876e1466fa1d240e8b7609c9.1000x1000x1.png',
            title: 'Last Christmas',
            artist: 'Wham!',
            dateAdded: '10/12/2024'
        },
        {
            cover: 'https://www.rap-up.com/article/2013/11/18/media_1f9c55f3c63264b4dbc6b054f854c9c82c6c28a3d.jpeg?width=1200&format=pjpg&optimize=medium',
            title: 'Last Christmas',
            artist: 'Ariana Grande',
            dateAdded: '10/12/2024'
        },
        {
            cover: 'https://upload.wikimedia.org/wikipedia/en/b/b5/Kelly_Clarkson_and_Ariana_Grande_-_Santa_Can%27t_You_Hear_Me_single_cover.jpeg',
            title: 'Santa, can you hear me?',
            artist: 'Kelly Clarkson & Ariana Grande',
            dateAdded: '10/12/2024'
        },
        {
            cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS85z2xwMS5z2akyjYwO-BWjhlidHZNpbAf_A&s',
            title: 'Snowman',
            artist: 'Sia',
            dateAdded: '10/12/2024'
        },
        {
            cover: 'https://i.discogs.com/vYJJiQAJPGaXuk09Zrny8eg6TG76R60Yu8Vh2LhnEew/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI1NTUz/NTQ1LTE2NzE4NjA4/MjctOTYxMy5qcGVn.jpeg',
            title: 'Save your tears',
            artist: 'The Weeknd ft. Ariana Grande',
            dateAdded: '10/12/2024'
        },
        {
            cover: 'https://avatar-ex-swe.nixcdn.com/song/2024/03/28/7/1/b/e/1711632303247_640.jpg',
            title: 'Too Sweet',
            artist: 'Hozier',
            dateAdded: '10/12/2024'
        },
        {
            cover: 'https://i.scdn.co/image/ab67616d00001e02db6ed492fdc27def8f979263',
            title: 'Honeymoon Avenue (Live from London)',
            artist: 'Ariana Grande',
            dateAdded: '10/12/2024'
        }
    ];

    const countPlaylist = songsData.length;

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/playlist');
            if (!response.ok) {
                const errorMessage = await response.text();
                console.error('Failed to fetch playlists:', errorMessage);
                throw new Error('Failed to fetch playlists');
            }
            const data = await response.json();
            setPlaylistData(data.playlist);
        } catch (err) {
            console.error('Error fetching playlists: ', err);
        }
    };

    const fetchPlaylistData = async () => {
        try {
            console.log('Fetching playlist with ID:', playlistId);
            const response = await fetch('http://localhost:4000/api/playlist');
            if (!response.ok) {
                throw new Error('Error fetching playlists');
            }

            const data = await response.json();
            const foundPlaylist = data.playlist.find(playlist => playlist.id === playlistId);
            setPlaylistData(foundPlaylist || { name: 'Danh sách yêu thích', avtUrl: favoritePlaylist });  // Đảm bảo xử lý cho 'favorite'
        } catch (err) {
            console.error('Error fetching playlist data:', err);
            alert('An error occurred while fetching the playlist data.');
        }
    };

    useEffect(() => {
        fetchData();
        if (playlistId) {
            fetchPlaylistData();
        }
    }, [playlistId]);


    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const toggleOptions = () => {
        setIsOptionsOpen(!isOptionsOpen);
    }

    const handleOpenUpdatePlaylist = () => {
        setIsUpdatePlaylistOpen(true);
        setIsOptionsOpen(false);
    }

    const handleCloseUpdatePlaylist = () => {
        setIsUpdatePlaylistOpen(false);
        setIsOptionsOpen(false);
        setIsModalOpen(false);
        setPlaylistId(null);
    }

    const handleEditClick = (id) => {
        setPlaylistId(id);
        console.log(id);
        setIsModalOpen(true);
    }

    const handleSaveChanges = (updatedPlaylist) => {
        console.log('Dữ liệu đã được cập nhật:', updatedPlaylist);
        fetchData(); // Fetch lại danh sách phát mới từ server
        fetchPlaylistData();
    };


    const handleDeletePlaylist = async () => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa danh sách phát này?");
        if (!confirmDelete) return;

        try {
            console.log('Fetching playlist with ID:', playlistId);
            const response = await fetch(`http://localhost:4000/api/playlist/${playlistId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Không thể xóa danh sách phát: ${errorMessage}`);
            }

            await fetchData();

            // Gọi callback để thông báo cho MainScreen
            if (onDeletePlaylist) {
                onDeletePlaylist(playlistId);
            }

            alert('Danh sách phát đã được xóa thành công.');
            comebackHome();
        } catch (err) {
            console.error('Error deleting playlist:', err);
            alert('Xóa danh sách phát thất bại.');
        }

        setIsOptionsOpen(false);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div id={styles.playlistScreen}>
            <div className={styles.infoPlaylistWrapper}>
                <div className={styles.playlistContainer}>
                    <img
                        src={playlistData.avtUrl}
                        alt=''
                        className={clsx(styles.playlistAvatarPic)} />
                </div>

                <div className={styles.textSpace}>
                    <p className='p1'>Danh sách phát</p>
                    <div className={styles.infoPlaylist}>
                        <h3 className={styles.nameOfUsesr}>{playlistData.name}</h3>
                        <p className="p3 o75">{playlistData.description}</p>
                        <p className='uiSemibold o50'>
                            <span className='uiSemibold o50'>{countPlaylist}</span> bài hát</p>
                    </div>
                </div>
            </div>

            <div className={styles.listOfTool}>
                <div className={styles.leftTools}>
                    <button onClick={togglePlay} className={styles.buttonPlay}>
                        <Icon
                            className={clsx(styles.icon, styles.iconMain)}
                            icon={isPlaying ? 'material-symbols:pause-rounded' : 'solar:play-bold'}
                        />
                    </button>

                    <div className={styles.optionsWrapper}>
                        <button onClick={toggleOptions} className={styles.btnOptions}>
                            <Icon icon="ri:more-fill" className={styles.icon}></Icon>
                        </button>
                        {isOptionsOpen && (
                            <div className={styles.optionsMenu}>
                                <button className={styles.optionItem} onClick={handleOpenUpdatePlaylist}>
                                    Cập nhật danh sách phát
                                </button>
                                <button className={styles.optionItem} onClick={handleDeletePlaylist}>
                                    Xóa danh sách phát
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <button>
                    <Icon icon="ic:round-sort" className={styles.icon}></Icon>
                </button>
            </div>

            <header>
                <div className={styles.leftInfo}>
                    <span className='uiMedium o50' style={{ width: 50 }}>#</span>
                    <span className='uiMedium o50' style={{ flex: 10 }}>Tên bài hát</span>
                </div>

                <span className='uiMedium o50' style={{ marginRight: 102 }}>Ngày thêm</span>
            </header>

            <main>
                {songsData.map((playlist, index) => {
                    return (
                        <div key={index}
                            className={styles.itemPlaylistContainer}
                            style={{ padding: "8px 12px", borderRadius: 8 }}
                            onClick={() => handleEditClick(playlist.id)}
                        >
                            <PlaylistItem
                                index={index + 1}
                                cover={playlist.cover}
                                title={playlist.title}
                                artist={playlist.artist}
                                dateAdded={playlist.dateAdded}></PlaylistItem>
                        </div>
                    )
                })}
            </main>

            <UpdatePlaylist
                isOpen={isUpdatePlaylistOpen}
                playlistId={playlistId}
                onClose={handleCloseUpdatePlaylist}
                playlistPic={playlistData.avtUrl}
                namePlaylist={playlistData.name}
                description={playlistData.description}
                onUpdatePlaylist={handleSaveChanges}
            />
        </div>
    );
};

export default PlaylistScreen;