import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux'; // Redux 사용 Library
import imageDataFetcher from 'service/imageDataFetcher';

const MemberItem = (props) => {
  const axiosAddress = useContext(AxiosAddrContext).axiosAddr;  
  const userToken = useSelector((state) => state.authReducer.accessToken);
  const userDetailApi = '/user/detail/';
  const [profile, setProfile] = useState(null);



  const handleClick = async () => {
    try {
      const response = await Axios.get(`${axiosAddress}${userDetailApi}${props.user.userSeq}`, {
        headers: {
          Authorization: "Bearer " + userToken
        }
      });
      //console.log("회원 세부정보: ", response);
      props.handleShowProfile(response.data);
    } catch (error) {
      console.error('회원 세부정보: ', error);
    }
  };

  return (
    <Item>
      <Container>
        <ProfileImage
          src={props.user.profile || '/img/defaultProfile.png'}
          onClick={handleClick}
        />
        <UserName onClick={handleClick}>{props.user.nickname}</UserName>
      </Container>
      <ButtonContainer>
        <DeleteButton onClick={() => props.handleDelete(props.user.userSeq)}>삭제</DeleteButton>
      </ButtonContainer>
    </Item>
  )
};

const Item = styled.div`
  user-select: none;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 16px;
  :hover{
    background-color: rgb(240, 240, 240);
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative; 
`;

const ProfileImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
      :hover{
      cursor: pointer;
    }
`;

const UserName = styled.p`
    margin-left: 15px;
    font-size: 15px;
        :hover{
      cursor: pointer;
    }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DeleteButton = styled.div`
    background-color: #f2f2f2;
    padding: 8px 18px;
    border-radius: 8px;
    font-size: 15px;
    user-select: none;
    :hover{
      cursor: pointer;
    }

`;

export default MemberItem;