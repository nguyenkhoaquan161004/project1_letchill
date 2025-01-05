import React, { memo, useState } from 'react';
import '../../App.css';
import styles from './SignUpScreen.css'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom';
import EmailScreen from './components/Email.Screen.js';
import PasswordScreen from './components/PasswordScreen.js';
import InfomationScreen from './components/InfomationScreen.js';

const SignUpScreen = memo(() => {
    const [step, setStep] = useState(1);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const nextStep = () => {
        setStep(prevStep => prevStep + 1);
        scrollToTop();
    };

    const backStep = () => {
        if (step > 1) {
            setStep(prevStep => prevStep - 1);
            scrollToTop();
        }
        if (step === 1) navigate("/");
    };

    return (
        <div id='signUpScreen'>
            <div className="arrow">
                <Icon icon="mingcute:left-fill" onClick={backStep} className="icon" />
                <Icon icon="mingcute:right-fill" className="icon" />
            </div>

            <div className="mainContainer">
                <h2>ĐĂNG KÝ ĐỂ BẮT ĐẦU <span className="highlight"> NGHE NHẠC</span></h2>

                <div className="mainSpace">
                    {step === 1 && <EmailScreen
                        nextStep={nextStep}
                        setEmail={setEmail} />}
                    {step === 2 && <PasswordScreen
                        nextStep={nextStep}
                        setPassword={setPassword} />}
                    {step === 3 && <InfomationScreen
                        email={email}
                        password={password} />}
                </div>

            </div>

            <div className="graBG"></div>
        </div>
    );
});

export default SignUpScreen;