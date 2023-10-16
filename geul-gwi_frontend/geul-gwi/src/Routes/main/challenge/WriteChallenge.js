import React from "react";
import styled from "styled-components";


const WriteChallenge = () => {
    return (
        <TempFrame>
            여기는 challenge 글 작성 폼입니다.
        </TempFrame>
    );
}

export default WriteChallenge;

const TempFrame = styled.div`
    width : 700px;
    height : 1000px;
    margin : 0 auto;
    border : 1px solid black;
`