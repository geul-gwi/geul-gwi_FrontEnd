import React from 'react';
import styled from 'styled-components';
// component
import ChallengeInfo from 'component/challenge/ChallengeInfo';
import SortManager from 'component/main/WriteChallenge/PostManager/SortManager'

const ChallengeComponent = (props) => {
    return (
        <Frame>
            <ChallengeInfo />
            <FlexManager>
                <SortManager
                    setPosts={props.setPosts}
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
    flex-direction: column;
    justify-content: center;
    user-select: none;
    gap: 20px;
`

const FlexManager = styled.div`
    display : flex;
    width : 100%;
    min-height : calc(100% - 20px);
    height : auto;
    padding : 10px 0px 10px 0px;
    flex-direction: column;
    align-items : center;
    gap : 20px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 16px;
`

export default ChallengeComponent;