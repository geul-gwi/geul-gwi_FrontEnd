import React from 'react';
import styled from 'styled-components';

// Component
import ImageUploadForm from 'component/main/Writing/ImageUploadForm';
import AddTagButton from 'component/main/Writing/AddTagButton';
import ChallengeInfo from 'component/challenge/ChallengeInfo';


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
        <MainContainer>
            {props.selectedTab !== "geulgwi" && (
                <ChallengeInfo />

            )}
            <Frame>
                <FlexFrame>
                    <Tabs>
                        <TabButton onClick={() => props.handleTabClick("geulgwi")}
                            active={props.selectedTab === "geulgwi"}
                        >
                            일반
                        </TabButton>
                        <TabButton onClick={() => props.handleTabClick("challenge")}
                            active={props.selectedTab === "challenge"}
                        >
                            챌린지
                        </TabButton>
                    </Tabs>
                    <TitleContainer style={{ marginBottom: '30px' }}>
                        <ComponentName>{props.selectedTab === "geulgwi" ? "일반 글 작성" : "챌린지 작성"}</ComponentName>
                        <ComponentIntro>
                            {props.selectedTab === "geulgwi" ?
                                "나만의 글 귀를 작성해주세요."
                                : "모든 키워드가 들어가도록 나만의 글 귀를 작성해주세요."}.
                        </ComponentIntro>
                    </TitleContainer>

                    <FormContainer>
                        <ContentArea
                            placeholder="글 귀를 작성하세요"
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
        </MainContainer>
    );
};

const Tabs = styled.div`
   display: flex;
   justify-content: center;
   margin-bottom: 20px;
`;

const TabButton = styled.button`
   background-color: ${(props) => (props.active ? "#ccebb5" : "#ccc")};
   color: white;
   border: none;
   width: 80px;
   height: 30px;
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
    justify-content : center;
    padding-top: 50px; 
    padding-bottom: 50px;
    user-select: none;
    margin-bottom: 80px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 16px;
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

const MainContainer = styled.div`
    gap: 20px;
    display : flex;
    flex-direction: column;
    justify-content : space-between;
    align-items: center;
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
    width : 110px;
    height : 30px;
    border-radius : 12px;
    background-color : #ccebb5;
    justify-content : center; 
    align-items : center;
    font-size : 14px; 
    color : white;
    box-shadow : 1px 1px 8px 0px #B5B5B5;
    cursor : pointer;

    &:hover{
        background-color : #ccebb5;
    }
`

const FormContainer = styled.form`
    display : flex;
    width : 100%;
    flex-direction: column;
    margin-bottom : 10px;
    align-items: center;
`

const ContentArea = styled.textarea`
    width : 95%;
    height : 150px;
    padding: 12px;
    font-size: 14px;
    border-radius: 16px;

    &:focus {
        outline: none; /* 포커스 테두리 제거 (선택 사항) */
        border-color:  #ccebb5; /* 포커스 시 변경할 테두리 색상 */
        box-shadow: 0 0 5px  #ccebb5; /* 포커스 시 그림자 효과 (선택 사항) */
    }
`

export default WritingComponent;