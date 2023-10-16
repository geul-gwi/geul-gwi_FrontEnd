import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AxiosAddrContext } from 'contextStore/AxiosAddress'; // Axios Address Context

const ResultItem = ({ data }) => {
  const axiosAddress = useState(useContext(AxiosAddrContext).axiosAddr); // Axios Address
  const postDetailApi = '/geulgwi/list'; // 글 귀 리스트 요청 api 주소

  const handleClick = () => {
    // 클릭 시 geulgwiSeq를 이용하여 API 요청을 보냄
    axios
      .get(`${axiosAddress}${postDetailApi}/${data.geulgwiSeq}`)
      .then((response) => {
        console.log('API 응답:', response.data);
      })
      .catch((error) => {
        console.error('API 요청 중 오류가 발생했습니다:', error);
      });
  };

  return (
    <Container onClick={handleClick}>
      <Num>{data.geulgwiSeq}</Num>
      <Author>{data.nickname}</Author>
      <Content>{data.geulgwiContent}</Content>
      <Date>{data.regDate}</Date>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 45px;
  align-items: center;
  border-bottom: 1px solid #ccc;
  cursor: pointer; 
`;

const Author = styled.p`
  flex: 1;
  padding-left: 10px;
`;

const Date = styled.p`
  font-size: 14px;
  flex: 1;
    padding-left: 10px;
`;

const Num = styled.p`
  flex: 0.5;
  padding-left: 10px;
`;

const Content = styled.div`
  flex: 4;
  font-size: 15px;
  padding-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-height: 50px; 
  overflow-y: auto;
`;

export default ResultItem;