import React, { useEffect, useState } from 'react';
import styles from '../infomationSpace/InformationSpace.module.css'
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import Comment from './components/Comment/Comment';
import CommentBox from './components/CommentBox/CommentBox.js';

const InformationSpace = ({ isOpen, onClose, songId, uid, onSelectedArtist }) => {
    const token = localStorage.getItem('token');
    const [songData, setSongData] = useState([]);

    const [ratings, setRatings] = useState([]);
    const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
    const [isAddRating, setIsAddRating] = useState(false);

    const [isFollowing, setIsFollowing] = useState(false);
    const [followers, setFollowers] = useState(0);

    const [showReportBox, setShowReportBox] = useState(false);
    const [reportForm, setReportForm] = useState({
        type: '',
        email: '',
        content: ''
    });
    const [reportError, setReportError] = useState('');


    const handleOnClickShowAllCommentButton = () => {
        setIsCommentBoxOpen(true);
    }

    const handleCloseCommentBox = () => {
        setIsCommentBoxOpen(false);
    }

    const shortenedName =
        songData?.artist?.length > 7
            ? `${songData.artist.substring(0, 7)}...`
            : songData?.artist || 'Unknown Artist'; // Giá trị mặc định nếu artist không tồn tại


    useEffect(() => {
        const fetchData = async () => {
            if (!songId) return; // Bỏ qua nếu songId không tồn tại

            try {

                const response = await fetch(`http://localhost:4000/api/song/${songId}/${uid}`);

                if (!response.ok) {
                    // throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json(); // Chuyển đổi phản hồi thành JSON
                setSongData(data); // Lưu dữ liệu vào state

            } catch (err) {
                console.error('Error fetching song information:', err.message);
            }
        };

        fetchData();
    }, [songId, uid]); // Chỉ gọi lại khi songId hoặc uid thay đổi

    const fetchRating = async () => {
        if (!songId) return; // Bỏ qua nếu songId không tồn tại

        try {
            const response = await fetch(`http://localhost:4000/api/rate-and-comment?songId=${songId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setRatings(data.rateAndComments.list); // Lưu danh sách đánh giá vào state
        } catch (error) {
            console.error('Error fetching ratings:', error.message);
        }
    };
    useEffect(() => {
        fetchRating();
        checkIsFollowing();
    }, [songId, token]);

    const handleArtistSelect = (artistID) => {
        onSelectedArtist(artistID)
    };

    const checkIsFollowing = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/singer/${songData.artistId}/follows/${uid}`);
            if (response.ok) {
                const data = await response.json();
                setIsFollowing(data.isFollowing === true || data.message === "ALREADY_FOLLOWED");
            } else {
                setIsFollowing(false);
            }
        } catch {
            setIsFollowing(false);
        }
    };

    // Follow
    const handleFollowArtist = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/singer/${songData.artistId}/follows/${uid}`, {
                method: 'POST',
            });
            const data = await response.json();
            if (response.ok && data.message === "ALREADY_FOLLOWED") {
                setIsFollowing(true);
                setFollowers(f => f + 1);
            }
        } catch {
            alert('Lỗi khi theo dõi nghệ sĩ');
        }
    };

    // Unfollow
    const handleUnfollowArtist = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/singer/${songData.artistId}/follows/${uid}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setIsFollowing(false);
                setFollowers(f => Math.max(0, f - 1));
            }
        } catch {
            alert('Lỗi khi hủy theo dõi nghệ sĩ');
        }
    };

    const handleReportChange = (e) => {
        setReportForm({ ...reportForm, [e.target.name]: e.target.value });
    };

    const handleReportSubmit = async (e) => {
        e.preventDefault();
        const { type, email, content } = reportForm;

        if (!type || !email || !content) {
            setReportError('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        try {
            const response = await fetch(`http://localhost:4000/api/report/${songData.id}/${uid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    email,
                    reason: content,
                    type
                })
            })

            if (!response.ok) console.error(response);

            alert('Báo cáo thành công!')
            setReportError('');
            // Reset form
            setShowReportBox(false);
            setReportForm({ type: '', email: '', content: '' });
        }
        catch (error) {
            setReportError(error.message);
            console.error(reportError)
            throw new Error(error.message);
        }
    };


    return (
        <div
            id={styles.rightBar}
            className={clsx('w24')}
            style={{
                flex: isOpen ? '0 0 24vw' : '0 0 0',
                transition: 'flex 0.3s ease',
                border: isOpen ? '' : 'none',
                marginLeft: isOpen ? '' : '0'
            }} >
            <div className={styles.infoContainer}>
                <header>
                    <Icon
                        className={styles.icon}
                        icon="material-symbols:report-rounded"
                        onClick={() => setShowReportBox(true)}></Icon>
                    <Icon
                        className={styles.icon} icon="ic:round-close"
                        onClick={onClose}></Icon>
                </header>

                <main>
                    <div className={styles.infoSong}>
                        <img
                            src={songData.avatarUrl}
                            alt="songPic"
                            className={styles.songPic}></img>

                        <div className={styles.nameAndSinger}>
                            <h4>{songData.name}</h4>
                            <p className={clsx('p3', 'o75')}>{songData.artist}</p>
                        </div>

                        <div className={styles.authorName}>
                            <p className='uiRegular'>Thể loại</p>
                            <h5>{songData.genre}</h5>
                        </div>

                        <div className={styles.authorName}>
                            <p className='uiRegular'>Nhạc sĩ</p>
                            <h5>{songData.composer}</h5>
                        </div>

                        <div className={styles.rating} onClick={handleOnClickShowAllCommentButton}>
                            <header>
                                <p className={clsx('uiSemibold')}>Đánh giá</p>
                                <button onClick={handleOnClickShowAllCommentButton}>
                                    <p className={clsx('uiSemibold', styles.active)} >Tất cả</p>
                                </button>
                            </header>

                            <div viewOnly={true}>
                                {Array.isArray(ratings) && ratings.length > 0 ? (
                                    <Comment
                                        key={0}
                                        name={ratings[0].creator.name}
                                        numberOfStar={ratings[0].rate}
                                        comment={ratings[0].comment}
                                    />
                                ) : (
                                    <p className={styles.noComment}>Chưa có bình luận nào</p>
                                )}
                            </div>
                        </div>

                        <div className={styles.authorInfo}
                        >
                            <div
                                className={styles.authorPic}
                                style={{
                                    backgroundImage: `url(${songData.artistAvatarUrl})`,
                                }}
                                onClick={() => {
                                    onSelectedArtist(
                                        songData.artistId,
                                    );
                                    handleArtistSelect(songData.artistId);
                                    console.log(songData.artistId);
                                }}>
                                <p className={clsx('uiSemibold')}>Nghệ sĩ</p>
                            </div>

                            <div className={styles.authorName}>
                                <h4
                                    className={styles.active}
                                    onClick={() => {
                                        onSelectedArtist(
                                            songData.artistId,
                                        );
                                        handleArtistSelect(songData.artistId);
                                        console.log(songData.artistId);
                                    }}>{shortenedName}</h4>
                                <button
                                    className='uiRegular'
                                    onClick={isFollowing ? handleUnfollowArtist : handleFollowArtist}
                                >{isFollowing ? "Đã theo dõi" : "Theo dõi"}</button>
                            </div>
                        </div>
                    </div>


                </main>
            </div >
            <CommentBox
                isOpen={isCommentBoxOpen}
                uid={uid}
                ratings={ratings}
                songId={songId}
                fetchRating={fetchRating}
                onClose={handleCloseCommentBox} ></CommentBox>

            {showReportBox && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                    background: 'rgba(0,0,0,0.3)',
                    zIndex: 999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <form
                        onSubmit={handleReportSubmit}
                        style={{
                            background: !'#fff',
                            borderRadius: 12,
                            padding: 24,
                            minWidth: 320,
                            boxShadow: '0 2px 16px rgba(0,0,0,0.2)'
                        }}>
                        {/* Thông tin bài hát */}
                        <div style={{ marginBottom: 12, color: '#1976d2', fontWeight: 500 }}>
                            <span>Báo cáo cho bài hát: </span>
                            <span>
                                {songData?.name ? `"${songData.name}"` : 'Không rõ'}
                                {songData?.artist ? ` - ${songData.artist}` : ''}
                                {songData?.id ? ` (ID: ${songData.id})` : ''}
                            </span>
                        </div>
                        <h3 style={{ marginBottom: 16 }}>Báo cáo</h3>
                        {/* ...phần còn lại giữ nguyên... */}
                        <div style={{ marginBottom: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <label>Loại báo cáo:</label>
                            <select name="type" value={reportForm.type} onChange={handleReportChange} required
                                style={{ width: '100%', padding: "10px 6px", border: "1px solid rgba(255,255,255,0.5)", borderRadius: 6, }}>
                                <option value="">Chọn loại</option>
                                <option value="Bạo lực">Bạo lực</option>
                                <option value="Đạo nhái">Đạo nhái</option>
                                <option value="Nội dung phản cảm">Nội dung phản cảm</option>
                                <option value="Spam">Spam</option>
                                <option value="Khác">Khác</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <label>Email:</label>
                            <input name="email" type="email" value={reportForm.email} onChange={handleReportChange} required
                                style={{ width: '95%', padding: "10px 6px", border: "1px solid rgba(255,255,255,0.5)", borderRadius: 6, }} />
                        </div>
                        <div style={{ marginBottom: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <label>Nội dung:</label>
                            <textarea name="content" value={reportForm.content} onChange={handleReportChange} required
                                style={{ width: '95%', padding: "10px 6px", border: "1px solid rgba(255,255,255,0.5)", borderRadius: 6, minHeight: 60 }} />
                        </div>
                        {reportError && <div style={{ color: 'red', marginBottom: 8 }}>{reportError}</div>}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                            <button type="button" onClick={() => setShowReportBox(false)} style={{ padding: '6px 16px', background: '#000', color: '#fff', border: 0.5, borderRadius: 4 }}>Hủy</button>
                            <button type="submit" style={{ padding: '6px 16px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>Gửi báo cáo</button>
                        </div>
                    </form>
                </div>
            )}
        </div >
    );
};

export default InformationSpace;