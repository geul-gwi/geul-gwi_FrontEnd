// Import Library
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as RegularUser } from '@fortawesome/free-regular-svg-icons'

import 'css/LoginForm.css';

const emailDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'naver.com', 'hanmail.net', 'hotmail.com']; // 이메일 도메인 목록

// 아이디랑 이메일 입력하고 인증한다.
const PasswordRecoveryForm = () => {
    const navigate = useNavigate(); 
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const passwordRequestUrl = '/email/password';
    const [Id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [selectedDomain, setSelectedDomain] = useState(''); // 콤보박스로 선택한 도메인

    const handleDomainChange = (e) => {
        setSelectedDomain(e.target.value);
    };

    const LoginSubmit = () => {
        const EmailDTO = {
            userId: Id,
            email: email
        };
        Axios.post(`${axiosAddr}${passwordRequestUrl}`, EmailDTO)
            .then(() => {
                
                alert("해당 이메일 주소로 비밀번호 전송을 완료하였습니다.");
                navigate('/accounts/');
            })
            .catch((error) => {
                console.error(error);
                alert("비밀번호 요청을 실패하였습니다.");
            });
    };

    const onClickLink = (path) => {
        navigate('/accounts/' + path);
    }

    return (
        <div className="LoginForm">
            <div className="LeftContainer">
                <div className="TitleContainer">
                    <Logo src={process.env.PUBLIC_URL + "/img/Logo.png"}></Logo>
                </div>
            </div>
            <div className="RightContainer" style={{ position: 'relative' }}>
                <IconContainer>
                    <FontAwesomeIcon size="2xl" color={'#444444'} title='계정' icon={RegularUser} />
                    <IconText>비밀번호 찾기</IconText>         
                </IconContainer>
                <FormContentManage>
                    <input className='loginFormInput' type='text' placeholder='아이디' onChange={(e) => setId(e.target.value)}></input>
                    <input className='loginFormInput' type='text' placeholder='이메일' onChange={(e) => setEmail(e.target.value)}></input>
                    <CustomSelect onChange={handleDomainChange}>
                        <OptionBox value="">직접 입력</OptionBox>
                        {emailDomains.map((domain, index) => (
                            <OptionBox key={index} value={domain}>{domain}</OptionBox>
                        ))}
                    </CustomSelect>
                    <Button onClick={LoginSubmit}>요청</Button>
                </FormContentManage>
                <div className='sub_Container'>
                <SubSpan onClick={() => onClickLink("/")}>로그인</SubSpan>
                    <SubSpan onClick={() => onClickLink("register")}>회원가입</SubSpan>
                    <SubSpan onClick={() => onClickLink("id")}>아이디 찾기</SubSpan>
                </div>
            </div>
        </div>
    );
};

const SubSpan = styled.span`
    user-select: none;
    margin-top: 7px;
    display : inline-block;
    font-size : 12px;
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
    font-size : 14px;
`

const OptionBox = styled.option`
    margin-top: 10px;
    width: 80px;
    color : #444444;
    font-size : 14px;
`
const Logo = styled.img`
    position: relative;
    user-select: none;
    height: 250px;
    width: 260px;
`

const Button = styled.button`
    width: 97%;
    height: 38px;
    border-radius: 8px;
    background-color: rgb(255, 194, 160);
    color: white;
    cursor: pointer;
    border: 2px solid rgb(255, 194, 160);
    
    :hover{
        color: black;
        background-color: white;
    }
`
const FormContentManage = styled.form`
    text-align: center;
    width: 70%;
`;

const CustomSelect = styled.select`
    width: 100%;
    margin-bottom: 15px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export default PasswordRecoveryForm;