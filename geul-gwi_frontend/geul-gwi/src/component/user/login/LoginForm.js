// Import Library
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Axios Addres Import
import { AxiosAddrContext } from 'contextStore/AxiosAddress';

// Import Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as RegularUser} from '@fortawesome/free-regular-svg-icons'

// Import Css
import '../../../css/LoginForm.css';

// Import For use Redux
import { useDispatch, useSelector } from 'react-redux'; // Redux 사용 Library
import { setToken, clearToken } from 'Reducer/auth';
import { login, setUserNickname, setUserProfile, setuserseq } from 'Reducer/authReducer';




const LoginForm = () => {
    // AxiosAddress 
    const [AxiosAddress,SetAxiosAddress] = useState(useContext(AxiosAddrContext).axiosAddr);
    const [RequestMapping , SetRequestMapping] = useState('/user/login');

    const [Id, setId] = useState('');
    const [Password, setPassword] = useState('');
    
    const navigate = useNavigate(); // React Navigate = 페이지 이동
    const dispatch = useDispatch(); // Redux Dispatch = 리덕스 저장소 사용

    // Function
    // Login Submit
    const LoginSubmit = () => {
        const data = {
            userId : Id,
            userPassword : Password
        };
        console.log("send : "+AxiosAddress+RequestMapping);
        axios.post(AxiosAddress+RequestMapping, data)
            .then((response) => {
                console.log(response);
                console.log("data : ", response.data);
                console.log("grantType : ", response.data.grantType);
                console.log("token : ", response.data.accessToken);
                
                alert("로그인 성공..!!");

                // Redux의 auth에 Token값을 올림
                dispatch(login(response.data.accessToken));
                // User의 Sequence값을 전역으로 관리
                dispatch(setuserseq(response.data.userSeq));
                // dispatch(setUserNickname(response.data.userNickname));
                // dispatch(setUserProfile(response.data.profile));
                // 메인 페이지로 이동
                navigate("/");
            })
            .catch(function(error){
                console.log(error);
            });
    }

    const LogoutHandler = () => {
        dispatch(clearToken());
    }

    const RegiBtnClick = () => {
        console.log("regibtn click");
        navigate("/user/register");
    }

    const logAccount = (event) => {
        event.preventDefault()
    }
    // sub Button Click
    

    return (
        <div className="LoginForm">
                <div className="LeftContainer">
                    <div className="TitleContainer">
                        <h1><Link to="/" style={{color : "black"}}>글 귀</Link></h1>
                        <h5>당신의 따뜻한 말을 담다</h5>
                    </div>
                </div>
                <div className="RightContainer" style={{position : 'relative'}}>
                    <IconContainer>
                        <FontAwesomeIcon size="2xl" color={'#444444'} title='계정' icon={RegularUser} />
                        <IconText>로그인</IconText>
                    </IconContainer>
                    {/* Test */}
                    <form className="FormContentManage" onSubmit={logAccount}>
                        <input className='loginFormInput' type='text' placeholder='당신의 아이디 입력' onChange={(e) => setId(e.target.value)}></input>
                        <input className='loginFormInput' type='password' placeholder='비밀번호 입력' onChange={(e) => setPassword(e.target.value)}></input><br/>
                        <input className='loginFormButton' type='submit' value="LOGIN" onClick={LoginSubmit}/>
                    </form>
                    {/* 회원가입,  아이디찾기 , 비밀번호 찾기 */}
                    <div className='sub_Container'>
                        <SubSpan>아이디</SubSpan>
                        <SubSpan>비밀번호 찾기</SubSpan>
                        <SubSpan onClick={RegiBtnClick}>회원가입</SubSpan>
                        
                        <SubSpan>
                            {/* <CheckBoxIcon src={process.env.PUBLIC_URL + '/icon/loginFormCss/no_checked.png'}></CheckBoxIcon> */}
                            <input type='checkbox'/>
                        </SubSpan>
                    </div>
                    
                </div>
            </div>
    );
};

const SubSpan=styled.span`
    display : inline-block;
    font-size : 8px;
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
const CheckBoxIcon = styled.img`
    width : 15px;
    height : 15px;
    
    &:hover{
        content : url(${process.env.PUBLIC_URL + '/icon/loginFormCss/no_checked_color.png'})
    }
`
const IconContainer = styled.div`
    position : absolute;
    display : flex;
    top : 0%;
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
    color : #444444;
    font-size : 16px;
`

export default LoginForm;