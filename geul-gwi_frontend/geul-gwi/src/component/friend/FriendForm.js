import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux'; // Redux 사용 Library
import { AiOutlineClose } from 'react-icons/ai';
// component
import FriendListForm from 'component/friend/FriendListForm';
import FriendRequestForm from 'component/friend/FriendRequestForm';


const FriendForm = (props) => {
    //const navigate = useNavigate();
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);
    const friendListUrl = '/friend/list/'; // 친구 목록 요청 주소
    const friendRequestsUrl = '/friend/list/'; // 친구 목록 요청 주소
    const friendDeleteUrl = '/friend/delete'; // 친구 삭제 요청 주소

    const [friends, setFriends] = useState([]); // 친구 목록 데이터
    const [menu, setMenu] = useState('list'); // 현재 선택된 메뉴 ('list' 또는 'requests')

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
            <MenuContainer>
                <Menu onClick={() => setMenu('list')} active={menu === 'list'}>
                    목록
                </Menu>
                <Menu onClick={() => setMenu('requests')} active={menu === 'requests'}>
                    받은 요청
                </Menu>
            </MenuContainer>
            <ScrollableSubContainer>
                {menu === 'list' ? <FriendListForm /> : <FriendRequestForm />}
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
  border-radius: 0 10px 10px 0;
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

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 45px;
  border-top: 1px solid #ccc;
`;

const Menu = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex: 1;
    background-image: linear-gradient(90deg,#F66767,#F66767);
    background-size : 0% 1px;
    background-repeat :no-repeat;
    background-position : bottom;
    transition : background-size 200ms ease;
    border-bottom: ${props => props.active ? '1px solid #F66767' : 'none'};
    &:hover{
        background-color: rgb(245, 245, 245);
    }
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