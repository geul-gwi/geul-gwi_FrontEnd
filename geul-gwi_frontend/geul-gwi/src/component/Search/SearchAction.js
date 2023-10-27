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

   const [posts, setPosts] = useState([]); // 글 전체 리스트
   const [viewPosts, setViewPosts] = useState([]); // 글 전체 리스트
   const [viewPost, setViewPost] = useState(null); // 모달창 게시물 데이터
   const [ModalState, setModalState] = useState(false);

   useEffect(() => {
      // 전체 게시물 목록 불러오기
      Axios.get(axiosAddr + postListApi, {
         headers: {
            Authorization: `Bearer ${userToken}`,
         },
      })
         .then((response) => {
            console.log("글 목록 요청 성공 : ", response);
            setPosts(response.data);
            ReFactData(response.data);
         })
         .catch((error) => {
            console.error("글 목록 요청 실패", error);
         });
   }, []);

   // 모달창을 띄우는 함수
   const ModalOpen = (index) => {
      setModalState(true);
      setViewPost(posts[index]);
   }
   // 모달창을 닫는 함수
   const ModalClosed = () => {
      setModalState(false);
   }

   // geulgwiContent
   // :
   // "안녀아세요 맹수 햄토스입니다."
   // geulgwiSeq
   // :
   // 1
   // nickname
   // :
   // "햄토스"
   // regDate
   // :
   // "2023-10-26 13:44:25"
   // userSeq
   // :
   // 1

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

         setViewPosts(updatedPosts);
      } catch (error) {
         console.error("Error in ReFactData:", error);
      }
   };

   return (
      <MainContainer>
         <TagSearchForm />
            <ItemsContainer>
            {viewPosts && viewPosts.map((post, index) => (
               <Item onClick={() => ModalOpen(index)}>
                  {post.files && <ItemImg src={post.files[0]}></ItemImg>}
                  <HoveredContainer>
                     <Nickname>
                        {post.nickname}
                     </Nickname>
                     <Content>
                        {post.geulgwiContent}
                     </Content>
                  </HoveredContainer>
                  <HoveredBack />
               </Item>
            ))}
            </ItemsContainer>
            {ModalState &&
            <ModalPage

            userSeq={viewPost.userSeq}
               geulgwiSeq={viewPost.geulgwiSeq}
            />
            }
      </MainContainer>
   )
};

const MainContainer = styled.div`
   display: flex;
   flex-direction: column;
   width: 100%;
   user-select: none;
   height: auto;
   justify-content: center;
   align-items: center;
`

const Item = styled.div`
  position : relative;
  display : flex;
  width : 230px;
  height : 240px;
  border-radius : 2px;
  overflow : hidden;
  justify-content: center;
  align-items: center;
  cursor : pointer;
  transition : 0.3s;

 &:hover {
    filter: brightness(70%); /* 아이템을 어둡게 만드는 CSS */
  }
`
const ItemImg = styled.img`
  background-color : white;
  width : 100%;
  height : 100%;
  object-fit: cover;
`
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
  max-height : 90%; 
  height : auto;
  z-index : 2;
  flex-direction: column;
  justify-content : center;
  align-items : flex-start;
  gap : 10px;
`

const ItemsContainer = styled.div`
 align-items: center;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2px;
  border-radius: 2px;
  padding: 20px;
  justify-items: center;
  align-items: center;
`;
const Nickname = styled.div`
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
  max-height : calc(100% - 10px); 
  height : auto;
  font-size : 13px;
  font-family: "Nanum Square Round";
  font-style : "normal";

  justify-content: center;
  text-align: center;
`

export default SearchForm;