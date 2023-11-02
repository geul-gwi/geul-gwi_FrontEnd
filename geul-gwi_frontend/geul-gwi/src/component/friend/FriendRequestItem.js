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
            <ProfileImage 
                src={profile || '/img/defaultProfile.png'} 
                onClick={onClickProfile}
            />
            <ContentContainer>
                <TopRow>
                    <Name>{props.friend.nickname}</Name>
                </TopRow>
            </ContentContainer>
            <ProfileContainer>
                <Button onClick={onFriendRequestAccept}>확인</Button>
            </ProfileContainer>
        </Frame>
    );
};

const Frame = styled.div`
    display: flex;
    align-items: center;
    width: 95%;
    height: auto;
    background-color: white;
    transition: background-color 0.2s;
    font-size: 14px;
    padding: 5px;
    border-radius: 16px;
        border-bottom: 1px solid rgb(240, 240, 240);
    &:hover {
        cursor: pointer;
        background-color: rgb(245, 245, 245);
    }
`;

const TopRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 4px;
`;

const ProfileImage = styled.img`
    /* 이미지 스타일 */
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid #ccc;
    margin-right: 10px;
    margin-left: 10px;
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
    flex: 9;
`;

const Name = styled.div`
    font-weight: bold;
    margin-bottom: 2px;
`;


const Button = styled.div`
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 8px;
    width: 100px;
    height: 30px;

    &:hover {
        cursor: pointer;
        background-color: rgb(245, 245, 245);
    }
`;


export default FriendRequestItem;