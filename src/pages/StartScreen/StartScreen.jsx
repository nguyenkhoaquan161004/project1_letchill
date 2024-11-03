import React, { memo, useRef } from 'react';
import './StartScreen.css'
import '../../App.css'
import logo from '../../assets/logo_doan1.svg'
import stuff1 from './assets/stuffInBG.svg'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom';

const StartScreen = memo(() => {
    const handleClick = () => {
        console.log('CLick');
    }

    const navigate = useNavigate();

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
                <div id="heroSection">
                    <div className="info">
                        <h1> ÂM NHẠC <span className="topicHighlight"> KHÔNG GIỚI HẠN</span></h1>
                        <p className='p1 o50'>Mỗi giai điệu đều mang trong mình sự sáng tạo, tự do không biên giới và chính bạn sẽ là người tìm ra chúng.</p>
                    </div>

                    <button className="signUp p2" onClick={() => navigate("/signup")}>Đăng ký</button>
                </div>

                {/* Bai hat thinh hanh */}
                <div id="trendingSong">
                    <div className="topic">
                        <h2 style={{ textAlign: 'center' }}>BÀI HÁT
                            <span className="highlight"> THỊNH HÀNH</span>
                        </h2>
                        <p style={{ textAlign: 'center' }} className="p1 o50">Thế giới ngoài kia đang nghe gì hôm nay thế?</p>
                    </div>

                    <div className="listSong">
                        <div className="item" onClick={() => navigate("/signup")}>
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

                        <div className="item" onClick={() => navigate("/signup")}>
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

                        <div className="item" onClick={() => navigate("/signup")}>
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
                </div>

                {/* Tim kiem bang giong noi */}
                <div id="voiceSearching">
                    <div className="info">
                        <h1>TÌM KIẾM BẰNG <span className="topicHighlight"> GIỌNG NÓI</span></h1>
                        <p className='p1 o50'>Tìm mọi bài hát mà bạn muốn chỉ với việc ngân nga một gia điệu đang vang trong đầu.</p>
                    </div>

                    <button className="signUp p2" onClick={() => navigate("/signup")}>Đăng ký</button>
                </div>

                {/* Thu vien ca nhan */}
                <div id="personalLib">
                    <div className="topic">
                        <h2 style={{ textAlign: 'center' }}>TẠO NÊN THƯ VIỆN CỦA
                            <span className="highlight"> CHÍNH BẠN</span>
                        </h2>
                        <p style={{ textAlign: 'center' }} className="p1 o50">Xây dựng nên một thế giới âm nhạc của chỉ riêng bản thân bạn.</p>
                    </div>

                    <div className="listItem">
                        <div className="noneItem">
                        </div>
                        <div className="favoriteItem">
                            <div className="itemPic">
                                <Icon className='iconPic' icon="solar:heart-bold"></Icon>
                            </div>
                            <div className="itemInfo">
                                <h4>Danh sách yêu thích</h4>
                                <p className='p2 o75'>103 bài</p>
                            </div>
                        </div>
                        <div className="noneItem"></div>
                        <div className="noneItem"></div>
                    </div>
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