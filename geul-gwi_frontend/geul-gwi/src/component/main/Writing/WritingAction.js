import React, { Fragment, useContext, useState } from 'react';
// import Context
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
// import Page Component
import WritingComponent from 'component/main/Writing/WritingComponent';
// Using Redux
import { useSelector } from 'react-redux';
// import Axios
import axios from 'axios';

const WritingAction = () => {
    const { axiosAddr } = useContext(AxiosAddrContext);
    const { userSeq, accessToken } = useSelector((state) => state.authReducer);
    const writingUrl = "/geulgwi/register/"; // 글 작성 요청 주소
    // State
    const [FormMainText, setFormMainText] = useState(''); // 본문의 내용을 담는 State
    const [fnTags, setFnTags] = useState([]); // 최종적으로 선택된 태그를 담는 List State 
    const [urlImages, setUrlImages] = useState([]); // Url로 변환된 이미지 주소 Array

    // Handler
    const FormMainTextHandler = (e) => {
        setFormMainText(e.target.value);
    };

    // Function
    // 하위 컴포넌트에서 이미지 리스트의 최신정보를 받기 위함
    const ReturnImageList = () => {
        return urlImages;
    }

    // 이미지 추가 - 상대 경로 저장
    const ImageAddHandler = (event) => {
        const selectedImages = event.target.files;
        // 이미지 개수 제한 3개
        let imageUrlList = Array.from(selectedImages).slice(0, 3);
        setUrlImages((prevImages) => [...prevImages, ...imageUrlList]);
    }

    // 이미지 삭제
    const ImageDeleteHandler = (idx) => {
        setUrlImages(urlImages.filter((_, index) => index !== idx));
        //console.log(idx);
    }

    // 태그 선택 후 완료 버튼 누르면 호출
    const FnTagSetHandler = (taglist) => {
        console.log("선택한 태그 :", taglist);
        setFnTags(taglist);
    }

    // 글 작성 완료 버튼 클릭
    const OnSubmit = async () => {
        try {
            const geulgwiRegDTO = {
                geulgwiContent: FormMainText,
                tagSeqs: fnTags.map(tag => tag.tagSeq),
            };

            const formData = new FormData();
            formData.append("geulgwiRegDTO", new Blob([JSON.stringify(geulgwiRegDTO)], { type: "application/json" }));
            
            // 사진이 존재할 때만 formData에 추가
            if (urlImages.length > 0) {
                urlImages.forEach(image => formData.append("files", image));
            }
            // else
            // {
            //     formData.append("files", null);
            // }

            // FormData의 내용을 콘솔에 출력
            formData.forEach((value, key) => {
                console.log(key, value);
            });

            const response = await axios.post(`${axiosAddr}${writingUrl}${userSeq}`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("글 작성 완료: ", response);
        } catch (error) {
            console.error("글 작성 실패: ", error);
        }
    }

    return (
        <Fragment>
            <WritingComponent
                FormMainTextChange={FormMainTextHandler}
                ReturnImg={ReturnImageList}
                ImageAdd={ImageAddHandler}
                ImageDelete={ImageDeleteHandler}
                FnTagSetHandler={FnTagSetHandler}
                fnTags={fnTags}
                Submit={OnSubmit}
            />
        </Fragment>
    );
};

export default WritingAction;