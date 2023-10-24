import React from 'react';
import { useLocation } from 'react-router-dom';

// Component
import PostEditForm from 'component/main/Writing/edit/PostEditForm';

const PostEditPage = () => {
    const location = useLocation();
    const post = location.state;

    return (
        <PostEditForm 
            post={post} 
        />
    );
};

export default PostEditPage;