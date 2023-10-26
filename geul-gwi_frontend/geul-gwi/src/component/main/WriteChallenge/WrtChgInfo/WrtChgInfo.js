import React from 'react';
import styled from 'styled-components';
import { Tag } from 'component/common/button/Tag';

const WrtChgInfo = (props) => {
    const ReplaceNewLine = (text) => {
        var newText = text;
        newText = newText.replace("<br>","\n");
        return newText;
    }

    return (
        <Frame>
            <FlexContainer>
                {/* 챌린지 이름 */}
                <ChallengeTitleContainer>
                    <ChallengeTitle>
                        {props.selectedChallenge.challengeName}
                    </ChallengeTitle>
                    <ChallengeState>
                    { props.selectedChallenge.challengeState === "active" ?
                        <span style={{color : "green"}}>진행중</span> 
                        :
                        <span style={{color : "red"}}>종료</span>
                    }
                    </ChallengeState>
                </ChallengeTitleContainer>

                {/* 챌린지 시작일 */}
                <ChallengeStartDay>
                    {"시작일 : " + props.selectedChallenge.startDay}
                </ChallengeStartDay>
                {/* 챌린지 설명 */}
                <ChallengeDesc>
                    {
                        props.selectedChallenge.desc
                    }
                </ChallengeDesc>
                
                {/* 챌린지 태그 */}
                <TagContainer>
                    <Tag>#사랑</Tag>
                    <Tag>#소중함</Tag>
                    <Tag>#우정</Tag>
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

// Challenge의 제목
const ChallengeTitleContainer = styled.div`
    display : flex;
    width : 100%;
    height : 40px;
    flex-direction: row;
    justify-content : flex-start; align-items : center;
`
const ChallengeTitle = styled.span`
    display : inline-flex;
    min-width : 10px; width : auto;
    height : 100%;
    justify-content: center; align-items : center;
    padding : 0px 5px 0px 5px;
    font-size : 20px; font-style : "bold"; color : rgb(70,70,70);
`
const ChallengeState = styled.span`
    display : inline-flex;
    min-width : 10px; width : auto;
    height : 100%;
    top : 0px; right : 20px;
    justify-content: center; align-items: center;
    padding : 0px 0px 0px 5px;
    font-size : 14px;
`

// Challenge Start Day
const ChallengeStartDay = styled.div`
    display : flex;
    width : 100%; height : 30px;
    justify-content: flex-start; align-items: center;
    padding : 0px 0px 0px 5px;
    font-size : 12px; color : rgba(200,200,200,0.9);
`

const ChallengeDesc = styled.div`
    width : 100%;
    min-height : 10px; height : auto;
    padding : 10px 0px 10px 5px;
    white-space: pre-line;
    line-height : 24px; font-size : 14px; color : rgba(100,100,100,0.9);
`

// 선정된 TagList
const TagContainer = styled.div`
    display : flex;
    width : 100%; min-height : 30px; height : auto;
    flex-direction: row; justify-content: flex-start;
    flex-wrap: wrap;
    gap : 10px;
    padding : 10px 0px 10px 0px;
`
// 선정된 Tag를 담을 ItemDiv
const TagItem = styled.div`
    display : flex;
    min-width : 5px; width : auto;
    height : 20px;
    padding : 5px 10px 5px 10px;
    border-radius : 16px;
    justify-content: center; align-items: center;
    font-size : 14px; color : white; background-color : #FB5B5B;
`

export default WrtChgInfo;