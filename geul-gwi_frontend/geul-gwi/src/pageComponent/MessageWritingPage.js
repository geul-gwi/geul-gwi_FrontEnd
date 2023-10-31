import React from 'react';
import { useLocation } from 'react-router-dom';

// component
import MessageWritingForm from 'component/message/MessageWritingForm';

const MessagePage = () => {
    const location = useLocation();
    // Check if location.state is not null or undefined
    const receiverSeq = location.state && location.state.receiverSeq;
    const receiverNickname = location.state && location.state.receiverNickname;

  
    return (
        <MessageWritingForm
            receiverSeq={receiverSeq}
            receiverNickname={receiverNickname}
        />
    );
};

export default MessagePage;