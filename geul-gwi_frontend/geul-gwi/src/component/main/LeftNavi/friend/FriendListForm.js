import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux'; 
import FriendItem from 'component/main/LeftNavi/friend/FriendItem';
import imageDataFetcher from 'service/imageDataFetcher';

const FriendListForm = () => {
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);
    const friendListUrl = '/friend/list/friend/'; // 친구 목록 요청 주소
    const friendDeleteUrl = '/friend/delete'; // 친구 삭제 요청 주소
   
    const [friends, setFriends] = useState([]);  // 친구 목록을 상태로 관리하고, 초기값은 빈 배열

    useEffect(() => {
        // 친구 목록 요청 
       
        fetchUserProfile();
    }, [friends, axiosAddr, userSeq, userToken]); // 의존성 목록 추가

    async function fetchUserProfile() {
        try {
            const response = await Axios.get(`${axiosAddr}${friendListUrl}${userSeq}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            //console.log('친구 목록 요청 성공 : ', response.data);

            const friendListWithProfileImages = [];

            for (const friend of response.data) {
                try {
                    const imageUrl = await imageDataFetcher(axiosAddr, friend.profile);
                    friendListWithProfileImages.push({
                        ...friend,
                        profile: imageUrl,
                    });
                } catch (error) {
                    console.error('친구 프로필 이미지 가져오기 실패.', error);
                }
            }

            setFriends(friendListWithProfileImages);
        } catch (error) {
            console.error('친구 목록 요청 실패:', error);
        }
    }

    // 친구 삭제 처리
    const friendDeleteHandler = async (friendSeq) => {
        try {
            const response = await Axios.delete(`${axiosAddr}${friendDeleteUrl}?toUser=${friendSeq}&fromUser=${userSeq}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            //console.log('친구 삭제: ', response);
            setFriends((prevNotices) => prevNotices.filter((friends) => friends.userSeq !== friendSeq));
            fetchUserProfile();
        } catch (error) {
            console.error('친구 삭제: ', error);
        }
    };

    return (
        <Frame>
            {friends && friends.map((friend) => (
                <FriendItem
                    key={friend.userSeq} // 유일한 키 할당
                    friend={friend}
                    friendDeleteHandler={friendDeleteHandler}
                />
            ))}
        </Frame>
    );
};

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  height: 600px;
  border-radius: 10px;
  background-color: white;
  padding: 5px;
  user-select: none;
  align-items: center;
`;

export default FriendListForm;