// import Library
import React, { useContext, useEffect, useState } from 'react';

import styled from 'styled-components';
import Axios from 'axios';

// Component
import TagSearchForm from 'component/Search/TagSearchForm'

import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux';
import imageDataFetcher from 'service/imageDataFetcher';

import PostModal from 'component/common/modal/PostModal'


const SearchForm = () => {
   //const navigate = useNavigate();
   const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
   const userSeq = useSelector((state) => state.authReducer.userSeq);
   const userToken = useSelector((state) => state.authReducer.accessToken);
   const postListApi = '/geulgwi/list'; // 게시물 목록 요청 주소
   const postDetailUrl = '/geulgwi/search/'; // 게시물 세부 요청 주소
   const tagSearchPostUrl = '/geulgwi/search';

   const [posts, setPosts] = useState([]); // 글 전체 리스트
   const [viewPosts, setViewPosts] = useState([]); // 글 전체 리스트
   const [viewPost, setViewPost] = useState(null); // 모달창 게시물 데이터
   const [ModalState, setModalState] = useState(false);

   const [selectedTag, setSelectedTag] = useState(null); // 검색하고자 하는 태그

   useEffect(() => {
      if(selectedTag !== null)
         return;
      //console.log("글귀 목록 요청");
      //console.log("토큰@@@@@@@@@: " ,userToken);
      // 전체 게시물 목록 불러오기
      Axios.get(axiosAddr + postListApi, {
         headers: {
            Authorization: `Bearer ${userToken}`,
         }
      })
         .then((response) => {
            console.log("글 목록 요청 성공 : ", response);
            setPosts(response.data);
            ReFactData(response.data);
         })
         .catch((error) => {
            console.error("글 목록 요청 실패", error);
         });
   }, [selectedTag]);

   const tagSearchHandler = async () => {
      try {
         console.log("태그 검색 요청", selectedTag.tagSeq);
         const response = await Axios.get(`${axiosAddr}${tagSearchPostUrl}?tagSeq=${selectedTag.tagSeq}`, {
            headers: {
               Authorization: `Bearer ${userToken}`,
            },
         });
         if (response) {
            console.log("태그 검색 성공 : ", response.data);
            setPosts(response.data);
            ReFactData(response.data);
         }
      } catch (error) {
         console.error('태그 검색 실패.', error);
      }
   };

   // 팝업 띄우는 함수
   const ModalOpen = async (geulgwiSeq) => {
      try {
         const response = await Axios.get(`${axiosAddr}${postDetailUrl}${geulgwiSeq}?viewSeq=${userSeq}`, {
            headers: {
               Authorization: `Bearer ${userToken}`,
            },
         });
         if (response) {
            console.log("팝업 창에 세부 게시물 : ", response.data);
            setViewPost(response.data);
            setModalState(true); // 데이터가 로드된 후에 모달을 열도록 변경
         }
      } catch (error) {
         console.error('팝업 창 세부 게시물 불러오기 실패.', error);
      }
   };

   const ModalClose = () => {
      setModalState(false);
   };

   const ReFactData = async (posts) => {
      try {
         const updatedPosts = await Promise.all(posts.map(async (post) => {
            const response = await Axios.get(`${axiosAddr}${postDetailUrl}${post.geulgwiSeq}` + "?viewSeq=" + userSeq, {
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
         <TagSearchForm 
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            tagSearchHandler={tagSearchHandler}
         />
         <BottomContainer>
            <ResultContainer>{viewPosts.length}개의 검색 결과</ResultContainer>
            <ItemsContainer>
               {viewPosts && viewPosts.map((post) => (
                  <Item onClick={() => ModalOpen(post.geulgwiSeq)}>
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
         </BottomContainer>
         {ModalState && viewPost && 
            <PostModal 
               post={viewPost} 
               ModalClose={ModalClose}
            />
         }
      </MainContainer>
   )
};

const MainContainer = styled.div`
   display: flex;
   flex-direction: column;
   width: 655px;
   user-select: none;
   justify-content: center;
   align-items: center;
`

const BottomContainer = styled.div`
      background-color: white;
      padding: 15px;
      margin-top: 20px;
`

const ResultContainer = styled.div`
   margin-bottom: 10px;
`

const Item = styled.div`
  position : relative;
  display : flex;
  width : 220px;
  height : 230px;
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
 min-width: 655px;

  align-items: center;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2px;

   grid-column: span 3;
   background-color: white;
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