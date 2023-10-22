// Import Library
import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy'; // 클립보드 저장용 라이브러리
import { toast } from 'react-toastify';     // 토스트 메시지를 보내기 위한 라이브러리
import styled from 'styled-components';


// import React icons
import {IoMdClose} from "react-icons/io";
import {MdOutlineContentCopy} from "react-icons/md";
import {AiFillHeart,AiOutlineHeart} from "react-icons/ai";



const ModalPage = (props) => {
    const [iconShow, setIconShow] = useState(false);
    const [data,setData] = useState(props.ModalData);

    // public img Path
    const imagePath = process.env.PUBLIC_URL + '/img/';

    useEffect(()=>{
        setData(props.ModalData);
    },[props.ModalData])
    useEffect(() => {

    }, [data]);

    const handleCopyClick = (text) => {
        clipboardCopy(text)
        .then(() => {
            toast.success("클립보드에 저장되었습니다.");
        })
        .catch((err) => {
            toast.error("어떠한 오류발생..!");
        });
    }


    return (
        <ModelFrame onClick={() => props.ModalClosed()}>
            <ViewPage onClick={(event) => event.stopPropagation()}>
                {/* 아이템을 아래로 나열해주는 Flex Container */}
                <ItemContainer>
                    {/* 이미지 영역 */}
                    {
                        data.imgPath === null ?
                        ""
                        :
                        <ImageContainer>
                            <ImageItem src={imagePath + data.imgPath} />
                        </ImageContainer>
                    }


                    {/* 작가명 */}
                    <WriterNameContainer>
                        {data.postUser}
                    </WriterNameContainer>


                    {/* 본문내용 */}
                    <MainTextContainer isImgExist={data.imgPath === null ? false : true}>
                         {/* ClipBoardCopy 영역 */}
                        <MainTextCopyGround onMouseEnter={() => setIconShow(true)} onMouseLeave={() => setIconShow(false)} onClick={() => handleCopyClick(data.mainText)}>
                            {
                                iconShow ? <MdOutlineContentCopy size={30} />  : ""
                            }
                        </MainTextCopyGround>
                        {data.mainText}
                    </MainTextContainer>


                    {/* 좋아요 및 좋아요 수 */}
                    <BottomContainer>
                        {/* 좋아요 수 */}
                        <BottomLikeViewCount>
                            {/* {props.LikeCountConverter(data.likeCount)} */}
                            12k
                        </BottomLikeViewCount>

                        {/* 좋아요 버튼 */}
                        <HeartBtnContainer>
                            {/* {
                                data.isLikeClicked ?
                                <AiFillHeart size={25} color={"red"} onClick={(event) => {
                                    event.stopPropagation();
                                    props.likeBtnClick(data.postNumber);
                                }}/> :
                                <AiOutlineHeart size={25} color={"#444444"} onClick={(event) => {
                                    event.stopPropagation();
                                    props.likeBtnClick(data.postNumber);
                                }}/>
                            } */}
                            <AiFillHeart size={25} color={"red"} onClick={(event) => {
                                event.stopPropagation();
                                props.likeBtnClick(data.postNumber);
                            }}/>
                        </HeartBtnContainer>
                    </BottomContainer>
                </ItemContainer>

               <CloseBox onClick={() => props.ModalClosed()}><IoMdClose size={24} color={"#444444"}/></CloseBox>

            </ViewPage>
        </ModelFrame>
    );
};

const ModelFrame = styled.div`
    position : fixed;
    top : 0; left : 0;
    z-index : 998;
    display : flex;
    width : 100%;
    height : 100%;
    justify-content : center; align-items : center;

    background-color : rgba(20,20,20,0.6);
`
const ViewPage = styled.div`
    position : relative;
    display : flex;
    width : 50%;
    height : 80%;
    z-index:  999;
    border-radius : 16px;
    background-color : white;
    justify-content : center; align-items : center;

`
// 닫기 버튼
const CloseBox = styled.div`
    position : absolute;
    display : flex;
    top : 5px;
    right : 5px;
    width : 30px; height : 30px;
    border-radius : 50%;
    justify-content : center; align-items : center;
    transition : 0.2s;
    cursor : pointer;

    &:hover{
        background-color : rgba(20,20,20,0.1);
    }
`

// 구성 - 아이템을 아래로 나열해주는 Container , 왼쪽 오른쪽 위 아래에 여백을 넣어주는 역할도 함
const ItemContainer = styled.div`
    display : flex;
    width : 90%;
    height : 90%;
    flex-direction : column;
`

// 작가 이름
const WriterNameContainer = styled.div`
    display : flex;
    width : 100%;
    height : 10%;
    align-items : center;
    font-size : 30px;
    color : rgba(40,40,40,0.9);
`
// 이미지 Container
const ImageContainer = styled.div`
    display : flex;
    width : 100%;
    height : 60%;
    justify-content: center;
    align-items: center;;
`
const ImageItem = styled.img`
    max-width : 90%; width : auto;
    max-height : 90%; height : auto;
    object-fit : contain;
`

// 메인 텍스트 Container
const MainTextContainer = styled.div`
    position : relative;
    width : 100%;
    height :  ${(props) => (props.isImgExist ? `calc(20% - 20px)` : `calc(80% - 20px)`)};
    padding : 10px 0px 10px 0px;
    font-size : 20px;
    line-height : 30px;
    cursor : pointer;
`
const MainTextCopyGround = styled.div`
    position : absolute;
    display : flex;
    z-index: 10px;
    top : 0px; left: -10px;
    width : 100%;
    height : 100%;
    padding : 0px 10px 0px 10px;
    border-radius : 12px;
    justify-content : center; align-items: center;
    &:hover{
        background-color : rgba(40,40,40,0.1);
    }
`
// 아래 Bottom Container
const BottomContainer = styled.div`
    display : flex;
    width : 100%;
    height : 9%;
    justify-content : space-between;
    align-items : center;
`
// Like Count 보여주기
const BottomLikeViewCount = styled.div`
    min-width : 10px; width : auto;
    min-height : 5px; height : auto;
`
const HeartBtnContainer = styled.div`
    display : flex;
    width : 50px;
    height : 100%;
    justify-content : center; align-items : center;
    border-radius : 50%;
    cursor : pointer;
    transition : 0.2s;
    &:hover{
        background-color : rgba(40,40,40,0.1);
    }
`


export default ModalPage;