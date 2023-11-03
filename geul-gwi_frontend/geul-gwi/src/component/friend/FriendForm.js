import React, { useState } from 'react';
import styled from 'styled-components';

import { AiOutlineClose } from 'react-icons/ai';
// component
import FriendListForm from 'component/friend/FriendListForm';
import FriendRequestForm from 'component/friend/FriendRequestForm';


const FriendForm = (props) => {
    const [menu, setMenu] = useState('list'); // 현재 선택된 메뉴 ('list' 또는 'requests')

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
                {menu === 'list' ? <FriendListForm /> : 
            <FriendRequestForm 
              setMenu={setMenu}
            />}
            </ScrollableSubContainer>
        </Frame>
    );
};

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 100vh;
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

const TitleContainer = styled.div`
  display: flex;
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
    border-bottom: ${props => props.active ? '1px solid #F2C936 ' : 'none'};
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