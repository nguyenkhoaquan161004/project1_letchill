import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InfomationScreen = memo(() => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);

    const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
        <div onClick={onClick} ref={ref} style={{ display: 'flex', border: '2px solid #fff', borderRadius: 10, alignItems: 'center' }}>
            <input
                type="text"
                value={value}
                readOnly
                placeholder="Chọn ngày"
                style={{ border: 'none' }}
            />
            <Icon icon="solar:calendar-linear" style={{ marginRight: 20, width: 32, height: 32, backgroundColor: 'transparent' }} />
        </div>
    ));

    return (
        <div className='step'>
            <div className='inputSpace'>
                <div className='addInfoSpace'>
                    <h4>Họ và tên</h4>
                    <input type='text' placeholder='Nguyễn Văn A'></input>
                </div>
                <div className='addInfoSpace'>
                    <h4>Ngày tháng năm sinh</h4>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        customInput={
                            <CustomInput />
                        }
                    />
                </div>
                <div className='addInfoSpace'>
                    <h4>Giới tính</h4>
                    <div style={{ display: 'flex', gap: 106 }}>
                        <label><input style={{ width: 30, height: 30 }} type="radio" name="gender" /> <h5>Nam</h5></label>
                        <label><input style={{ width: 30, height: 30 }} type="radio" name="gender" /> <h5>Nữ</h5></label>
                        <label><input style={{ width: 30, height: 30 }} type="radio" name="gender" /> <h5>Không tiết lộ</h5></label>
                    </div>
                </div>

                <div>
                    <p className='p3' style={{ marginBottom: 16 }}>Với việc ấn Đăng ký, bạn đã đồng ý với mọi Điều khoản và Điều kiện sử dụng của chúng tôi</p>
                    <button onClick={() => navigate("/main")} className="btn">
                        <h4>Đăng ký</h4></button>
                </div>

            </div>
        </div>

    );
});

export default InfomationScreen;