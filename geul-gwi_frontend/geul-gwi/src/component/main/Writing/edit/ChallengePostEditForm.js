import React, { useContext, useEffect, useState } from 'react';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// component
import ChallengeInfo from 'component/challenge/ChallengeInfo';

const ChallengePostEditForm = ({ data }) => {
    const navigate = useNavigate();
    const { axiosAddr } = useContext(AxiosAddrContext);
    const { userSeq, accessToken } = useSelector((state) => state.authReducer);
   
    const postEditUrl = "/challenge/update/"; // 글 수정 요청 주소

    const [content, setContent] = useState(data.challengeContent);

        // 수정 완료 버튼 클릭
        const OnSubmit = async () => {
            try {
                const challengeRegDTO = {
                    challengeUserSeq: data.challengeUserSeq,
                    challengeContent: content,
                    userSeq: userSeq
                };

                console.log("글 수정:", challengeRegDTO);
                const response = await axios.post(`${axiosAddr}${postEditUrl}${data.challengeUserSeq}`, challengeRegDTO, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                });
    
                alert("수정이 완료되었습니다.");
                navigate('/');
    
            } catch (error) {
                console.error("글 수정 실패: ", error);
            }
        }

    return (
        <MainContainer>
            <ChallengeInfo />
            <Frame>
                <FlexFrame>
                    <TitleContainer style={{ marginBottom: '30px' }}>
                        <ComponentName>챌린지 글 수정</ComponentName>
                        <ComponentIntro>글을 수정해 주세요.</ComponentIntro>
                    </TitleContainer>
                    <FormContainer>
                        <ContentArea
                            value={content}
                            placeholder="글귀를 작성하세요."
                            onChange={(e) => setContent(e.target.value)}
                        >
                        </ContentArea>
                    </FormContainer>
                    <SubmitContainer>
                        <SubmitBtn onClick={OnSubmit}>수정</SubmitBtn>
                    </SubmitContainer>
                </FlexFrame>
            </Frame>
        </MainContainer>
    );
};

const Frame = styled.div`
    position : relative;
    display : flex;
    width : 98%;
    background-color : white;
    justify-content : center;
    padding-top: 20px; 
    padding-bottom: 20px;
    user-select: none;
    margin-bottom: 80px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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
    width : 96%;
    height : 150px;
    padding: 10px;
    font-size: 14px;
`

export default ChallengePostEditForm;