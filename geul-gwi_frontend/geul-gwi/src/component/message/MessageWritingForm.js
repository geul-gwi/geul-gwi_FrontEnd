import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux'; 
import { Button } from 'component/common/button/Button';

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
         <Title>쪽지</Title>
         <RecipientInfo>
            <RecipientLabel></RecipientLabel>
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
               placeholder="내용"
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
   width: 300px;
   height: 30px;
   &:focus {
        outline: none; /* 포커스 테두리 제거 (선택 사항) */
        border-color:  #ccebb5; /* 포커스 시 변경할 테두리 색상 */
        box-shadow: 0 0 5px  #ccebb5; /* 포커스 시 그림자 효과 (선택 사항) */
    }
`;

const Textarea = styled.textarea`
   margin: 10px 0;
   padding: 10px;
   border: 1px solid #ccc;
   border-radius: 5px;
   resize: vertical;
   width: 500px;
   height: 150px;
   &:focus {
        outline: none; /* 포커스 테두리 제거 (선택 사항) */
        border-color:  #ccebb5; /* 포커스 시 변경할 테두리 색상 */
        box-shadow: 0 0 5px  #ccebb5; /* 포커스 시 그림자 효과 (선택 사항) */
    }
`;

const CharCount = styled.div`
    font-size: 12px;
    color: gray;
    margin-top: 5px;
    margin-bottom: 10px;
`;

export default MessageWritingForm;
