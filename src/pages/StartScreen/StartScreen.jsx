import React, { memo, useEffect, useRef, useState } from 'react';
import './StartScreen.css'
import '../../App.css'
import logo from '../../assets/logo_doan1.svg'
import stuff1 from './assets/stuffInBG.svg'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom';

import useInView from './hooks/useInView';

const StartScreen = memo(() => {
    const handleClick = () => {
        console.log('CLick');
    }

    const navigate = useNavigate();

    const [heroRef, heroInView] = useInView({ threshold: 0.6 });
    const [trendingRef, trendingInView] = useInView({ threshold: 0.4 });
    const [voiceRef, voiceInView] = useInView({ threshold: 0.4 });
    const [libRef, libInView] = useInView({ threshold: 0.5 });

    const fullTextHero = "ÂM NHẠC KHÔNG GIỚI HẠN";
    const fullTextTrending = "BÀI HÁT THỊNH HÀNH";
    const highlightStart = 7; // vị trí bắt đầu "THỊNH HÀNH"
    const fullTextVoiceSearching = "TÌM KIẾM BẰNG GIỌNG NÓI";
    const fullTextLib = "TẠO NÊN THƯ VIỆN CỦA CHÍNH BẠN";
    const highlightStartLib = 20; // vị trí bắt đầu "CHÍNH BẠN"

    const [displayed, setDisplayed] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [displayedTrending, setDisplayedTrending] = useState('');
    const [isTypingTrending, setIsTypingTrending] = useState(false);
    const [displayedVoiceSearching, setDisplayedVoiceSearching] = useState('');
    const [isTypingVoiceSearching, setIsTypingVoiceSearching] = useState(false);
    const [displayedLib, setDisplayedLib] = useState('');
    const [isTypingLib, setIsTypingLib] = useState(false);

    useEffect(() => {
        if (heroInView) {
            setIsTyping(true);
            setDisplayed('');
            let i = 0;
            const interval = setInterval(() => {
                setDisplayed(fullTextHero.slice(0, i + 1));
                i++;
                if (i === fullTextHero.length) {
                    clearInterval(interval);
                    setIsTyping(false);
                }
            }, 50);
            return () => clearInterval(interval);
        }
    }, [heroInView]);

    useEffect(() => {
        if (trendingInView) {
            setIsTypingTrending(true);
            setDisplayedTrending('');
            let i = 0;
            const interval = setInterval(() => {
                setDisplayedTrending(fullTextTrending.slice(0, i + 1));
                i++;
                if (i === fullTextTrending.length) {
                    clearInterval(interval);
                    setIsTypingTrending(false);
                }
            }, 50);
            return () => clearInterval(interval);
        }
    }, [trendingInView]);

    useEffect(() => {
        if (voiceInView) {
            setIsTypingVoiceSearching(true);
            setDisplayedVoiceSearching('');
            let i = 0;
            const interval = setInterval(() => {
                setDisplayedVoiceSearching(fullTextVoiceSearching.slice(0, i + 1));
                i++;
                if (i === fullTextVoiceSearching.length) {
                    clearInterval(interval);
                    setIsTypingVoiceSearching(false);
                }
            }, 50);
            return () => clearInterval(interval);
        }
    }, [voiceInView]);

    useEffect(() => {
        if (libInView) {
            setIsTypingLib(true);
            setDisplayedLib('');
            let i = 0;
            const interval = setInterval(() => {
                setDisplayedLib(fullTextTrending.slice(0, i + 1));
                i++;
                if (i === fullTextLib.length) {
                    clearInterval(interval);
                    setIsTypingLib(false);
                }
            }, 50);
            return () => clearInterval(interval);
        }
    }, [libInView]);

    return (
        <div id='startScreen'>
            {/* Header */}
            <div id="header">
                <div className="headerContainer">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>

                    <div className="genaralOption">
                        <div>
                            <p className='uiSemibold'>TRANG CHỦ</p>
                        </div>
                        <div>
                            <p className='uiSemibold o50'>KHÁM PHÁ</p>
                        </div>
                        <div>
                            <p className='uiSemibold o50'>CHÚNG TÔI</p>
                        </div>
                    </div>

                    <div className="inOutOption">
                        <div>
                            <button className='uiSemibold o50 btnLogin'
                                onClick={() => navigate("/login")}>ĐĂNG NHẬP
                            </button>
                        </div>
                        <div>
                            <button className='uiSemibold btnSignUp'
                                onClick={() => navigate("/signup")}>ĐĂNG KÝ</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mainContainer'>
                {/* Am nhac la khong gioi han */}
                <div
                    id="heroSection"
                    ref={heroRef}
                    className={heroInView ? "fade-section fade-in" : "fade-section"}
                >
                    <div className="info">
                        <h1 style={{ visibility: 'hidden', pointerEvents: 'none', position: 'absolute' }}
                        >ÂM NHẠC KHÔNG GIỚI HẠN</h1>
                        <h1 className='typewriter-holder'>
                            {displayed.split("ÂM NHẠC KHÔNG GIỚI HẠN")[0] || ""}
                            {displayed.length >= fullTextHero.length && (
                                <span className='typewriter-holder'>
                                    {displayed.slice(0)}
                                </span>
                            )}
                            {isTyping && <span className="type-cursor">|</span>}
                        </h1>

                        {!isTyping &&
                            <p
                                className={`p1 o50 show-after-type`}
                            >Mỗi giai điệu đều mang trong mình sự sáng tạo, tự do không biên giới và chính bạn sẽ là người tìm ra chúng.</p>
                        }
                    </div>
                    {!isTyping &&
                        <button
                            ref={heroRef}
                            className={`signUp p2 fade-section fade-section show-after-type`}
                            onClick={() => navigate("/signup")}>Đăng ký</button>
                    }
                </div>

                {/* Bai hat thinh hanh */}
                <div
                    id="trendingSong"
                    ref={trendingRef}
                    className={trendingInView ? "fade-section fade-in" : "fade-section"}>
                    <div className="topic">
                        <h2 style={{ textAlign: 'center' }} className='typewriter-holder'>
                            {displayedTrending.length <= highlightStart
                                ? displayedTrending
                                : <>
                                    {displayedTrending.slice(0, highlightStart)}
                                    <span className="highlight">
                                        {displayedTrending.slice(highlightStart)}
                                    </span>
                                </>
                            }
                            {isTypingTrending && <span className="type-cursor">|</span>}
                        </h2>
                        {!isTypingTrending && (
                            <p style={{ textAlign: 'center' }} className="p1 o50 show-after-type">
                                Thế giới ngoài kia đang nghe gì hôm nay thế?
                            </p>
                        )}
                    </div>

                    {!isTypingTrending &&
                        <div className={`listSong fade-section show-after-type `}>
                            <div className={`item floating1`} Click={() => navigate("/signup")}>
                                <div className="picSong1">
                                    <Icon icon="solar:play-bold" color="black"
                                        style={{ width: 30, height: 30, background: 'rgba(0, 0, 0, 0.8)', padding: 10, borderRadius: 30 }}>
                                    </Icon>
                                </div>
                                <div className="infoSong">
                                    <div className="genaralInfo">
                                        <h4 className="name">Đừng làm trái tim anh đau</h4>
                                        <p className="author p2 o75">Sơn Tùng MTP</p>
                                    </div>
                                    <div className="numberOfListen">
                                        <div>
                                            <Icon className='noBG' icon="mingcute:headphone-fill" style={{ width: 24, height: 24, background: 'rgba(255, 255, 255, 0.25)', padding: 4, borderRadius: 20 }} />
                                        </div>
                                        <p className="number p2 o75">1.3M lượt nghe</p>
                                    </div>
                                </div>
                            </div>

                            <div className="item floating2" onClick={() => navigate("/signup")}>
                                <div className="picSong2">
                                    <Icon icon="solar:play-bold" color="black"
                                        style={{ width: 30, height: 30, background: 'rgba(0, 0, 0, 0.8)', padding: 10, borderRadius: 30 }}>
                                    </Icon>
                                </div>
                                <div className="infoSong">
                                    <div className="genaralInfo">
                                        <h4 className="name">Ngáo ngơ</h4>
                                        <p className="author p2 o75">Erik, Jsol, Orange, HIEUTHUHAI, Anh Tú Atus</p>
                                    </div>
                                    <div className="numberOfListen">
                                        <div>
                                            <Icon className='noBG' icon="mingcute:headphone-fill" style={{ width: 24, height: 24, background: 'rgba(255, 255, 255, 0.25)', padding: 4, borderRadius: 20 }} />
                                        </div>
                                        <p className="number p2 o75">534K lượt nghe</p>
                                    </div>
                                </div>
                            </div>

                            <div className="item floating3" onClick={() => navigate("/signup")}>
                                <div className="picSong3">
                                    <Icon icon="solar:play-bold" color="black"
                                        style={{ width: 30, height: 30, background: 'rgba(0, 0, 0, 0.8)', padding: 10, borderRadius: 30 }}>
                                    </Icon>
                                </div>
                                <div className="infoSong">
                                    <div className="genaralInfo">
                                        <h4 className="name">Mộng Yu</h4>
                                        <p className="author p2 o75">AMEE</p>
                                    </div>
                                    <div className="numberOfListen">
                                        <div>
                                            <Icon className='noBG' icon="mingcute:headphone-fill" style={{ width: 24, height: 24, background: 'rgba(255, 255, 255, 0.25)', padding: 4, borderRadius: 20 }} />
                                        </div>
                                        <p className="number p2 o75">784K lượt nghe</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                {/* Tim kiem bang giong noi */}
                <div
                    id="voiceSearching"
                    ref={voiceRef}
                    className={`fade-section ${voiceInView ? 'fade-in' : ''}`}>
                    <div className="info">
                        <h1>
                            {displayedVoiceSearching.split("TÌM KIẾM BẰNG GIỌNG NÓI")[0] || ""}
                            {displayedVoiceSearching.length >= fullTextVoiceSearching.length &&
                                <span >
                                    {displayedVoiceSearching.slice(0)}
                                </span>
                            }
                            {isTyping && <span className="type-cursor">|</span>}
                        </h1>
                        {!isTypingVoiceSearching &&
                            <p className='p1 o50 fade-section show-after-type'>Tìm mọi bài hát mà bạn muốn chỉ với việc ngân nga một gia điệu đang vang trong đầu.</p>
                        }
                    </div>
                    {!isTypingVoiceSearching &&
                        <button className="signUp p2 show-after-type" onClick={() => navigate("/signup")}>Đăng ký</button>
                    }
                </div>

                {/* Thu vien ca nhan */}
                <div
                    id="personalLib"
                    ref={libRef}
                    className={`fade-section ${libInView ? 'fade-in' : ''}`}>
                    <div className="topic">
                        <h2 style={{ textAlign: 'center' }}>
                            {displayedLib.length <= highlightStartLib
                                ? displayedLib
                                : <>
                                    {displayedLib}
                                    {displayedLib.slice(0, highlightStartLib)}
                                    <span className="highlight">
                                        {displayedLib.slice(highlightStartLib)}
                                    </span>
                                </>
                            }
                        </h2>
                        {!isTypingLib &&
                            <p style={{ textAlign: 'center' }} className="p1 o50 show-after-type">Xây dựng nên một thế giới âm nhạc của chỉ riêng bản thân bạn.</p>
                        }
                    </div>

                    {!isTypingLib &&
                        <div className="listItem show-after-type">
                            <div className="noneItem floating-2-1" >
                            </div>
                            <div className="favoriteItem floating-2-2">
                                <div className="itemPic">
                                    <Icon className='iconPic' icon="solar:heart-bold"></Icon>
                                </div>
                                <div className="itemInfo">
                                    <h4>Danh sách yêu thích</h4>
                                    <p className='p2 o75'>103 bài</p>
                                </div>
                            </div>
                            <div className="noneItem floating-2-3"></div>
                            <div className="noneItem floating-2-4"></div>
                        </div>
                    }
                </div>

                {/* Footer */}
                <div id="footer">
                    <div className="line"></div>
                    <div className="footerContainer">
                        <img src={logo} alt="logo" className="logo" />
                        <div className="space">
                            <h4>Tài khoản</h4>
                            <p className='uiMedium o50' onClick={() => navigate("/signup")}>Đăng ký</p>
                            <p className='uiMedium o50' onClick={() => navigate("/login")}>Đăng nhập</p>
                        </div>
                        <div className="space">
                            <h4>Chung</h4>
                            <p className='uiMedium o50'>Cookies setting</p>
                            <p className='uiMedium o50'>Terms of service</p>
                            <p className='uiMedium o50'>Privacy Police</p>
                        </div>
                        <div className="socialSpace">
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <Icon icon="ri:instagram-fill" className='itemLogo' color="white" />
                            </a>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <Icon icon="mingcute:facebook-fill" className='itemLogo' color="white" />
                            </a>
                            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                                <Icon icon="ri:twitter-x-line" className='itemLogo' color="white" />
                            </a>
                        </div>
                    </div>
                    <p className='uiMedium' style={{ textAlign: 'right' }}>© 2024 Pride</p>
                </div>
            </div>
            <div className="graBG1"></div>
            <div className="graBG2"></div>
            <div className="graBG3"></div>
            <img className='stuff1' src={stuff1} alt="stuff" />
            <div className="graBG4"></div>
        </div>
    );
});

export default StartScreen;