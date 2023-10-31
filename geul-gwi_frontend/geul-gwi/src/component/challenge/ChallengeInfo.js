import styled from 'styled-components';
import { Tag } from 'component/common/button/Tag';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import React, { useEffect, useContext, useState } from 'react';
import Axios from 'axios';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux';
import moment from 'moment';

// 챌린지 회차 목록
const ChallengeInfo = () => {
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);

    const listUrl = '/challenge/list'; // 챌린지 목록 or 해당 회차 글 요청 주소
    const statusChangeUrl = '/challenge/status'; // 챌린지 상태 변경 요청 주소
    const challengeOngoing = '/challenge/ongoing';
    const challengeEdit = '/challenge/admin/update'; // 챌린지 헤더 수정 요청 주소

    const [challenges, setChallenges] = useState([]); // 챌린지 회차 목록
    const [selectedIndex, setSeletedIndex] = useState(0); // 보여주고 있는 챌린지 인덱스
    const [selectedChallenge, setSelectedChallenge] = useState([]); // 보여주고 있는 챌린지

    // 기존 State에 isEditing 및 챌린지 내용 편집을 위한 State 추가
    const [isEditing, setIsEditing] = useState(false);

    // 챌린치 편집을 위한 변수
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


    // 챌린지 편집 버튼 클릭 시 편집 모드로 전환
    const onClickEdit = () => {
        
        if (!isEditing) {
            setComment(selectedChallenge.comment);
            setKeywords(selectedChallenge.keyword);
            setStartDate(selectedChallenge.start);
            setEndDate(selectedChallenge.end);
        }

        setIsEditing(!isEditing);


    };


    // 챌린지 목록과 진행 중인 챌린지 가져오기
    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                // 챌린지 목록 요청
                const listResponse = await Axios.get(`${axiosAddr}${listUrl}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });

                if (listResponse) {
                    console.log("챌린지 회차 목록: ", listResponse.data);
                    const updatedChallenges = await checkChallengeStatus(listResponse.data);
                    setChallenges(updatedChallenges);

                    if(updatedChallenges.length === 0)
                        return;

                    // 진행 중인 챌린지 요청
                    const ongoingResponse = await Axios.get(`${axiosAddr}${challengeOngoing}`, {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                    });

                    if (ongoingResponse) {
                        //console.log("진행 중인 회차 가져오기: ", ongoingResponse.data);
                        const ongoingChallenge = ongoingResponse.data;
                        // challenges 배열에서 해당 챌린지의 index 찾기
                        const ongoingChallengeIndex = listResponse.data.findIndex(
                            challenge => challenge.challengeAdminSeq === ongoingChallenge.challengeAdminSeq
                        );

                        // index를 selectedIndex로 설정
                        if (ongoingChallengeIndex !== -1) {
                            //console.log("진행중인회차 인덱스", ongoingChallengeIndex)
                            setSeletedIndex(ongoingChallengeIndex);
                        }

                        // 선택된 챌린지 정보를 설정
                        setSelectedChallenge(ongoingChallenge);
                    }
                }
            } catch (error) {
                console.error('챌린지 목록:', error);
            }
        };

        fetchChallenges();
    }, []);


    const checkChallengeStatus = async (challenges) => {
        const today = moment(); // 현재 날짜를 Moment 객체로 얻기
        const updatedChallenges = await Promise.all(challenges.map(async (challenge) => {
            const startDate = new moment(challenge.start);
            const endDate = new moment(challenge.end);
            if (challenge.status === 'ONGOING' && today >= endDate) {
                console.log("진행중인 챌린지 종료됨!!", endDate);
                challenge.status = 'FINISHED';
                await statusChangeHandler(challenge.challengeAdminSeq, 'FINISHED');
            } else if (challenge.status === 'UPCOMING' && today >= startDate) {
                if (today >= endDate) {
                    console.log("예정중인 챌린지 종료됨!!", endDate);
                    challenge.status = 'FINISHED';
                    await statusChangeHandler(challenge.challengeAdminSeq, 'FINISHED');
                } else {
                    console.log("예정중인 챌린지 시작됨!!", startDate);
                    challenge.status = 'ONGOING';
                    await statusChangeHandler(challenge.challengeAdminSeq, 'ONGOING');
                }
            }

            return challenge;
        }));

        return updatedChallenges;
    };

    const statusChangeHandler = async (challengeAdminSeq, status) => {
        try {
            const response = await Axios.post(`${axiosAddr}${statusChangeUrl}?challengeAdminSeq=${challengeAdminSeq}&status=${status}`, {}, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            if (response) {
                //console.log("챌린지 상태 변경 : ", response.data);
            }
        } catch (error) {
            console.error('챌린지 상태 변경.', error);
        }
    };

    // 이전 버튼
    const PrevButtonClick = () => {
        console.log("이전글", challenges);
        if (challenges.length > 0 && selectedIndex > 0) {
            const newIndex = selectedIndex - 1;
            setSelectedChallenge(challenges[newIndex]);
            setSeletedIndex(newIndex);
        }
    }

    // 다음 버튼
    const NextButtonClick = () => {
        if (challenges.length > 0 && selectedIndex < challenges.length - 1) {
            const newIndex = selectedIndex + 1;
            setSelectedChallenge(challenges[newIndex]);
            setSeletedIndex(newIndex);
        }
    }

    // 챌린지 변경 처리
    const challengeEditHandler = async () => {
        try {
            const ChallengeUpdteDTO = {
                challengeAdminSeq: selectedChallenge.challengeAdminSeq,
                comment: comment,
                keyword: keywords,
                start: startDate,
                end: endDate,
                status: selectedChallenge.status
             };
             console.log("챌린지 변경 정보: ", ChallengeUpdteDTO);
            const response = await Axios.post(`${axiosAddr}${challengeEdit}`, ChallengeUpdteDTO, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            if (response) {
                //console.log("챌린지 상태 변경 : ", response.data);
                alert("챌린지 정보 변경이 완료되었습니다.")
            }
        } catch (error) {
            console.error('챌린지 정보 변경.', error);
        }
    };


    return (
        <Frame>
            {!isEditing ? 
            <FlexContainer>
                <SelectContainer>
                    <ArrowContainer onClick={PrevButtonClick}><BsChevronLeft /></ArrowContainer>
                    <ChallengeSelectContainer>{selectedIndex + 1 + "회차 챌린지"}</ChallengeSelectContainer>
                    <ArrowContainer onClick={NextButtonClick}><BsChevronRight /></ArrowContainer>
                </SelectContainer>
                <BottomContainer>
                    <ChallengeTitleContainer>
                        <ChallengeTitle>{selectedIndex + 1 + "회차 챌린지"}</ChallengeTitle>
                        <ChallengeState>
                            {selectedChallenge.status === "FINISHED" && <span style={{ color: "red" }}>종료</span>}
                            {selectedChallenge.status === "ONGOING" && <span style={{ color: "blue" }}>진행 중</span>}
                            {selectedChallenge.status === "UPCOMING" && <span style={{ color: "green" }}>예정</span>}
                        </ChallengeState>
                    </ChallengeTitleContainer>
                    <Date>{selectedChallenge.start + " ~ " + selectedChallenge.end}</Date>
                    <Content>{selectedChallenge.comment}</Content>
                    <TagContainer>
                        {selectedChallenge.keyword && selectedChallenge.keyword.map((keyword, index) => (
                            <Tag key={index}>{"# " + keyword}</Tag>
                        ))}
                    </TagContainer>
                </BottomContainer>
                    <EditButton onClick={onClickEdit}>편집</EditButton>
            </FlexContainer>
            :
                <EditContainer>
                    <Container>
                        <InputComent value={comment} placeholder='내용' onChange={(e) => setComment(e.target.value)} />
                    </Container>
                    <Container>
                        <Title>키워드</Title>
                        <KeywordInputContainer>
                            {keywords.map((keyword, index) => (
                                <KeywordInput keyword={index} type="text" placeholder={`키워드 ${index + 1}`}
                                    value={keyword}
                                    onChange={(e) => handleKeywordChange(index, e.target.value)}
                                />
                            ))}
                        </KeywordInputContainer>
                    </Container>
                    <DateContainer>
                        <DateTitle>시작 날짜</DateTitle>
                        <DateInput type="date" value={startDate} onChange={handleStartDateChange} />
                        ~
                        <DateTitle>종료 날짜</DateTitle>
                        <DateInput type="date" value={endDate} onChange={handleEndDateChange} />
                    </DateContainer>
                    <ButtonContainer>
                        <Button onClick={challengeEditHandler}>완료</Button>
                        <Button onClick={onClickEdit}>취소</Button>
                    </ButtonContainer>

                </EditContainer>
            }
        </Frame>
    );
};

const Frame = styled.div`
    display : flex;
    width : 600px;
    height : auto;
    padding : 10px;
    justify-content: center;
    background-color: white;
    position: relative;
`

const ButtonContainer = styled.div`
    display : flex;
    flex-direction: row;
    width : 100%;
    align-items: center;
    justify-content: center;
    gap: 10px;
`


const EditButton = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 120px;
    height: 30px;
    right: 15px;
    bottom: 20px;
    cursor: pointer;
    :hover{
        background-color: rgb(240, 240, 240);
    }
`

const BottomContainer = styled.div`
    padding: 10px;
`
const FlexContainer = styled.div`
    display : flex;
    width : 100%;
    min-height : 100%; 
    height : auto;
    flex-direction: column;
    padding: 10px;
`
const ChallengeTitleContainer = styled.div`
    display : flex;
    width : 100%;
    height : 30px;
    flex-direction: row;
    justify-content : flex-start; 
    align-items : center;
`
const ChallengeTitle = styled.span`
    display : inline-flex;
    width : auto;
    height : 100%;

    padding : 0px 5px 0px 5px;
    font-size : 23px; 
    font-style : "bold"; 
    color : rgb(70,70,70);
`
const ChallengeState = styled.span`
    display : inline-flex;
    width : auto;
    justify-content: center; 
    align-items: center;
    padding : 0px 0px 0px 5px;
    font-size : 15px;
`

const Date = styled.span`
    display : flex;
    margin: none;
    padding : 5px 0px 0px 5px;
    justify-content: flex-start; 
    align-items: center;
    font-size : 13px; 
    color : gray;
`

const Content = styled.div`
    margin-top: 20px;
    line-height : 25px; 
    min-height: 100px;
    padding: 5px;
    font-size : 16px; 
    color : rgba(100,100,100,0.9);
    text-align: left; /* 왼쪽 정렬 */
`

const TagContainer = styled.div`
    display : flex;
    width : 100%; 
    flex-direction: row; justify-content: flex-start;
    flex-wrap: wrap;
    gap : 10px;
    padding : 10px 0px 10px 0px;
`

const SelectContainer = styled.div`
    display : flex;
    width : 100%;
    height : 50px;
    justify-content: center;
`


const ArrowContainer = styled.div`
    display : flex;
    width : 50px;
    height : 100%;
    justify-content : center; align-items: center;
    cursor : pointer;
    border-radius: 50%;
    &:hover{
        background-color : rgba(244,244,244,0.9);
    }
`

const ChallengeSelectContainer = styled.div`
    display : flex;
    width : calc(100% - 120px);
    height : 100%;
    justify-content: center; align-items: center;
    border-radius : 16px;
    cursor : pointer;
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
const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 40px 20px 30px 20px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
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
    margin-top: 20px;
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



export default ChallengeInfo;