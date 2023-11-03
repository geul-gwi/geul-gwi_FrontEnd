import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
// component
import MessageWritingForm from 'component/main/LeftNavi/message/MessageWritingForm';
import imageDataFetcher from 'service/imageDataFetcher';

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
         receiverSeq: message.senderSeq,
         receiverNickname: message.senderNickname
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
         .then(async (response) => {

               console.log('받은 목록 요청 성공 :', response);
               //setMessages(response.data);
               const messagesWithImages = await Promise.all(response.data.map(async (message) => {
                  const profileImage = await imageDataFetcher(axiosAddress, message.senderProfile);
                  return { ...message, profileImage };
               }));
               setMessages(messagesWithImages);
            
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
         .then(async (response) => {
            if (response) {
               console.log('보낸 메시지 목록 요청 성공 :', response);
               const messagesWithImages = await Promise.all(response.data.map(async (message) => {
                  const profileImage = await imageDataFetcher(axiosAddress, message.senderProfile);
                  return { ...message, profileImage };
               }));
               setMessages(messagesWithImages);
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
         {selectedMessage && (
            <MessageWritingForm
               data={selectedMessage}
            />
         )}
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
                     <ProfileContainer>
                        {selectedTab === "received" ? (
                           <ProfilePicture
                              src={messages.senderProfile ? messages.senderProfile : '/img/defaultProfile.png'}
                           />
                        ) : (
                           <ProfilePicture
                              src={messages.senderProfile ? messages.senderProfile : '/img/defaultProfile.png'}
                           />
                        )}

                        {selectedTab === "received" ? (
                           <Nickname>{message.senderNickname}</Nickname>
                        ) : (
                           <Nickname>{message.receiverNickname}</Nickname>
                        )}
                     </ProfileContainer>
                     <Title>{message.title}</Title>
                     <Message>{message.content}</Message>
                     <DeleteButton onClick={() => deleteMessage(message.messageSeq)}>
                        <AiOutlineClose size={12} color='gray' />
                     </DeleteButton>
                     {selectedTab === "received" && <ReplyButton onClick={() => replyToMessage(message)}>답장하기</ReplyButton>}
                  </MessageItem>
               ))}
            </MessageList>
         </Container>

      </>
   );
};

const Container = styled.div`
   display: flex;
   flex-direction: column;
   user-select: none;
   padding: 20px;
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
   background-color: white;
   margin-bottom: 20px;
   border-radius: 16px;
`;

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    justify-content: center;
`

const Tabs = styled.div`
   display: flex;
   justify-content: center;
   margin-bottom: 20px;
`;

const ProfilePicture = styled.img`
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 1px solid #ccc;
    cursor: pointer;
    object-fit: cover;
    margin-right: 10px; // 닉네임 오른쪽에 여백 추가

    &:hover {
        transform: scale(1.1);
        transition: transform 0.2s ease-in-out;
    }
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
   margin-left: 10px;
   margin-bottom: 20px;
`;

const EmptyMessage = styled.p`
   color: grey;
`;

const MessageList = styled.div`
   display: flex;
   align-items: center;
   flex-direction: column;
   gap: 10px;
`;

const MessageItem = styled.div`
   width: 90%;   
   border: 1px solid #ccc;
   padding: 15px;
   border-radius: 16px;
   box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
   transition: transform 0.3s;
   position: relative;

   &:hover {
      transform: scale(1.02);
   }
`;

const Nickname = styled.div`
    flex: 1; // 텍스트 길이에 따라 적절한 크기로 조정
`;

const Title = styled.div`
   margin-bottom: 20px;
   font-weight: bold;
`;

const Message = styled.div`
   margin-bottom: 20px;
   min-height: 30px;
`;

const ReplyButton = styled.button`
   padding: 8px 25px;
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
