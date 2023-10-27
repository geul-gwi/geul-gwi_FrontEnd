import React, { useState, useEffect, useContext } from 'react';
import clipboardCopy from 'clipboard-copy'; // 클립보드 저장용 라이브러리
import { toast } from 'react-toastify';     // 토스트 메시지를 보내기 위한 라이브러리
import styled from 'styled-components';
import Axios from 'axios';
import { Tag } from 'component/common/button/Tag'
import { AiOutlineLeft, AiOutlineRight, AiOutlineEdit, AiFillHeart, AiOutlineHeart, AiOutlineClose } from "react-icons/ai";
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux'; // Redux 사용 Library
// import React icons
import { IoMdClose } from "react-icons/io";
import { MdOutlineContentCopy } from "react-icons/md";
import Post from 'component/user/profile/Post';

const ModalPage = (props) => {
    //const navigate = useNavigate();
    const { axiosAddr } = useContext(AxiosAddrContext);
    const { userSeq, userToken } = useSelector((state) => state.authReducer);
    const [iconShow, setIconShow] = useState(false);
    const imagePath = process.env.PUBLIC_URL + '/img/';
    const postDetailUrl = '/geulgwi/search/'; // 게시물 세부 요청 주소
    const [post, setPost] = useState(null);

    // 글 복사
    const handleCopyClick = (text) => {
        clipboardCopy(text)
            .then(() => {
                toast.success("클립보드에 저장되었습니다.");
            })
            .catch((err) => {
                toast.error("어떠한 오류발생..!");
            });
    }

    useEffect(() => {
        async function fetchUserProfile() {
            try {
                const response = await Axios.get(`${axiosAddr}${postDetailUrl}${props.geulgwiSeq}?viewSeq=${userSeq}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });

                if (response) {
                    console.log("모달 창에 띄울 게시물 : ", response.data);
                    setPost(response.data);
                };

            } catch (error) {
                console.error('모달 창에 띄울 게시물 불러오기 실패.', error);
                return null;
            }
        }
        fetchUserProfile();
    }, [post]);

    return (
        <ModelFrame onClick={() => props.ModalClosed()}>
            <ViewPage onClick={(event) => event.stopPropagation()}>
                <Post
                    profileUserSeq={props.userSeq}
                    //profile={post.profile}
                    nickname={post.nickname}
                    //comment={post.comment}
                    geulgwiContent={post.geulgwiContent}
                    userSeq={post.userSeq}
                    regDate={post.regDate}
                    files={post.files}
                    tags={post.tags}
                    likeCount={post.likeCount}
                    liked={post.liked}
                    geulgwiSeq={props.geulgwiSeq}
                />
                {/* <ItemContainer>
                    { props.post.files === null ?
                            ""
                            :
                            <ImageContainer>
                                {props.post.files.length > 1 && (
                                    <ArrowButton onClick={previousImage}>
                                        <AiOutlineLeft />
                                    </ArrowButton>
                                )}
                                {props.post.files.length > 0 && (
                                    <img src={props.post.files[currentImageIndex]} />
                                )}
                                {props.post.files.length > 1 && (
                                    <ArrowButton onClick={nextImage}>
                                        <AiOutlineRight />
                                    </ArrowButton>
                                )}
                            </ImageContainer>
                    }
                    <Nickname>
                        {props.post.nickname}
                    </Nickname>
                    <Content isImgExist={props.post.imgPath === null ? false : true}>
                        <MainTextCopyGround onMouseEnter={() => setIconShow(true)} onMouseLeave={() => setIconShow(false)} onClick={() => handleCopyClick(props.post.geulgwi)}>
                            { iconShow && <MdOutlineContentCopy size={30} /> }
                        </MainTextCopyGround>
                        {props.post.geulgwiContent}
                    </Content>

                    <BottomContainer>
                        <BottomLikeViewCount>
                            {likeCount}
                        </BottomLikeViewCount>
                        <HeartBtnContainer>
                            { isLiked ?
                                <AiFillHeart size={25} color={"red"} 
                                    onClick={(event) => {
                                    event.stopPropagation();
                                        onClickLikeButton();
                                }}/> :
                                <AiOutlineHeart size={25} color={"#444444"} 
                                    onClick={(event) => {
                                    event.stopPropagation();
                                        onClickLikeButton();
                                }}/>
                            }
                            <AiFillHeart size={25} color={"red"} onClick={(event) => {
                                event.stopPropagation();
                                props.likeBtnClick();
                            }} />
                        </HeartBtnContainer>
                    </BottomContainer>
                </ItemContainer> */}
            </ViewPage>
        </ModelFrame>
    );
};

const ModelFrame = styled.div`
    user-select: none;
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
    width: 500px;
    height: 600px;
    z-index:  999;
    border-radius : 16px;
    justify-content : center; 
    align-items : center;

`
// 닫기 버튼
const CloseButton = styled.div`
    position : absolute;
    display : flex;
    top : 5px;
    right : 5px;
    width : 30px; 
    height : 30px;
    justify-content : center; 
    align-items : center;
    transition : 0.2s;
    cursor : pointer;

    &:hover{
        color : black;
    }
`

// 구성 - 아이템을 아래로 나열해주는 Container , 왼쪽 오른쪽 위 아래에 여백을 넣어주는 역할도 함
const ItemContainer = styled.div`
    display : flex;
    width : 90%;
    height : 90%;
    flex-direction : column;
`

const Nickname = styled.div`
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
    width : 500px;
    height : 600px;
    justify-content: center;
    align-items: center;;
`

// 메인 텍스트 Container
const Content = styled.div`
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
const ArrowButton = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    background-color: rgb(250, 250, 250);
    color: #333;
    border: 1px solid #ccc;
    border-radius: 100%;
    padding: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  
    svg { // 세모 화살표 아이콘 스타일
    width: 16px;
    height: 16px;
    }

    &:hover {
        background-color: rgb(230, 230, 230);
    }
`;


export default ModalPage;