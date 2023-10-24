import React, { useContext, useState } from 'react';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
// component
import ImageUploadForm from 'component/main/Writing/edit/ImageUploadForm';
import AddTagButtonForm from 'component/main/Writing/edit/AddTagButtonForm';

const PostEditForm = ({post}) => {
    const { axiosAddr } = useContext(AxiosAddrContext);
    const { userSeq, accessToken } = useSelector((state) => state.authReducer);
    const postEditUrl = "/geulgwi/update/"; // 게시물 수정 요청 주소
    
    const [content, setContent] = useState(post.geulgwiContent); 
    const [tags, setTags] = useState(post.tags); 
    const [files, setFiles] = useState(post.files); 

    // 이미지 추가
    const ImageAddHandler = (event) => {
        const addFiles = event.target.files;
        // 이미지 개수 제한 3개
        let imageUrlList = Array.from(addFiles).slice(0, 3);
        setFiles((prevImages) => [...prevImages, ...imageUrlList]);
    }

    // 이미지 삭제
    const ImageDeleteHandler = (idx) => {
        setFiles(files.filter((_, index) => index !== idx));
    }

    // 수정 완료 버튼 클릭
    const OnSubmit = async () => {
        try {
            const geulgwiRegDTO = {
                geulgwiContent: content,
                tagSeqs: tags.map(tag => tag.tagSeq),
            };

            console.log("보낸 태그 시퀀스 : ", tags);

            // const formData = new FormData();
            // formData.append("geulgwiRegDTO", new Blob([JSON.stringify(geulgwiRegDTO)], { type: "application/json" }));

            // 사진이 존재할 때만 formData에 추가
            // if (files.length > 0) {
            //     files.forEach(image => formData.append("files", image));
            // }

            // FormData의 내용을 콘솔에 출력
            // formData.forEach((value, key) => {
            //     console.log(key, value);
            // });
            console.log("요청 주소: ", `${axiosAddr}${postEditUrl}${post.geulgwiSeq}`);
            const response = await axios.post(`${axiosAddr}${postEditUrl}${post.geulgwiSeq}`, geulgwiRegDTO, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            });

            //console.log("글 수정 완료: ", response);
            alert("글 수정이 완료 되었습니다.");
            
        } catch (error) {
            console.error("글 수정 실패: ", error);
        }
    }

    return (
        <Container>
            <FlexFrame>
                <TitleContainer>
                    <Title>게시물 수정</Title>
                    <SubTitle>게시물을 수정하세요.</SubTitle>
                </TitleContainer>
                <FormContainer>
                    <ContentArea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    >
                    </ContentArea>
                </FormContainer>
                <ImageUploadForm 
                    imageAddHandler={ImageAddHandler}
                    imageDeleteHandler={ImageDeleteHandler}
                    files={files}
                />
                <AddTagButtonForm 
                    setTags={setTags} 
                    tags={tags}
                />
                <SubmitContainer>
                    <Button onClick={OnSubmit}>완료</Button>
                </SubmitContainer>
            </FlexFrame>
        </Container>
    );
};

// Frame
const Container = styled.div`
    position : relative;
    display : flex;
    width : 100%;
    background-color : white;
    border-radius : 16px;
    justify-content : center;
    padding-top: 30px; 
    padding-bottom: 20px;
    user-select: none;
    margin-bottom: 80px;
`

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
    height : 200px;
    border-radius : 8px;
    padding: 15px;
    font-size: 15px;
`

const FlexFrame = styled.div`
    display : flex;
    width : 90%;
    //height : calc(100%);
    flex-direction: column;
`

const TitleContainer = styled.div`
    display : flex;
    width : 100%;
    height : 50px;
    flex-direction: column;
    justify-content : space-between;
    margin-bottom: 30px;
`
const Title = styled.div`
        width : 100%;
        height : auto;
        font-size: 24px;
        font-style : "bold";
    `
const SubTitle = styled.div`
        width : 100%;
        height : auto;
        font-size : 15px;
        color : gray;
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
const Button = styled.div`
    display : flex;
    width : 100px;
    height : 30px;
    border-radius : 12px;
    background-color : #FF9E9E;
    justify-content : center; 
    align-items : center;
    font-size : 14px; 
    color : white;
    cursor : pointer;

    &:hover{
        background-color : #FFB1B1;
    }
`

export default PostEditForm;