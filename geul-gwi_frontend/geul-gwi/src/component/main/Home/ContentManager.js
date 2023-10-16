import React from 'react';
import styled from 'styled-components';

const ContentManager = () => {
    return (
        // manager Frame입니다
        <ManagerFrame>
            <ContentMenu1>글 추천</ContentMenu1>
            <ContentMenu2>구독 콘텐츠</ContentMenu2>

            <MovingUnderLine/>
        </ManagerFrame>
    );
};

const ManagerFrame = styled.div`
    position : relative;
    display : flex;
    width : 100%;
    height : 80px;
    background-color : white;
    border-radius : 16px;

    justify-content: space-evenly;
    align-items: center;
    margin-bottom :30px;
`

const MenuFrame = styled.div`
    display : flex;
    width : 30%;
    height : 100%;
    justify-content: center;
    align-items: center;
    color : #515050;
    font-family: "Nanum Square";
    font-style : "bold";
    font-size : 18px;
    cursor : pointer;
    background-image: linear-gradient(90deg,#F66767,#F66767);
    background-size : 0% 2px;
    background-repeat :no-repeat;
    background-position : bottom;
    transition : background-size 200ms ease;
    &:hover{
        background-size : 100% 2px;
    }
`
const ContentMenu1 = styled(MenuFrame)`
`
const ContentMenu2 = styled(MenuFrame)`
`

const MovingUnderLine = styled.div`
    position : absolute;
    background-color: rgba(246,103,103,58);
    border-radius : 16px;
`


export default ContentManager;