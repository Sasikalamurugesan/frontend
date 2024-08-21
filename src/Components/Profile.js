import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Profile.css'; // Make sure to import the CSS file
import Navbar from './Navbar';
const Profile = () => {
    const [profileData, setProfileData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfileData = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setError('User not authenticated');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/api/profile', {
                    headers: { userId }
                });
                setProfileData(response.data);
            } catch (err) {
                setError('There was an error fetching your profile');
                console.error('Error fetching profile:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    if (loading) return <div className="message">Loading...</div>;
    if (error) return <div className="message">{error}</div>;

    return (
        <div>
            <Navbar/>
      
        <div className="profile-container">
            <div className="profile-card">
                <h2>Profile</h2>
                <div className="profile-info">
                    <p><strong>Name:</strong> {profileData.name}</p>
                    <p><strong>Email:</strong> {profileData.email}</p>
                    <p><strong>Gender:</strong> {profileData.gender}</p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Profile;
