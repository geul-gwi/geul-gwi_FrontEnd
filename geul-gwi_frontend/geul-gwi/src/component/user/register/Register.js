import { React, useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// Axios Address Context
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
// css import
import 'css/user/Register.css'

// React-icons import
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { useNavigate } from 'react-router-dom/';

// Import Component
import TagButton from './TagButton';


const Register = () => {
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
    const [Id, setId] = useState();
    const [Password, setPassword] = useState();
    const [ConfirmPassword, setConfirmPassword] = useState();
    const [NickName, setNickName] = useState();
    const [Name, setName] = useState();
    const [Email, setEmail] = useState();
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
    // 이메일 인증확인 코드 Handler
    const EmailValidCodeHandler = (event) => {
        setEmailValidConfirm(event.currentTarget.value);
    }

    
    

    
    // 다음버튼 Click
    // const [ShowBox, setShowBox] = useState(true) // true => leftbox , false => rightbox
    const [Box1_showHide, setBox1Show] = useState("box1Show");
    const [Box2_showHide, setBox2Show] = useState("box2Hide");
    const ToggleMove = () => {
        // console.log("ShowBox : " + ShowBox);
        // setShowBox(!ShowBox);
        if (Box1_showHide === 'box1Show'){
            setBox1Show('box1Hide');
            setBox2Show('box2Show');
        }
        else{
            setBox1Show('box1Show');
            setBox2Show('box2Hide');
        }
    }

    // 아이디 유효성 검사
    let IdCheckResult = null;
    const CheckIdExist = async () => {
        IdCheckResult = null;
        const CheckText = document.getElementById("idCheck");
        console.log("Axios Shoot : "+AxiosAddress+IdChkMapping+"/"+Id)
        try{
            const response = await axios.post(AxiosAddress+IdChkMapping+"/"+Id,null);
            IdCheckResult = response.data;
        }
        catch (error){
            console.log(error);
            console.log("아이디 사용 불가 or 오류발생");
        }
            
        if (IdCheckResult === true){
            CheckText.innerHTML = "사용 가능합니다";
            CheckText.style.color = "green";
        }
        else{
            CheckText.innerHTML = "이미 존재합니다";
            CheckText.style.color = "red";
        }
    }

    // 비밀번호 패턴 체크
    const CheckPwdRule = () => {
        let result = true;
        let CheckText = document.getElementById("pwdCheck");
        let special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
        if (Password.search(/\s/) != -1){
            CheckText.innerHTML = "공백이 포함되어있습니다."
            CheckText.style.color  = "red";
        }

        if (result == true){
            CheckText.innerHTML = "사용 가능합니다";
            CheckText.style.color = "green";
        }
        else{
            CheckText.innerHTML = "이미 존재합니다";
            CheckText.style.color = "red";
        }
    }
    // 비밀번호 Confirm 확인
    const CheckPwdConfirm = () => {
        let pwdConfirm = document.getElementById("pwdConfirm");
        if (Password === ConfirmPassword){
            pwdConfirm.innerHTML = "비밀번호가 일치합니다";
            pwdConfirm.style.color = "green";
        }
        else{
            pwdConfirm.innerHTML = "비밀번호가 일치하지 않습니다";
            pwdConfirm.style.color = "red";
        }
    }
    // 닉네임 중복 체크
    let NickCheckResult;
    const NickNameCheck = async () => {
        NickCheckResult = null;
        let nickCheckHtml = document.getElementById("nicknameCheck");

        try{
            const response = await axios.post(AxiosAddress+NickChkMapping+"/"+NickName,null);
            console.log(response.data);
            NickCheckResult = response.data;
        }
        catch(error){
            console.log(error);
        }

        // 결과 확인
        if (NickCheckResult === true){
            nickCheckHtml.innerHTML = "닉네임 사용가능합니다";
            nickCheckHtml.style.color = "green";
        }
        else{
            nickCheckHtml.innerHTML = "이미 닉네임이 존재합니다";
            nickCheckHtml.style.color = "red";
        }
    }


    // 이메일 인증 버튼
    const RequestEmailCode = (email) => {
        
        // 요청을 아직 하지 않았다면,
        if (!IsValidRequested){
            axios.post(AxiosAddress+EmailCodeRequestMapping, {"email" : Email})
            .then((response)=>{
                const ButtonObj = document.getElementById("EmailValidButton");
                ButtonObj.innerHTML = "인증확인";
                setIsValidRequested(true);
                setShowEmailValidContainer(true);

                alert("성공적으로 이메일 인증 요청이 완료되었습니다.");
                console.log(response);
            })
            .catch((error) => {
                alert("이메일 인증 요청중 오류가 발생하였습니다.");
                console.log(error);
            })
        }
        // 이미 요청을 했다면
        else{
            axios.post(AxiosAddress+CodeValidMapping, {"code" : EmailValidConfirm})
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
    // 이메일 인증 확인
    const onConfirmValidCode = (confirm) => {

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

    return (
        <RegiContainer>
            <PrivacyContainer className={Box1_showHide}>
                <div style={{display: 'flex' , flexDirection : 'column', width  : '400px', height : '100%', margin : '0 auto'}}>
                    <h3 className='title'>회원가입</h3>
                    <h5 className='sub_title'>회원정보를 입력해주세요</h5>
                    <label>아이디</label>
                    <input type='text' value={Id} onBlur={() => CheckIdExist()} onChange={onIdHandler} placeholder='아이디를 입력'/>
                    <ShowText id='idCheck'></ShowText>

                    <label>비밀번호</label>
                    <input type='password' value={Password} onChange={onPasswordHandler} placeholder='대문자 1개, 특수문자 1개이상 포함해주세요'/>
                    <ShowText id='pwdCheck'></ShowText>
                    
                    <label>비밀번호 확인</label>
                    <input type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler} placeholder='비밀번호 확인'
                    onBlur={CheckPwdConfirm}
                    />
                    <ShowText id='pwdConfirm'></ShowText>

                    <label>닉네임</label>
                    <input type='text' value={NickName} onChange={onNickNameHandler} placeholder='닉네임 입력' onBlur={NickNameCheck}/>
                    <ShowText id='nicknameCheck'></ShowText>

                    <label>이름</label>
                    <input type='text' value={Name} onChange={onNameHandler} placeholder='이름 입력'/>
                    <ShowText></ShowText>

                    <label>나이</label>
                    <input type='number' value={Age} onChange={onAgeHandler} placeholder='나이 입력'/>
                    <ShowText></ShowText>

                    <label>성별</label>
                    <select id='gender_input' onChange={onGenderHandler}>
                        <option value={'Male'}>남성</option>
                        <option value={'FeMale'}>여성</option>
                    </select>
                    <ShowText></ShowText>

                    <label>이메일</label>
                    {/* <input type='email' value={Email} onChange={onEmailHandler} placeholder='이메일 입력' style={{width : '50%;'}}/> */}
                    <EmailValidContainer>
                        <EmailValidRequestContainer>
                            <EmailInput type="email" value={EmailValidConfirm} onChange={EmailValidCodeHandler} placeholder='이메일 입력'/>
                            <EmailValidRequestButton id="EmailValidButton" onClick={(e) => RequestEmailCode(EmailValidConfirm)}>인증요청</EmailValidRequestButton>
                        </EmailValidRequestContainer>
                        {
                            ShowEmailValidContainer ?
                            <EmailValidConfirmContainer /> :
                            ""
                        }
                    </EmailValidContainer>

                    <ShowText></ShowText>

                    <NextButton onClick={ToggleMove}>
                        다음
                    </NextButton>
                </div>
            </PrivacyContainer>
            <TagSelectContainer className={Box2_showHide}>
                <BackButton onClick={ToggleMove}><MdOutlineArrowBackIosNew size={'20px'}/></BackButton>
                <form style={{display: 'flex' , flexDirection : 
                'column', width  : '400px', height : '100%', margin : '0 auto'}} onSubmit={onSubmitHandler}>
                    <h3 className='title'>태그 선택</h3>
                    <h5 className='sub_title'>선호하시는 태그를 선택하시면 됩니다. (3개 제한)</h5>
                    
                    <TagsContainer>
                        
                        {TagList.map((element,idx) => (
                            <TagButton 
                            id={"tag"+idx} 
                            fontColor={element.fontColor} 
                            backColor = {element.backColor} 
                            value = {element.value} 
                            selected={element.selected}
                            TagClick={TagClick}
                            />
                        ))}
                    </TagsContainer>


                    <SubmitButton onClick={onSubmitHandler}>
                        회원가입
                    </SubmitButton>
                </form>
            </TagSelectContainer>
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



export default Register;