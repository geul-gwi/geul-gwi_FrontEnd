// import Library
import React, { useContext, useEffect, useState } from 'react';

import styled from 'styled-components';
import Axios from 'axios';

// Component
import TagSearchForm from 'component/Search/TagSearchForm'

import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux';
import imageDataFetcher from 'service/imageDataFetcher';

import ModalPage from 'component/common/modal/ModalPage'


const SearchForm = () => {
   //const navigate = useNavigate();
   const axiosAddr = useContext(AxiosAddrContext).axiosAddr; 
   const userToken = useSelector((state) => state.authReducer.accessToken);
   const userSeq = useSelector((state) => state.authReducer.userSeq);
   const postListApi = '/geulgwi/list'; // 게시물 목록 요청 주소
   const postDetailApi = '/geulgwi/search/';
   const likeUrl = '/geulgwi/like/'; // 좋아요 요청 주소
   const likeDelateUrl = '/geulgwi/unlike/'; // 좋아요 취소 요청 주소
   const postDetailUrl = '/geulgwi/search/'; // 게시물 세부 요청 주소
   const postDeleteUrl = '/geulgwi/delete/'; // 게시물 삭제 요청 주소

   const [posts, setPosts] = useState([]); // 글 전체 리스트
   const [viewPost, setViewPost] = useState(null); // 모달창 게시물 데이터

   const [likeCount, setLikeCount] = useState(null);
   const [isLiked, setIsLiked] = useState(null);

   const [ModalState, setModalState] = useState(false);

   useEffect(() => {
      // 전체 게시물 목록 불러오기
      Axios.get(axiosAddr + postListApi, {
         headers: {
            Authorization: `Bearer ${userToken}`,
         },
      })
         .then((response) => {
            //console.log("글 목록 요청 성공 : ", response);
            setPosts(response.data);
            ReFactData(response.data);
         })
         .catch((error) => {
            console.error("글 목록 요청 실패", error);
         });
   }, []);

   // 모달창을 띄우는 함수
   const ModalOpen = (post) => {
      setModalState(true);
      setViewPost(post);
   }
   // 모달창을 닫는 함수
   const ModalClosed = () => {
      setModalState(false);
   }

   // 좋아요 눌렀을 때 새로고침
   const reload = async (geulgwiSeq) => {
      try {
         const response = await Axios.get(`${axiosAddr}${postDetailUrl}${geulgwiSeq}?viewSeq=${userSeq}`, {
            headers: {
               Authorization: `Bearer ${userToken}`,
            },
         });

         if (response) {
            setLikeCount(response.data.likeCount);
            setIsLiked(response.data.liked);
         };

      } catch (error) {
         console.error('이미지 가져오기에 실패했습니다.', error);
         return null;
      }
   }

   const ReFactData = async (posts) => {
      try {
         const updatedPosts = await Promise.all(posts.map(async (post) => {
            const response = await Axios.get(axiosAddr + postDetailApi + post.geulgwiSeq + "?viewSeq=" + userSeq, {
               headers: {
                  Authorization: `Bearer ${userToken}`,
               }
            });
            const files = response.data.files;
            const imageSrcs = await Promise.all(files.map(async (file) => {
               try {
                  return await imageDataFetcher(axiosAddr, file);
               } catch (error) {
                  console.log("getFileError : " + error);
                  return null;
               }
            }));
            return {
               ...post,
               files: imageSrcs,
            };
         }));

         setPosts(updatedPosts);
      } catch (error) {
         console.error("Error in ReFactData:", error);
      }
   };

   return (
      <MainContainer>
         <TagSearchForm />
         <Container>
            {posts.map((post, idx) => (
                  // 이미지가 있는 경우
                  <Item onClick={() => ModalOpen(post)}>
                  {post.files && post.files.length > 1 ?
                     <ItemImg src={post.files[0]} alt={post.geulgwiSeq}></ItemImg>
                        :
                        <ItemImg src={post.files} alt={post.geulgwiSeq}></ItemImg>
                  }
                     <HoveredContainer>
                        <HoveredContainer_tutor>
                           {post.nickname}
                        </HoveredContainer_tutor>
                        <Content>
                           {post.geulgwiContent}
                        </Content>
                     </HoveredContainer>
                     <HoveredBack />
                  </Item>
            ))
            }
            {ModalState &&
               <ModalPage
                  ModalClosed={ModalClosed} // 모달 닫는 함수
                  post={viewPost}     // 모달이 열릴 때, 전달할 Object State 함수
                //likeBtnClick = {onClickLikeButton} // 좋아요 처리 함수
               // LikeCountConverter={props.LikeCountConverter}
               />
            }
         </Container>
      </MainContainer>
   )
};

const MainContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: 10px;
   border-radius : 12px;
   width: 100%;
   user-select: none;
`

const Container = styled.div`
   display: flex;
   width: 100%;
   background-color: white;
   border-radius : 12px;
   padding: 20px;
   gap: 20px;
   justify-items: center;
   align-items: center;
`

const Item = styled.div`
  position : relative;
  display : flex;
  width : 190px;
  height : 190px;
  border-radius : 12px;
  background-color : white;
  box-shadow: 1px 1px 10px 2px rgba(50,50,50,0.2);
  overflow : hidden;
  justify-content: center;
  align-items: center;
  cursor : pointer;
  transition : 0.3s;

  &:hover{
    box-shadow : 10px 10px 10px 2px rgba(50,50,50,0.5);
  }
`
const ItemImg = styled.img`
  width : 100%;
  height : 100%;
  object-fit: cover;
  object-position: center center;
`

// 하얀색 블라인드 배경
const HoveredBack = styled.div`
  position : absolute;
  width : 100%;
  height : 100%;
  background-color: rgba(255,255,255,0.3);
  z-index : 1;
`

const HoveredContainer = styled.div`
  display : flex;
  position : absolute;
  width : 90%;
  max-height : 90%; height : auto;
  z-index : 2;
  flex-direction: column;
  justify-content : center;
  align-items : flex-start;
  gap : 10px;
`
const HoveredContainer_tutor = styled.div`
  display : flex;
  width : 100%;
  height : 10px;
  padding : 5px 0px 5px 0px;
  font-size : 15px;
  font-family: "Nanum Square";
  font-style : "bold";

  justify-content: center;
`
const Content = styled.div`
  display : flex;
  width : 100%;
  max-height : calc(100% - 10px); height : auto;
  font-size : 13px;
  font-family: "Nanum Square Round";
  font-style : "normal";

  justify-content: center;
  text-align: center;
`

export default SearchForm;