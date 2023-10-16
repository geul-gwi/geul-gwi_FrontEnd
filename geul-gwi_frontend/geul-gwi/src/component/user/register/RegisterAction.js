import { React, useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom/';
// Axios Address Context
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
// css import
import 'css/user/Register.css'


// Import Component
import RegisterContainer from 'component/user/register/RegisterContainer';



const RegisterAction = () => {
    // navigate
    const navigate = useNavigate();
    
    // Axios Address
    const [AxiosAddress,SetAxiosAddress] = useState(useContext(AxiosAddrContext).axiosAddr);
    // RequestMappings
    let JoinRequest = '/user/join';
    let IdChkMapping = "/user/validate";
    let NickChkMapping = "/user/validate/nickname";
    let EmailCodeRequestMapping = "/email/valid";
    let CodeValidMapping = "/email/valid/code";

    
    // State값들
    const [Id, setId] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [NickName, setNickName] = useState("");
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Age, setAge] = useState();
    const [Gender, setGender] = useState("");
    const [Tags, SetTags] = useState([]);

    // 이메일 인증코드
    const [EmailValidConfirm, setEmailValidConfirm] = useState('');
    const [ShowEmailValidContainer , setShowEmailValidContainer] = useState(false);
    const [IsValidRequested, setIsValidRequested] = useState(false);
    
    // onChangeHandler
    const onIdHandler = (event) => {
        setId(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    } 
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }
    const onNickNameHandler = (event) => {
        setNickName(event.currentTarget.value);
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }
    const onAgeHandler = (event) => {
        setAge(event.currentTarget.value);
    }
    const onGenderHandler = () => {
        let genderSelect = document.getElementById('gender_input');
        setGender(genderSelect.options[genderSelect.selectedIndex].value);
    }
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const TagHandler = (Tag) => {
        if (Tags.includes(Tag)) {
        // 이미 선택한 값이면 선택 취소
        const updatedValues = Tags.filter((value) => value !== Tag);
        SetTags(updatedValues);
        } else if (Tags.length < 3) {
        // 최대 3개까지만 선택 가능
        SetTags((prevSelectedValues) => [...prevSelectedValues, Tag]);
        }
    }

    // 태그 클릭 처리
    const TagClick = (value) => {
        // 선택된 태그의 CSS를 관리하기 위해 selected 값을 바꾸는 코드
        // 해당 Item.selected가 True로 바뀌게 되면 CSS가 바뀌면서 사용자가 어떤 태그를 선택했는지 확인하기 편하다
        if (Tags.length < 3){
            let idx = TagList.findIndex((item) => item.value === value);
            let updateList = [...TagList];
            let updateItem = updateList[idx];
            updateItem.selected = !updateItem.selected;
            updateList[idx] = updateItem;
            setTagList(updateList);
        }
        else{
            alert("3개 까지만 지정 가능합니다.");
        }

        // Handler에게 값을 넘김으로써 Register Submit이 작동할 때 보낼 데이터를 담음
        TagHandler(value);
        // =>  취소할때도 처리하기 때문에 넘겨줌
        
    }



    // 이메일 인증확인 코드 Handler
    const EmailValidCodeHandler = (event) => {
        setEmailValidConfirm(event.currentTarget.value);
    }

    // 다음버튼 Click
    // const [ShowBox, setShowBox] = useState(true) // true => leftbox , false => rightbox
    const [PageStep, SetPageStep] = useState("page1");
    const ToggleMove = () => {
        // console.log("ShowBox : " + ShowBox);
        // setShowBox(!ShowBox);
        if (PageStep === "page1"){
            SetPageStep("page2");
        }
        else{
            SetPageStep("page1");
        }
    }

    // 아이디 유효성 검사
    let IdCheckResult = null;
    const CheckIdExist = async () => {
        IdCheckResult = null;
        // 아무것도 입력안했으면 return
        if (Id.length === 0){return false;}

        console.log("Axios Shoot : "+AxiosAddress+IdChkMapping+"/"+Id);
        try{
            const response = await axios.post(AxiosAddress+IdChkMapping+"/"+Id,null);
            console.log(response);
        }
        catch (error){
            console.log(error);
        }
        return IdCheckResult;
    }

    // 비밀번호 패턴 체크
    const CheckPwdRule = () => {
        let result = true;
        let CheckText = document.getElementById("pwdCheck");
        let special_pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/;
        if (Password.search(/\s/) !== -1){
            return "SpaceProblem";
        }
        else if (Password.length === 0){
            return "PasswordLengthProblem";
        }
        else if (!special_pattern.test(Password)){
            return "RegressionProblem";
        }
        else{
            return "CorrectPassword";
        }

    }
    // 비밀번호 Confirm 확인
    const CheckPwdConfirm = () => {
        if (Password === ConfirmPassword){return true;}
        else{return false;}
    }
    // 닉네임 중복 체크
    let NickCheckResult;
    const NickNameCheck = async () => {
        NickCheckResult = null;
        try{
            const response = await axios.post(AxiosAddress+NickChkMapping+"/"+NickName,null);
            console.log(response.data);
            NickCheckResult = response.data;
        }
        catch(error){
            console.log(error);
        }
        // 결과 확인
        if (NickCheckResult === true){return true;}
        else {return false;}
    }


    // 이메일 인증 버튼
    const RequestEmailCode = (email) => {
        
        // 요청을 아직 하지 않았다면,
        if (!IsValidRequested){
            console.log("Email Send : "+Email);
            console.log("Email Request Console => "+ AxiosAddress+EmailCodeRequestMapping)
            axios.post(AxiosAddress+EmailCodeRequestMapping, {"email" : Email})
            .then((response)=>{
                setIsValidRequested(true);
                setShowEmailValidContainer(true);
                alert("성공적으로 이메일 인증 요청이 완료되었습니다.");
                console.log(response);
                return "ValidCodeSent";
            })
            .catch((error) => {
                alert("이메일 인증 요청중 오류가 발생하였습니다.");
                console.log(error);
                return "ValidCodeSentFailed";
            })
        }
        // 이미 요청을 했다면 => 인증번호 확인 단계
        else{
            console.log("Valid Confirm Step");
            console.log("Input Code value : "+ EmailValidConfirm);
            console.log("AxiosAddress Check : "+AxiosAddress+CodeValidMapping);
            axios.post(AxiosAddress+CodeValidMapping, {"code" : EmailValidConfirm})
            .then((response) => {
                console.log(response);
                return "ConfirmedValidCode";
            })
            .catch((error) => {
                console.log(error);
                alert("인증코드가 틀립니다.");
                return "ValidCodeFault";
            })
        }
    }

    // 입력 누락 확인 및 조건만족 Check
    const CheckGoodToContinue = () => {

    }


    // 회원가입 Submit
    const onSubmitHandler = (event) => {
        event.preventDefault();

        const data = {
            userId : Id,
            userPassword : Password,
            userNickname : NickName,
            userName : Name,
            userAge : Age,
            userGender : Gender,
            userTags : Tags
            // userEmail : Email
        }
        axios.post(AxiosAddress+JoinRequest, data)
            .then((response) => {
                console.log(response.data);
                navigate('/user/login');
            })
            .catch(function(error){
                console.log(error);
                alert("예기치 못한 오류가 발생하였습니다.");        // 나중에 오류 처리 해줄 것
                navigate('/user/register');
            });
    }




    // 태그 버튼 생성 List
    let [TagList,setTagList] = useState([
        {"fontColor" : "white", "backColor" : "grey", "value" : "감성" , "selected" : false},
        {"fontColor" : "white", "backColor" : "purple", "value" : "깨달음", "selected" : false},
        {"fontColor" : "white", "backColor" : "#FBD929", "value" : "위로", "selected" : false},
        {"fontColor" : "white", "backColor" : "#FF867E", "value" : "동기부여", "selected" : false},
        {"fontColor" : "white", "backColor" : "#7EFFAA", "value" : "감사", "selected" : false},
        {"fontColor" : "white", "backColor" : "#A8FF7E", "value" : "시", "selected" : false},
        {"fontColor" : "white", "backColor" : "#84B5FF", "value" : "현실직시", "selected" : false},
        {"fontColor" : "white", "backColor" : "#A8FF7E", "value" : "자연", "selected" : false},
        {"fontColor" : "white", "backColor" : "#0E2D5C", "value" : "명언", "selected" : false},
        {"fontColor" : "white", "backColor" : "#CBC6C3", "value" : "소설속명언", "selected" : false},
        {"fontColor" : "white", "backColor" : "#FC3131", "value" : "열정", "selected" : false},
        {"fontColor" : "white", "backColor" : "#FF5252", "value" : "사랑", "selected" : false}
    ]);
    

    useEffect(()=> {

    },[]);



    return (
        <RegisterContainer
        // 회원가입 State
        Id={Id}
        Password={Password}
        ConfirmPassword={ConfirmPassword}
        NickName={NickName}
        Name={Name}
        Email={Email}
        Age={Age}
        Gender={Gender}
        Tags={Tags}

        // Handler
        onIdHandler={onIdHandler}
        onPasswordHandler={onPasswordHandler}
        onConfirmPasswordHandler={onConfirmPasswordHandler}
        onNickNameHandler={onNickNameHandler}
        onNameHandler={onNameHandler}
        onAgeHandler={onAgeHandler}
        onGenderHandler={onGenderHandler}
        onSubmitHandler={onSubmitHandler}

        // 유효성 검사
        CheckIdExist={CheckIdExist} // 아이디 중복확인
        CheckPwdRule={CheckPwdRule} // 비밀번호 패턴확인
        CheckPwdConfirm={CheckPwdConfirm}   // 비밀번호 일치 확인
        NickNameCheck={NickNameCheck}   // 닉네임 중복확인


        // 이메일 인증코드
        EmailValidConfirm={EmailValidConfirm}   // 사용자가 입력한 인증확인코드
        ShowEmailValidContainer={ShowEmailValidContainer}   // 인증확인 코드 창을 보여주는 State
        IsValidRequested={IsValidRequested}     
        RequestEmailCode={RequestEmailCode}

        onEmailHandler={onEmailHandler} // 이메일 Request Input Handler
        EmailValidCodeHandler={EmailValidCodeHandler} // 이메일인증코드 Input Handler


        // Page Manage
        PageStep={PageStep}

        // ToggleMove
        ToggleMove={ToggleMove}

        // TagList
        TagList={TagList}
        // TagClick
        TagClick={TagClick}
        />
    );
};




export default RegisterAction;