import React from 'react';
import styled from 'styled-components';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
// component
import ChallengeInfoForm from 'component/main/WriteChallenge/ChallengeInfoForm';
import SortManager from './PostManager/SortManager';

const ChallengeComponent = (props) => {
    return (
        <Frame>
            <FlexManager>
                <SelectContainer>
                    <FlexContainer>
                        <ArrowContainer onClick={props.PrevButtonClick}><BsChevronLeft /></ArrowContainer>
                        <ChallengeSelectContainer>{props.selectedIndex + 1 + "회차 챌린지"}</ChallengeSelectContainer>
                        <ArrowContainer onClick={props.NextButtonClick}><BsChevronRight /></ArrowContainer>
                    </FlexContainer>
                </SelectContainer>
                <ChallengeInfoForm
                    selectedIndex={props.selectedIndex}
                    selectedChallenge={props.selectedChallenge}
                />
                <SortManager
                    posts={props.posts}
                />
            </FlexManager>
        </Frame>
    );
};

const Frame = styled.div`
    display : flex;
    width : 100%;
    height : auto;
    background-color: white;
    justify-content: center;
    user-select: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`

const FlexManager = styled.div`
    display : flex;
    width : 92%;
    min-height : calc(100% - 20px);
    height : auto;
    padding : 10px 0px 10px 0px;
    flex-direction: column;
    align-items : center;
    gap : 20px;
`

const SelectContainer = styled.div`
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

export default ChallengeComponent;