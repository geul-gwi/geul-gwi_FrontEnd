import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
// Library
import { useSelector } from 'react-redux'; // Redux 사용 Library
// component
import MessageWritingForm from 'component/Message/MessageWritingForm';

const MessageForm = () => {
   const axiosAddress = useContext(AxiosAddrContext).axiosAddr;
   const receiverDeleteUrl = '/message/receiver/delete/';
   const senderDeleteUrl = '/message/sender/delete/';
   // 유저 로그인 정보
   const userSeq = useSelector((state) => state.authReducer.userSeq);
   const userToken = useSelector((state) => state.authReducer.accessToken);
   
   const [selectedMessage, setSelectedMessage] = useState(null); // 선택한 메시지 정보
   const [selectedTab, setSelectedTab] = useState("received");
   const [messages, setMessages] = useState([
      {
         messageSeq: 1,
         title: "쪽지 제목",
         content: '뭐해?',
         senderSeq: 2,
         senderNickname: "세정",
         receiverSeq: 1,
         receiverNickName: '재희'
      },
      {
         messageSeq: 2,
         title: "쪽지 제목",
         content: '뭐해?',
         senderSeq: 2,
         senderNickname: "안건",
         receiverSeq: 1,
         receiverNickName: '세정'
      },
      {
         messageSeq: 3,
         title: "배고프네",
         content: '뭐해?',
         senderSeq: 2,
         senderNickname: "세정",
         receiverSeq: 1,
         receiverNickName: '재희'
      },
   ]);

   // 답장하기 버튼을 클릭하면 해당 메시지 정보를 선택하고 MessageWritingForm을 표시
   const replyToMessage = (message) => {
      setSelectedMessage(message);
   }

   // 메시지 삭제 요청
   const deleteMessage = (messageSeq) => {
      // 사용자가 보낸 사람인지, 받은 사람인지에 따라 요청하는 주소가 다르다.
      const deleteUrl = (selectedTab === "sent") ? senderDeleteUrl : receiverDeleteUrl;
      axios.delete(`${axiosAddress}${deleteUrl}${messageSeq}`, {}, {
         headers: {
            Authorization: `Bearer ${userToken}`,
         },
      })
         .then((response) => {
            if (response) {
               console.log('메시지 삭제 성공 :', response);
               const updatedMessages = messages.filter((message) => message.messageSeq !== messageSeq);
               setMessages(updatedMessages);
            }
         })
         .catch((error) => {
            console.error('메시지 삭제 실패 :', error);
         });
   }


   return (
      <>
      <Container>
         <Tabs>
            <TabButton
               onClick={() => setSelectedTab("received")}
               active={selectedTab === "received"}
            >
               받은 쪽지
            </TabButton>
            <TabButton
               onClick={() => setSelectedTab("sent")}
               active={selectedTab === "sent"}
            >
               보낸 쪽지
            </TabButton>
         </Tabs>
         <Header>{selectedTab === "received" ? "받은 쪽지함" : "보낸 쪽지함"}</Header>

         <MessageList>
            {messages && messages.map((message) => (
               <MessageItem key={message.messageSeq}>
                  {selectedTab === "received" ? (
                     // 받은 쪽지함에서는 답장하기 버튼 표시
                     <>
                        <Sender>보낸 사람: {message.senderNickname}</Sender>
                     </>
                  ) : (
                     <Recipient>받는 사람: {message.receiverNickName}</Recipient>
                  )}
                  <Title>제목: {message.title}</Title>
                  <MessageContent>내용: {message.content}</MessageContent>
                  <DeleteButton onClick={() => deleteMessage(message.messageSeq)}>X</DeleteButton>
                  {selectedTab === "received" ? (
                     <ReplyButton onClick={() => replyToMessage(message)}>답장하기</ReplyButton>
                     ) : (null)
                  }
               </MessageItem>
            ))}
         </MessageList>
      </Container>
         {selectedMessage && (
            <MessageWritingForm
               receiverSeq={selectedMessage.senderSeq}
               receiverNickName={selectedMessage.senderNickname}
            />
         )}
      </>
   );
};

const Container = styled.div`
   flex-direction: column;
   width: 100%;
   user-select: none;
   padding: 20px;
   border-radius: 10px;
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
   background-color: white;
   margin-bottom: 20px;
`;

const Tabs = styled.div`
   display: flex;
   justify-content: center;
   margin-bottom: 20px;
`;

const TabButton = styled.button`
   background-color: ${(props) => (props.active ? "#0074D9" : "#ccc")};
   color: #fff;
   border: none;
   padding: 10px 20px;
   cursor: pointer;
   margin: 0 10px;
   border-radius: 5px;
   transition: background-color 0.3s;

   &:hover {
      background-color: ${(props) => (props.active ? "#0059A0" : "#aaa")};
   }
`;

const Header = styled.h1`
   font-size: 24px;
   margin-bottom: 20px;
`;

const MessageList = styled.ul`
   list-style: none;
   padding: 0;
`;

const MessageItem = styled.li`
   border: 1px solid #ccc;
   padding: 20px;
   margin: 20px 0;
   border-radius: 10px;
   box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
   transition: transform 0.3s;
   position: relative;

   &:hover {
      transform: scale(1.02);
   }
`;

const Sender = styled.div`
   font-weight: bold;
   margin-bottom: 10px;
`;

const Recipient = styled.div`
   font-weight: bold;
   margin-bottom: 10px;
`;

const Title = styled.div`
   font-weight: bold;
   margin-bottom: 10px;
`;

const MessageContent = styled.div``;

const ReplyButton = styled.button`
   background-color: #0074D9;
   color: #fff;
   border: none;
   padding: 5px 10px;
   cursor: pointer;
   margin: 10px 0;
   border-radius: 5px;
   transition: background-color 0.3s;

   &:hover {
      background-color: #0059A0;
   }
`;

const DeleteButton = styled.div`
   position: absolute;
   top: 5px;
   right: 5px;
   border: none;
   width: 25px;
   height: 25px;
   border-radius: 50%;
   display: flex;
   justify-content: center;
   align-items: center;
   cursor: pointer;
   transition: background-color 0.3s;
`;


export default MessageForm;
