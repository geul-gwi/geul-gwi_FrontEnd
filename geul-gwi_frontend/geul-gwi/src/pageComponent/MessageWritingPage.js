import React from 'react';
import { useLocation } from 'react-router-dom';

// component
import MessageWritingForm from 'component/main/LeftNavi/message/MessageWritingForm';

const MessagePage = () => {
    const location = useLocation();
    // Check if location.state is not null or undefined
    const data = location.state;
  
    return (
        <MessageWritingForm
            data={data}
        />
    );
};

export default MessagePage;