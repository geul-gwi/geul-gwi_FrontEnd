import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux'; // Redux 사용 Library
import imageDataFetcher from 'service/imageDataFetcher';
import { AiOutlineClose } from 'react-icons/ai';
import PostModal from 'component/common/modal/PostModal';

const TYPE = {};
TYPE['FRIEND'] = 'friendSeq';
TYPE['MESSAGE'] = 'messageSeq';
TYPE['GEULGWI'] = 'geulgwiSeq';
TYPE["LIKE_GEULGWI"] = 'geulgwiLikeSeq';
TYPE['CHALLENGE'] = 'challenge';
TYPE['LIKE_CHALLENGE'] = 'challengeLickSeq';

const NoticeItem = (props) => {
    const { formatDateTime } = require('service/dateTimeUtils');
    const navigate = useNavigate();
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);

    const [profile, setProfile] = useState();
    const [ModalState, setModalState] = useState(false);
    const [viewPost, setViewPost] = useState(null); // 모달창 게시물 데이터

    const friendAcceptUrl = '/friend/confirm'; // 친구 요청 확인 요청 주소
    const friendStatusUrl = '/friend/status'; // 친구 상태 요청 주소
    const postDetailUrl = '/geulgwi/search/'; // 게시물 세부 요청 주소

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

    const onClickDelete = () => {
        props.noticeDeleteHandler(props.notice.noticeSeq);
    };

    // 팝업 띄우는 함수
    const ModalOpen = async (notice) => {

        switch(notice.type)
        {
            case 'GEULGWI':
                try {
                    const response = await Axios.get(`${axiosAddr}${postDetailUrl}${notice.geulgwiSeq}?viewSeq=${userSeq}`, {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                    });
                    if (response) {
                        console.log("팝업 창에 세부 게시물 : ", response.data);
                        setViewPost(response.data);
                        setModalState(true); // 데이터가 로드된 후에 모달을 열도록 변경
                    }
                } catch (error) {
                    console.error('팝업 창 세부 게시물 불러오기 실패.', error);
                }
                break;

                case 'MESSAGE':
                    navigate('/main/message');
                    break;
        }
    }


    const ModalClose = () => {
        setViewPost(null); // Clear the viewPost data
        setModalState(false); // Set the ModalState to false to close the modal
    };

    // 알림 타입에 따라서 내용 변환하는 함수
    const generateMessage = () => {
        switch (props.notice.type) {
            case 'FRIEND':
                return (
                    <span>
                        <Nickname>{props.notice.nickname}</Nickname>
                        {'님으로부터 친구 요청이 왔습니다.'}
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
                        {'님이 글귀를 작성했습니다.'}
                    </span>
                );
            case 'LIKE_GEULGWI':
                return (
                    <span>
                        <Nickname>{props.notice.nickname}</Nickname>
                        {'님이 회원님의 글귀에 좋아요를 눌렀습니다.'}
                    </span>
                );
            case 'CHALLENGE':
                return (
                    <span>
                        <Nickname>{props.notice.nickname}</Nickname>
                        {'님이 챌린지를 작성했습니다.'}
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
        const userConfirmed = window.confirm(`${props.notice.nickname}님의 친구 요청을 수락하시겠습니까?`);
        if (!userConfirmed) {
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
            alert(`${props.notice.nickname}님과 친구가 되었습니다.`);
            const status = await CheckFriendStatus();
            setFriendStatus(status);

        } catch (error) {
            console.error('친구 요청 수락 실패 : ', error);
        }
    };

    return (
        <>
            <Frame onClick={() => ModalOpen(props.notice)}>
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
                    {friendStatus === 'stranger' && props.notice.type === 'FRIEND' &&
                        <Button onClick={onFriendRequestAccept}>받기</Button>
                    }
                    {props.notice.checked === 'F' && <RedDot />}
                    <CloseButton onClick={onClickDelete}>
                        <AiOutlineClose size={12} color='gray' />
                    </CloseButton>
                </ProfileContainer>

            </Frame>
            {ModalState && viewPost && (
                <PostModal
                    post={viewPost}
                    ModalClose={ModalClose}
                />
            )}
        </>
    );
};

const Frame = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: auto;
    background-color: white;
    transition: background-color 0.3s;
    font-size: 15px;
    padding: 10px;
    border-radius: 16px;
    cursor: pointer;
    &:hover {
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
        top: 16px; /* 원하는 위치 조절 */
        right: 26px; /* 원하는 위치 조절 */
        width: 8px; /* 원하는 크기 조절 */
        height: 8px; /* 원하는 크기 조절 */
        background-color: #75d97f;
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
    flex: 5;
    position: relative;
`;


const ContentContainer = styled.div`

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
    cursor: pointer;
    right: 12px;
`;

const Button = styled.button`
    position: absolute;
    right: 40px;
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