import {React , useState, useContext} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as SolidUser, faEnvelope as SolidEnvelope , faBell as SolidBell} from '@fortawesome/free-solid-svg-icons'
import { faUser as RegularUser, faEnvelope as RegularEnvelope , faBell as RegularBell} from '@fortawesome/free-regular-svg-icons'

//context Import
import { userStoreContext } from 'contextStore/UserStore';

const LeftNavbar = () => {
    // context
    const UserState = useContext(userStoreContext);
    // function
    const navigate = useNavigate();
    const newWrite = () => {
        console.log("newWrite");
        // 로그인이 되어있을 때만 이동할 수 있도록 작성
        if (UserState.loggedIn){
            alert("글 작성하러 이동합니다");
            navigate("/main/challenge/write_post")
        }
        else{
            alert("로그인이 되어있지 않아 이용하실 수 없습니다.");
        }
        
    }

    const [userHover, setUserHover] = useState(true);
    const [envelopeHover, setEnvelopeHover] = useState(true);
    const [bellHover, setBellHover] = useState(true);
    const [writeHover, setWriteHover] = useState(true);

    // 아이콘 Hover Effect 처리
    const setHover = (stateName, isTrue) => {
        switch (stateName){
            case "user":
                setUserHover(isTrue);
                break;
            case "msg":
                setEnvelopeHover(isTrue);
                break;
            case "bell":
                setBellHover(isTrue);
                break;
            case "write":
                setWriteHover(isTrue);
                break;
            default:
                break;
        }
    };

    // 글 작성 이벤트
    return (
        <NavBar>
            <ItemContainer>
                <Item 
                onMouseOver={() => setHover("user",false)}
                onMouseOut={() => setHover("user",true)}>
                    <FontAwesomeIcon size="xl" color={'#444444'} title='계정' icon={userHover ? RegularUser : SolidUser} />
                </Item>
                <Item
                onMouseOver={() => setHover("msg",false)}
                onMouseOut={() => setHover("msg",true)}>
                    <FontAwesomeIcon size="xl" color={'#444444'} title='메시지' icon={envelopeHover ? RegularEnvelope : SolidEnvelope}/>
                </Item>
                <Item
                onMouseOver={() => setHover("bell",false)}
                onMouseOut={() => setHover("bell",true)}
                        onClick={ShowAlertForm}>
                      
                    <FontAwesomeIcon size="xl" color={'#444444'} title='알림' icon={bellHover ? RegularBell : SolidBell}/>
                </Item>
                <Item
                onMouseOver={() => setHover("write",false)}
                onMouseOut={() => setHover("write",true)}
                onClick={newWrite}
                className={writeHover ? "writeHoverOut" : "writeHover"}>
                    <span>+</span>
                </Item>
            </ItemContainer>
                <AlertForm />
        </NavBar>
    );
};

// 왼쪽 네비게이션 전체 틀 ( Main Container )
const NavBar = styled.div`
    position : fixed;
    width : 70px;
    height : 50vh;
    top : 25%;
    left : 0px;
    background-color: rgba(255,255,255,1);
    border-top-right-radius: 8px ;
    border-bottom-right-radius: 8px ;
    border : 1px solid #C6C6C6;
    /* box-shadow : 3px 3px 3px 3px grey; */
    z-index: 1;
`

// Item 정렬을 위한 Container
const ItemContainer = styled.div`
    display : flex;
    width : 100%;
    height : 90%;
    padding-top : 10px;
    margin : 0 auto;
    flex-direction : column;
    align-items:center;
`
// Item을 담음 (ItemContainer보다 하위)
const Item = styled.div`
    display : flex;
    width : 45px;
    height : 45px;
    margin : 10px;
    justify-content: center;
    align-items: center;
    cursor : pointer;
    padding : 0px;

`

export default LeftNavbar;