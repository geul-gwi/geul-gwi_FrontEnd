import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as RegularUser } from '@fortawesome/free-regular-svg-icons'

import imageDataFetcher from 'service/imageDataFetcher';

import 'css/LoginForm.css';
import { useDispatch, useSelector } from 'react-redux'; 
import { setToken, clearToken } from 'Reducer/auth';
import { login, setNickname, setProfile, setUserSeq, setRole } from 'Reducer/authReducer';

const LoginForm = () => {
    const AxiosAddress = useContext(AxiosAddrContext).axiosAddr;
    const RequestMapping = '/user/login';

    const [Id, setId] = useState('');
    const [Password, setPassword] = useState('');

    const navigate = useNavigate(); // React Navigate = 페이지 이동
    const dispatch = useDispatch(); // Redux Dispatch = 리덕스 저장소 사용

    const fetchAndSetProfileImage = async (profilePath) => {
        try {
            const profileImageUrl = await imageDataFetcher(AxiosAddress, profilePath);
            dispatch(setProfile(profileImageUrl));
        } catch (error) {
            console.error('Error fetching profile image:', error);
        }
    };

    const LoginSubmit = () => {
        const data = {
            userId: Id,
            userPassword: Password
        };
        console.log("로그인: ", data);
        axios.post(AxiosAddress + RequestMapping, data)
            .then(async (response) => {
                console.log(response.data);

                dispatch(login(response.data.accessToken));
                dispatch(setUserSeq(response.data.userSeq));
                dispatch(setNickname(response.data.userNickname));
                dispatch(setRole(response.data.role));
                fetchAndSetProfileImage(response.data.profile);
                
                navigate("/main"); // Redirect to the main page
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const onClickLink = (path) => {
        navigate('/accounts/' + path);
    }

    return (
        <div className="LoginForm">
            <div className="LeftContainer">
                <div className="TitleContainer">
                    <Logo src={process.env.PUBLIC_URL + "/Logo.png"}></Logo>
                </div>
            </div>
            <div className="RightContainer" style={{ position: 'relative' }}>
                <IconContainer>
                    <FontAwesomeIcon size="2xl" color={'#444444'} title='계정' icon={RegularUser} />
                    <IconText>로그인</IconText>
                </IconContainer>
                <form className="FormContentManage">
                    <input className='loginFormInput' type='text' placeholder='아이디' onChange={(e) => setId(e.target.value)}></input>
                    <input className='loginFormInput' type='password' placeholder='비밀번호' onChange={(e) => setPassword(e.target.value)}></input><br />
                    <Button onClick={LoginSubmit}>로그인</Button>
                </form>
                <div className='sub_Container'>
                    <SubSpan onClick={() => onClickLink("id")}>아이디 찾기</SubSpan> 
                    <SubSpan onClick={() => onClickLink("password")}>비밀번호 찾기</SubSpan>
                    <SubSpan onClick={() => onClickLink("register")}>회원가입</SubSpan>
                </div>

            </div>
        </div>
    );
};

const SubSpan = styled.span`
    margin-top: 8px;
    font-size : 15px;
    color : grey;
    cursor : pointer;
    padding : 0px 7px 0px 7px;

    &:hover{
        color : black;
    }
`
const IconContainer = styled.div`
    position : absolute;
    display : flex;
    top : 5%;
    left : 50%;
    width : auto;
    min-width : 50px;
    height : auto;
    min-height : 60px;
    transform: translateX(-50%);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;
`
const IconText = styled.span`
    margin-top: 10px;
    color : #444444;
    font-size : 16px;
`
const Logo = styled.img`
    position: relative;
    user-select: none;
    height: 300px;
    width: 300px;
`

const Button = styled.button`
    width: 97%;
    height: 45px;
    border-radius: 8px;
    background-color: #ccebb5;
    color: white;
    cursor: pointer;
    border: 3px solid #ccebb5;
    transition: 0.2s;
    font-size: 16px;

    :hover{
        background-color: white;
        color: gray;
    }
`

export default LoginForm;