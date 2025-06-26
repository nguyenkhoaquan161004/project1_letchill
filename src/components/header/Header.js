import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import logo from '../../assets/logo_doan1.svg';
import VoiceSearchingBox from './partials/VoiceSearchingBox/VoiceSearchingBox';

const Header = memo(({ onLogoAndHomeButtonClick, onSearchingSpaceClick, onAccountButtonClick, onSearchInput,
    isPremiumChooseScreenOpen, onPremiumChooseButtonClick, uid }) => {
    const token = localStorage.getItem('token');

    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [showReportBox, setShowReportBox] = useState(false);
    const [reportForm, setReportForm] = useState({
        type: '',
        email: '',
        name: '',
        content: ''
    });
    const [reportError, setReportError] = useState('');
    const [showContactBox, setShowContactBox] = useState(false);
    const [contactForm, setContactForm] = useState({ email: '', content: '' });
    const [contactError, setContactError] = useState('');

    const navigate = useNavigate();
    const [isVoiceSearchingBoxOpen, setIsVoiceSearchingBoxOpen] = useState(false);

    const handleOnClickVoiceSearching = () => {
        setIsVoiceSearchingBoxOpen(true);
    }

    const handleCloseVoiceSearching = () => {
        setIsVoiceSearchingBoxOpen(false);
    }

    const handleMoreClick = () => setShowMoreMenu((prev) => !prev);

    const handleReport = () => {
        setShowMoreMenu(false);
        setShowReportBox(true);
    };

    const handleReportChange = (e) => {
        setReportForm({ ...reportForm, [e.target.name]: e.target.value });
    };

    const handleReportSubmit = (e) => {
        e.preventDefault();
        const { type, email, name, content } = reportForm;

        if (!type || !email || !name || !content) {
            setReportError('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        setReportError('');

        // Tạo nội dung email
        const subject = encodeURIComponent("BÁO CÁO VẤN ĐỀ");
        const body = encodeURIComponent(
            `Loại báo cáo: ${type}\nHọ tên người gửi: ${name}\nEmail liên hệ: ${email}\n\nNội dung:\n${content}`
        );

        // Mở ứng dụng email
        window.location.href = `mailto:22521185@gm.uit.edu.vn?subject=${subject}&body=${body}`;

        // Reset form
        setShowReportBox(false);
        setReportForm({ type: '', email: '', name: '', content: '' });
    };

    const handleContact = () => {
        setShowMoreMenu(false);
        setShowContactBox(true);
    };

    // Hàm xử lý thay đổi input
    const handleContactChange = (e) => {
        setContactForm({ ...contactForm, [e.target.name]: e.target.value });
    };

    // Hàm submit liên hệ
    const handleContactSubmit = async (e) => {
        e.preventDefault();
        const { email, content } = contactForm;
        if (!email || !content) {
            setContactError('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        setContactError('');
        // Gửi email hoặc xử lý theo ý bạn, ví dụ mở mail client:
        // const subject = encodeURIComponent("LIÊN HỆ HỖ TRỢ");
        // const body = encodeURIComponent(
        //     `Email liên hệ: ${email}\n\nNội dung:\n${content}`
        // );
        // window.location.href = `mailto:22521185@gm.uit.edu.vn?subject=${subject}&body=${body}`;

        try {
            const response = await fetch(`http://localhost:4000/api/report/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    email,
                    content
                })
            })

            if (!response.ok) {
                console.error('Error:', response);
                throw new Error('Network response was not ok');
            }

            alert("Gửi email thành công.");
            setShowContactBox(false);
            setContactForm({ email: '', content: '' });
        } catch (error) {
            alert('Error:', error);
        }

    };

    return (
        <div id={styles.header} style={{
            zIndex: isVoiceSearchingBoxOpen ? 3 : 2
        }}>
            <div className={styles.headerContainer}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <button
                        style={{ background: 'transparent', border: 'none', marginLeft: 25 }}
                        onClick={handleMoreClick}>
                        <Icon className={styles.nonBGIcon} icon="ri:more-fill"></Icon>
                    </button>
                    {showMoreMenu && (
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 56,
                            background: '#000',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            borderRadius: 8,
                            zIndex: 100,
                            minWidth: 120,
                            padding: 8,
                        }}>
                            <button
                                style={{ width: '100%', padding: 8, border: 'none', background: !"#000", textAlign: 'left', cursor: 'pointer' }}
                                onClick={handleContact}
                            >
                                Liên hệ
                            </button>
                            <button
                                style={{ width: '100%', padding: 8, border: 'none', background: !"#000", textAlign: 'left', cursor: 'pointer' }}
                                onClick={handleReport}
                            >
                                Báo cáo
                            </button>
                        </div>
                    )}
                </div>

                <div className={styles.searchingOption}>
                    <Icon onClick={onLogoAndHomeButtonClick} className={clsx(styles.icon, 'hoverPoiter')} icon="ic:round-home"></Icon>
                    <div className={styles.searchingInput}>
                        <Icon className={clsx(styles.nonBGIcon)} icon="mingcute:search-line"></Icon>
                        <input
                            type="text"
                            placeholder='Tìm kiếm nội dung của bạn'
                            onChange={(e) => {
                                onSearchInput(e.target.value)
                            }}
                            onClick={onSearchingSpaceClick}></input>
                    </div>
                    <button>
                        <Icon
                            className={styles.icon}
                            icon="lets-icons:mic-fill"
                            onClick={handleOnClickVoiceSearching}></Icon>
                    </button>
                </div>

                <div className={styles.otherOption}>
                    <Icon className={styles.nonBGIcon} icon="ri:notification-4-line"></Icon>
                    <button onClick={() => { onPremiumChooseButtonClick() }}>
                        <Icon className={styles.nonBGIcon} icon="material-symbols:select-window-2"></Icon>
                    </button>
                    <Icon onClick={onAccountButtonClick} className={clsx(styles.icon, 'hoverPoiter')} icon="iconamoon:profile-fill"></Icon>
                    <div>
                        <button className='uiSemibold o50 btnLogin hoverPoiter'
                            onClick={() => navigate("/")}>ĐĂNG XUẤT
                        </button>
                    </div>
                </div>
            </div>
            <VoiceSearchingBox
                onSearchInput={onSearchInput}
                isOpen={isVoiceSearchingBoxOpen}
                onSearchingSpaceClick={onSearchingSpaceClick}
                onClose={handleCloseVoiceSearching} />
            {/* Modal báo cáo */}
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
                        <h3 style={{ marginBottom: 16 }}>Báo cáo</h3>
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
                            <label>Tên người báo cáo:</label>
                            <input name="name" value={reportForm.name} onChange={handleReportChange} required
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

            {showContactBox && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                    background: 'rgba(0,0,0,0.3)',
                    zIndex: 999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <form
                        onSubmit={handleContactSubmit}
                        style={{
                            background: !'#fff',
                            borderRadius: 12,
                            padding: 24,
                            minWidth: 320,
                            boxShadow: '0 2px 16px rgba(0,0,0,0.2)'
                        }}>
                        <h3 style={{ marginBottom: 16 }}>Liên hệ</h3>
                        <div style={{ marginBottom: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <label>Email:</label>
                            <input name="email" type="email" value={contactForm.email} onChange={handleContactChange} required
                                style={{ width: '95%', padding: "10px 6px", border: "1px solid rgba(255,255,255,0.5)", borderRadius: 6, }} />
                        </div>
                        <div style={{ marginBottom: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <label>Nội dung:</label>
                            <textarea name="content" value={contactForm.content} onChange={handleContactChange} required
                                style={{ width: '95%', padding: "10px 6px", border: "1px solid rgba(255, 255, 255, 0.5)", borderRadius: 6, minHeight: 60 }} />
                        </div>
                        {contactError && <div style={{ color: 'red', marginBottom: 8 }}>{contactError}</div>}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                            <button type="button" onClick={() => setShowContactBox(false)} style={{ padding: '6px 16px', background: '#000', color: '#fff', border: 0.5, borderRadius: 4 }}>Hủy</button>
                            <button type="submit" style={{ padding: '6px 16px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>Gửi liên hệ</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
});

export default Header;
