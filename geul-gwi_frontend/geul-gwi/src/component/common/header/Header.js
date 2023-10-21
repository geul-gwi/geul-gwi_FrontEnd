import React from 'react';
import styled  from "styled-components";
import { useNavigate } from 'react-router-dom';
// Import Component
import HeaderMenu from "component/common/header/HeaderMenu";
import HeaderUserMenu from "component/common/header/HeaderUserMenu";


const Header = () => {
    const navigate = useNavigate()
    const goHome = () =>{
        navigate("/");
    }

    return (
        <Container>
            <TextContainer style={{fontFamily : "Maru Buri", fontStyle : "semi-bold"}} onClick={goHome}>
                글 귀
            </TextContainer>
            <IconContainer>
                <HeaderUserMenu/>
                <HeaderMenu/>
            </IconContainer>
        </Container>
    );
};

// Header를 나중에 수정하기 위해서 Style된 Tag로 만들어둠
const Container = styled.div`
    position : relative;
    width : 100%;
    height : 70px;
    background-color: white;
`
const TextContainer = styled.div`
    position : absolute;
    display : flex;
    left : 0px;
    width : auto;
    min-width : 120px;
    height: 100%;
    color : #FFB6B2;
    font-size: 30px;
    line-height: 70px;

    justify-content: center;
    align-items : center;
    cursor : pointer;
`

const IconContainer = styled.div`
    position : absolute;
    display : flex;
    justify-content : center;
    align-items : center;
    right : 0px;
    width : auto;
    min-width : 100px;
    height : 100%;
`

export default Header;