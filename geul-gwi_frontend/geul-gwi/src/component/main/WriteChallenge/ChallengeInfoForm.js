import React from 'react';
import styled from 'styled-components';
import { Tag } from 'component/common/button/Tag';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const ChallengeInfoForm = (props) => {
    return (
        <Frame>
            <FlexContainer>
                <ChallengeTitleContainer>
                    <ChallengeTitle>{props.selectedIndex + 1 + "회차 챌린지"}</ChallengeTitle>
                    <ChallengeState>
                        {props.selectedChallenge.status === "FINISHED" && <span style={{color : "red"}}>종료</span>}
                        {props.selectedChallenge.status === "ONGOING" && <span style={{ color: "blue" }}>진행 중</span>}
                        {props.selectedChallenge.status === "UPCOMING" && <span style={{ color: "green" }}>예정</span>}
                    </ChallengeState>
                </ChallengeTitleContainer>
                <Date>{props.selectedChallenge.start + " ~ " + props.selectedChallenge.end}</Date> 
                <ChallengeDesc>{props.selectedChallenge.comment}</ChallengeDesc>
                <TagContainer>
                    {props.selectedChallenge.keyword && props.selectedChallenge.keyword.map((keyword, index) => (
                        <Tag key={index}>{"# "+ keyword}</Tag>
                    ))}
                </TagContainer>
            </FlexContainer>
        </Frame>
    );
};

const Frame = styled.div`
    display : flex;
    width : 100%;
    min-height : 100px; height : auto;
    padding : 10px 0px 10px 0px;
    justify-content: center;
`
const FlexContainer = styled.div`
    display : flex;
    width : 100%;
    min-height : 100%; height : auto;
    flex-direction: column;
    justify-content: space-between;
    font-family: "Nanum Square";
`
const ChallengeTitleContainer = styled.div`
    display : flex;
    width : 100%;
    height : 30px;
    flex-direction: row;
    justify-content : flex-start; 
    align-items : center;
`
const ChallengeTitle = styled.span`
    display : inline-flex;
    width : auto;
    height : 100%;
    justify-content: center; 
    align-items : center;
    padding : 0px 5px 0px 5px;
    font-size : 23px; 
    font-style : "bold"; 
    color : rgb(70,70,70);
`
const ChallengeState = styled.span`
    display : inline-flex;
    width : auto;
    justify-content: center; 
    align-items: center;
    padding : 0px 0px 0px 5px;
    font-size : 15px;
`

const Date = styled.span`
    display : flex;
    margin: none;
    padding : 5px 0px 0px 5px;
    justify-content: flex-start; 
    align-items: center;
    font-size : 13px; 
    color : gray;
`

const ChallengeDesc = styled.div`
    padding : 10px 0px 10px 5px;
    white-space: pre-line;
    line-height : 25px; 
    font-size : 15px; 
    color : rgba(100,100,100,0.9);
`

// 선정된 TagList
const TagContainer = styled.div`
    display : flex;
    width : 100%; 
    flex-direction: row; justify-content: flex-start;
    flex-wrap: wrap;
    gap : 10px;
    padding : 10px 0px 10px 0px;
`

const SelectContainer = styled.div`
    display : flex;
    width : 100%;
    height : 50px;
    justify-content: center;
`


const ArrowContainer = styled.div`
    display : flex;
    width : 50px;
    height : 100%;
    justify-content : center; align-items: center;
    cursor : pointer;
    border-radius: 50%;
    &:hover{
        background-color : rgba(244,244,244,0.9);
    }
`

const ChallengeSelectContainer = styled.div`
    display : flex;
    width : calc(100% - 120px);
    height : 100%;
    justify-content: center; align-items: center;
    border-radius : 16px;
    cursor : pointer;

    &:hover{
        background-color: rgba(244,244,244,0.9);
    }
`

export default ChallengeInfoForm;