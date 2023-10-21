import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
// Import Library
import { useSelector } from 'react-redux'; // Redux 사용 Library

const MessageWritingForm = ({ receiverSeq, receiverNickName }) => {
   const axiosAddress = useContext(AxiosAddrContext).axiosAddr;
   const receiverDeleteUrl = '/message/send';
   // 유저 로그인 정보
   const userSeq = useSelector((state) => state.authReducer.userSeq);
   const userToken = useSelector((state) => state.authReducer.accessToken);
   const [message, setMessage] = useState({ title: '', content: '' });

   // 메시지 전송 요청
   const sendMessage = () => {
      if (message.title && message.content) {
         const messageDTO = {
            title: message.title,
            content: message.content,
            senderSeq: userSeq,
            receiverSeq: receiverSeq, // 받는 사람의 고유 식별자
         };

         axios.post(`${axiosAddress}${receiverDeleteUrl}`, messageDTO, {
               headers: {
                  Authorization: `Bearer ${userToken}`
               }
         })
         .then((response) => {
            console.log('메시지가 전송 성공 : ', response);
            // 성공 후 메시지 입력란 초기화
            setMessage({ title: '', content: '' });
         })
         .catch((error) => {
            console.error('메시지 전송 실패:', error);
         });
      }
   };

   return (
      <Container>
         <Title>메시지</Title>
         <RecipientInfo>
            <RecipientLabel>받는 사람:</RecipientLabel>
            <RecipientName>{receiverNickName}</RecipientName>
         </RecipientInfo>
         <Form>
            <Input
               type="text"
               placeholder="제목을 입력하세요"
               value={message.title}
               onChange={(e) => setMessage({ ...message, title: e.target.value })}
            />
            <Textarea
               placeholder="메시지를 입력하세요"
               value={message.content}
               onChange={(e) => setMessage({ ...message, content: e.target.value })}
            />
            <SendButton onClick={sendMessage}>전송</SendButton>
         </Form>
      </Container>
   );
};

const Container = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
   padding: 20px;
   border-radius: 10px;
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
   background-color: white;
`;

const Title = styled.h2`
   font-size: 20px;
   margin-bottom: 20px;
`;

const RecipientInfo = styled.div`
   display: flex;
   align-items: center;
   margin-bottom: 20px;
`;

const RecipientLabel = styled.span`
   font-weight: bold;
   margin-right: 10px;
`;

const RecipientName = styled.span`
   font-size: 18px;
`;

const Form = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
`;

const Input = styled.input`
   margin: 10px 0;
   padding: 5px;
   border: 1px solid #ccc;
   border-radius: 5px;
   width: 500px;
   height: 40px;
`;

const Textarea = styled.textarea`
   margin: 10px 0;
   padding: 10px;
   border: 1px solid #ccc;
   border-radius: 5px;
   resize: vertical;
   width: 500px;
   height: 300px;
`;

const SendButton = styled.button`
   display: flex;
   align-items: center;
   justify-content: center;
   margin-top: 10px;
   padding: 10px 60px;
   background-color: white;
   border: 1px solid #ccc;
   border-radius: 8px;
   cursor: pointer;
`;

export default MessageWritingForm;
