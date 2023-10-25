import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux'; // Redux 사용 Library

const FriendRequestItem = (props) => {
    const navigate = useNavigate();
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);

    const [profile, setProfile] = useState();

    useEffect(() => {
        fetchImageData(props.notice.profile)
            .then(imageUrl => {
                setProfile(imageUrl);
            })
            .catch(error => {
                console.error('이미지 가져오기에 실패했습니다.', error);
            });
    }, []);

    // 이미지 데이터를 가져오는 함수
    const fetchImageData = async (path) => {
        try {
            const encodedPath = encodeURIComponent(path);
            const response = await Axios.get(`${axiosAddr}/file?file=${encodedPath}`, {
                responseType: 'blob',
            });

            if (response) {
                const newFile = new File([response.data], 'image');
                const reader = new FileReader();
                return new Promise((resolve, reject) => {
                    reader.onload = (event) => {
                        const imageUrl = event.target.result;
                        resolve(imageUrl);
                    };
                    reader.onerror = (error) => {
                        reject(error);
                    };
                    reader.readAsDataURL(newFile);
                });
            }
        } catch (error) {
            console.error('이미지 가져오기에 실패했습니다.', error);
            return null;
        }
    }

    const onClickDelete = () => {
        alert(`${props.friend.nickname}님을 정말로 삭제하시겠습니까?`);
        props.friendDeleteHandler(props.friend.userSeq);
    };

    // 프로필 클릭 => 해당 유저 프로필로 이동한다.
    const onClickProfile = () => {
        navigate('/main/Profile', { state: { profileUserSeq: props.friend.userSeq } });
        onClickProfile(); // 닫기
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
                <CloseButton onClick={onClickDelete}></CloseButton>
            </ProfileContainer>
        </Frame>
    );
};

const Frame = styled.div`

    display: flex;
    align-items: center;
    width: 100%;
    height: auto;
    background-color: white;
    transition: background-color 0.2s;
    font-size: 14px;
    padding: 5px;
    border-radius: 16px;
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

const RedDot = styled.div`
        position: absolute; 
        top: 18px; /* 원하는 위치 조절 */
        right: 30px; /* 원하는 위치 조절 */
        width: 8px; /* 원하는 크기 조절 */
        height: 8px; /* 원하는 크기 조절 */
        background-color: rgb(220,0,0);
        border-radius: 50%;
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

const Content = styled.div`
    color: #333;
    margin-bottom: 4px;
`;

const Time = styled.div`
    color: rgb(150, 150, 150);
    font-size: 12px;
`;

const CloseButton = styled.div`
    margin-left: 5px;
    font-size: 20px;
    cursor: pointer;
`;

const FollowButton = styled.button`
    background-color: ${props => props.isFollowing ? "#f2f2f2" : "#3498db"};
    color: ${props => props.isFollowing ? "#333" : "white"}; 
    border: none;
    padding: 5px 15px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 12px;
    transition: background-color 0.3s, color 0.3s;
    
    &:hover {
        background-color: ${props => props.isFollowing ? "#e0e0e0" : "#2380c1"};
    }
`;

export default FriendRequestItem;