import React from 'react';
import { useLocation } from 'react-router-dom';

// import Component
import Profile from 'component/user/profile/Profile';

const ProfilePage = () => {
    const location = useLocation();
    const profileUserSeq = location.state.profileUserSeq;

    return (
        <Profile
            profileUserSeq={profileUserSeq}
        />
    );
};

export default ProfilePage;