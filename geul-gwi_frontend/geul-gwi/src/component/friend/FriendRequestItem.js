import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux'; // Redux 사용 Library
import imageDataFetcher from 'service/imageDataFetcher';

const FriendRequestItem = (props) => {
    const navigate = useNavigate();
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);

    const friendAcceptUrl = '/friend/confirm'; // 친구 요청 확인 요청 주소

    const [profile, setProfile] = useState();

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const imageUrl = await imageDataFetcher(axiosAddr, props.friend.profile);
                setProfile(imageUrl);
            } catch (error) {
                console.error('친구 프로필 이미지 가져오기 실패.', error);
            }
        };

        fetchProfileImage();
    }, [props.friend.profile]);

    // 프로필 클릭 => 해당 유저 프로필로 이동한다.
    const onClickProfile = () => {
        navigate('/main/Profile', { state: { profileUserSeq: props.friend.userSeq } });
        onClickProfile(); // 닫기
    };

    // 친구 요청 수락
    const onFriendRequestAccept = async () => {
        const userConfirmed = window.confirm(`${props.friend.nickname}님의 친구 요청을 받으시겠습니까?`);  
        if (!userConfirmed) {
            return;
        }

        try {
            const friendDTO = {
                'toUser': props.friend.userSeq, // 나에게 요청 보낸 사람
                'fromUser': userSeq, // 나
            };
            const response = await Axios.post(`${axiosAddr}${friendAcceptUrl}`, friendDTO, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            //console.log('친구 요청 수락 완료 : ', response);
            alert(`${props.friend.nickname}님과 친구가 되었습니다.`);
            props.setMenu('list');
        

        } catch (error) {
            console.error('친구 요청 수락 실패 : ', error);
        }
    };

    return (
        <Frame>
            <LeftContainer>
                <ProfileImage
                    src={profile || '/img/defaultProfile.png'}
                    onClick={onClickProfile}
                />
                <Name>{props.friend.nickname}</Name>
            </LeftContainer>
            <RightContainer>
                <Button onClick={onFriendRequestAccept}>받기</Button>
            </RightContainer>
        </Frame>
    );
};

const Frame = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 95%;
    height: auto;
    background-color: white;
    padding: 5px;
    cursor: pointer;
`;

const LeftContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 10px;
`;

const RightContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
    padding: 0 10px;
`;



const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #ccc;
    cursor: pointer;
    object-fit: cover;
    margin-right: 12px;

    &:hover {
        transform: scale(1.1);
        transition: transform 0.2s ease-in-out;
    }
`;


const Name = styled.div`
    color: #333;
    margin-bottom: 4px;
    cursor: pointer;
`;


const Button = styled.button`
    background-color: "#3498db";
    color: "white"; 
    border: none;
    padding: 7px 10px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 12px;
    transition: background-color 0.3s, color 0.3s;
    
    :hover{
        background-color: rgb(230, 230, 230);
    }
`;



export default FriendRequestItem;