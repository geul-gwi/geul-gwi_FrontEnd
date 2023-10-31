import React from 'react';
import styled from 'styled-components';
// component
import ChallengeInfo from 'component/challenge/ChallengeInfo';
import SortManager from './PostManager/SortManager';

const ChallengeComponent = (props) => {
    return (
        <Frame>
            <FlexManager>
                <ChallengeInfo />
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

export default ChallengeComponent;