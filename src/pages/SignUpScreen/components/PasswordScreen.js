import React, { memo, useState } from 'react';
import { Icon } from '@iconify/react';

const PasswordScreen = ({ nextStep, setPassword }) => {
    const [password, updatePassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (event) => {
        updatePassword(event.target.value);
        setError('');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validatePassword = () => {
        if (password.length < 10) {
            setError('Mật khẩu phải có ít nhất 10 ký tự.');
            return false;
        }

        const regex = /[\d#@%]/;
        if (!regex.test(password)) {
            setError('Mật khẩu phải có 1 số và 1 ký tự đặc biệt.')
            return false;
        }

        return true;
    }

    const handleNextStep = () => {
        if (validatePassword()) {
            setPassword(password);
            nextStep();
        }
    }

    return (
        <div className='step'>
            <div className='inputSpace'>
                <div className='addInfoSpace'>
                    <h4>Mật khẩu</h4>
                    <div style={{ display: 'flex', gap: 20, border: '1px solid #fff', borderRadius: 10 }}>
                        <input type={showPassword ? 'text' : 'password'} value={password} style={{ border: 'none' }}
                            onChange={handleChange} placeholder='...'></input>
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            style={{ border: 'none' }}
                        >
                            <Icon icon={showPassword ? 'iconoir:eye-solid' : 'mdi:eye-closed'} style={{ fontSize: '32px', backgroundColor: 'transparent', marginRight: 20 }} />
                        </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}></div>
                        <h4>Mật khẩu phải có ít nhất:</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <p className='uiRegular'>1 số và 1 ký tự đặc biệt (#@% ...)</p>
                            <p className='uiRegular'>Nhiều hơn 10 ký tự</p>
                        </div>

                    </div>
                </div>
                <button onClick={handleNextStep} className="btn">
                    <h4>Tiếp theo</h4></button>
            </div>
        </div>
    );
};

export default PasswordScreen;