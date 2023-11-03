import { React, useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom/';
// Axios Address Context
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
// css import
import 'css/user/Register.css'
// Import Component
import RegisterContainer from 'component/user/accounts/register/RegisterContainer';

const RegisterAction = () => {
    const navigate = useNavigate();
    const AxiosAddress = useContext(AxiosAddrContext).axiosAddr;

    let JoinRequest = '/user/join';
    let IdChkMapping = "/user/validate/id/"; 
    let NickChkMapping = "/user/validate/nickname/";
    let EmailCodeRequestMapping = "/email/valid";
    let CodeValidMapping = "/email/valid/code";
    let emailCheckUrl = '/user/validate/email/';
    const tagListUrl = "/tag/list/DEFAULT";

    // State값들
    const [Id, setId] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [NickName, setNickName] = useState("");
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Age, setAge] = useState("");
    const [Gender, setGender] = useState("Male");
    const [Tags, SetTags] = useState([]);
    const [profile, setProfile] = useState(null);

    // 이메일 인증코드
    const [EmailValidConfirm, setEmailValidConfirm] = useState('');
    const [ShowEmailValidContainer , setShowEmailValidContainer] = useState(false);

    // 태그 버튼 생성 List
    let [TagList,setTagList] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showProfile, setShowProfile] = useState(null);
    
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

    // 태그 클릭 처리
    const onClickTagButton = (tag) => {
        const isTagSelected = tag.selected;
        const maxTagsSelected = Tags.length === 3;
    
        if (isTagSelected) {
            const updatedTags = Tags.filter((selectedTag) => selectedTag.value !== tag.value);
            const updatedList = TagList.map((item) =>
                item.value === tag.value ? { ...item, selected: false } : item
            );
    
            SetTags(updatedTags);
            setTagList(updatedList);
        } else if (!maxTagsSelected) {
            const updatedList = TagList.map((item) =>
                item.value === tag.value ? { ...item, selected: true } : item
            );
    
            setTagList(updatedList);
            SetTags((prevSelectedValues) => [...prevSelectedValues, tag]);
        } else {
            alert("태그는 3개까지 선택 가능합니다.");
        }
    };
    

    // 이메일 인증확인 코드 Handler
    const EmailValidCodeHandler = (event) => {
        setEmailValidConfirm(event.currentTarget.value);
    }

    // 다음버튼 Click
    const [PageStep, SetPageStep] = useState("page1");

    const ToggleMove = () => {
        if (PageStep === "page1"){
            SetPageStep("page2");
        }
        else{
            SetPageStep("page1");
        }
    }

    // 아이디 유효성 검사
    const CheckIdExist = async () => {
        // 아무것도 입력안했으면 return
        if (Id.length === 0) return false;
        // console.log("Axios Shoot : "+AxiosAddress+IdChkMapping+"/"+Id);
        try{
            const response = await axios.post(AxiosAddress+IdChkMapping+Id, {});
            return response.data;
        }
        catch (error){
            console.log(error);
            return false;
        }
    }

    // 비밀번호 패턴 체크
    const CheckPwdRule = () => {
        let special_pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&~])[A-Za-z\d@$!%*#?&~]{8,20}$/;
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

    // 재입력 비밀번호 유효성 검사 
    const CheckPwdConfirm = () => {
        return (Password === ConfirmPassword);
    }

    // 닉네임 중복 체크
    const NickNameCheck = async () => {
        try{
            const response = await axios.post(AxiosAddress+NickChkMapping+NickName, {});
            //console.log(response.data);
            return response.data;
        }
        catch(error){
            console.log(error);
            return false;
        }
    }

    // 이메일 인증번호 요청
    const RequestEmailCode = async () => {
        try{
            const response = await axios.post(`${AxiosAddress}${EmailCodeRequestMapping}`, {email: Email} );
            setShowEmailValidContainer(true);
            console.log(response);
            return true;
        }
        catch(error){
            alert("인증번호 요청을 실패했습니다.");
            console.log(error);
            return false;
        }
    }

    // 이메일 중복 체크
    const EmailCheck = async () => {
        try {
            const response = await axios.post(`${AxiosAddress}${emailCheckUrl}${Email}`, {});
            return response.data;
        }
        catch (error) {
            console.error("이메일 중복 확인: ", error);
            return false;
        }
    }

    // 이메일 인증번호 확인 요청 
    const CheckEmailValidCode = async () => {
        //console.log("인증번호 확인 요청");
        try{
            const response = await axios.post(AxiosAddress+CodeValidMapping, {"code" : EmailValidConfirm});
            alert("이메일 인증이 완료되었습니다.");
            console.log(response);
            return true;
        }
        catch(error){
            alert("인증번호가 일치하지 않습니다..");
            console.error(error);
            return false;
        }
    }


    // 입력 누락 확인 및 조건만족 Check
    const CheckGoodToContinue = () => {
        if (
            Id.trim() !== "" &&
            Password.trim() !== "" &&
            ConfirmPassword.trim() !== "" &&
            NickName.trim() !== "" &&
            Name.trim() !== "" &&
            Email.trim() !== "" &&
            Age.trim() !== "" &&
            Gender.trim() !== "" &&
            Tags.length > 0
        ) {
            return true; // 모든 필수 입력란이 채워져 있음
        } else {
            return false; // 하나 이상의 필수 입력란이 비어 있음
        }
    }


    // 프로필 사진 삭제 
    const handleDeleteProfileImg = () => {
        setProfile(null);
        setShowProfile(null);
    };

    // 모달 창 ON/OFF
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // 프로필 사진 변경
    const handleProfileImgChange = (event) => {
        const file = event.target.files[0];
        //props.setNewProfile(URL.createObjectURL(file)); 
        setProfile(file);
        setShowProfile(URL.createObjectURL(file));

    };

    // 회원 가입 처리
    const onSubmitHandler = async () => {

        if(!CheckGoodToContinue())
        {
            alert("정보를 모두 입력해주세요.");
            return;
        }
        else if(Tags.length === 0)
        {
            alert("최소 태그 1개를 선택해주세요.");
            return;
        }

        const formData = new FormData();

        if (profile != null)
            formData.append("file", profile);

        const joinDTO = {
            'userId': Id,
            'userPassword': Password,
            'userNickname': NickName,
            'userAge': Age,
            'userGender': Gender,
            'userTagSeq': TagList
                .filter(tag => tag.selected === true)
                .map(tag => tag.tagSeq),
            'userEmail': Email
        }

        //console.log(joinDTO);

        formData.append("joinDTO", new Blob([JSON.stringify(joinDTO)], { type: "application/json" }));

        await axios.post(AxiosAddress + JoinRequest, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                alert("회원가입을 완료했습니다.");
                //console.log(response.data);
                navigate('/accounts/');
            })
            .catch(function (error) {
                alert("회원가입이 정상적으로 완료되지 못했습니다. \n 다시 시도해주세요.");
                console.error(error);
            });
    }


    // Onload
    useEffect(() => {
        axios.post(AxiosAddress + tagListUrl)
            .then(response => {
                console.log(response.data);
                const updatedList = response.data.map(tag => {
                    return {
                        ...tag,
                        selected: false // selected 속성을 false로 초기화
                    };
                });
                setTagList(updatedList);

            })
            .catch(error => {
                console.log(error);
            });
    }, []);

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

            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            handleDeleteProfileImg={handleDeleteProfileImg}
            handleProfileImgChange={handleProfileImgChange}
            showProfile={showProfile}


        // 유효성 검사
        CheckIdExist={CheckIdExist} // 아이디 중복확인
        CheckPwdRule={CheckPwdRule} // 비밀번호 패턴확인
        CheckPwdConfirm={CheckPwdConfirm}   // 비밀번호 일치 확인
        NickNameCheck={NickNameCheck}   // 닉네임 중복확인
        EmailCheck={EmailCheck}

        // 이메일 인증코드
        EmailValidConfirm={EmailValidConfirm}   // 사용자가 입력한 인증확인코드
        ShowEmailValidContainer={ShowEmailValidContainer}   // 인증확인 코드 창을 보여주는 State

        RequestEmailCode={RequestEmailCode} // 이메일 인증 요청 func
        CheckEmailValidCode={CheckEmailValidCode}   // 이메일 인증코드 확인 func

        onEmailHandler={onEmailHandler} // 이메일 Request Input Handler
        EmailValidCodeHandler={EmailValidCodeHandler} // 이메일인증코드 Input Handler

        PageStep={PageStep}
        ToggleMove={ToggleMove}
        TagList={TagList}
        TagClick={onClickTagButton}
        />
    );
};




export default RegisterAction;