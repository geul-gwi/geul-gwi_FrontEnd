import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux'; // Redux 사용 Library

const TYPE = {};
TYPE['FRIEND'] = 'friendSeq';
TYPE['MESSAGE'] = 'messageSeq';
TYPE['GEULGWI'] = 'geulgwiSeq';
TYPE["LIKE_GEULGWI"] = 'geulgwiLikeSeq';
TYPE['CHALLENGE'] = 'challenge';
TYPE['LIKE_CHALLENGE'] = 'challengeLickSeq';

const NoticeItem = (props) => {
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
    }, [props.notice.profile]);

    // 서버에서 받은 시간 표준으로 바꾸는 함수!!
    function parseISOString(s) {
        //  2023-10-2416:49:21.969055245
        const year = s.slice(0, 4);
        const month = s.slice(5, 7) - 1; // 월은 0부터 시작하므로 1을 빼줍니다.
        const day = s.slice(8, 10);
        const hour = s.slice(10, 12);
        const minute = s.slice(13, 15);
        const second = s.slice(16, 18);
        return new Date(year, month, day, hour, minute, second);
    }
    // 시간 계산하는 함수!! (n분 전, n시간 전, 어제, 날짜)
    function formatDateTime() {
        const currentDate = new Date();
        const messageDate = parseISOString(props.notice.regDate);
        // console.log("변환하기 전 시간 : ", props.notice.regDate);
        // console.log("변환한 시간 : ", messageDate);
        const timeDiff = currentDate - messageDate;
        const seconds = Math.floor(timeDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        if (seconds < 60) {
            return "방금";
        } else if (minutes < 60) {
            return `${minutes}분 전`;
        } else if (hours < 24) {
            return `${hours}시간 전`;
        } else if (hours >= 24 && hours < 48) {
            return "어제";
        } else {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            return messageDate.toLocaleDateString(undefined, options);
        }
    }

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
        props.noticeDeleteHandler(props.notice.noticeSeq);
    };

    const generateMessage = () => {
        switch (props.notice.type) {
            case 'FRIEND':
                return `${props.notice.nickname}님이 친구 요청을 했습니다.`;
            case 'MESSAGE':
                return `${props.notice.nickname}님이 쪽지를 보냈습니다.`;
            case 'GEULGWI':
                return `${props.notice.nickname}님이 글 귀를 작성했습니다.`;
            case "LIKE_GEULGWI":
                return `${props.notice.nickname}님이 회원님의 글 귀에 좋아요를 눌렀습니다.`;
            case 'CHALLENGE':
                return `${props.notice.nickname}님이 챌린지 글 귀를 작성했습니다.`;
            case 'LIKE_CHALLENGE':
                return `${props.notice.nickname}님이 회원님의 챌린지에 좋아요를 눌렀습니다.`;
            default:
                return 'Error';
        }
    };

    // 프로필 클릭 => 해당 유저의 프로필로 이동한다.
    const onClickProfile = () => {
        navigate('/main/Profile', { state: { profileUserSeq: props.notice.fromUser } });
        //onClickProfile(); // 닫기
    };

    return (
        <Frame>
            <ProfileImage 
                src={profile || '/img/defaultProfile.png'} 
                onClick={onClickProfile}
            />
            <ContentContainer>
                <TopRow>
                    <Content>{generateMessage()}</Content>
                </TopRow>
                <Time>{formatDateTime(props.notice.regDate)}</Time>
            </ContentContainer>
            <ProfileContainer>
                {!props.notice.checked && <RedDot /> }
                <CloseButton onClick={onClickDelete}>&times;</CloseButton>
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

export default NoticeItem;