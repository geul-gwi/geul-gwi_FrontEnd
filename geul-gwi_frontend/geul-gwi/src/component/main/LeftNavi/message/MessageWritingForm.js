import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux'; 

const MessageWritingForm = ({data})=> {
   const axiosAddress = useContext(AxiosAddrContext).axiosAddr;
   const messageUrl = '/message/send';
   const userSeq = useSelector((state) => state.authReducer.userSeq);
   const userToken = useSelector((state) => state.authReducer.accessToken);
   
   const [message, setMessage] = useState({ title: '', content: '' });

   // 메시지 전송 요청
   const sendMessage = () => {
      // 유효성 검사
      //if (!CheckMessage()) return;

      const messageDTO = {
         title: message.title,
         content: message.content,
         senderSeq: userSeq,
         receiverSeq: data.receiverSeq,
      };

      axios.post(`${axiosAddress}${messageUrl}`, messageDTO, {
         headers: {
            Authorization: `Bearer ${userToken}`
         }
      })
         .then((response) => {
            console.log('쪽지 전송 성공 : ', response);
            alert("쪽지 전송을 완료했습니다.");
            // 성공 후 메시지 입력란 초기화
            setMessage({ title: '', content: '' });
         })
         .catch((error) => {
            console.error('쪽지 전송 실패:', error);
            alert("쪽지 전송에 실패했습니다.");
         });

   };

   return (
      <Container>
         <Title>쪽지 보내기</Title>
         <RecipientInfo>
            <RecipientName>{data.receiverNickname}</RecipientName>
         </RecipientInfo>
         <Form>
            <Input
               type="text"
               value={message.title}
               onChange={(e) => setMessage({ ...message, title: e.target.value })}
            />
            <Textarea
               type="text"
               value={message.content}
               onChange={(e) => setMessage({ ...message, content: e.target.value })}
            />
            <CharCount>{message.content ? `${message.content.length} / 250자` : "0 / 250자"}</CharCount>
            <Button onClick={sendMessage}>전송</Button>
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
   margin-bottom: 50px;
`;

const Button = styled.button`
   padding: 8px 30px;
   border: none;
   cursor: pointer;
   margin-top: 10px;
   border-radius: 8px;
   transition: 0.3s;
   background-color: #ccebb5;
   color: white;

   &:hover {
      background-color: #ccc;
   }
`;

const Title = styled.h2`
   font-size: 18px;
   margin-bottom: 20px;
`;

const RecipientInfo = styled.div`
   display: flex;
   align-items: center;
   margin-bottom: 20px;
`;

const RecipientName = styled.span`
   font-size: 18px;
`;

const Form = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 500px;
`;

const Input = styled.input`
   margin: 10px 0;
   border: 1px solid #ccc;
   border-radius: 5px;
   height: 30px;
   width: 500px;
   padding: 10px 10px 10px 10px;
   transition: border-color 0.3s, box-shadow 0.3s; /* 변화가 부드럽게 보이도록 트랜지션 추가 */
   &:focus {
        outline: none; /* 포커스 테두리 제거 (선택 사항) */
        border-color: #ccebb5; /* 포커스 시 변경할 테두리 색상 */
        box-shadow: 0 0 8px #ccebb5; /* 포커스 시 그림자 효과 (선택 사항) */
   }
`;

const Textarea = styled.textarea`
   border: 1px solid #ccc;
   border-radius: 5px;
   resize: vertical;
   width: 500px;
   height: 100px;
   padding: 10px;
   transition: border-color 0.3s, box-shadow 0.3s; /* 변화가 부드럽게 보이도록 트랜지션 추가 */
   &:focus {
        outline: none; /* 포커스 테두리 제거 (선택 사항) */
        border-color: #ccebb5; /* 포커스 시 변경할 테두리 색상 */
        box-shadow: 0 0 8px #ccebb5; /* 포커스 시 그림자 효과 (선택 사항) */
   }
`;

const CharCount = styled.div`
    font-size: 12px;
    color: gray;
    margin-top: 5px;
    margin-bottom: 10px;
`;

export default MessageWritingForm;
