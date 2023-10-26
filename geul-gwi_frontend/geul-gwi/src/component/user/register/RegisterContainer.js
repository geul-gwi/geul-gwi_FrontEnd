import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// React-icons import
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
// Import Component
import TagButton from 'component/user/register/TagButton';


const RegisterContainer = (props) => {
    // ValidRequested State => 이메일 인증 스텝
    const [IsValidRequested, setIsValidRequested] = useState(false);

    useEffect(() => {
    }, []);

    // 아이디 유효성 검사
    const CheckId = () => {
        const CheckText = document.getElementById("idCheck");
        // CheckIdExsit는 await으로 return값이 Object Promise타입입니다.
        const result = props.CheckIdExist();
        result.then(result => {
            if (result === true) {
                CheckText.innerHTML = "사용 가능한 아이디입니다.";
                CheckText.style.color = "green";
            }
            else {
                CheckText.innerHTML = "중복되는 아이디입니다.";
                CheckText.style.color = "red";
            }
        });
    }
    // 비밀번호 패턴 체크
    const CheckPwdRegularExpression = () => {
        let pwdConfirm = document.getElementById("pwdCheck");
        let result = props.CheckPwdRule();
        if (result === "SpaceProblem") {
            // Spacebar 입력 상태 => 거부
            pwdConfirm.innerHTML = "공백을 제거해주세요.";
            pwdConfirm.style.color = "red";
        }
        else if (result === "PasswordLengthProblem") {
            // 비밀번호 입력 요망
            pwdConfirm.innerHTML = "비밀번호를 입력해주세요.";
            pwdConfirm.style.color = "red";
        }
        else if (result === "RegressionProblem") {
            // 비밀번호 정규식 확인 요망
            pwdConfirm.innerHTML = "문자,숫자,특수문자 최소1개 이상 8~20자 내로 입력해주세요.";
            pwdConfirm.style.color = "red";
        }
        else {
            // 사용가능
            pwdConfirm.innerHTML = "사용 가능한 비밀번호입니다.";
            pwdConfirm.style.color = "green";
        }

    }

    // 비밀번호 확인
    const CheckConfirmPassword = () => {
        let pwdConfirm = document.getElementById("pwdConfirm");
        let result = props.CheckPwdConfirm();
        console.log("pwd chk : " + result);
        if (result === true) {
            pwdConfirm.innerHTML = "일치한 비밀번호입니다.";
            pwdConfirm.style.color = "green";
        }
        else {
            pwdConfirm.innerHTML = "비밀번호가 일치하지 않습니다.";
            pwdConfirm.style.color = "red";
        }
    }
    // 닉네임 중복 확인
    const CheckNickname = () => {
        let nickCheckHtml = document.getElementById("nicknameCheck");
        // NickNameCheck는 await으로 return값이 Object Promise타입입니다.
        props.NickNameCheck().then(result => {
            if (result === true) {
                nickCheckHtml.innerHTML = "사용 가능한 닉네임입니다.";
                nickCheckHtml.style.color = "green";
            }
            else {
                nickCheckHtml.innerHTML = "중복되는 닉네임입니다.";
                nickCheckHtml.style.color = "red";
            }
        });

    }
    // 이메일 인증코드 발송
    const RequestEmailValid = () => {
        let ButtonObj = document.getElementById("emailValidButton");
        if (IsValidRequested === false) {
            let result = props.RequestEmailCode(props.Email);
            result.then(result => {
                console.log("result : " + result);
                if (result === true) {
                    setIsValidRequested(true);
                    ButtonObj.innerHTML = "인증확인";
                }
                else {
                    console.log("value 오류");
                }
            })
        }
        else if (IsValidRequested === true) {
            let result = props.RequestEmailCode(props.Email);
            result.then(result => {
                console.log("result : " + result);
                if (result === true) {
                    ButtonObj.innerHTML = "인증완료";
                    ButtonObj.style.backgroundColor = "green";
                }
                else {

                }
            })
        }
        // 버튼 Obj 받음 => innertext를 바꾸기 위함

        setIsValidRequested(true);
    }

    return (
        <RegiContainer>

            {/* Page1 ...! */}
            {
                props.PageStep === "page1" ?

                        <PrivacyContainer>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '400px', height: '100%', margin: '0 auto' }}>
                                <h3 className='title'>회원 가입</h3>
                                <h5 className='sub_title'>회원 정보를 입력해주세요</h5>
                                <ProfilePicture
                                    src={props.showProfile ? (props.showProfile) : null || '/img/defaultProfile.png'}
                                    onClick={props.toggleModal}
                                />
                                <label>아이디</label>
                                <input type='text' value={props.Id} onBlur={() => CheckId()} onChange={props.onIdHandler} placeholder='아이디' />
                                <ShowText id='idCheck'></ShowText>

                                <label>비밀번호</label>
                                <input type='password' value={props.Password} onChange={props.onPasswordHandler} placeholder='영문, 숫자를 조합하여 8~15자'
                                    onBlur={() => {
                                        CheckPwdRegularExpression()
                                    }} />
                                <ShowText id='pwdCheck'></ShowText>

                                <label>비밀번호 재확인</label>
                                <input type='password' value={props.ConfirmPassword} onChange={props.onConfirmPasswordHandler} placeholder='비밀번호 재입력'
                                    onBlur={() => CheckConfirmPassword()}
                                />
                                <ShowText id='pwdConfirm'></ShowText>

                                <label>닉네임</label>
                                <input type='text' value={props.NickName} onChange={props.onNickNameHandler} placeholder='닉네임' onBlur={CheckNickname} />
                                <ShowText id='nicknameCheck'></ShowText>

                                <label>나이</label>
                                <input type='number' value={props.Age} onChange={props.onAgeHandler} placeholder='나이' />
                                <ShowText></ShowText>

                                <label>성별</label>
                                <select id='gender_input' onChange={props.onGenderHandler}>
                                    <option value={'Male'}>남성</option>
                                    <option value={'FeMale'}>여성</option>
                                </select>
                                <ShowText></ShowText>

                                <label>이메일</label>
                                {/* <input type='email' value={Email} onChange={onEmailHandler} placeholder='이메일 입력' style={{width : '50%;'}}/> */}
                                <EmailValidContainer>
                                    <EmailValidRequestContainer>
                                        <EmailInput type="email" value={props.Email} onChange={(e) => props.onEmailHandler(e)} placeholder='이메일 주소' />
                                        <EmailValidRequestButton id="emailValidButton" onClick={() => RequestEmailValid()}>인증요청</EmailValidRequestButton>
                                    </EmailValidRequestContainer>
                                    {
                                        props.ShowEmailValidContainer ?
                                            <EmailValidConfirmContainer value={props.EmailValidConfirm} onChange={props.EmailValidCodeHandler} /> :
                                            ""
                                    }
                                </EmailValidContainer>
                            <AlreadyAccountContainer>
                                계정이 있으신가요?
                                <LoginButton>로그인</LoginButton>
                            </AlreadyAccountContainer>
                                <ShowText></ShowText>
                                <NextButton onClick={props.ToggleMove}>
                                    다음
                                </NextButton>
                                {props.isModalOpen && (
                                    <ModalOverlay>
                                        <ModalContent>
                                            <img src={props.showProfile} />
                                            <ModalButtonGroup>
                                                <input id="fileInput" type="file" accept="image/*" onChange={props.handleProfileImgChange} />
                                                <Button onClick={props.handleDeleteProfileImg}>삭제</Button>
                                                <Button onClick={props.toggleModal}>닫기</Button>
                                            </ModalButtonGroup>
                                        </ModalContent>
                                    </ModalOverlay>
                                )}
                            </div>

                        </PrivacyContainer>
   

                    :

                    <PrivacyContainer>
                        <BackButton onClick={props.ToggleMove}><MdOutlineArrowBackIosNew size={'20px'} /></BackButton>
                        <form style={{
                            display: 'flex', flexDirection:
                                'column', width: '400px', height: '100%', margin: '0 auto'
                        }} onSubmit={(e) => props.onSubmitHandler(e)}>
                            <h3 className='title'>태그 선택</h3>
                            <h5 className='sub_title'>선호하는 태그를 선택해주세요. (3개)</h5>

                            <TagsContainer>

                                {props.TagList.map((element, idx) => (
                                    <TagButton
                                        id={"tag" + idx}
                                        fontColor={element.fontColor}
                                        backColor={element.backColor}
                                        value={element.value}
                                        selected={element.selected}
                                        TagClick={(element) => props.TagClick(element)}
                                    />
                                ))}
                            </TagsContainer>


                            <SubmitButton onClick={(e) => props.onSubmitHandler(e)}>
                                회원가입
                            </SubmitButton>
                        </form>
                    </PrivacyContainer>

            }


        </RegiContainer>
    );
};

const RegiContainer = styled.div`
    position: relative;
    display: flex;
    width: 600px;
    height: 100%;
    justify-content: center;
    overflow-y: scroll;
    margin: auto;
    background-color: white;
`
const PrivacyContainer = styled.div`
    position : absolute;
    top : 5%;
    width : 100%;
    height : auto;
    min-height : 70%;
    
`
const NextButton = styled.button`
    width : 250px;
    height : 40px;
    background-color : #ffc2b3;
    border-radius : 12px;
    border : none;
    margin : 0 auto;
    margin-top : 15px;
    margin-bottom : 15px;
    color : white;
    cursor : pointer;
    transition : 0.2s;
    &:hover{
        transition : 0.2s;
        color : black;
        border : 4px solid pink;
        background-color : white;
    }
`
const SubmitButton = styled(NextButton)``
const BackButton = styled.button`
    position : absolute;
    top : 0px;
    left : 20px;
    display : flex;
    width : 50px;
    height : 50px;
    justify-content : center;
    align-items: center;
    border : none;
    background-color : white;
    cursor : pointer;
`

// 유효성 검사 결과 표시를 위한 Container
const ShowText = styled.div`
    display : inline-block;
    width : 100%;
    height : 30px;
    padding-left : 6px;
    padding-top : 2px;
    /* align-items: center; */
    text-align : right;
    font-size : 12px;
`

// 태그들을 담을 Flex Container
const TagsContainer = styled.div`
    display : flex;
    flex-wrap : wrap;
    flex-direction : row;
    width : 100%;
    height : auto;
    justify-content : space-between;
    gap : 10px;
`

// 이메일 인증 공간
const EmailValidContainer = styled.div`
    display : flex;
    width : 100%;
    min-height : 10px; height : auto;
    
    flex-direction : column;
    gap: 5px;
`
// 이메일 인증 요청 Container
const EmailValidRequestContainer = styled.div`
    display : flex;
    width : 100%;
    height : 40px;
    justify-content : space-between;
    align-items : center;
`

// 이메일 입력 Input
const EmailInput = styled.input`
    width : calc(100% - 120px);
    
`
// 이메일 인증 요청 버튼
const EmailValidRequestButton = styled.div`
    display : flex;
    width : 100px;
    height : 40px;
    justify-content : center; align-items : center;
    background-color : #ffc2b3;
    color : white;
    border: 2px solid white;
    font-size : 12px; cursor: pointer; border-radius : 12px;
    transition : 0.2s;
    &:hover{
        background-color : white;
        border : 2px solid pink;
        color : black;
    }
`

// 이메일 인증 확인 Container
const EmailValidConfirmContainer = styled.input`
`

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); 
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100; 
`;

const ModalContent = styled.div`
    width: 500px;
    height: 500px;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 100%;
        max-width: 400px;
    }
`;

const ModalButtonGroup = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
`;

const ProfilePicture = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 15px;
    cursor: pointer;
    object-fit: cover; 
    border: 2px solid #ccc;

    &:hover {
        transform: scale(1.1);
        transition: transform 0.2s ease-in-out;
    }
`;

const Button = styled.button`
    background-color: white;
    padding: 10px 50px;
    border: 1px solid #ccc;
    border-radius: 8px;
    cursor: pointer;
    
    &:hover {
        background-color: #f2f2f2;
    }
`;

const AlreadyAccountContainer = styled.div`
    margin: auto;
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: black;
`;

const LoginButton = styled.span`
    margin-left: 5px;
    color: skyblue;
    cursor: pointer;
`;


export default RegisterContainer;