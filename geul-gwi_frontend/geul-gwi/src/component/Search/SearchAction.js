// import Library
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Component
import TagSearchForm from 'component/Search/TagSearchForm'
import SearchResultForm from 'component/Search/SearchResultForm'

// Axios Address Context
import { AxiosAddrContext } from 'contextStore/AxiosAddress';


const SearchForm = () => {
   // axios Address
   const axiosAddress = useContext(AxiosAddrContext).axiosAddr; // Axios Address


   // Api Mapping
   const postListApi = '/geulgwi/list'; // 글 귀 리스트 요청 api 주소

   const initCount = 12; // 초기로 보여줄 아이템 수
   const increment = 12; // "더 보기"를 클릭할 때 추가로 보여줄 아이템 수



   // ModelState
   const [ModalState, setModalState] = useState(false);
   const [ModalData, setModalData] = useState(null);

   const [visiblePosts, setVisiblePosts] = useState([]);

   // Function 
   // 더보기
   const handleLoadMore = () => {
      const newVisiblePosts = posts.slice(0, visiblePosts.length + increment);
      setVisiblePosts(newVisiblePosts);
   };

   // 모달창을 띄우는 함수
   const ModalOpen = (element) => {
      setModalState(true);
      setModalData(element);
   }
   // 모달창을 닫는 함수
   const ModalClosed = () => {
      setModalState(false);
   }

  useEffect(() => {
    // 글 귀 리스트 요청
      console.log("axios post list : "+axiosAddress + postListApi);
      axios
      .get(axiosAddress + postListApi)
      .then((response) => {
         console.log(response);
         // setPosts(response.data); // 가져온 데이터로 state 업데이트
         // setVisiblePosts(response.data.slice(0, initCount));
      })
      .catch((error) => {
         console.error(error);
      });
  }, []);


   // 글 귀 전체 리스트
   const [posts, setPosts] = useState([
      { "geulgwiSeq": "1", "postUser": "재희", "mainText": "삶이 있는 한 희망은 있다", "regDate": "2020-10-14" , "imgPath" : "view1.jpg"},
      { "geulgwiSeq": "2", "postUser": "재희", "mainText": "산다는것 그것은 치열한 전투이다. ", "regDate": "2020-10-14" , "imgPath" : "view2.jpg"},
      { "geulgwiSeq": "3", "postUser": "재희", "mainText": "하루에 3시간을 걸으면 7년 후에 지구를 한바퀴 돌 수 있다.", "regDate": "2020-10-14" , "imgPath" : "view3.jpg"},
      { "geulgwiSeq": "4", "postUser": "쁨벙이", "mainText": "언제나 현재에 집중할수 있다면 행복할것이다.", "regDate": "2020-10-14" , "imgPath" : "view4.jpg"},
      { "geulgwiSeq": "5", "postUser": "세정", "mainText": "진정으로 웃으려면 고통을 참아야하며 , 나아가 고통을 즐길 줄 알아야 해", "regDate": "2020-10-14" , "imgPath" : "view5.jpg"},
      { "geulgwiSeq": "6", "postUser": "세정", "mainText": "직업에서 행복을 찾아라. 아니면 행복이 무엇인지 절대 모를 것이다 ", "regDate": "2020-10-14" , "imgPath" : null},
      { "geulgwiSeq": "7", "postUser": "콩이", "mainText": "신은 용기있는자를 결코 버리지 않는다 ", "regDate": "2020-10-14" , "imgPath" : null},
      { "geulgwiSeq": "8", "postUser": "콩이", "mainText": "피할수 없으면 즐겨라 ", "regDate": "2020-10-14" , "imgPath" : null},
      { "geulgwiSeq": "9", "postUser": "세정", "mainText": "직업에서 행복을 찾아라. 아니면 행복이 무엇인지 절대 모를 것이다 ", "regDate": "2020-10-14" , "imgPath" : null},
      { "geulgwiSeq": "10", "postUser": "콩이", "mainText": "신은 용기있는자를 결코 버리지 않는다 ", "regDate": "2020-10-14" , "imgPath" : null},
      { "geulgwiSeq": "11", "postUser": "콩이", "mainText": "피할수 없으면 즐겨라 ", "regDate": "2020-10-14" , "imgPath" : null},
      { "geulgwiSeq": "12", "postUser": "세정", "mainText": "직업에서 행복을 찾아라. 아니면 행복이 무엇인지 절대 모를 것이다 ", "regDate": "2020-10-14" , "imgPath" : null},
      { "geulgwiSeq": "13", "postUser": "콩이", "mainText": "신은 용기있는자를 결코 버리지 않는다 ", "regDate": "2020-10-14" , "imgPath" : null},
      { "geulgwiSeq": "14", "postUser": "콩이", "mainText": "피할수 없으면 즐겨라 ", "regDate": "2020-10-14" , "imgPath" : null},
      { "geulgwiSeq": "15", "postUser": "세정", "mainText": "직업에서 행복을 찾아라. 아니면 행복이 무엇인지 절대 모를 것이다 ", "regDate": "2020-10-14" , "imgPath" : null},
      { "geulgwiSeq": "16", "postUser": "콩이", "mainText": "신은 용기있는자를 결코 버리지 않는다 ", "regDate": "2020-10-14" , "imgPath" : null},
      { "geulgwiSeq": "17", "postUser": "콩이", "mainText": "피할수 없으면 즐겨라 ", "regDate": "2020-10-14" , "imgPath" : null},
      { "geulgwiSeq": "18", "postUser": "세정", "mainText": "직업에서 행복을 찾아라. 아니면 행복이 무엇인지 절대 모를 것이다 ", "regDate": "2020-10-14" , "imgPath" : null},
      { "geulgwiSeq": "19", "postUser": "콩이", "mainText": "신은 용기있는자를 결코 버리지 않는다 ", "regDate": "2020-10-14" , "imgPath" : null},
   ]);


   return (
      <Container>
         {/* 태그 검색 폼 */}
         <TagSearchForm />
         {/* 게시물 List */}
         <SearchResultForm 
            posts={posts}
            
            // 모달 관련
            ModalState={ModalState}
            ModalData={ModalData}
            ModalOpen={ModalOpen}
            ModalClosed={ModalClosed}
         />
      </Container>
   )
};

const Container = styled.div`
      flex-direction: row;
      width: 100%;
      user-select: none;
`;

export default SearchForm;