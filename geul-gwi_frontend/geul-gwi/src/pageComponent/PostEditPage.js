import React from 'react';
import { useLocation } from 'react-router-dom';

// Component
import PostEditForm from 'component/main/Writing/edit/PostEditForm';

const PostEditPage = () => {
    const location = useLocation();
    const data = location.state;

    return (
        <PostEditForm 
            data={data} 
        />
    );
};

export default PostEditPage;