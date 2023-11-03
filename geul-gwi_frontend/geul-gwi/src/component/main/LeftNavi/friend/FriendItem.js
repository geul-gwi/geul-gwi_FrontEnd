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
            <LeftContainer>
                <ProfileImage
                    src={profile || '/img/defaultProfile.png'}
                    onClick={onClickProfile}
                />
                <Name onClick={onClickProfile}>{props.friend.nickname}</Name>
            </LeftContainer>
            <RightContainer>
                <Button onClick={onClickDelete}>친구 끊기</Button>
                <SubscribeButton onClick={toggleSubscription}>
                    {isSubscribed === 'T' ?
                        < img src={ "/icon/notification1.png"}
                            style={{ width: '25px', height: '25px' }}
                        ></img>
                        : <img src={ "/icon/notification2.png"}
                            style={{ width: '25px', height: '25px' }}
                        ></img>
                    }
                </SubscribeButton>
            </RightContainer>
        </Frame>
    );
};

const Frame = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 75%;
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

const SubscribeButton = styled.button`

    cursor: pointer;
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
    margin-right: 12px;

    &:hover {
        transform: scale(1.1);
        transition: transform 0.2s ease-in-out;
    }
`;

const Name = styled.div`
    color: #333;
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


export default FriendItem;