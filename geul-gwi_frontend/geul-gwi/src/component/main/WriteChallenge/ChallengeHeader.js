import styled from 'styled-components';
import { Tag } from 'component/common/button/Tag';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import React  from 'react';

// 챌린지 회차 목록
const ChallengeHeader = (props) => {
    return (
        <Frame>
            <FlexContainer>
                <SelectContainer>
                    <ArrowContainer onClick={props.PrevButtonClick}><BsChevronLeft /></ArrowContainer>
                    <ChallengeSelectContainer>{props.selectedIndex + 1 + "회차 챌린지"}</ChallengeSelectContainer>
                    <ArrowContainer onClick={props.NextButtonClick}><BsChevronRight /></ArrowContainer>
                </SelectContainer>
                <BottomContainer>
                    <ChallengeTitleContainer>
                        <ChallengeTitle>{props.selectedIndex + 1 + "회차 챌린지"}</ChallengeTitle>
                        <ChallengeState>
                            {props.selectedChallenge.status === "FINISHED" && <span style={{ color: "#f77d74" }}>종료</span>}
                            {props.selectedChallenge.status === "ONGOING" && <span style={{ color: "#80d1c8" }}>진행 중</span>}
                            {props.selectedChallenge.status === "UPCOMING" && <span style={{ color: "#6fb375" }}>예정</span>}
                        </ChallengeState>
                    </ChallengeTitleContainer>
                    <Date>{props.selectedChallenge.start + " ~ " + props.selectedChallenge.end}</Date>
                    <Content>{props.selectedChallenge.comment}</Content>
                    <TagContainer>
                        {props.selectedChallenge.keyword && props.selectedChallenge.keyword.map((keyword, index) => (
                            <Tag key={index}>{"# " + keyword}</Tag>
                        ))}
                    </TagContainer>
                </BottomContainer>
            </FlexContainer>
        </Frame>
    );
};

const Frame = styled.div`
    display : flex;
    width : 610px;
    height : auto;
    justify-content: center;
    background-color: white;
    position: relative;
    border-radius: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 10px;
`

const ButtonContainer = styled.div`
    display : flex;
    flex-direction: row;
    width : 100%;
    align-items: center;
    justify-content: center;
    gap: 10px;
`


const BottomContainer = styled.div`
    padding: 10px;
`
const FlexContainer = styled.div`
    display : flex;
    width : 100%;
    min-height : 100%; 
    height : auto;
    flex-direction: column;
    padding: 10px;
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

const Content = styled.div`
    margin-top: 20px;
    line-height : 25px; 
    min-height: 100px;
    padding: 5px;
    font-size : 16px; 
    color : rgba(100,100,100,0.9);
    text-align: left; /* 왼쪽 정렬 */
`

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
`

export default ChallengeHeader;