import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux'; // Redux 사용 Library
const ChallengeManagement = () => {
  const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
  const userSeq = useSelector((state) => state.authReducer.userSeq);
  const userToken = useSelector((state) => state.authReducer.accessToken);
  const PublicWritingIconPath = process.env.PUBLIC_URL + "/icon/Writing/"
  const [showTagList, setShowTagList] = useState(true);
  const challengeAddUrl = '/challenge/admin/register';

  // 챌린치 등록을 위한 변수
  const [comment, setComment] = useState(""); // 내용
  const [keywords, setKeywords] = useState(["", "", ""]); // 초기에 3개의 빈 문자열로 초기화
  const [startDate, setStartDate] = useState(""); // 시작 날짜
  const [endDate, setEndDate] = useState(""); // 종료 날짜

  const handleKeywordChange = (index, value) => {
    // keywords 상태를 업데이트할 때 사용할 함수
    setKeywords(prevKeywords => {
      const newKeywords = [...prevKeywords];
      newKeywords[index] = value;
      return newKeywords;
    });
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const ShowList = () => {
    setShowTagList(!showTagList);
  }

  // 챌린지 등록 버튼 
  const onClickAddChallenge = async () => {
    try {
      const ChallengeFormDTO = {
        comment: comment,
        start: startDate,
        end: endDate,
        keyword: keywords
      };
      console.log("챌린지 등록 : ", ChallengeFormDTO);
      const response = await Axios.post(`${axiosAddr}${challengeAddUrl}`, ChallengeFormDTO, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response) {
        console.log("챌린지 등록: ", response.data);
      }
    } catch (error) {
      console.error('챌린지 등록: ', error);
    }
  }

  return (
    <MainContainer>
      <TopContainer>
        <Title>챌린지</Title>
      </TopContainer>
      <ShowButton onClick={ShowList}>
        <ButtonTextContainer>챌린지 추가</ButtonTextContainer>
        <ButtonIconContainer>
          <Iconimg src={PublicWritingIconPath + "plus.svg"} />
        </ButtonIconContainer>
      </ShowButton>
      {showTagList ? "" :
        <BottomContainer>
          <Container>
            <InputComent placeholder='내용' onChange={(e) => setComment(e.target.value)}/>
          </Container>
          <Container>
            <Title>키워드</Title>
            <KeywordInputContainer>
              {keywords.map((keyword, index) => (
                <KeywordInput key={index} type="text" placeholder={`키워드 ${index + 1}`}
                  value={keyword}
                  onChange={(e) => handleKeywordChange(index, e.target.value)}
                />
              ))}
            </KeywordInputContainer>
          </Container>
          <DateContainer>
            <DateTitle>시작 날짜</DateTitle>
            <DateInput type="date" value={startDate} onChange={handleStartDateChange}/>
            ~
            <DateTitle>종료 날짜</DateTitle>
            <DateInput type="date" value={endDate} onChange={handleEndDateChange}/>
          </DateContainer>
          <Button onClick={onClickAddChallenge}>등록</Button>
        </BottomContainer>
      }
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  width: 800px;
  margin: auto;
`
const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
  padding: 20px;
  gap: 10px;
`

const DateTitle = styled.p`
  font-size: 14px;
`

const DateInput = styled.input`
  width: 140px;
  height: 34px;
  font-size: 15px;
  color: gray;
`

const TopContainer = styled.div`
  background-color: white;
  width: 100%;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 10px;
`

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 500px;
  padding: 40px 20px 30px 20px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  height: auto;
  margin: 10px;
  align-items: center;
`

const Title = styled.span`
  font-size: 18px;
`;

const KeywordInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
`;

const KeywordInput = styled.input`
  width: 100%;
  height: 30px;
  border: 1px solid #ddd;
  padding: 5px;
  font-size: 16px;
  margin-top: 10px;
`;

const Button = styled.div`
  background-color: white;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 8px 40px;
  cursor: pointer;
  :hover{

  }
`

const InputComent = styled.textarea`
  width: 100%;
  height: 80px;
  border: 1px solid #ddd;
  padding: 10px;
  resize: vertical;
  font-size: 15px;
`;

const ShowButton = styled.div`
    display : flex;
    width : 140px;
    height : 50px;
    padding : 0px 10px 0px 10px;
    border-radius: 16px;
    margin-bottom: 20px;
    background: #FFF;
    box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.25);
    align-items: center; justify-content: space-between;
    cursor : pointer;
    transition : 0.2s;
    &:hover{
        background-color : mistyrose;
    }
`
const ButtonTextContainer = styled.div`
    display : flex;
    width : 100px;
    height : 80px;
    justify-content: center; 
    align-items: center;
    font-size : 12px; color : black;
`
const ButtonIconContainer = styled.div`
    display : flex;
    width : 15px;
    height : 15px;
    justify-content: center;
    align-items: center;
`
const Iconimg = styled.img`
    width : 100%;
    height : 100%;
    object-fit: contain;
`

export default ChallengeManagement;