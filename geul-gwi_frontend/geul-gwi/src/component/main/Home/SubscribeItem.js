import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux'; 
import Axios from 'axios';
import imageDataFetcher from 'service/imageDataFetcher';

const SubscribeItem = ({user}) => {
    const navigate = useNavigate();

    // 프로필 클릭 => 해당 유저 프로필로 이동한다.
    const onClickProfile = () => {
        navigate('/main/Profile', { state: { profileUserSeq: user.userSeq }});
    };

    return (
        <Frame>
            <ProfileImage
                src={user.profile || '/img/defaultProfile.png'}
                onClick={onClickProfile}
            />
            <Name onClick={onClickProfile}>{user.nickname}</Name>
        </Frame>
    );
};

const Frame = styled.div`
    display: flex;
    align-items: center;
    width: 90%;
    height: auto;
    background-color: white;
    font-size: 14px;
    padding:5px;
    border-bottom: 1px solid rgb(240, 240, 240);
    justify-content: center;
    transform: 0.3s;
    :hover{
        background-color: rgb(240, 240, 240);
    }

    @media (max-width: 1300px) {
        flex-direction: column;
    }
`;

const ProfileImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #ccc;
    margin-right: 10px;
    cursor: pointer;
    object-fit: cover;

    &:hover {
        transform: scale(1.1);
        transition: transform 0.2s ease-in-out;
    }
`;

const Name = styled.div`
    margin-bottom: 2px;
    cursor: pointer;
`;

export default SubscribeItem;