import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi'; // 로그아웃 아이콘
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'; // Redux 사용 Library
import Axios from 'axios';
import { logout } from 'Reducer/authReducer';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import imageDataFetcher from 'service/imageDataFetcher';
import { menus } from 'utils/constants'; // 메뉴 정의

// component
import NoticeForm from "component/main/LeftNavi/notice/NoticeForm";
import FriendForm from "component/main/LeftNavi/friend/FriendForm";
import MemberSearchForm from 'component/main/LeftNavi/memberSearch/MemberSearchForm';

const Navigation = () => {
    const dispatch = useDispatch();
    const isSubscribed = useSelector((state) => state.authReducer.isSubscribed);
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);

    const logoutUrl = '/user/logout';
    const subscribeListUrl = '/friend/list/subscribe/';

    const navigate = useNavigate();

    const [isAlertFormVisible, setIsAlertFormVisible] = useState(false);
    const [isFriendForm, SetisFriendForm] = useState(false);
    const [isMemberForm, SetIsMemberForm] = useState(false);

    const [subscribes, setSubscribes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(`${axiosAddr}${subscribeListUrl}${userSeq}`, {
                    headers: {
                        Authorization: "Bearer " + userToken
                    }
                });
                console.log('구독자 목록:', response);
                const usersData = response.data;
                const updatedUsers = await Promise.all(
                    usersData.map(async user => {
                        const profileImage = await imageDataFetcher(axiosAddr, user.profile);
                        return { ...user, profile: profileImage };
                    })
                );

                setSubscribes(updatedUsers);
            } catch (error) {
                console.error('구독자 목록:', error);
                if (error.response?.data.errorCode === 'A-002' || error.response?.data.errorCode === 'A-001') {
                    alert("세션이 만료되었습니다. 로그인을 다시 시도해주세요.");
                    navigate('/accounts');
                }
            }
        };


        fetchData();
        
    }, [userSeq, userToken, axiosAddr, subscribeListUrl, isSubscribed]);

    

    const ComponentMove = (target) => {
        handleOtherMenuClick(target); // 다른 메뉴 클릭 시 닫기 핸들러 호출
        
        if (target === "/alarm") {
            handleAlertClick();
            return;
        }
        else if (target === "/friend") {
            handleFriendClick();
            return;
        }
        else if (target === "/member") {
            handleMemberClick();
            return;
        }
        navigate(`${target}`);
    }

     // 다른 메뉴 클릭 시 닫기 핸들러 함수 추가
    const handleOtherMenuClick = useCallback((targetMenu) => {
        if (targetMenu !== '/alarm') {
            setIsAlertFormVisible(false);
        }
        if (targetMenu !== '/friend') {
            SetisFriendForm(false);
        }
        if (targetMenu !== '/member') {
            SetIsMemberForm(false);
        }
    }, []);

    const handleAlertClick = useCallback(() => {
        setIsAlertFormVisible((prevState) => !prevState);
        SetisFriendForm(false);
        SetIsMemberForm(false);
    }, []);

    const handleFriendClick = useCallback(() => {
        SetisFriendForm((prevState) => !prevState);
        setIsAlertFormVisible(false);
        SetIsMemberForm(false);
    }, []);

    const handleMemberClick = useCallback(() => {
        SetIsMemberForm((prevState) => !prevState);
        setIsAlertFormVisible(false);
        SetisFriendForm(false);
    }, []);

    const [isMoreMenuVisible, setIsMoreMenuVisible] = useState(false);

    const handleMoreButtonClick = useCallback(() => {
        setIsMoreMenuVisible((prevState) => !prevState);
    }, []);

    const userProfile = useSelector((state) => state.authReducer.userProfile);
    const role = useSelector((state) => state.authReducer.role);

    // 로그아웃
    const onClickLogout = async () => {
        try {
            const response = await Axios.post(`${axiosAddr}${logoutUrl}`, {}, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            navigate('/accounts');
            dispatch(logout());

        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    };

    const onClickProfile = () => {
        navigate('/main/Profile', { state: { profileUserSeq: userSeq } });
    };

    const onClickManagement = () => {
        navigate('/manager');
    };

    const onCllickLogo = () => {
        navigate('/main');
    };

    // 프로필 클릭 => 해당 유저 프로필로 이동한다.
    const onClickSubscribeProfile = (userSeq) => {
        navigate('/main/Profile', { state: { profileUserSeq: userSeq } });
    };


    return (
        <NaviFrame>
            <Logo onClick={onCllickLogo} src={"/LOGO.png"}></Logo>
            <Container>
                {menus.map((element, idx) => (
                    <Item id={"NaviButton" + idx} onClick={() => ComponentMove(element.target)}>
                        <IconBox><IconImg src={process.env.PUBLIC_URL + element.src} /></IconBox>
                        {window.innerWidth >= 1000 && (
                            <TextBox>{element.name}</TextBox>
                        )}
                    </Item>
                ))}
                <Item>
                    <IconBox>
                        <ProfileImage
                            src={userProfile ? userProfile : "/img/defaultProfile.png"}
                            onClick={onClickProfile}
                        />
                    </IconBox>
                    <TextBox onClick={onClickProfile}>프로필</TextBox>

                </Item>
            </Container>

                <SubscriberContainer>
                    <SubscribersHeader>구독</SubscribersHeader>
                        <SubscribersListContainer>
                            {subscribes.map((subscribe, index) => (
                                <Item 
                                    key={index}
                                    onClick={() => onClickSubscribeProfile(subscribe.userSeq)}
                                >
                                    <IconBox>
                                        <ProfileImage
                                            src={subscribe.profile ? subscribe.profile : "/img/defaultProfile.png"}
                                        />
                                    </IconBox>
                                    <TextBox>{subscribe.nickname}</TextBox>
                                </Item>
                            ))}
                    </SubscribersListContainer>
                </SubscriberContainer>


            <MoreButton onClick={handleMoreButtonClick}>
                <Item>
                    <IconBox><IconImg src={"/icon/Navigation/burger2.png"} /></IconBox>
                    <TextBox>더보기</TextBox>
                </Item>
            </MoreButton>
            {isMoreMenuVisible &&
                <MenuButtonContainer>
                    <MenuButtonManager>
                        {role === 'ADMIN' && <MenuItem onClick={onClickManagement}>사이트 관리</MenuItem>}
                        <MenuItem onClick={onClickLogout}>로그아웃
                            <FiLogOut size={16} style={{ marginLeft: '8px' }} />
                        </MenuItem>
                    </MenuButtonManager>
                </MenuButtonContainer>}
            <AlertContainer isVisible={isAlertFormVisible} size={'-460px'}>
                {isAlertFormVisible &&
                    <NoticeForm
                        handleAlertClick={handleAlertClick}
                    />}
            </AlertContainer>
            <AlertContainer isVisible={isFriendForm} size={'-360px'}>
                {isFriendForm &&
                    <FriendForm
                        handleFriendClick={handleFriendClick}
                    />}
            </AlertContainer>
            <AlertContainer isVisible={isMemberForm} size={'-311px'}>
                {isMemberForm &&
                    <MemberSearchForm
                        handleMemberClick={handleMemberClick}
                    />}
            </AlertContainer>
        </NaviFrame>
    );
};

const NaviFrame = styled.div`
    height: 100vh; 
    user-select: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding-bottom: 30px; /* 기존 하단 패딩 대신, MoreButton 높이만큼 공간 확보 */
`

const SubscriberContainer = styled.div`
 display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px;
  height: calc(100vh - 380px); /* 전체 높이에서 상단 높이(Logo, menus) 및 하단 높이(MoreButton) 제외 */
  border-top: 1px solid #ccc;
  align-items: center;
  overflow: hidden; /* 더 많은 항목을 가리기 위해 오버플로우를 숨김 */

  @media (max-width: 1300px) {
    display: none;
  }
`;

const SubscribersListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

    align-items: center;    
    overflow-y: auto; /* 스크롤바가 수직 방향으로 표시됩니다. */
    margin-bottom: 10px;

    scrollbar-width: thin; /* 스크롤바 너비를 얇게 조정 */
    scrollbar-color: #F2C936 transparent; /* 스크롤바 색상 설정 */
    overflow-y: auto; /* 세로 스크롤바 표시 */
  
    &::-webkit-scrollbar {
        width: 6px; /* 스크롤바 너비 */
    }

    &::-webkit-scrollbar-thumb {
        background-color: #F2C936; /* 스크롤바 색상 */
        border-radius: 8px;
    }
  
  @media (max-width: 1300px) {
    display: none;
    }
`;

const SubscribersHeader = styled.div`
    margin: 10px;
    width: 80%;
    text-align: left; 
`;



const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    width: 100%;
`

const Logo = styled.img`
    position: relative;
    top: 30px;
    left: 0px;
    height: 230px;
    width: 230px;
    cursor: pointer;

    @media (max-width: 1300px) {
        width: 70px;
        height: 70px;
    }
`

const AlertContainer = styled.div`
    position: absolute;
    top: 0px;
    right: ${({ isVisible, size }) => (isVisible ? size : "0px")}; /* 알림함을 왼쪽에 숨겨둡니다. */
    transition: right 0.3s; 
    height: 100vh;
`

const MenuButtonContainer = styled.div`
  position: absolute;
  left: 30px;
  bottom: 60px;
  width: 200px;
  height: auto;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 12px;

`;

const MenuButtonManager = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #343434;
  cursor: pointer;
  width: 100%;
  height: 35px;
  transition: background-color 0.2s;
  border-radius: 8px;
  font-size: 15px;


  &:hover{
        background-color : rgb(240, 240, 240);
    }
`;

const ProfileImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.2s;
    border: solid 1px #ccc;

    &:hover {
        transform: scale(1.1);
    }
`;

const Item = styled.div`
    display : flex;
    width : 90%;
    height : 50px;
    justify-content : center;
    align-items : center;
    cursor : pointer;
    border-radius: 8px;
    transition: 0.3s;

    
        &:hover{
        background-color : rgb(240, 240, 240);

        }
    
`
const IconBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 50%;
    flex: 2;
    transition: 0.3s;
    @media (max-width: 1300px) {
        &:hover {
            transform: scale(1.2);
        }
    }


`
const TextBox = styled.div`
    display : flex;
    flex: 7;
    align-items: center;
    color : #343434;
    font-size: 17px;

    @media (max-width: 1300px) {
        display: none;
    }
`
const IconImg = styled.img`
    width : 20px;
    height : 20px;


`
const MoreButton = styled.div`
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 25px;
    padding: 5px 0;
    cursor: pointer;
    display: flex;
    margin-bottom: 10px; /* 이 부분이 중요합니다. 아이템을 컨테이너의 맨 밑으로 이동시킵니다. */
`;

export default Navigation;