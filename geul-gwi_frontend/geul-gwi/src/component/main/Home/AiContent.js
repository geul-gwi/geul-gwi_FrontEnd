import React from 'react';
import styled from 'styled-components';

const AiContent = () => {
    return (
        <Frame>
            <FlexFrame>
                <TitleContainer>AI 추천 글귀</TitleContainer>
                <AiContentContainer>
                    <AuthorName>랄프 왈도 에머슨</AuthorName>
                    <AuthorWiseSaying>
                    너무 소심하고 까다롭게 자신의 행동을 고민하지 말라.  모든 인생은 실험이다.
                    더 많이 실험할수록 더나아진다
                    </AuthorWiseSaying>
                </AiContentContainer>
            </FlexFrame>
        </Frame>
    );
};

const Frame = styled.div`
    display : flex;
    width : 100%;
    height : 270px;
    border-radius : 16px;

    background-color : white;
    justify-content: center;
    align-items : center;
`
const FlexFrame = styled.div`
    display : flex;
    width : 85%;
    height : 90%;

    flex-direction: column;
    justify-content : space-between;
`
const TitleContainer = styled.div`
    display : flex;
    width : 100%;
    height : 10%;
    
    color : #F5746B;
    font-size : 18px;
    font-family : "Nanum Square";
    font-style : "bold";
    justify-content : center;
    align-items: center;
`
const AiContentContainer = styled.div`
    display : flex;
    cursor : pointer;
    width : 100%;
    height : 80%;
    flex-direction : column;
`
const AuthorName = styled.div`
    width : 100%;
    height : 30px;
    font-size : 24px;
    font-family : "Nanum Square";
    font-style : "bold";    
`
const AuthorWiseSaying = styled.p`
    width : 100%;
    height : 100%;
    color : #9F9D9D;
    font-size : 16px;
    line-height : 30px;
`

export default AiContent;