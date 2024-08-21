// src/components/AdminLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import '../Styles/Login.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/admin/login', {
                email,
                password
            });

            if (response.data.message === 'Admin login successful!') {
                localStorage.setItem('admin', 'true');
                navigate('/admin-dashboard');
            }
        } catch (error) {
            console.error('Admin login error:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-left">
                    <h2>Admin Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="lform-group">
                            <div className="linput-container">
                                <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="lform-group">
                            <div className="linput-container">
                                <FontAwesomeIcon icon={faLock} className="input-icon" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>
                <div className="login-right">
                    <img src="https://scentswala.com/front-assets/img/main/others/login-side-img.png" alt="Login" />
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
