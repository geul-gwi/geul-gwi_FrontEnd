import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux'; 
import Axios from 'axios';
import imageDataFetcher from 'service/imageDataFetcher';

const SubscribeItem = (props) => {
    const navigate = useNavigate();
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);
    const [profile, setProfile] = useState();

    // 프로필 클릭 => 해당 유저 프로필로 이동한다.
    const onClickProfile = () => {
        navigate('/main/Profile', { state: { profileUserSeq: props.user.userSeq } });
    };

    return (
        <Frame>
            <ProfileImage
                src={profile || '/img/defaultProfile.png'}
                onClick={onClickProfile}
            />
            <ContentContainer>
                    <Name onClick={onClickProfile}>{props.user.nickname}</Name>
            </ContentContainer>
        </Frame>
    );
};

const Frame = styled.div`
    display: flex;
    align-items: center;
    width: 80%;
    height: auto;
    background-color: white;
    font-size: 14px;
    padding:5px;
    border-radius: 16px;
    border-bottom: 1px solid rgb(240, 240, 240);
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

const ContentContainer = styled.div`
    flex: 8;
`;

const Name = styled.div`
    font-weight: bold;
    margin-bottom: 2px;
    cursor: pointer;
`;

export default SubscribeItem;