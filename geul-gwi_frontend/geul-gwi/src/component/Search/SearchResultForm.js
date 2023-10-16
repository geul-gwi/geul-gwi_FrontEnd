import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Axios Address Context
import { AxiosAddrContext } from 'contextStore/AxiosAddress';

// Component
import ResultItem from 'component/Search/ResultItem';

const SearchResultForm = () => {
  const axiosAddress = useState(useContext(AxiosAddrContext).axiosAddr); // Axios Address
  const postListApi = '/geulgwi/list'; // 글 귀 리스트 요청 api 주소

  const initCount = 10; // 초기로 보여줄 아이템 수
  const increment = 10; // "더 보기"를 클릭할 때 추가로 보여줄 아이템 수

  // 글 귀 전체 리스트
  const [posts, setPosts] = useState([
    { "geulgwiSeq": "1", "nickname": "재희", "geulgwiContent": "삶이 있는 한 희망은 있다", "regDate": "2020-10-14" },
    { "geulgwiSeq": "2", "nickname": "재희", "geulgwiContent": "산다는것 그것은 치열한 전투이다. ", "regDate": "2020-10-14" },
    { "geulgwiSeq": "3", "nickname": "재희", "geulgwiContent": "하루에 3시간을 걸으면 7년 후에 지구를 한바퀴 돌 수 있다.", "regDate": "2020-10-14" },
    { "geulgwiSeq": "4", "nickname": "쁨벙이", "geulgwiContent": "언제나 현재에 집중할수 있다면 행복할것이다.", "regDate": "2020-10-14" },
    { "geulgwiSeq": "5", "nickname": "세정", "geulgwiContent": "진정으로 웃으려면 고통을 참아야하며 , 나아가 고통을 즐길 줄 알아야 해", "regDate": "2020-10-14" },
    { "geulgwiSeq": "6", "nickname": "세정", "geulgwiContent": "직업에서 행복을 찾아라. 아니면 행복이 무엇인지 절대 모를 것이다 ", "regDate": "2020-10-14" },
    { "geulgwiSeq": "7", "nickname": "콩이", "geulgwiContent": "신은 용기있는자를 결코 버리지 않는다 ", "regDate": "2020-10-14" },
    { "geulgwiSeq": "8", "nickname": "콩이", "geulgwiContent": "피할수 없으면 즐겨라 ", "regDate": "2020-10-14" },
    { "geulgwiSeq": "9", "nickname": "세정", "geulgwiContent": "직업에서 행복을 찾아라. 아니면 행복이 무엇인지 절대 모를 것이다 ", "regDate": "2020-10-14" },
    { "geulgwiSeq": "10", "nickname": "콩이", "geulgwiContent": "신은 용기있는자를 결코 버리지 않는다 ", "regDate": "2020-10-14" },
    { "geulgwiSeq": "11", "nickname": "콩이", "geulgwiContent": "피할수 없으면 즐겨라 ", "regDate": "2020-10-14" },
    { "geulgwiSeq": "12", "nickname": "세정", "geulgwiContent": "직업에서 행복을 찾아라. 아니면 행복이 무엇인지 절대 모를 것이다 ", "regDate": "2020-10-14" },
    { "geulgwiSeq": "13", "nickname": "콩이", "geulgwiContent": "신은 용기있는자를 결코 버리지 않는다 ", "regDate": "2020-10-14" },
    { "geulgwiSeq": "14", "nickname": "콩이", "geulgwiContent": "피할수 없으면 즐겨라 ", "regDate": "2020-10-14" },
    { "geulgwiSeq": "15", "nickname": "세정", "geulgwiContent": "직업에서 행복을 찾아라. 아니면 행복이 무엇인지 절대 모를 것이다 ", "regDate": "2020-10-14" },
    { "geulgwiSeq": "16", "nickname": "콩이", "geulgwiContent": "신은 용기있는자를 결코 버리지 않는다 ", "regDate": "2020-10-14" },
    { "geulgwiSeq": "17", "nickname": "콩이", "geulgwiContent": "피할수 없으면 즐겨라 ", "regDate": "2020-10-14" },
    { "geulgwiSeq": "18", "nickname": "세정", "geulgwiContent": "직업에서 행복을 찾아라. 아니면 행복이 무엇인지 절대 모를 것이다 ", "regDate": "2020-10-14" },
    { "geulgwiSeq": "19", "nickname": "콩이", "geulgwiContent": "신은 용기있는자를 결코 버리지 않는다 ", "regDate": "2020-10-14" },
  ]);

  const [visiblePosts, setVisiblePosts] = useState([]);

  useEffect(() => {
    // 글 귀 리스트 요청
    axios
      .get(axiosAddress + postListApi)
      .then((response) => {
        setPosts(response.data); // 가져온 데이터로 state 업데이트
        setVisiblePosts(response.data.slice(0, initCount));
      })
      .catch((error) => {
        console.error('글귀 리스트를 불러오는 중 오류가 발생했습니다: ', error);
      });
  }, []);


  const handleLoadMore = () => {
    const newVisiblePosts = posts.slice(0, visiblePosts.length + increment);
    setVisiblePosts(newVisiblePosts);
  };

  return (
    <Container>
      <p>{posts.length}개의 검색결과</p>
      <Header>
        <Num>번호</Num>
        <Author>작성자</Author>
        <Content>내용</Content>
        <Date>날짜</Date>
      </Header>
      <ItemContainer>
        {visiblePosts.map((item) => (
          <ResultItem key={item.geulgwiSeq} data={item} />
        ))}
      </ItemContainer>
      {visiblePosts.length < posts.length && (
        <LoadMoreButton onClick={handleLoadMore}>더 보기</LoadMoreButton>
      )}
    </Container>
  )
};

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: white;
  user-select: none;
  padding: 20px;
  margin-bottom: 50px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  border-bottom: 1px solid #ccc;
`;

const Author = styled.p`
  flex: 1;
  padding-left: 10px;
  font-weight:bold;
`;

const Num = styled.p`
  flex: 0.5;
  padding-left: 10px;
  font-weight:bold;
  
`;

const Date = styled.p`
  font-size: 14px;
  flex: 1;
    font-weight:bold;
    padding-left: 10px;
`;

const Content = styled.p`
  flex: 4;
    font-weight:bold;
  font-size: 15px;
  padding-left: 10px;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const LoadMoreButton = styled.button`
  margin: 10px 0;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: white;
`;

export default SearchResultForm;