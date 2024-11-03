import React, { memo } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const EmailScreen = ({ nextStep }) => {
    const navigate = useNavigate();
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    const handleOnClick = () => {
        navigate("/login");
        scrollToTop();
    }

    return (
        <div className='step'>
            <div className='inputSpace'>
                <div className='addInfoSpace'>
                    <h4>Email</h4>
                    <input type='text' placeholder='abc@gmail.com'></input>
                </div>
                <button onClick={nextStep} className="btn">
                    <h4>Tiếp theo</h4></button>
            </div>
            <div className='anotherWay' >
                <div className='lineOr'>
                    <div className='line'></div>
                    <h5>Hoặc</h5>
                    <div className='line'></div>
                </div>

                <div className='listOfWay'>
                    <button className='btnOtherWay'>
                        <Icon className='iconOtherWay' icon="flat-color-icons:google" />
                        <h4>Đăng ký với Google</h4>
                    </button>
                    <button className='btnOtherWay'>
                        <Icon className='iconOtherWay' icon="logos:facebook"></Icon>
                        <h4>Đăng ký với Facebook</h4>
                    </button>
                </div>
            </div>
            <div className='wayToLogin'>
                <div className='lineEnd'></div>
                <h5 className='o50'>Đã có tài khoản? <span onClick={handleOnClick}>Đăng nhập ngay</span></h5>
            </div>
        </div>
    );
};

export default EmailScreen;