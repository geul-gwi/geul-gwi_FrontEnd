import React, { useContext, useEffect, useState } from 'react';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// component
import ImageUploadForm from 'component/main/Writing/edit/ImageUploadForm';
import AddTagButtonForm from 'component/main/Writing/edit/AddTagButtonForm';
import imageDataFetcher from 'service/imageDataFetcher';

const PostEditForm = ({ data }) => {
    const navigate = useNavigate();
    const { axiosAddr } = useContext(AxiosAddrContext);
    const { userSeq, accessToken } = useSelector((state) => state.authReducer);
    const postEditUrl = "/geulgwi/update/"; // 게시물 수정 요청 주소

    const [content, setContent] = useState(data.geulgwiContent);
    const [tags, setTags] = useState(data.tags);
    const [files, setFiles] = useState(data.files); // 서버에게 받은 코드는 인코딩 된 파일 => 모두 file 객체로 변환해줘야함
    const [showFiles, setShowFiles] = useState([]); // 서버에게 받은 코드는 인코딩 된 파일

    useEffect(() => {
        // 게시물 이미지 URL 목록을 가져오는 함수
        const fetchImageUrls = async () => {
            const urls = [];
            for (const file of data.files) {
                try {
                    const imageUrl = await imageDataFetcher(file);
                    urls.push(imageUrl);
                } catch (error) {
                    console.error('이미지 URL 가져오기 실패:', error);
                }
            }
            setFiles(urls);
            setShowFiles(urls);

            // fetchImageUrls가 끝난 후에 createFiles 실행
            createFiles(urls);
        };

        const createFiles = async (urls) => {
            const newFiles = [];

            for (let i = 0; i < urls.length; ++i) {
                // 이미지 파일이 아닌 경우 Base64 문자열로 변환
                const b64Data = urls[i]; // 이미지 데이터 가져오는 방식으로 수정 필요
                const contentType = "image/jpeg"; // 이미지의 확장자를 지정하세요
                const blob = b64toBlob(b64Data, contentType); // base64 -> blob
                const fileName = "example.jpg"; // 파일 이름 설정
                const newFile = new File([blob], fileName, { type: contentType });
                newFiles.push(newFile);
            }

            setFiles(newFiles);
        };

        fetchImageUrls();
    }, []);

    // 수정 완료 버튼 클릭
    const OnSubmit = async () => {
        try {
            const geulgwiRegDTO = {
                "geulgwiContent": content,
                "tagSeqs": tags.map(tag => tag.tagSeq),
            };

            const formData = new FormData();
            formData.append("geulgwiRegDTO", new Blob([JSON.stringify(geulgwiRegDTO)], { type: "application/json" }));
            console.log("최종 파일 : ", files);

            for (let i = 0; i < files.length; ++i) {
                formData.append("files", files[i]);
            }

            // FormData의 내용을 콘솔에 출력
            // formData.forEach((value, key) => {
            //     console.log(key, value);
            // });

            //console.log("요청 주소: ", `${axiosAddr}${postEditUrl}${post.geulgwiSeq}`);
            const response = await axios.post(`${axiosAddr}${postEditUrl}${data.geulgwiSeq}`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            alert("수정이 완료되었습니다.");
            navigate('/main/Profile', { state: { profileUserSeq: userSeq } });

        } catch (error) {
            console.error("글 수정 실패: ", error);
        }
    }

    // base64를 blob으로 변환해주는 함수
    function b64toBlob(b64Data, contentType = '', sliceSize = 512) {
        //console.log("변환하기 전 파일: ", b64Data);
        const image_data = atob(b64Data.split(',')[1]); // data:image/gif;base64 필요없으니 떼주고, base64 인코딩을 풀어준다

        const arraybuffer = new ArrayBuffer(image_data.length);
        const view = new Uint8Array(arraybuffer);

        for (let i = 0; i < image_data.length; i++) {
            view[i] = image_data.charCodeAt(i) & 0xff;
        }
        const blob = new Blob([arraybuffer], { type: contentType });
        blob.name = 'image.jpg';
        return blob;
    }

    // 이미지 추가
    const ImageAddHandler = (e) => {
        const addFiles = e.target.files;
        console.log("이미지 추가: ", addFiles);
        setFiles((prevImages) => [...prevImages, ...addFiles]);

        const fileURLs = [];
        for (const file of addFiles) {
            fileURLs.push(URL.createObjectURL(file));
        }

        setShowFiles((prevImages) => [...prevImages, ...fileURLs]);

    }

    // 이미지 삭제
    const ImageDeleteHandler = (idx) => {
        setFiles(files.filter((_, index) => index !== idx));
        setShowFiles(showFiles.filter((_, index) => index !== idx));
    }

    return (
        <Container>
            <FlexFrame>
                <TitleContainer>
                    <Title>글귀 수정</Title>
                    <SubTitle>글귀를 수정해주세요.</SubTitle>
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
                    showFiles={showFiles}
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
    background-color : #b7de99;
    justify-content : center; 
    align-items : center;
    font-size : 14px; 
    color : white;
    cursor : pointer;

    &:hover{
        background-color : #ccebb5;
    }
`

export default PostEditForm;