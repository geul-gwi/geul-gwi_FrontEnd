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


    return (
        <Frame>
            {requests.map((friend) => (
                <FriendRequestItem
                    key={friend.userSeq}
                    friend={friend}
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: white;
  padding: 5px;
  user-select: none;
`;

export default FriendRequestForm;