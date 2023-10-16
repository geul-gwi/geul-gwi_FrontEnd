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
    // State
    const [FormMainText,setFormMainText] = useState('');    // 본문의 내용을 담는 State
    const [fnTags,setFnTags] = useState([]);    // 최종적으로 선택된 태그를 담는 List State 
    const [urlImages,setUrlImages] = useState([]);      // Url로 변환된 이미지 주소 Array

    // Axios Address
    const AxiosAddress = useContext(AxiosAddrContext).axiosAddr;
    // Axios Mapping 
    const WritingApi = "/geulgwi/register";
    const addTagApiMapping =  "/tag/register";
    const getTagListMapping = "/tag/admin/list"; // Tag Api Mapping값
    // User 로그인 정보
    const UserSequence = useSelector((state) => state.authReducer.userSeq);
    const UserToken = useSelector((state) => state.authReducer.accessToken);
    


    // Handler
    const FormMainTextHandler = (e) => {
        setFormMainText(e.target.value);
    };


    // Function

    // 이미지
     // 하위 컴포넌트에서 이미지 리스트의 최신정보를 받기 위함
     const ReturnImageList = () => {
        return urlImages;
    }
    // Function : 이미지 상대경로 저장
    const ImageAddHandler = (event) => {
        const selectedImages = event.target.files;
        let imageUrlList = [...urlImages];
        for (let i = 0; i < selectedImages.length; i++){
            // const currentImageUrl = URL.createObjectURL(selectedImages[i]);
            imageUrlList.push(selectedImages[i]);
        }
        // 이미지 갯수 제한 3개 => 3개 이외에는 slice로 짤려서 안들어감
        if (imageUrlList.length > 3){
            imageUrlList = imageUrlList.slice(0,3);
        }
        // urlImage 배열에 값 재할당
        setUrlImages(imageUrlList);
    }
    // Function : 이미지 삭제
    const ImageDeleteHandler = (idx) => {
        setUrlImages(urlImages.filter( (_, index) => index !== idx ));
        console.log(idx);
    }


    // 태그
    // 태그 설정 Handler
    const FnTagSetHandler = (taglist) => {
        console.log("This is WritingAction");
        console.log(taglist);
        setFnTags(taglist);
    }
    // Final Tag를 Return해주는 함수
    const ReturnFnTags = () => {
        return fnTags;
    }

    // 글 작성완료 버튼
    const OnSubmit = async() => {
        // formData object생성
        const formData = new FormData();
        const TagSeqs = [];
        
        for (const tag of fnTags){
            try{
                console.log(tag);
                const newTag = {
                    fontColor: '#FFFFFF',
                    backColor: "#000000",
                    value: tag.tagname,
                };

                const response = await axios.post(AxiosAddress + addTagApiMapping + `/${UserSequence}`
                    ,newTag,
                    {headers : {
                            Authorization : "Bearer "+UserToken
                    }}
                );
                TagSeqs.push(response.data.seq);
            }
            catch(error){console.log(error);}   
        }
        console.log("responseList : "+TagSeqs);


        formData.append("geulgwiContent", FormMainText);
        for (let i = 0; i < TagSeqs.length; i ++){
            formData.append("tagSeqs",TagSeqs[i]);
        }
        for (let i = 0; i < urlImages.length; i ++){
            formData.append("files",urlImages[i]);
        }

        // Axios Config
        const config = {
            headers: {
              Authorization: "Bearer "+ UserToken,  // 토큰 넣어주기
              'Content-Type': 'multipart/form-data',  // 데이터 형식 지정
            },
          };
        
        console.log("formData Data Check => ")
        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        console.log("Writing Axios : "+ AxiosAddress+WritingApi+`/${UserSequence}`);
        // Axios Shoot
        await axios.post(AxiosAddress+WritingApi+`/${UserSequence}`,formData,config)
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }



    return (
        <Fragment>
            <WritingComponent 
            FormMainTextChange={FormMainTextHandler}

            ReturnImg={ReturnImageList}
            ImageAdd={ImageAddHandler}
            ImageDelete={ImageDeleteHandler}
            
            SetFnTags={FnTagSetHandler}
            FnTagsState={fnTags}

            Submit={OnSubmit}
            />
        </Fragment>
    );
};

export default WritingAction;