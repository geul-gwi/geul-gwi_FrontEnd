import React from 'react';
import { useLocation } from 'react-router-dom';

// component
import ChallengePostEditForm from 'component/main/Writing/edit/ChallengePostEditForm';

const ChallengePostEditPage = () => {
    const location = useLocation();
    const data = location.state;

    return (
        <ChallengePostEditForm 
            data={data} 
        />
    );
};

export default ChallengePostEditPage;