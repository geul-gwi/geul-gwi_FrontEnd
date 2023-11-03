import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux'; // Redux 사용 Library
import FriendRequestItem from 'component/friend/FriendRequestItem';

const FriendRequestForm = (props) => {
    //const navigate = useNavigate();
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);
    
    const friendRequestsUrl = '/friend/list/pending/'; // 친구 요청 목록 요청 주소
    const friendAcceptUrl = '/friend/confirm'; // 친구 요청 확인 요청 주소

    const [requests, setRequests] = useState([]); // 친구 요청 목록 데이터

    useEffect(() => {
        // 친구 요청 받은 목록 요청
        async function fetchUserProfile() {
            try {
                const response = await Axios.get(`${axiosAddr}${friendRequestsUrl}${userSeq}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                console.log('친구 요청 받은 목록 요청 성공 : ', response.data);
                setRequests(response.data);
            } catch (error) {
                console.error('친구 요청 받은 목록 요청 실패:', error);
            }
        }
        fetchUserProfile();
    }, []);

    // 친구 요청 수락
    const onFriendRequestAccept = async (friend) => {
        const userConfirmed = window.confirm(`${friend.nickname}님의 친구 요청을 받으시겠습니까?`);
        if (!userConfirmed) {
            return;
        }

        try {
            const friendDTO = {
                'toUser': friend.userSeq, // 나에게 요청 보낸 사람
                'fromUser': userSeq, // 나
            };
            const response = await Axios.post(`${axiosAddr}${friendAcceptUrl}`, friendDTO, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            //console.log('친구 요청 수락 완료 : ', response);
            alert(`${friend.nickname}님과 친구가 되었습니다.`);
            props.setMenu('list');


        } catch (error) {
            console.error('친구 요청 수락 실패 : ', error);
        }
    };

    return (
        <Frame>
            {requests.map((friend) => (
                <FriendRequestItem
                    key={friend.userSeq}
                    friend={friend}
                    onFriendRequestAccept={onFriendRequestAccept}
                />
            ))}
        </Frame>
    );
};

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 10px;
  background-color: white;
  padding: 5px;
  user-select: none;
  align-items: center;
`;

export default FriendRequestForm;