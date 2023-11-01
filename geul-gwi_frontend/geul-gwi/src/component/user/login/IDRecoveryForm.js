import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as RegularUser } from '@fortawesome/free-regular-svg-icons'
import 'css/LoginForm.css';

const IDRecoveryForm = () => {
    const navigate = useNavigate();
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const passwordRequestUrl = '/email/id';
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        Axios.post(`${axiosAddr}${passwordRequestUrl}`, email)
            .then(() => {
                alert("해당 이메일 주소로 아이디 전송을 완료하였습니다.");
                navigate('/accounts/');
            })
            .catch((error) => {
                console.error(error);
                alert("아이디 요청을 실패하였습니다.");
            });
    };

    const handleLinkClick = (path) => {
        navigate(`/accounts/${path}`);
    };

    return (
        <div className="LoginForm">
            <div className="LeftContainer">
                <Logo src={process.env.PUBLIC_URL + "/Logo.png"}></Logo>
            </div>
            <div className="RightContainer" style={{ position: 'relative' }}>
                <IconContainer>
                    <FontAwesomeIcon size="2xl" color={'#444444'} title='계정' icon={RegularUser} />
                    <IconText>아이디 찾기</IconText>         
                </IconContainer>
                <form className="FormContentManage">
                    <input className='loginFormInput' type='text' placeholder='이메일' onChange={(e) => setEmail(e.target.value)}></input><br />
                    <Button onClick={handleSubmit}>요청</Button>
                </form>
                <div className='sub_Container'>
                    <SubSpan onClick={() => handleLinkClick("/")}>로그인</SubSpan>

                    <SubSpan onClick={() => handleLinkClick("register")}>회원가입</SubSpan>
                    <SubSpan onClick={() => handleLinkClick("password")}>비밀번호 찾기</SubSpan>
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

const FormContentManage = styled.form`
    text-align: center;
    width: 70%;
`;


export default IDRecoveryForm;