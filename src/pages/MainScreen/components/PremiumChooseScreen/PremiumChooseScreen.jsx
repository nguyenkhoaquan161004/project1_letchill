import React, { useState } from 'react';
import styles from './PremiumChooseScreen.module.css';
import { Icon } from '@iconify/react/dist/iconify.js';

const premiumOptions = [
    {
        name: 'Mini',
        price: '15.000VND/tuần',
        type: 'WEEKLY',
        description: [
            '1 tài khoản di động duy nhất',
            'Nghe tối đa 30 bài hát trên 1 thiết bị khi không có kết nối mạng',
            'Chất lượng âm thanh cơ bản',
        ],
    },
    {
        name: 'Individual',
        price: '59.000VND/tháng',
        type: 'MONTHLY',
        description: [
            '1 tài khoản Premium',
            'Hủy bất cứ lúc nào',
            'Đăng ký và thanh toán một lần',
        ],
    },
    {
        name: 'Student',
        price: '29.000VND/tháng',
        type: 'STUDENT',
        description: [
            '1 tài khoản Premium đã xác minh',
            'Giảm giá cho sinh viên đủ điều kiện',
            'Hủy bất cứ lúc nào',
            'Đăng ký và thanh toán một lúc',
        ],
    },
];

const PremiumChooseScreen = ({ isOpen, uid }) => {
    const [isPaymentBoxOpen, setIsPaymentBoxOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [method, setMethod] = useState(null);

    const handleBuyNowClick = (packageInfo) => {
        setSelectedPackage(packageInfo);
        setIsPaymentBoxOpen(true);
    };

    const handleClosePaymentBox = () => {
        setIsPaymentBoxOpen(false);
        setSelectedPackage(null);
    };

    const handleUpdateAccount = async (method) => {
        try {
            const response = await fetch(`http://localhost:4000/api/subscription/${uid}/upgrade`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: selectedPackage.type, // Loại gói (WEEKLY, MONTHLY, STUDENT)
                    method: method, // Phương thức thanh toán
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('✅ Tài khoản đã được nâng cấp:', data);
            alert('Tài khoản của bạn đã được nâng cấp thành công!');
        } catch (error) {
            console.error('❌ Lỗi khi nâng cấp tài khoản:', error.message);
            alert('Có lỗi xảy ra khi nâng cấp tài khoản. Vui lòng thử lại.');
        }
    };

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
                {premiumOptions.map((option, index) => (
                    <div key={index} className={styles.itemOption}>
                        <div className={styles.infoOptionSpace}>
                            <div className={styles.topicOption}>
                                <p className="uiRegular" style={{ opacity: 0.75 }}>Premium</p>
                                <div className={styles.nameAndTime}>
                                    <h3>{option.name}</h3>
                                    <p className="p2">{option.price}</p>
                                </div>
                            </div>
                            <div className={styles.descriptionOption}>
                                {option.description.map((desc, i) => (
                                    <p key={i} className="uiRegular">{desc}</p>
                                ))}
                            </div>
                        </div>
                        <button
                            className={styles.btnBuyNow}
                            onClick={() => handleBuyNowClick(option)}
                        >
                            <h4>Mua ngay</h4>
                        </button>
                    </div>
                ))}
            </div>

            {/* Box thanh toán */}
            {isPaymentBoxOpen && (
                <div className={styles.paymentBox}>
                    <div className={styles.paymentBoxContent}>
                        <header>
                            <h4>Thanh toán</h4>
                            <button className={styles.closeButton} onClick={handleClosePaymentBox}>
                                Đóng
                            </button>
                        </header>
                        <main>
                            <p>Gói: {selectedPackage?.name}</p>
                            <p>Giá: {selectedPackage?.price}</p>
                            <h5>Chọn phương thức thanh toán:</h5>
                            <button
                                className={styles.paymentMethod}
                                onClick={() => {
                                    setMethod('MOMO');
                                    handleUpdateAccount(method)
                                }}>Thanh toán qua MOMO</button>
                            <button
                                className={styles.paymentMethod}
                                onClick={() => {
                                    setMethod('E_WALLET');
                                    handleUpdateAccount(method);
                                }}>Thanh toán qua ví điện tử</button>
                        </main>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PremiumChooseScreen;