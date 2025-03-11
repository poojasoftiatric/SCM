import React, { useEffect, useState } from 'react';
import '../styles/myProfile.css';

const MyProfile = () => {
    const [profiles, setProfiles] = useState([]);

    const fetchProfile = async () => {
        try {
            let response = await fetch('http://localhost:5000/api/manufacturings/');
            let data = await response.json();
            setProfiles(data); // Assuming the API returns an array of profiles
        } catch (error) {
            console.error('Error fetching profiles:', error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div className="profile-list">
            <h1>Profile Information showing here:</h1>
            <ul className="profile-information">
                <li className="profile-information-list">S. No.</li>
                <li className="profile-information-list">Name</li>
                <li className="profile-information-list">Email</li>
                <li className="profile-information-list">Password</li>
            </ul>
            {profiles.map((profile, index) => (
                <ul key={profile._id}>
                    <li className="profile-information-list">{index + 1}</li>
                    <li className="profile-information-list">{profile.username}</li>
                    <li className="profile-information-list">{profile.email}</li>
                    <li className="profile-information-list">{profile.password}</li>
                </ul>
            ))}
        </div>
    );
};

export default MyProfile;
