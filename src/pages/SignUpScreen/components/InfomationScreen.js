import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { v4 as uuidv4 } from 'uuid'; // Import uuid library
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';

const InfomationScreen = memo(({ email, password }) => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [error, setError] = useState('');

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

    const handleRegister = async () => {
        if (!fullName || !selectedDate || !gender) {
            setError('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        console.log(email, password);

        if (!email || !password) {
            alert('Email và mật khẩu không được để trống.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Vui lòng nhập email hợp lệ.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Cập nhật tên hiển thị
            await updateProfile(user, { fullName });

            console.log("User registered:", user);

            const userData = {
                uid: user.uid,
                email: email,
                password: password,
                name: fullName,
                birth: selectedDate ? selectedDate.toISOString() : '',
                gender: gender,
            };
            const response = await fetch('http://localhost:4000/api/user/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                alert('Đăng ký thành công!');
                navigate('/login');
            } else {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                alert(`Đã xảy ra lỗi: ${errorData.message}`);
            }

        } catch (error) {
            console.error('Error creating user:', error);
            switch (error.code) {
                case 'auth/invalid-email':
                    alert('Địa chỉ email không hợp lệ.');
                    break;
                case 'auth/email-already-in-use':
                    alert('Email đã được sử dụng. Vui lòng thử email khác.');
                    break;
                case 'auth/weak-password':
                    alert('Mật khẩu phải có ít nhất 10 ký tự.');
                    break;
                default:
                    alert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
            }
        }
    };

    return (
        <div className='step'>
            <div className='inputSpace'>
                <div className='addInfoSpace'>
                    <h4>Họ và tên</h4>
                    <input
                        type='text'
                        placeholder='Nguyễn Văn A'
                        onChange={(e) => setFullName(e.target.value)}
                        value={fullName}></input>
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
                        <label>
                            <input
                                style={{ width: 30, height: 30 }}
                                type="radio"
                                name="gender"
                                value="Male"
                                onChange={(e) => setGender(e.target.value)} />
                            <h5>Nam</h5></label>
                        <label>
                            <input
                                style={{ width: 30, height: 30 }}
                                type="radio"
                                name="gender"
                                value="Female"
                                onChange={(e) => setGender(e.target.value)} />
                            <h5>Nữ</h5></label>
                        <label>
                            <input
                                style={{ width: 30, height: 30 }}
                                type="radio"
                                name="gender"
                                value="Hide"
                                onChange={(e) => setGender(e.target.value)} />
                            <h5>Không tiết lộ</h5></label>
                    </div>
                </div>

                <div>
                    <p className='p3' style={{ marginBottom: 16 }}>
                        Với việc ấn Đăng ký, bạn đã đồng ý với mọi Điều khoản và Điều kiện sử dụng của chúng tôi</p>
                    <button onClick={handleRegister} className="btn">
                        <h4>Đăng ký</h4></button>
                </div>

            </div>
        </div >

    );
});

export default InfomationScreen;