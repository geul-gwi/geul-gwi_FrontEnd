import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux'; // Redux 사용 Library
import NoticeItem from 'component/notice/NoticeItem';
import { AiOutlineClose } from 'react-icons/ai';

const TYPE = {};
TYPE['FRIEND'] = 'friendSeq';
TYPE['MESSAGE'] = 'meesageSeq';
TYPE['GEULGWI'] = 'geulgwiSeq';
TYPE['LIKE_GEULGWI'] = 'geulgwiLikeSeq';
TYPE['CHALLENGE'] = 'challenge';
TYPE['LIKE_CHALLENGE'] = 'challengeLickSeq';

const FriendForm = (props) => {
    //const navigate = useNavigate();
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);
    const friendListUrl = '/friend/list/'; // 친구 목록 요청 주소
    const friendDeleteUrl = '/friend/delete'; // 친구 삭제 요청 주소

    const [friends, setFriends] = useState([]); // 알림 데이터

    useEffect(() => {
        // 친구 목록 요청
        async function fetchUserProfile() {
            try {
                const response = await Axios.get(`${axiosAddr}${friendListUrl}${userSeq}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                //console.log('친구 목록 요청 성공 : ', response.data);
                setFriends(response.data);
            } catch (error) {
                console.error('친구 목록 요청 실패:', error);
            }
        }
        fetchUserProfile();
    }, []);

    // 친구 삭제 처리
    const friendDeleteHandler = async (friendSeq) => {
        try {
            const response = await Axios.delete(`${axiosAddr}${friendDeleteUrl}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            console.log('친구 삭제 완료 : ', response);
            setFriends((prevNotices) => prevNotices.filter((friends) => friends.userSeq !== friendSeq));
        } catch (error) {
            console.error('알림 삭제 실패 : ', error);
        }
    };

    // 닫기 버튼 클릭
    const onClickCloseButton = async () => {
        props.handleFriendClick();
    };

    return (
        <Frame>
            <TitleContainer>
                <span>친구</span>
                <CloseButton onClick={onClickCloseButton}>
                    <AiOutlineClose size={15} color='gray' />
                </CloseButton>
            </TitleContainer>
            <ScrollableSubContainer>
                {friends.length === 0 ? (
                    <AlertEmptyMessage>목록이 비어있습니다.</AlertEmptyMessage>
                ) : (
                        friends.map((friend) => (
                        <NoticeItem
                            friend={friend}
                            friendDeleteHandler={friendDeleteHandler}
                        />
                    ))
                )}
            </ScrollableSubContainer>
        </Frame>
    );
};

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  height: 600px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: white;
  padding: 5px;
  user-select: none;
`;

const CloseButton = styled.div` // 닫기 버튼
    position: absolute; 
    right: 15px; 
    cursor: pointer;
`;

const AlertEmptyMessage = styled.div` 
  margin-top: 20px;
  font-size: 13px;
  color: gray;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 15px 20px;
`;

const ScrollableSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  border-top: 1px solid rgb(235, 235, 235);
  scrollbar-width: thin;
  scrollbar-color: gray lightgray;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: gray;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: darkgray;
  }

  ::-webkit-scrollbar-track {
    background-color: lightgray;
  }
`;

export default FriendForm;