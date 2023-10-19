import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// React-icons import
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
// Import Component
import TagButton from 'component/user/register/TagButton';


const RegisterContainer = (props) => {
    // ValidRequested State => 이메일 인증 스텝
    const [IsValidRequested, setIsValidRequested] = useState(false);

    useEffect(()=> {
    },[]);

    // 아이디 유효성 검사
    const CheckId = () => {
        const CheckText = document.getElementById("idCheck");
        // CheckIdExsit는 await으로 return값이 Object Promise타입입니다.
        const result = props.CheckIdExist();
        result.then(result => {
            if (result === true){
                CheckText.innerHTML = "사용 가능합니다";
                CheckText.style.color = "green";
            }
            else{
                CheckText.innerHTML = "사용이 불가합니다.";
                CheckText.style.color = "red";
            }
        });
    }
    // 비밀번호 패턴 체크
    const CheckPwdRegularExpression = () =>{
        let pwdConfirm = document.getElementById("pwdCheck");
        let result = props.CheckPwdRule();
        if (result === "SpaceProblem"){
            // Spacebar 입력 상태 => 거부
            pwdConfirm.innerHTML = "공백을 제거해주세요";
            pwdConfirm.style.color = "red";
        }
        else if(result === "PasswordLengthProblem"){
            // 비밀번호 입력 요망
            pwdConfirm.innerHTML = "비밀번호를 입력하지 않았습니다";
            pwdConfirm.style.color = "red";
        }
        else if(result === "RegressionProblem"){
            // 비밀번호 정규식 확인 요망
            pwdConfirm.innerHTML = "문자,숫자,특수문자 최소1개 이상 8~20자 내로 입력해주세요";
            pwdConfirm.style.color = "red";
        }
        else {
            // 사용가능
            pwdConfirm.innerHTML = "사용 가능합니다";
            pwdConfirm.style.color = "green";
        }
        
    }

    // 비밀번호 확인
    const CheckConfirmPassword = () => {
        let pwdConfirm = document.getElementById("pwdConfirm");
        let result = props.CheckPwdConfirm();
        console.log("pwd chk : "+result);
        if (result === true){
            pwdConfirm.innerHTML = "비밀번호가 일치합니다";
            pwdConfirm.style.color = "green";
        }
        else{
            pwdConfirm.innerHTML = "비밀번호가 일치하지 않습니다";
            pwdConfirm.style.color = "red";
        }
    }
    // 닉네임 중복 확인
    const CheckNickname = () => {
        let nickCheckHtml = document.getElementById("nicknameCheck");
        // NickNameCheck는 await으로 return값이 Object Promise타입입니다.
        props.NickNameCheck().then(result => {
            if (result === true){
                nickCheckHtml.innerHTML = "닉네임 사용가능합니다";
                nickCheckHtml.style.color = "green";
            }
            else{
                nickCheckHtml.innerHTML = "이미 닉네임이 존재합니다";
                nickCheckHtml.style.color = "red";
            }
        });
        
    }
    // 이메일 인증코드 발송
    const RequestEmailValid = () => {
        let ButtonObj = document.getElementById("emailValidButton");
        if (IsValidRequested === false){
            let result = props.RequestEmailCode(props.Email);
            result.then(result => {
                console.log("result : "+result);
                if (result === true){
                    setIsValidRequested(true);
                    ButtonObj.innerHTML = "인증확인";
                }
                else{
                    console.log("value 오류");
                }
            })
        }
        else if(IsValidRequested === true){
            let result = props.RequestEmailCode(props.Email);
            result.then(result => {
                console.log("result : "+result);
                if (result === true){
                    ButtonObj.innerHTML = "인증완료";
                    ButtonObj.style.backgroundColor = "green";
                }
                else{
                    
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
                <div style={{display: 'flex' , flexDirection : 'column', width  : '400px', height : '100%', margin : '0 auto'}}>
                    <h3 className='title'>회원가입</h3>
                    <h5 className='sub_title'>회원정보를 입력해주세요</h5>
                    <label>아이디</label>
                    <input type='text' value={props.Id} onBlur={() => CheckId()} onChange={props.onIdHandler} placeholder='아이디를 입력'/>
                    <ShowText id='idCheck'></ShowText>

                    <label>비밀번호</label>
                    <input type='password' value={props.Password} onChange={props.onPasswordHandler} placeholder='영문 숫자를 조합하여 8~15자의 비밀번호를 작성해주세요.'
                    onBlur={() => {
                        CheckPwdRegularExpression()
                    }}/>
                    <ShowText id='pwdCheck'></ShowText>
                    
                    <label>비밀번호 확인</label>
                    <input type='password' value={props.ConfirmPassword} onChange={props.onConfirmPasswordHandler} placeholder='비밀번호 확인'
                    onBlur={() => CheckConfirmPassword()}
                    />
                    <ShowText id='pwdConfirm'></ShowText>

                    <label>닉네임</label>
                    <input type='text' value={props.NickName} onChange={props.onNickNameHandler} placeholder='닉네임 입력' onBlur={CheckNickname}/>
                    <ShowText id='nicknameCheck'></ShowText>

                    <label>이름</label>
                    <input type='text' value={props.Name} onChange={props.onNameHandler} placeholder='이름 입력'/>
                    <ShowText></ShowText>

                    <label>나이</label>
                    <input type='number' value={props.Age} onChange={props.onAgeHandler} placeholder='나이 입력'/>
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
                            <EmailInput type="email" value={props.Email} onChange={(e) => props.onEmailHandler(e)} placeholder='이메일 입력'/>
                            <EmailValidRequestButton id="emailValidButton" onClick={() => RequestEmailValid()}>인증요청</EmailValidRequestButton>
                        </EmailValidRequestContainer>
                        {
                            props.ShowEmailValidContainer ?
                            <EmailValidConfirmContainer value={props.EmailValidConfirm} onChange={props.EmailValidCodeHandler} /> :
                            ""
                        }
                    </EmailValidContainer>

                    <ShowText></ShowText>

                    <NextButton onClick={props.ToggleMove}>
                        다음
                    </NextButton>
                </div>
            </PrivacyContainer>

            :
            
            <TagSelectContainer>
                <BackButton onClick={props.ToggleMove}><MdOutlineArrowBackIosNew size={'20px'}/></BackButton>
                <form style={{display: 'flex' , flexDirection : 
                'column', width  : '400px', height : '100%', margin : '0 auto'}} onSubmit={(e) => props.onSubmitHandler(e)}>
                    <h3 className='title'>태그 선택</h3>
                    <h5 className='sub_title'>선호하시는 태그를 선택하시면 됩니다. (3개 제한)</h5>
                    
                    <TagsContainer>
                        
                        {props.TagList.map((element,idx) => (
                            <TagButton 
                            id={"tag"+idx} 
                            fontColor={element.fontColor} 
                            backColor = {element.backColor} 
                            value = {element.value} 
                            selected={element.selected}
                            TagClick={(element) => props.TagClick(element)}
                            />
                        ))}
                    </TagsContainer>


                    <SubmitButton onClick={(e) => props.onSubmitHandler(e)}>
                        회원가입
                    </SubmitButton>
                </form>
            </TagSelectContainer>

            }
        </RegiContainer>
    );
};


const RegiContainer = styled.div`
    position : relative;
    display : flex;
    width : 600px;
    height : 80%;
    justify-content: center;
    /* overflow: scroll; */
    overflow : scroll;
    overflow-x : hidden;
    scroll-behavior: smooth;
    margin : 0 auto;
    margin-top : calc((100vh - 870px)/2);

    border-radius : 8px;
    background-color : white;

    &::-webkit-scrollbar{
        border-radius : 10px;
        background-color : white;
        width : 10px;
    }
    &::-webkit-scrollbar-thumb{
        border-radius : 4px;
        background-color: pink;
    }
    &::-webkit-scrollbar-track{
        border-radius : 4px;
        background-color : white;
    }
`
const PrivacyContainer = styled.div`
    position : absolute;
    top : 5%;
    /* left : ${ShowBox => ShowBox ? '0%' : '-100%'}; */
    /* left : 0%; */
    width : 100%;
    height : auto;
    min-height : 70%;
    
`
const TagSelectContainer = styled(PrivacyContainer)`
    /* left : ${ShowBox => ShowBox ? '100%' : '0%'}; */
    /* left : 100%; */
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

export default RegisterContainer;