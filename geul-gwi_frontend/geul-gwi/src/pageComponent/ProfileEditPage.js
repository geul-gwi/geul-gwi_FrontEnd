import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';

// import Component
import ProfileEditForm from 'component/user/profile/edit/ProfileEditForm';

const ProfileEditPage = () => {
    const location = useLocation();
    const userInfo = location.state;
    
    return (
        <Fragment>
            <ProfileEditForm userInfo={userInfo} />
        </Fragment>
    );
};

export default ProfileEditPage;