import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux'; 
import Axios from 'axios';
import imageDataFetcher from 'service/imageDataFetcher';

const FriendItem = (props) => {
    const navigate = useNavigate();
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);
    const [profile, setProfile] = useState();
    const [isSubscribed, setIsSubscribed] = useState(props.friend.isSubscribed); // 구독 상태 여부

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

    // 친구 삭제
    const onClickDelete = () => {
        const userConfirmed = window.confirm(`정말로 ${props.friend.nickname}님과 친구를 끊으시겠습니까?`);  
        if (userConfirmed) {
            props.friendDeleteHandler(props.friend.userSeq);
        }
    };

    // 프로필 클릭 => 해당 유저 프로필로 이동한다.
    const onClickProfile = () => {
        navigate('/main/Profile', { state: { profileUserSeq: props.friend.userSeq } });
    };

    const toggleSubscription = async () => {
        let confirmMessage = ''; 
        if (isSubscribed === 'T') {
            confirmMessage = `${props.friend.nickname}님의 소식을 받지 않겠습니까?`;
        } else {
            confirmMessage = `${props.friend.nickname}님의 소식을 받겠습니까?`;
        }

        const userConfirmed = window.confirm(confirmMessage);
        if (userConfirmed) {
            try {
                const friendDTO = {
                    'toUser': props.friend.userSeq, // 요청 받는 사람
                    'fromUser': userSeq, // 요청 보낸 사람
                };
                console.log(friendDTO);
                const response = await Axios.post(`${axiosAddr}/friend/subscribe`, friendDTO, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                console.log('구독:', response);
                setIsSubscribed(isSubscribed === 'T' ? 'F' : 'T');
            } catch (error) {
                console.error('구독:', error);
            }
        }
    };

    return (
        <Frame>
            <ProfileImage
                src={profile || '/img/defaultProfile.png'}
                onClick={onClickProfile}
            />
            <ContentContainer>
                    <Name onClick={onClickProfile}>{props.friend.nickname}</Name>
            </ContentContainer>
            <ProfileContainer>
                <CloseButton onClick={onClickDelete}>친구 끊기</CloseButton>
                <SubscribeButton onClick={toggleSubscription}>
                    {isSubscribed === 'T' ?
                        < img src={process.env.PUBLIC_URL + "/icon/notification1.png"}
                            style={{ width: '30px', height: '30px' }}
                        ></img>
                        : <img src={process.env.PUBLIC_URL + "/icon/notification2.png"}
                            style={{ width: '30px', height: '30px' }}
                        ></img>
                    }
                </SubscribeButton>
            </ProfileContainer>
        </Frame>
    );
};

const Frame = styled.div`
    display: flex;
    align-items: center;
    width: 92%;
    height: auto;
    background-color: white;

    font-size: 14px;
    padding:5px;
    border-radius: 16px;
    border-bottom: 1px solid rgb(240, 240, 240);
`;

const SubscribeButton = styled.button`
    margin-left: 5px;
    cursor: pointer;
    font-size: 25px;
    color: black;
    background-color: white;
    border: none;

    &:hover {
        transform: scale(1.1);
        transition: transform 0.2s ease-in-out;
    }
`;

const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
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

const ProfileContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex: 1;
    position: relative;
`;

const ContentContainer = styled.div`
    flex: 8;
`;

const Name = styled.div`
    font-weight: bold;
    margin-bottom: 2px;
    cursor: pointer;
`;

const CloseButton = styled.div`
    display: flex;
    border: 1px solid #ccc;
    width: 100px;
    height: 30px;
    background-color: white;
    border-radius: 8px;
    margin-left: 5px;
    cursor: pointer;
    border-color: #ccc;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s;

    :hover{
        background-color: rgb(240, 240, 240);
    }
`;


export default FriendItem;