// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../Styles/Signup.css';
import Navbar from './Navbar';
const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        gender: ''
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/signup', formData);
            alert('Signup successful');
            setFormData({
                name: '',
                email: '',
                password: '',
                gender: ''
            }); // Clear form after submission
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('There was an error!', error);
            alert('Signup failed: ' + error.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div>
        <Navbar/>
        <div className="signup-container">
            
            <div className="signup-form">
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    
                    <label>Email Id:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    
                    <label>Gender:</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    
                    <button type="submit">Signup</button>
                </form>
            </div>
        </div>
        /</div>
    );
};

export default Signup;
