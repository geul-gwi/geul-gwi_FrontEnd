import styled from 'styled-components';
import { Tag } from 'component/common/button/Tag';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import React, { useEffect, useContext, useState } from 'react';
import Axios from 'axios';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Button } from 'component/common/button/Button';


// 챌린지 회차 목록
const ChallengeInfo = (props) => {
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

const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
  padding: 20px;
  gap: 10px;
`

const DateTitle = styled.p`
  font-size: 14px;
`

const DateInput = styled.input`
  width: 140px;
  height: 34px;
  font-size: 15px;
  color: gray;
`
const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 40px 20px 30px 20px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  height: auto;
  margin: 10px;
  align-items: center;
`

const Title = styled.span`
  font-size: 18px;
`;

const KeywordInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
`;

const KeywordInput = styled.input`
  width: 100%;
  height: 30px;
  border: 1px solid #ddd;
  padding: 5px;
  font-size: 16px;
  margin-top: 10px;
`;


const InputComent = styled.textarea`
  width: 100%;
  height: 80px;
  border: 1px solid #ddd;
  padding: 10px;
  resize: vertical;
  font-size: 15px;
`;

const ShowButton = styled.div`
    margin-top: 20px;
    display : flex;
    width : 140px;
    height : 50px;
    padding : 0px 10px 0px 10px;
    border-radius: 16px;
    margin-bottom: 20px;
    background: #FFF;
    box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.25);
    align-items: center; justify-content: space-between;
    cursor : pointer;
    transition : 0.2s;
    &:hover{
        background-color : mistyrose;
    }
`
const ButtonTextContainer = styled.div`
    display : flex;
    width : 100px;
    height : 80px;
    justify-content: center; 
    align-items: center;
    font-size : 12px; color : black;
`
const ButtonIconContainer = styled.div`
    display : flex;
    width : 15px;
    height : 15px;
    justify-content: center;
    align-items: center;
`
const Iconimg = styled.img`
    width : 100%;
    height : 100%;
    object-fit: contain;
`



export default ChallengeInfo;