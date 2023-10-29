import React, { Fragment, useEffect, useContext, useState } from 'react';
import Axios from 'axios';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Tag } from 'component/common/button/Tag';


const ChallengeInfoForm = (props) => {
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);

    const challengeListUrl = '/challenge/list'; // 챌린지 목록 요청
    const postListUrl = '/challenge/list/';
    const challengeStatusChange = '/challenge/status';

    const [challenges, setChallenges] = useState([]); // 챌린지 목록
    const [selectedIndex, setSeletedIndex] = useState(0); // 보여주고 있는 챌린지 인덱스
    const [selectedChallengeSeq, setSelectedChallengeSeq] = useState(null); // 보여주고 있는 챌린지 시퀀스

    const [selectedChallenge, setSelectedChallenge] = useState([]); // 보여주고 있는 챌린지

    // 챌린지 목록과 진행 중인 챌린지 가져오기
    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                // 챌린지 목록 요청
                const listResponse = await Axios.get(`${axiosAddr}${challengeListUrl}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });

                if (listResponse) {
                    console.log("챌린지 회차 목록: ", listResponse.data);
                    //const reversedChallenges = listResponse.data.slice().reverse();
                    //console.log("역순: ", reversedChallenges);
                    const updatedChallenges = await checkChallengeStatus(listResponse.data);
                    setChallenges(updatedChallenges);

                    // 진행 중인 챌린지 요청
                    const ongoingResponse = await Axios.get(`${axiosAddr}/challenge/ongoing`, {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                    });

                    if (ongoingResponse) {
                        //console.log("진행 중인 회차 가져오기: ", ongoingResponse.data);
                        const ongoingChallenge = ongoingResponse.data;
                        setSelectedChallengeSeq(ongoingResponse.data.challengeAdminSeq);
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
                console.error('챌린지 목록 및 진행 중인 회차 가져오기 에러:', error);
            }
        };

        fetchChallenges();
    }, []);


    const checkChallengeStatus = async (challenges) => {
        const today = new Date();
        const updatedChallenges = await Promise.all(challenges.map(async (challenge) => {
            const startDate = new Date(challenge.start);
            const endDate = new Date(challenge.end);
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
            const response = await Axios.post(`${axiosAddr}${challengeStatusChange}?challengeAdminSeq=${challengeAdminSeq}&status=${status}`, {}, {
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

    return (
        <Frame>
            <FlexContainer>
                <ChallengeTitleContainer>
                    <ChallengeTitle>{selectedIndex + 1 + "회차 챌린지"}</ChallengeTitle>
                    <ChallengeState>
                        {selectedChallenge.status === "FINISHED" && <span style={{color : "red"}}>종료</span>}
                        {selectedChallenge.status === "ONGOING" && <span style={{ color: "blue" }}>진행 중</span>}
                        {selectedChallenge.status === "UPCOMING" && <span style={{ color: "green" }}>예정</span>}
                    </ChallengeState>
                </ChallengeTitleContainer>
                    <Date>{selectedChallenge.start + " ~ " + selectedChallenge.end}</Date> 
                <ChallengeDesc>{selectedChallenge.comment}</ChallengeDesc>
                <TagContainer>
                    {selectedChallenge.keyword && selectedChallenge.keyword.map((keyword, index) => (
                        <Tag key={index}>{"# "+ keyword}</Tag>
                    ))}
                </TagContainer>
            </FlexContainer>
        </Frame>
    );
};

const Frame = styled.div`
    display : flex;
    width : 100%;
    min-height : 100px; height : auto;
    padding : 10px 0px 10px 0px;
    justify-content: center;
`
const FlexContainer = styled.div`
    display : flex;
    width : 100%;
    min-height : 100%; height : auto;
    flex-direction: column;
    justify-content: space-between;
    font-family: "Nanum Square";
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
    justify-content: center; 
    align-items : center;
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

const ChallengeDesc = styled.div`
    padding : 10px 0px 10px 5px;
    white-space: pre-line;
    line-height : 25px; 
    font-size : 15px; 
    color : rgba(100,100,100,0.9);
`

// 선정된 TagList
const TagContainer = styled.div`
    display : flex;
    width : 100%; 
    flex-direction: row; justify-content: flex-start;
    flex-wrap: wrap;
    gap : 10px;
    padding : 10px 0px 10px 0px;
`

export default ChallengeInfoForm;