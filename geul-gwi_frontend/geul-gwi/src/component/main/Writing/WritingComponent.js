import React from 'react';
import styled from 'styled-components';

// Component
import ImageUploadForm from 'component/main/Writing/ImageUploadForm';
import AddTagButton from 'component/main/Writing/AddTagButton';



const WritingComponent = (props) => {
    const handleSubmit = () => {
        if (props.selectedTab === "geulgwi") {
            // "글귀" 탭에서 호출할 함수
            props.submitGeulgwi();
        } else if (props.selectedTab === "challenge") {
            // "챌린지" 탭에서 호출할 함수
            props.submitChallenge();
        }
    };

    return (
        <Frame>

            <FlexFrame>
                <Tabs>
                    <TabButton
                        onClick={() => props.handleTabClick("geulgwi")}
                        active={props.selectedTab === "geulgwi"}
                    >
                        일반
                    </TabButton>
                    <TabButton
                        onClick={() => props.handleTabClick("challenge")}
                        active={props.selectedTab === "challenge"}
                    >
                        챌린지
                    </TabButton>
                </Tabs>
                <TitleContainer style={{ marginBottom: '30px' }}>
                    <ComponentName>{props.selectedTab === "geulgwi" ? "일반 글 작성" : "챌린지 작성"}</ComponentName>
                    <ComponentIntro>나만의 글 귀를 작성하세요.</ComponentIntro>
                </TitleContainer>
                <FormContainer>
                    <ContentArea
                        placeholder="글 귀를 작성하세요..."
                        onChange={(e) => props.FormMainTextChange(e)}
                    >
                    </ContentArea>
                </FormContainer>
                {/* 조건부 렌더링 */}
                {props.selectedTab === "geulgwi" && (
                    <ImageUploadForm
                        style={{ marginBottom: '20px' }}
                        returnImageList={props.ReturnImg}
                        imageAddHandler={props.ImageAdd}
                        imageDeleteHandler={props.ImageDelete}
                    />
                )}
                {props.selectedTab === "geulgwi" && (
                    <AddTagButton
                        FnTagSetHandler={props.FnTagSetHandler}
                        fnTags={props.fnTags}
                    />
                )}
                <SubmitContainer>
                    <SubmitBtn onClick={handleSubmit}>공유</SubmitBtn>
                </SubmitContainer>
            </FlexFrame>
        </Frame>
    );
};

const Tabs = styled.div`
   display: flex;
   justify-content: center;
   margin-bottom: 20px;
`;

const TabButton = styled.button`
   background-color: ${(props) => (props.active ? "#FF9E9E" : "#ccc")};
   color: #fff;
   border: none;
   padding: 10px 20px;
   cursor: pointer;
   margin: 0 10px;
   border-radius: 5px;
   transition: background-color 0.3s;

   &:hover {
      background-color: #aaa;
   }
`;

const Frame = styled.div`
    position : relative;
    display : flex;
    width : 100%;
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
    flex-direction: column;
`

const TitleContainer = styled.div`
    display : flex;
    flex-direction: column;
    justify-content : space-between;
        height : 50px;
`

const ComponentName = styled.div`
        height : auto;
        font-size: 24px;
        font-style : "bold";
    `
const ComponentIntro = styled.div`
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

const FormContainer = styled.form`
    display : flex;
    width : 100%;
    height : auto;
    flex-direction: column;
    margin-bottom : 10px;
    align-items: center;
`

const ContentArea = styled.textarea`
    width : 98%;
    height : 150px;
    padding: 10px;
    font-size: 14px;
`

export default WritingComponent;