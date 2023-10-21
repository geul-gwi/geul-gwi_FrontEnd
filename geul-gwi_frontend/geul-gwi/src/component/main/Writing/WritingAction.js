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
    const AxiosAddress = useContext(AxiosAddrContext).axiosAddr; // Axios Address
    // Axios Mapping 
    const WritingApi = "/geulgwi/register/";
    // User 로그인 정보
    const UserSequence = useSelector((state) => state.authReducer.userSeq);
    const UserToken = useSelector((state) => state.authReducer.accessToken);
    // State
    const [FormMainText,setFormMainText] = useState(''); // 본문의 내용을 담는 State
    const [fnTags,setFnTags] = useState([]); // 최종적으로 선택된 태그를 담는 List State 
    const [urlImages,setUrlImages] = useState([]); // Url로 변환된 이미지 주소 Array

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
    // 태그 선택 후 완료 버튼 누르면 호출
    const FnTagSetHandler = (taglist) => {
        console.log("선택한 태그 :", taglist);
        setFnTags(taglist);
    }

    // Final Tag를 Return해주는 함수
    // const ReturnFnTags = () => {
    //     return fnTags;
    // }

    // 글 작성 완료 버튼
    const OnSubmit = async() => {
        const formData = new FormData();
        // for (const tag of fnTags){
        //     try{
        //         console.log(tag);
        //         const newTag = {
        //             fontColor: '#FFFFFF',
        //             backColor: "#000000",
        //             value: tag.tagname,
        //         };

        //         const response = await axios.post(AxiosAddress + addTagApiMapping + `/${UserSequence}`
        //             ,newTag,
        //             {headers : {
        //                     Authorization : "Bearer "+UserToken
        //             }}
        //         );
        //         TagSeqs.push(response.data.seq);
        //     }
        //     catch(error){console.log(error);}   
        // }
        const geulgwiRegDTO = {
            geulgwiContent: FormMainText,
            tagSeqs: fnTags.map(tag => tag.tagSeq),
        };

        formData.append("geulgwiRegDTO", new Blob([JSON.stringify(geulgwiRegDTO)], { type: "application/json" }));
        urlImages.map(image => formData.append("files", image));  // urlImages 배열의 요소를 formData에 추가
        
        // 데이터 확인을 위해 FormData 객체를 콘솔에 출력합니다.
        console.log("글 작성 요청 formData :");
        for (var pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        console.log("요청한 주소 : " + `${AxiosAddress}${WritingApi}${UserSequence}`);
        await axios.post(`${AxiosAddress}${WritingApi}${UserSequence}`,
            formData,
            {
                headers: {
                    Authorization: "Bearer " + UserToken,  // 토큰 넣어주기
                    'Content-Type': 'multipart/form-data',  // 데이터 형식 지정
                },
            }
        )
        .then((response) => {
            console.log("글 작성 완료 : ", response);
        }).catch((error) => {
            console.error("글 작성 실패 : ", error);
        })
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