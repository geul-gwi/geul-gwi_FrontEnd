import React from 'react';
import styled from 'styled-components';

const WritingForm = (props) => {
    return (
        <FormContainer>
            {/* 글 제목 보류 */}
            {/* <FormNameInputContainer class="FormNameContainer" style={{marginBottom : '40px'}} >
                <input class="main-writingform-input" id="FormName" style={{width : '98%' , textIndent : '10px'}} required={true}/>
                <FormNamelabel id="FormNameLabel" for={"FormName"}>글 제목</FormNamelabel>
            </FormNameInputContainer> */}
            <ContentArea 
                //class="main-writingform-textarea" 
                name="opinion"
                placeholder="글 귀를 남겨주세요." 
                required={true} 
                onChange={(e) => props.FormMainTextChange(e)}
            >
            </ContentArea>
        </FormContainer>
    );
};

// Main Frame Container
const FormContainer = styled.form`
    display : flex;
    width : 100%;
    //min-height : 200px;
    height : auto;
    flex-direction: column;
    margin-bottom : 10px;
    align-items: center;
`

// 글 작성 입력하는 textarea
const ContentArea = styled.textarea`
    width : 95%;
    height : 300px;
    border-radius : 12px;
    padding: 15px;
    font-size: 15px;
`
// just frame = input태그 스타일의 기반이 되는 Container Frame
// const InputFrame = styled.div`
//     width : 100%;
//     height : 45px;
//     border-radius : 12px;
// `
// const FormNameInputContainer = styled(InputFrame)`
//     position : relative;
// `
// const FormMainTextInputContainer = styled(InputFrame)`
//     min-height : 200px;
//     height : auto;
// `

// level 2
    // FormName
    // const FormNamelabel = styled.label`
    //     position : absolute;
    //     display : flex;
    //     width : 12%;
    //     height : 50%;
    //     left : 20px;
    //     top : 25%;
    //     background-color : white;
    //     justify-content : center;
    //     align-items: center;
    //     padding : 0;
    // `

export default WritingForm;