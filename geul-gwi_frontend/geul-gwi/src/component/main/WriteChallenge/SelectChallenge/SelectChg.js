import React from 'react';
import styled from 'styled-components';

import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const SelectChg = (props) => {
    return (
        <Frame>
            <FlexContainer>
                {/* 왼쪽 화살표 */}
                <ArrowContainer onClick={() => props.prevButtonClick()}><BsChevronLeft /></ArrowContainer>
                {/* 챌린지 선택 버튼 */}
                <ChallengeSelectContainer>{props.selectedChallenge.challengeName}</ChallengeSelectContainer>
                {/* 오른쪽 화살표 */}
                <ArrowContainer onClick={() => props.nextButtonClick()}><BsChevronRight /></ArrowContainer> 
            </FlexContainer>
        </Frame>
    );
};

const Frame = styled.div`
    display : flex;
    width : 100%;
    height : 50px;
    justify-content: center;
`
const FlexContainer = styled.div`
    display : flex;
    flex-direction: row;
    width : 100%;
    height : 100%;
    justify-content: space-between;
`

// Arrow Container
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
const ChallengeSelect = styled.select`
    width : 100%;
    height : 100%;
`


export default SelectChg;