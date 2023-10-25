import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// import Component
import NoticeForm from "component/notice/NoticeForm";
import FriendForm from "component/friend/FriendForm";
import { MdBreakfastDining } from 'react-icons/md';


const itemList = []
itemList.push({ "name": "홈", "src": "/icon/Navigation/home.svg", "target": "/" })
itemList.push({ "name": "탐색", "src": "/icon/Navigation/search.svg", "target": "/main/Search" });
itemList.push({ "name": "알림", "src": "/icon/Navigation/bell.svg", "target": "/alarm" })
itemList.push({ "name": "친구", "src": "/icon/Navigation/users.svg", "target": "/friend" })
itemList.push({ "name": "쪽지", "src": "/icon/Navigation/users.svg", "target": "/main/message" })

const Navigation = (props) => {
    // navigate Object
    const navigate = useNavigate();
    // useState
    const [isAlertFormVisible, setIsAlertFormVisible] = useState(false);
    const [isFriendForm, SetisFriendForm] = useState(false);

    // Function
    const ComponentMove = (target) => {
        if (target === "/alarm"){
            handleAlertClick();
            return;
        }
        else if (target === "/friend") {
            handleFriendClick();
            return;
        }
        navigate(`${target}`);
    }

    const handleAlertClick = () => {
        setIsAlertFormVisible(!isAlertFormVisible);
        SetisFriendForm(false);
    };

    const handleFriendClick = () => {
        SetisFriendForm(!isFriendForm);
        setIsAlertFormVisible(false);
    };


    return (
        <NaviFrame>
            {
                itemList.map((element,idx) => (
                    <ItemContainer id={"NaviButton"+idx} onClick={() => ComponentMove(element.target)}>
                        <IconBox><IconImg src={process.env.PUBLIC_URL + element.src} alt={element.name}/></IconBox>
                        <TextBox>{element.name}</TextBox>
                    </ItemContainer>
                ))
            }
            <AlertContainer>
                {isAlertFormVisible && 
                <NoticeForm 
                    handleAlertClick={handleAlertClick}
                />}
                {isFriendForm &&
                    <FriendForm
                    handleFriendClick={handleFriendClick}
                    />}
            </AlertContainer>
        </NaviFrame>
    );
};

const AlertContainer = styled.div`
    position: absolute;
    top: 0px;
    left: calc(100% + 10px);
`
const NaviFrame = styled.div`
    display : flex;
    width : 100%;
    min-height : 100px;
    height : auto;
    flex-direction : column;
    align-items : center;

    background-color: white;
    border-radius : 16px;
    padding : 20px 0px 20px 0px;
    box-shadow: 0px 0px 32px 0px #FFA199;
    transition : 0.5s;
    opacity : 0.85;
    &:hover {
        opacity: 1;
    }
    /* box-shadow: 0px 0px 32px 0px #FF9989; */
`
const ItemContainer = styled.div`
    display : flex;
    width : 65%;
    height : 40px;
    justify-content : center;
    align-items : center;
    cursor : pointer;
    margin-bottom : 15px;
    padding : 0px 10px 0px 10px;
    border-radius: 16px ;
    &:hover{
        background-color : #DFDFDF;
    }
`
const IconBox = styled.div`
    display : flex;
    width : 40%;
    height : 100%;
    justify-content : center;
    align-items:  center;
`
const TextBox = styled.div`
    display : flex;
    width : 59%;
    height : 100%;

    justify-content: center;
    align-items: center;
    color : #343434;
`
const IconImg = styled.img`
    width : 25px;
    height : 25px;
`


export default Navigation;