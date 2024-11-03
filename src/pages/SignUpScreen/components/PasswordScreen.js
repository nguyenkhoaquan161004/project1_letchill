import React, { memo, useState } from 'react';
import { Icon } from '@iconify/react';

const PasswordScreen = ({ nextStep }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (event) => {
        setPassword(event.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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
                        <h4>Mật khẩu phải có ít nhất:</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <p className='uiRegular'>1 số hoặc ký tự đặc biệt (#@% ...)</p>
                            <p className='uiRegular'>Nhiều hơn 10 ký tự</p>
                        </div>

                    </div>
                </div>
                <button onClick={nextStep} className="btn">
                    <h4>Tiếp theo</h4></button>
            </div>
        </div>
    );
};

export default PasswordScreen;