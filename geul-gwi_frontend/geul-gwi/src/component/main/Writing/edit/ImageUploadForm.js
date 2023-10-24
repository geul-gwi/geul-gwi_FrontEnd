import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ImageUploadForm = (props) => {
    let WritingIconPath = process.env.PUBLIC_URL + "/icon/Writing/"; 
    
    const handleImageChanged = (e) => {
        props.imageAddHandler(e);   
    }
    const DeleteImageChanged = (idx) => {
        props.imageDeleteHandler(idx);
    }

    return (
        <Frame>
            <TitleContainer>이미지 업로드</TitleContainer>
            <ItemShowContainer>
                <ItemFlexManager>
                    <ItemContainer>
                        <StyledInput id="imgUpload" type='file' onChange={(e) => handleImageChanged(e)} multiple />
                        <InputLabel for="imgUpload">
                            {/* 이미지를 추가하세요 버튼의 아이콘 */}
                            <DefaultImgIconContainer>
                                <img 
                                    src={WritingIconPath + "picture.svg"} 
                                    alt='이미지 업로드' 
                                    style={{width : "40px", height : "40 px"}}
                                />
                            </DefaultImgIconContainer>
                            {/* 이미지를 추가하세요 버튼의 텍스트 */}
                            <DefaultImgTextContainer>추가</DefaultImgTextContainer>
                        </InputLabel>
                    </ItemContainer>
                    {props.files && props.files.map((image,idx) => (
                            <ItemContainer>
                                <StyledImg 
                                    key={`${idx}-${image}`} 
                                    src={image} 
                                    alt={`${idx}-${image}`}
                                />
                                <DeleteImage 
                                    onClick={(e) => DeleteImageChanged(idx)} 
                                    alt="이미지 지우기"
                                />
                            </ItemContainer>
                        ))
                    }
                </ItemFlexManager>
            </ItemShowContainer>
        </Frame>
    );
};
// Component Root Container
const Frame = styled.div`
    display : flex;
    width : 100%;
    min-height : 200px;
    height : auto;
    border-radius : 16px;

    flex-direction: column;
    justify-content : center; align-items : center;
    margin-bottom : 20px;
`
// level 1
const TitleContainer = styled.div`
    display : flex;
    width : 100%;
    height : 60px;
    justify-content : flex-start;
    align-items : center;
    font-size : 20px;
    color : black; // #6F6A6A;
`
const ItemShowContainer = styled.div`
    position : relative;
    width : 100%;
    height : 180px;
    overflow-x : scroll;
    overflow-y : none;
    white-space: nowrap;
    ::-webkit-scrollbar{
        display : none;
    }
`
const ItemFlexManager = styled.div`
    position : absolute; top : 0px; left : 0px;
    display : flex;
    min-width : 100%;
    width : auto;
    height : 180px;
    flex-direction : row;
    justify-content : flex-start;
    align-items : center;
`

const ItemContainer = styled.div`
    position : relative;
    display : flex;
    width : 160px;
    height : 160px;
    border-radius : 10px;

    margin-right : 20px;    
    justify-content : center;
    align-items : center;
    background-color : #EBEBEB;
`

// level 2

const StyledInput = styled.input`
    position : absolute;
    width : 0;
    height : 0;
    padding : 0;
`
const InputLabel = styled.label`
    display : flex;
    width : 100%;
    height : 100%;
    background-color : #FFFDFD;
    padding : 0px;
    border-radius : 10px;
    box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.25);
    cursor : pointer;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    font-size : 14px;
`
const StyledImg = styled.img`
    width : 100%;
    height : 100%;
    object-fit: contain;
`

// default img 
const DefaultImgIconContainer = styled.div`
    display : flex;
    width : 100%;
    height : 100px;
    justify-content: center;
    align-items: center;
`
const DefaultImgTextContainer = styled.div`
    display : flex;
    width : 100%;
    min-height : 20px;
    height : auto;
    justify-content : center;
    align-items: start;
    color : #5F5F5F;
`

const DeleteImage = styled.div`
    position : absolute;
    display : flex;
    top : 5px; right:5px;
    width : 20px;
    height : 20px;
    border-radius : 50%;
    background-color : rgba(0,0,0,0);
    justify-content : center; align-items : center;
    z-index : 1;
    color : grey; font-size : 10px;
    cursor : pointer;
    transition : 0.5s;
    &:hover{
        color : red;
        background-color : #FFFDFD; 
    }
`




export default ImageUploadForm;