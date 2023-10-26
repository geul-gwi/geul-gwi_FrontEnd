// Import Library
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';     // 토스트 메시지를 보내기 위한 라이브러리

// Axios Addres Import
import { AxiosAddrContext } from 'contextStore/AxiosAddress';

// Import Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as RegularUser } from '@fortawesome/free-regular-svg-icons'

import imageDataFetcher from 'service/imageDataFetcher';

// Import Css
import '../../../css/LoginForm.css';

// Import For use Redux
import { useDispatch, useSelector } from 'react-redux'; // Redux 사용 Library
import { setToken, clearToken } from 'Reducer/auth';
import { login, setNickname, setProfile, setUserSeq } from 'Reducer/authReducer';

const LoginForm = () => {
    // AxiosAddress 
    const [AxiosAddress, SetAxiosAddress] = useState(useContext(AxiosAddrContext).axiosAddr);
    const [RequestMapping, SetRequestMapping] = useState('/user/login');

    const [Id, setId] = useState('');
    const [Password, setPassword] = useState('');

    const navigate = useNavigate(); // React Navigate = 페이지 이동
    const dispatch = useDispatch(); // Redux Dispatch = 리덕스 저장소 사용

    // Function to fetch and set profile image
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

        axios.post(AxiosAddress + RequestMapping, data)
            .then(async (response) => {
                console.log(response.data);

                dispatch(login(response.data.accessToken));
                dispatch(setUserSeq(response.data.userSeq));
                dispatch(setNickname(response.data.userNickname));
                fetchAndSetProfileImage(response.data.profile);

                navigate("/"); // Redirect to the main page
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const RegiBtnClick = () => {
        console.log("regibtn click");
        navigate("/user/register");
    }

    const logAccount = (event) => {
        event.preventDefault()
    }

    return (
        <div className="LoginForm">
            <div className="LeftContainer">
                <div className="TitleContainer">
                    <h1><Link to="/" style={{ color: "black" }}>글 귀</Link></h1>
                    <h5>당신의 따뜻한 말을 담다</h5>
                </div>
            </div>
            <div className="RightContainer" style={{ position: 'relative' }}>
                <IconContainer>
                    <FontAwesomeIcon size="2xl" color={'#444444'} title='계정' icon={RegularUser} />
                    <IconText>로그인</IconText>
                </IconContainer>
                {/* Test */}
                <form className="FormContentManage" onSubmit={logAccount}>
                    <input className='loginFormInput' type='text' placeholder='아이디' onChange={(e) => setId(e.target.value)}></input>
                    <input className='loginFormInput' type='password' placeholder='비밀번호' onChange={(e) => setPassword(e.target.value)}></input><br />
                    <input className='loginFormButton' type='submit' value="로그인" onClick={LoginSubmit} />
                </form>
                <div className='sub_Container'>
                    <SubSpan>아이디 찾기</SubSpan>
                    <SubSpan>비밀번호 찾기</SubSpan>
                    <SubSpan onClick={RegiBtnClick}>회원가입</SubSpan>
                </div>

            </div>
        </div>
    );
};

const SubSpan = styled.span`
    margin-top: 5px;
    display : inline-block;
    font-size : 10px;
    color : grey;
    cursor : pointer;
    padding : 0px 7px 0px 7px;
    &:hover{
        color : black;
    }

    input[type=checkBox]{
        display : none;
        border : 1px solid black;
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
    flex-wrap : wrap;
    justify-content: center;
    align-items: center;
`
const IconText = styled.span`
    margin-top: 10px;
    color : #444444;
    font-size : 16px;
`

export default LoginForm;