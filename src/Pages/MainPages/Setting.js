import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Setting.css';

function Setting() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // 이메일과 비밀번호를 처리하는 로직 추가
        console.log('Email:', email);
        console.log('Password:', password);
        // 이후에 설정 페이지로 이동하거나 다른 작업 수행 가능
    };

    return (
        <div className='SettingBox'>
            <div className="setting-container">
                <h1 className='Settingh1'>Account Settings</h1>
                <div className='AccountBox'>
                    {/* 계정 관리 탭 */}
                    
                    <h3>My Account</h3>
                    {/* <Link to="/setting/my-account">내 계정</Link> */}
                    <ul>
                        <li>내 계정(이메일)</li>
                        {/* 데이터베이스 연결 */}
                    </ul>
                </div>
                {/* 비밀번호 변경 양식 */}
                <div className='PasswordBox'>
                    <h2>Password Setting</h2>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="password"
                            placeholder="new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input 
                            type="password"
                            placeholder="confirm"
                        />
                        <button type="submit" className='PasswordBtn'>SAVE</button>
                    </form>
                </div>
                <div>
                    {/* 프로필 수정 탭 */}
                    <h2>Profile Setting</h2>
                    <Link to="/profile" className='ProfileLink' style={{ textDecoration: "none"}}>
                        <button className='ProfileBtn'>
                            <span className='ProfileText'>Profile Edit</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Setting;
