import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux'; // Redux 사용 Library
import imageDataFetcher from 'service/imageDataFetcher';
import { AiOutlineClose } from 'react-icons/ai';

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

    const friendAcceptUrl = '/friend/confirm'; // 친구 요청 확인 요청 주소
    const friendStatusUrl = '/friend/status'; // 친구 상태 요청 주소

    const [friendStatus, setFriendStatus] = useState(null);

    useEffect(() => {
        imageDataFetcher(axiosAddr, props.notice.profile)
            .then(imageUrl => {
                setProfile(imageUrl);
            })
            .catch(error => {
                console.error('상대 프로필 이미지 가져오기에 실패했습니다.', error);
            });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const status = await CheckFriendStatus();
            setFriendStatus(status);
        };
        fetchData();
    }, [props.notice.fromUser]);

    // 서버에서 받은 시간 표준으로 바꾸는 함수!!
    function parseISOString(s) {
        // 2023-10-28 04:57:51
        const year = s.slice(0, 4);
        const month = s.slice(5, 7) - 1; // 월은 0부터 시작하므로 1을 빼줍니다.
        const day = s.slice(8, 10);
        const hour = s.slice(11, 13);
        const minute = s.slice(14, 16);
        const second = s.slice(17, 19);
        return new Date(year, month, day, hour, minute, second);
    }
    // 시간 계산하는 함수!! (n분 전, n시간 전, 어제, 날짜)
    function formatDateTime() {
        const currentDate = new Date();
        const messageDate = parseISOString(props.notice.regDate);
        //console.log("변환하기 전 시간 : ", props.notice.regDate);
        //console.log("변환한 시간 : ", messageDate);
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

    const onClickDelete = () => {
        props.noticeDeleteHandler(props.notice.noticeSeq);
    };

    // 알림 타입에 따라서 내용 변환하는 함수
    // 알림 타입에 따라서 내용 변환하는 함수
    const generateMessage = () => {
        switch (props.notice.type) {
            case 'FRIEND':
                return (
                    <span>
                        <Nickname>{props.notice.nickname}</Nickname>
                        {'님에게 친구 요청이 왔습니다.'}
                    </span>
                );
            case 'MESSAGE':
                return (
                    <span>
                        <Nickname>{props.notice.nickname}</Nickname>
                        {'님이 쪽지를 보냈습니다.'}
                    </span>
                );
            case 'GEULGWI':
                return (
                    <span>
                        <Nickname>{props.notice.nickname}</Nickname>
                        {'님이 글 귀를 작성했습니다.'}
                    </span>
                );
            case 'LIKE_GEULGWI':
                return (
                    <span>
                        <Nickname>{props.notice.nickname}</Nickname>
                        {'님이 회원님의 글 귀에 좋아요를 눌렀습니다.'}
                    </span>
                );
            case 'CHALLENGE':
                return (
                    <span>
                        <Nickname>{props.notice.nickname}</Nickname>
                        {'님이 챌린지 글 귀를 작성했습니다.'}
                    </span>
                );
            case 'LIKE_CHALLENGE':
                return (
                    <span>
                        <Nickname>{props.notice.nickname}</Nickname>
                        {'님이 회원님의 챌린지에 좋아요를 눌렀습니다.'}
                    </span>
                );
            default:
                return 'Error';
        }
    };


    // 친구 상태인지 체크하는 함수
    const CheckFriendStatus = async () => {
        try {
            const friendDTO = {
                'toUser': props.notice.fromUser, // 확인하고 싶은 사람
                'fromUser': userSeq, // 나
            };
            //console.log(`관계 확인 : `, friendDTO);
            const response = await Axios.post(`${axiosAddr}${friendStatusUrl}`, friendDTO, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            //console.log(response.data);

            return response.data;

        } catch (error) {
            console.error('친구 상태 확인 실패 : ', error);
        }
    };

    // 프로필 클릭 => 해당 유저의 프로필로 이동한다.
    const onClickProfile = () => {
        navigate('/main/Profile', { state: { profileUserSeq: props.notice.fromUser } });
        props.handleAlertClick(); // 닫기
    };

    // 친구 요청 수락
    const onFriendRequestAccept = async () => {
        // 이미 친구 상태인지 확인한다.
        if (friendStatus === 'friend') {
            alert("이미 친구 상태입니다.");
            return;
        }
        try {
            const friendDTO = {
                'toUser': props.notice.fromUser, // 나에게 요청 보낸 사람
                'fromUser': userSeq, // 나
            };
            const response = await Axios.post(`${axiosAddr}${friendAcceptUrl}`, friendDTO, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            //console.log('친구 요청 수락 완료 : ', response);
           
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
                    <Content>{generateMessage()}</Content>
                </TopRow>
                <Time>{formatDateTime(props.notice.regDate)}</Time>
            </ContentContainer>
            <ProfileContainer>
                {friendStatus !== 'friend' && props.notice.type === 'FRIEND' &&
                <Button onClick={onFriendRequestAccept}>확인</Button>}
                {props.notice.checked === 'F' && <RedDot /> }
                <CloseButton onClick={onClickDelete}> 
                    <AiOutlineClose size={12} color='gray' />
                 </CloseButton>
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
    padding: 10px;
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
        background-color: rgb(242,151,165);
        border-radius: 50%;
`;

const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
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
    flex: 3;
    position: relative;
`;


const ContentContainer = styled.div`
    flex: 9;
`;

const Nickname = styled.span`
    font-weight: bold;
`;

const Content = styled.div`
    color: #333;
    margin-bottom: 4px;
`;

const Time = styled.div`
    color: rgb(150, 150, 150);
    font-size: 13px;
`;

const CloseButton = styled.div`
    position: absolute;
    margin-left: 5px;
    cursor: pointer;
    right: 3px;
`;

const Button = styled.button`
    position: absolute;
    right: 25px;
    background-color: "#3498db";
    color: "white"; 
    border: none;
    padding: 7px 23px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 12px;
    transition: background-color 0.3s, color 0.3s;
    
    :hover{
        background-color: rgb(230, 230, 230);
    }
`;



export default NoticeItem;