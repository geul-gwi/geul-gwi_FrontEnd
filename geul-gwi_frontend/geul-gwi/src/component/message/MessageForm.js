import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AxiosAddrContext } from 'contextStore/AxiosAddress'; 
import { useSelector } from 'react-redux';
// component
import MessageWritingForm from 'component/message/MessageWritingForm';

const MessageForm = () => {
   const axiosAddress = useContext(AxiosAddrContext).axiosAddr;
   const receiverDeleteUrl = '/message/receiver/delete/'; // 받은 사람이 메시지 삭제 
   const senderDeleteUrl = '/message/sender/delete/'; // 보낸 사람이 메시지 삭제 
   const receiveListUrl = '/message/receiver/list/'; // 받은 메시지 리스트 요청 주소
   const sendListUrl = '/message/sender/list/'; // 보낸 메시지 리스트 요청 주소

   const userSeq = useSelector((state) => state.authReducer.userSeq);
   const userToken = useSelector((state) => state.authReducer.accessToken);
   
   const [selectedMessage, setSelectedMessage] = useState(null); // 선택한 메시지 정보
   const [selectedTab, setSelectedTab] = useState("received");
   const [messages, setMessages] = useState([]);

   useEffect(() => {
      if (selectedTab === "received") {
         GetReceiveMessage(); // 받은 쪽지 목록 요청
      } else {
         GetSendMessage(); // 보낸 쪽지 목록 요청
      }
    }, []);

   // 답장하기 버튼을 클릭하면 해당 메시지 정보를 선택하고 MessageWritingForm을 표시
   const replyToMessage = (message) => {
      console.log("답장하기:", message);
      const data = {
         receiverSeq : message.senderSeq,
         receiverNickname : message.senderNickname
      }
      setSelectedMessage(data);
   }

   // 메시지 삭제 요청
   const deleteMessage = (messageSeq) => {
      // 사용자가 보낸 사람인지, 받은 사람인지에 따라 요청하는 주소가 다르다.
      const deleteUrl = (selectedTab === "sent") ? senderDeleteUrl : receiverDeleteUrl;
      //console.log('요청한 주소 : ', `${axiosAddress}${deleteUrl}${messageSeq}`);
      axios.post(`${axiosAddress}${deleteUrl}${messageSeq}`, {}, {
         headers: {
            Authorization: `Bearer ${userToken}`,
         },
      })
         .then((response) => {
            if (response) {
               console.log('삭제 성공 :', response);
               const updatedMessages = messages.filter((message) => message.messageSeq !== messageSeq);
               setMessages(updatedMessages);
            }
         })
         .catch((error) => {
            console.error('삭제 실패 :', error);
         });
   }

   // 받은 쪽지 목록 가져오기
   const GetReceiveMessage = () => {
      axios.post(`${axiosAddress}${receiveListUrl}${userSeq}`, {}, {
         headers: {
            Authorization: `Bearer ${userToken}`,
         },
      })
         .then((response) => {
            if (response) {
               console.log('받은 목록 요청 성공 :', response);
               setMessages(response.data);
            }
         })
         .catch((error) => {
            console.error('받은 목록 요청 실패 :', error);
         });
   }

   // 보낸 쪽지 목록 가져오기
   const GetSendMessage = () => {
      axios.post(`${axiosAddress}${sendListUrl}${userSeq}`, {}, {
         headers: {
            Authorization: `Bearer ${userToken}`,
         },
      })
         .then((response) => {
            if (response) {
               console.log('보낸 메시지 목록 요청 성공 :', response);
               setMessages(response.data);
            }
         })
         .catch((error) => {
            console.error('보낸 메시지 목록 요청 실패 :', error);
         });
   }

   // 받은 메시지와 보낸 메시지 메뉴 클릭 이벤트 핸들러
   const handleTabClick = (tab) => {
      setSelectedTab(tab); // 선택한 탭 설정
      if (tab === "received") {
         GetReceiveMessage(); // 받은 쪽지 목록 요청
      } else {
         GetSendMessage(); // 보낸 쪽지 목록 요청
      }
   }

   return (
      <>
      <Container>
         <Tabs>
            <TabButton
                  onClick={() => handleTabClick("received")}
               active={selectedTab === "received"}
            >
               받은 쪽지
            </TabButton>
            <TabButton
                  onClick={() => handleTabClick("sent")}
               active={selectedTab === "sent"}
            >
               보낸 쪽지
            </TabButton>
         </Tabs>
         <Header>{selectedTab === "received" ? "받은 쪽지함" : "보낸 쪽지함"}</Header>

         <MessageList>
               {messages.length === 0 ? (<EmptyMessage>쪽지함이 비었습니다.</EmptyMessage>) : (null)}
            {messages && messages.map((message) => (
               <MessageItem key={message.messageSeq}>
                  {selectedTab === "received" ? (
                        <Sender>보낸 사람: {message.senderNickname}</Sender>
                  ) : (
                     <Recipient>받는 사람: {message.receiverNickname}</Recipient>
                  )}
                  <Title>제목: {message.title}</Title>
                  <div>{message.content}</div>
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
               data={selectedMessage}
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
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
   background-color: white;
   margin-bottom: 20px;
   border-radius: 16px;
`;

const Tabs = styled.div`
   display: flex;
   justify-content: center;
   margin-bottom: 20px;
`;

const TabButton = styled.button`
   background-color: ${(props) => (props.active ? "#ccebb5" : "#ccc")};
   color: #fff;
   border: none;
   padding: 10px 20px;
   cursor: pointer;
   margin: 0 10px;
   border-radius: 5px;
   transition: background-color 0.3s;

   &:hover {
      background-color: #aaa;
   }
`;

const Header = styled.h1`
   font-size: 20px;
   margin-bottom: 20px;
`;

const EmptyMessage = styled.p`
   color: grey;
`;

const MessageList = styled.ul`
   display: flex;
   flex-direction: column;
   justify-content: center;
   list-style: none;
   padding: 0;
   margin: none;
`;

const MessageItem = styled.li`
   border: 1px solid #ccc;
   padding: 20px;
   margin: 10px 0;
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
   margin-bottom: 20px;
`;

const ReplyButton = styled.button`
   border: solid 1px #ccc;
   padding: 5px 10px;
   cursor: pointer;
   margin-top: 10px;
   background-color: white;
   border-radius: 5px;
   transition: background-color 0.3s;

   &:hover {
      background-color: #ccc;
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
