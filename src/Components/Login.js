import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/Login.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });
  
      console.log('Response from server:', response.data);
  
      if (response.data.message === 'Login successful!') {
        const { userId } = response.data;
        localStorage.setItem('userId', userId); // Store userId for future requests
  
        // Navigate to the profile page after successful login
        navigate('/profile');
  
        toast.success('Login successful!');
      } else {
        toast.error('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
  
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
  
      toast.error('Login failed. Please try again.');
    }
  };
  
  
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <h2>Login</h2>
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
          {message && <p>{message}</p>}
          <p className="signup-link">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
        <div className="login-right">
          <img src="https://scentswala.com/front-assets/img/main/others/login-side-img.png" alt="Login" />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
