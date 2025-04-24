import React from 'react';
import styles from './PremiumChooseScreen.module.css';
import { Icon } from '@iconify/react/dist/iconify.js';

const PremiumChooseScreen = ({ isOpen }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.firstSpace}>
                <h4>Gói hợp túi tiền cho mọi hoàn cảnh</h4>
                <p className="p2">Chọn một gói Premium để nghe nhạc thoải thích không quảng cáo. Thanh toán theo nhiều cách và hủy bất cứ lúc nào bạn muốn.</p>
            </div>
            <svg className={styles.line}>
                <line x1="0" y1="0" x2="100%" y2="0"
                    stroke="#FFFFFF"
                    stroke-opacity="0.75"
                    stroke-width="2"
                    stroke-dasharray="8, 8"
                    stroke-linecap="round" />
            </svg>

            <div className={styles.secondSpace}>
                <h4>Lợi ích của tất cả các gói Premium</h4>
                <div className={styles.infoList}>
                    <div className={styles.infoItem}>
                        <Icon className={styles.nonBGIcon} icon="typcn:tick"></Icon>
                        <p className={styles.uiRegular}>Nghe nhạc không quảng cáo</p>
                    </div>
                    <div className={styles.infoItem}>
                        <Icon className={styles.nonBGIcon} icon="typcn:tick"></Icon>
                        <p className={styles.uiRegular}>Chất lượng âm thanh cao</p>
                    </div>
                    <div className={styles.infoItem}>
                        <Icon className={styles.nonBGIcon} icon="typcn:tick"></Icon>
                        <p className={styles.uiRegular}>Sắp xếp danh sách chờ</p>
                    </div>
                    <div className={styles.infoItem}>
                        <Icon className={styles.nonBGIcon} icon="typcn:tick"></Icon>
                        <p className={styles.uiRegular}>Phát nhạc theo thứ tự bất kỳ</p>
                    </div>
                </div>
            </div>
            <svg className={styles.line}>
                <line x1="0" y1="0" x2="100%" y2="0"
                    stroke="#FFFFFF"
                    stroke-opacity="0.75"
                    stroke-width="2"
                    stroke-dasharray="8, 8"
                    stroke-linecap="round" />
            </svg>
            <div className={styles.thirtSpace}>
                <div className={styles.itemOption}>
                    <div className={styles.infoOptionSpace}>
                        <div className={styles.topicOption}>
                            <p className="uiRegular" style={{ opacity: 0.75 }}>Premium</p>
                            <div className={styles.nameAndTime}>
                                <h3>Mini</h3>
                                <p className="p2">15.000VND/tuần</p>
                            </div>
                        </div>
                        <div className={styles.descriptionOption}>
                            <p className="uiRegular">1 tài khoản di động duy nhất</p>
                            <p className="uiRegular">Nghe tối đa 30 bài hát trên 1 thiết bị khi không có kết nối mạng</p>
                            <p className="uiRegular">Chất lượng âm thanh cơ bản</p>
                        </div>
                    </div>
                    <button className={styles.btnBuyNow}><h4>Mua ngay</h4></button>
                </div>

                <div className={styles.itemOption}>
                    <div className={styles.infoOptionSpace}>
                        <div className={styles.topicOption}>
                            <p className="uiRegular" style={{ opacity: 0.75 }}>Premium</p>
                            <div className={styles.nameAndTime}>
                                <h3>Individual</h3>
                                <p className="p2">59.000VND/tháng</p>
                            </div>
                        </div>
                        <div className={styles.descriptionOption}>
                            <p className="uiRegular">1 tài khoản Premium</p>
                            <p className="uiRegular">Hủy bất cứ lúc nào</p>
                            <p className="uiRegular">Đăng ký và thanh toán một lần</p>
                        </div>
                    </div>
                    <button className={styles.btnBuyNow}><h4>Mua ngay</h4></button>
                </div>

                <div className={styles.itemOption}>
                    <div className={styles.infoOptionSpace}>
                        <div className={styles.topicOption}>
                            <p className="uiRegular" style={{ opacity: 0.75 }}>Premium</p>
                            <div className={styles.nameAndTime}>
                                <h3>Student</h3>
                                <p className="p2">29.000VND/tháng</p>
                            </div>
                        </div>
                        <div className={styles.descriptionOption}>
                            <p className="uiRegular">1 tài khoản Premium đã xác minh</p>
                            <p className="uiRegular">Giảm giá cho sinh viên đủ điều khiện</p>
                            <p className="uiRegular">Hủy bất cứ lúc nào</p>
                            <p className="uiRegular">Đăng ký và thanh toán một lúc</p>
                        </div>
                    </div>
                    <button className={styles.btnBuyNow}><h4>Mua ngay</h4></button>
                </div>

            </div>
        </div>
    );
};

export default PremiumChooseScreen;