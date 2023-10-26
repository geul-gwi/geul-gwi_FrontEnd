import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi'; // 로그아웃 아이콘
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useDispatch, useSelector } from 'react-redux'; // Redux 사용 Library
import Axios from 'axios';
import { logout } from 'Reducer/authReducer';

const HeaderUserMenu = () => {
    const navigate = useNavigate(); // React Navigate = 페이지 이동
    const dispatch = useDispatch(); // Redux Dispatch = 리덕스 저장소 사용
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const logoutUrl = '/user/logout';

    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);
    const userNickname = useSelector((state) => state.authReducer.userNickname);
    const userProfile = useSelector((state) => state.authReducer.userProfile);

    const [isButtonHidden, setIsButtonHidden] = useState(false);

    // useEffect(() => {
    //     console.log(userSeq);
    //     console.log(userNickname);
    //     console.log(userProfile);
    //     console.log(userToken);
    // }, [axiosAddr, userSeq, userToken, userNickname, userProfile]);

    const showList = () => {
        setIsButtonHidden(!isButtonHidden);
    };

    const onLiClicked = (path) => {
        navigate(path);
    };

    // 로그아웃
    const onClickLogout = async () => {
        try {
            const response = await Axios.post(`${axiosAddr}${logoutUrl}`, {}, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            navigate('/user/login');
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


    return (
        
        <MenuContainer>
            <ProfileImage 
                src={userProfile ? userProfile : "/img/defaultProfile.png" }
                onClick={showList} 
            />
            {
                userNickname === null ?
                <UserName>로그인 해주세요</UserName>
                :
                <UserName>안녕하세요, {userNickname}님.</UserName>
            }
            
            {isButtonHidden && (
                <MenuButtonContainer>
                    <MenuButtonManager>
                        <MenuItem onClick={onClickManagement}>
                            사이트 관리
                        </MenuItem>
                        <MenuItem onClick={() => onClickProfile()}>
                            프로필
                        </MenuItem>
                        <MenuItem onClick={onClickLogout}>
                            로그아웃
                            <FiLogOut size={16} style={{ marginLeft: '8px' }} />
                        </MenuItem>
                    </MenuButtonManager>
                </MenuButtonContainer>
            )}
        </MenuContainer>
    );
};

const MenuContainer = styled.div`
    position: relative;
    display: flex;
    min-width: 50px;
    width: auto;
    height: 100%;
    justify-content: center;
    align-items: center;
    user-select: none;
`;

const ProfileImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
    cursor: pointer;
    transition: transform 0.2s;
    border: solid 1px #ccc;

    &:hover {
        transform: scale(1.1);
    }
`;

const UserName = styled.p`
  margin: 0;
  margin-right: 20px;
`;

const MenuButtonContainer = styled.div`
  position: absolute;
  right: 0px;
  top: calc(100% + 10px);
  width: 200px;
  min-height: 50px;
  height: auto;
  border-radius: 12px;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.25);
  background-color: white;
  overflow: hidden;
`;

const MenuButtonManager = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  justify-content: space-between;
  color: #343434;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #D9D9D9;
  }
`;

export default HeaderUserMenu;