import React, { memo, useState } from 'react';
import clsx from 'clsx';
import styles from './LoginScreen.module.css';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig'; // Firebase auth config
import { signInWithEmailAndPassword } from 'firebase/auth'; // Firebase sign-in function
import { useAdmin } from '../../contexts/AdminContext';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const LoginScreen = memo(() => {
    const navigate = useNavigate();
    // USE CONTEXT HERE TO LOGIN IN ADMIN ACCOUNT
    const { setIsAdmin } = useAdmin();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        }
        );
    };

    const handleOnClickSignup = () => {
        navigate('/signup');
        scrollToTop();
    };

    const handleLogin = async () => {
        if (!email || !password) {
            alert('Email và mật khẩu không được để trống.');
            return;
        }

        // Nếu là admin, không cần xác thực Firebase
        if (email === 'admin@letchill.com' && password === 'admin123') {
            setIsAdmin(true);
            navigate(`/main`, { state: { authorize: 'ADMIN' } });
            return;
        }

        // Các tài khoản khác mới xác thực qua Firebase
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
            const response = await fetch(`http://localhost:4000/api/user/sign-in`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uid })
            });

            const userCurrent = await response.json();
            // const token = userCurrent.token.idToken;
            localStorage.setItem('token', userCurrent.token.idToken);


            console.log(userCurrent.role)

            if (userCurrent.role === 'ADMIN') {
                setIsAdmin(true);
                navigate(`/main`);
                return;
            }
            else {
                setIsAdmin(false);
                navigate(`/main?uid=${uid}`);
            }

        } catch (error) {
            console.error('Login error:', error);
            alert('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
        }
    };

    const handleLoginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const idToken = await user.getIdToken();

            await fetch('http://localhost:4000/api/user/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({
                    uid: user.uid,
                    email: user.email,
                    name: user.displayName,
                    imageUrl: user.photoURL,
                    birth: null,
                    gender: null,
                    createdAt: new Date(),
                    idToken,
                }),
            });

            setIsAdmin(false);
            navigate(`/main?uid=${user.uid}`);
        } catch (error) {
            console.error('Login with Google error:', error);
            alert('Đăng nhập với Google không thành công.');
        }
    };

    return (
        <div>
            <Icon icon="mingcute:left-fill" onClick={() => navigate(-1)} className={styles.icon} />

            <div className={styles.mainContainer}>
                <h2>ĐĂNG NHẬP VÀO <span className={styles.highlight}> letchill</span></h2>
                <div className={styles.mainSpace}>
                    <div className={styles.inputSpace}>
                        <div className={styles.addInfoSpace}>
                            <h4>Email</h4>
                            <input
                                type='email'
                                placeholder='abc@gmail.com'
                                onChange={handleEmailChange}></input>
                        </div>

                        <div className={styles.addInfoSpace}>
                            <h4>Mật khẩu</h4>
                            <div style={{ display: 'flex', gap: 20, border: '1px solid #fff', borderRadius: 10 }}>
                                <input type={showPassword ? 'text' : 'password'} value={password} style={{ border: 'none' }}
                                    onChange={handlePasswordChange} placeholder='...'></input>
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    style={{ border: 'none' }}
                                >
                                    <Icon icon={showPassword ? 'iconoir:eye-solid' : 'mdi:eye-closed'} style={{ fontSize: '32px', backgroundColor: 'transparent', marginRight: 20 }} />
                                </button>
                            </div>
                        </div>

                        <button
                            className={styles.btn}
                            onClick={handleLogin}>
                            <h4>Đăng nhập</h4></button>
                    </div>
                    <div className={styles.anotherWay} >
                        <div className={styles.lineOr}>
                            <div className={styles.line}></div>
                            <h5>Hoặc</h5>
                            <div className={styles.line}></div>
                        </div>

                        <div className={styles.listOfWay}>
                            <button className={styles.btnOtherWay} onClick={handleLoginWithGoogle}>
                                <Icon className={styles.iconOtherWay} icon="flat-color-icons:google" />
                                <h4>Đăng nhập với Google</h4>
                            </button>
                            <button className={styles.btnOtherWay}>
                                <Icon className={styles.iconOtherWay} icon="logos:facebook"></Icon>
                                <h4>Đăng nhập với Facebook</h4>
                            </button>
                        </div>
                    </div>
                    <div className={styles.wayToLogin}>
                        <div className={styles.lineEnd}></div>
                        <h5 className={styles.o50}>Chưa có tài khoản? <span onClick={handleOnClickSignup}>Đăng ký ngay</span></h5>
                    </div>
                </div>
            </div>

            <div className='graBG'></div>
        </div>
    );
});

LoginScreen.propTypes = {

};

export default LoginScreen;