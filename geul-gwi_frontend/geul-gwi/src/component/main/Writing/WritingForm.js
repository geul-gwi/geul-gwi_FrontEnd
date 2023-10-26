import React from 'react';
import styled from 'styled-components';

const WritingForm = (props) => {
    return (
        <FormContainer>
            <ContentArea 
                placeholder="문구를 입력하세요." 
                onChange={(e) => props.FormMainTextChange(e)}
            >
            </ContentArea>
        </FormContainer>
    );
};

const FormContainer = styled.form`
    display : flex;
    width : 100%;
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

export default WritingForm;