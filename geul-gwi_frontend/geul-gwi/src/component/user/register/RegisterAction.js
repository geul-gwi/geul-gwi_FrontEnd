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
    const navigate = useNavigate();
    const AxiosAddress = useContext(AxiosAddrContext).axiosAddr;
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
    const [Age, setAge] = useState("");
    const [Gender, setGender] = useState("Male");
    const [Tags, SetTags] = useState([]);
    const [profile, setProfile] = useState(null);

    // 이메일 인증코드
    const [EmailValidConfirm, setEmailValidConfirm] = useState('');
    const [ShowEmailValidContainer , setShowEmailValidContainer] = useState(false);
    
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
        if (Tags.length < 3) {
            const idx = TagList.findIndex((item) => item.value === value);
            if (idx !== -1) {
                const updatedList = [...TagList];
                const updateItem = { ...updatedList[idx] };
                updateItem.selected = !updateItem.selected;
                updatedList[idx] = updateItem;
                setTagList(updatedList);
            }
        } else {
            alert("3개까지만 지정 가능합니다.");
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
    const CheckIdExist = async () => {
        // 아무것도 입력안했으면 return
        if (Id.length === 0){return false;}

        console.log("Axios Shoot : "+AxiosAddress+IdChkMapping+"/"+Id);
        try{
            const response = await axios.post(AxiosAddress+IdChkMapping+"/"+Id,null);
            return response.data;
        }
        catch (error){
            console.log(error);
            return false;
        }
    }

    // 비밀번호 패턴 체크
    const CheckPwdRule = () => {
        let result = true;
        let CheckText = document.getElementById("pwdCheck");
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
    // 비밀번호 Confirm 확인
    const CheckPwdConfirm = () => {
        if (Password === ConfirmPassword){return true;}
        else{return false;}
    }
    // 닉네임 중복 체크
    const NickNameCheck = async () => {
        try{
            const response = await axios.post(AxiosAddress+NickChkMapping+"/"+NickName,null);
            console.log(response.data);
            return response.data;
        }
        catch(error){
            console.log(error);
            return false;
        }
    }


    // 이메일 인증을 위한 인증번호 요청 함수
    const RequestEmailCode = async (email) => {
        console.log("이메일 인증 요청");
        try{
            const response = await axios.post(AxiosAddress+EmailCodeRequestMapping, {"email" : Email});
            setShowEmailValidContainer(true);
            console.log(response);
            return true;
        }
        catch(error){
            alert("인증코드가 틀립니다.");
            console.log(error);
            return false;
        }
    }

    // 이메일 인증번호 확인 요청 함수
    const CheckEmailValidCode = async() => {
        console.log("인증번호 확인 요청");
        try{
            const response = await axios.post(AxiosAddress+CodeValidMapping, {"code" : EmailValidConfirm});
            alert("이메일 인증이 완료되었습니다.");
            console.log(response);
            return true;
        }
        catch(error){
            alert("인증번호가 다릅니다.");
            console.log(error);
            return false;
        }
    }


    // 입력 누락 확인 및 조건만족 Check
    const CheckGoodToContinue = () => {

    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [showProfile, setShowProfile] = useState(null);

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

    // 회원가입 Submit
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("file", profile);
        const joinDTO = {
            'userId' : Id,
            'userPassword' : Password,
            'userNickname' : NickName,
            'userAge' : Age,
            'userGender' : Gender,
            'userTagSeq': TagList
                .filter(tag => tag.selected === true)
                .map(tag => tag.tagSeq),
            'userEmail' : Email
        }

        console.log(joinDTO);

        // 나머지 데이터를 JSON 문자열로 변환하여 FormData에 추가
        formData.append("joinDTO", new Blob([JSON.stringify(joinDTO)], { type: "application/json" }));

        formData.forEach((value, key) => {
            console.log(key, value);
        });

        await axios.post(AxiosAddress + JoinRequest, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }})
            .then((response) => {
                alert("회원가입을 완료했습니다.");   
                console.log(response.data);
                navigate('/user/login');
            })
            .catch(function(error){
                console.log(error);
                alert("예기치 못한 오류가 발생하였습니다.");        // 나중에 오류 처리 해줄 것
                //navigate('/user/register');
            });
    }

    // 태그 버튼 생성 List
    let [TagList,setTagList] = useState([]);

    const tagListUrl = "/tag/list/DEFAULT";
    // Onload
    useEffect(() => {
        //console.log("url 주소: " + AxiosAddress + tagListUrl);
        axios.post(AxiosAddress + tagListUrl)
            .then(response => {
                //console.log(response.data);
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


        // 이메일 인증코드
        EmailValidConfirm={EmailValidConfirm}   // 사용자가 입력한 인증확인코드
        ShowEmailValidContainer={ShowEmailValidContainer}   // 인증확인 코드 창을 보여주는 State

        RequestEmailCode={RequestEmailCode} // 이메일 인증 요청 func
        CheckEmailValidCode={CheckEmailValidCode}   // 이메일 인증코드 확인 func

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