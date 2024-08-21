// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo"></Link>
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <Link to="/signup" className="navbar-link">Signup</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/login" className="navbar-link">Login</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/admin-login" className="navbar-link">Admin</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/profile" className="navbar-link">Profile</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
