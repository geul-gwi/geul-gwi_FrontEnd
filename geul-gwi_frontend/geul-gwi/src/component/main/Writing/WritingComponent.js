import React from 'react';
import styled from 'styled-components';

// Component
import WritingForm from 'component/main/Writing/WritingForm';
import ImageUploadForm from 'component/main/Writing/ImageUploadForm';
import AddTagButton from 'component/main/Writing/AddTagButton';

const WritingComponent = (props) => {
    return (
        <Frame>
            <FlexFrame>
                {/* Component Name TItle */}
                <TitleContainer style={{ marginBottom: '30px' }}>
                    <ComponentName>글 작성</ComponentName>
                    <ComponentIntro>
                        사람들에게 당신의 <span style={{ color: '#FD7474' }}>영향</span>을 전파하세요
                    </ComponentIntro>
                </TitleContainer>
                <WritingForm
                    FormNameChange={props.FormNameChange}   // Writing Action의 FormName Handler넘겨주기
                    FormMainTextChange={props.FormMainTextChange}   // Writing Action의 FormMainTtext Handler넘겨주기
                />
                {/* 이미지 업로드 하는 Component에 Handler 넘겨주기 */}
                <ImageUploadForm
                    style={{ marginBottom: '20px' }}
                    returnImageList={props.ReturnImg}
                    imageAddHandler={props.ImageAdd}
                    imageDeleteHandler={props.ImageDelete}
                />
                <AddTagButton
                    FnTagSetHandler={props.FnTagSetHandler}     // list State값 변경하는 함수 넘겨주기
                    fnTags={props.fnTags} // WritingAction의 list State넘겨주지
                />
                {/* 작성완료 */}
                <SubmitContainer>
                    <SubmitBtn onClick={() => props.Submit()}>작성</SubmitBtn>
                </SubmitContainer>
            </FlexFrame>
        </Frame>
    );
};

// Frame
const Frame = styled.div`
    position : relative;
    display : flex;
    width : 100%;
    //min-height : 700px;
    background-color : white;
    border-radius : 16px;
    justify-content : center;
    padding-top: 20px; 
    padding-bottom: 20px;
    user-select: none;
    margin-bottom: 80px;
`

const FlexFrame = styled.div`
    display : flex;
    width : 90%;
    //height : calc(100%);
    flex-direction: column;
`

// level 1
const ItemContainer = styled.div`
    width : 100%;
    min-height : 20px;
    height : auto;
`

const TitleContainer = styled.div`
    display : flex;
    width : 100%;
    height : 50px;
    flex-direction: column;
    justify-content : space-between;
`

// level 2
// Title Contanier
const ComponentName = styled.div`
        width : 100%;
        min-height : 20px;
        height : auto;
        font-size: 24px;
        font-family: "Nanum Square";
        font-style : "bold";
    `
const ComponentIntro = styled.div`
        width : 100%;
        height : auto;
        font-size : 14px;
        color : #BCBABA;
    `

// 작성완료 - OnSubmit
const SubmitContainer = styled.div`
    display : flex;
    width : 100%;
    height : 80px;
    justify-content : flex-end;
    align-items : end;
`

// 작성 버튼
const SubmitBtn = styled.div`
    display : flex;
    width : 100px;
    height : 30px;
    border-radius : 12px;
    background-color : #FF9E9E;
    justify-content : center; 
    align-items : center;
    font-size : 14px; 
    color : white;
    box-shadow : 1px 1px 8px 0px #B5B5B5;
    cursor : pointer;

    &:hover{
        background-color : #FFB1B1;
    }
`

export default WritingComponent;