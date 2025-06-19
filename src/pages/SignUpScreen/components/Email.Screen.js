import React, { memo } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebaseConfig';

const EmailScreen = ({ nextStep, setEmail }) => {
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

    const handleSetEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleLoginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const uid = user.uid;

            const userDocRef = doc(db, 'user', uid);
            const useDoc = await getDoc(userDocRef);

            if (!useDoc.exists()) {
                await setDoc(userDocRef, {
                    email: user.email || null,
                    name: user.displayName || null,
                    imageUrl: user.photoURL || null, // Sửa lại từ user.imageUrl thành user.photoURL
                    birth: null, // Google không trả về birth, để null hoặc cho user cập nhật sau
                    gender: null, // Google không trả về gender, để null hoặc cho user cập nhật sau
                    createdAt: new Date()
                });
            }

            const idToken = await user.getIdToken();

            await fetch('http://localhost:4000/api/user/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({
                    uid,
                    email: user.email,
                    name: user.displayName,
                    imageUrl: user.photoURL,
                    birth: null,
                    gender: null,
                    createdAt: new Date(),
                    idToken,
                }),
            });

            navigate(`/main?uid=${uid}`);
        } catch (error) {
            console.error('Login with Google error:', error);
            alert('Đăng nhập với Google không thành công.');
        }

    };

    return (
        <div className='step'>
            <div className='inputSpace'>
                <div className='addInfoSpace'>
                    <h4>Email</h4>
                    <input
                        type="email"
                        placeholder='abc@gmail.com'
                        onChange={handleSetEmail}></input>
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
                    <button className='btnOtherWay' onClick={handleLoginWithGoogle}>
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