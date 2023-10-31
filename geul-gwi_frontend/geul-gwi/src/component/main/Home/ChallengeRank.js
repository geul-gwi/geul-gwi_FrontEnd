import styled from 'styled-components';
import React, { useEffect, useContext, useState } from 'react';
import Axios from 'axios';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux';

let TagList = []
TagList.push({ "tagname": "햄토스", "icon": "icon/Rank/free-icon-medal-2583344.png"})
TagList.push({ "tagname": "맛탕이", "icon": "icon/Rank/free-icon-medal-2583319.png"})
TagList.push({ "tagname": "박연어", "icon": "icon/Rank/free-icon-medal-2583434.png"})

// 챌린지 랭크 보여주는 폼
// 1. 현재 진행 중인 챌린지 정보 가져오기
// 2. 해당 챌린지의 글 목록 가져와서 좋아요 개수 순으로 정렬하기
// 3. 1,2,3등만 출력하기




const ChallengeRank = () => {
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);

    const listUrl = '/challenge/list'; // 챌린지 목록 or 해당 회차 글 요청 주소
    const statusChangeUrl = '/challenge/status'; // 챌린지 상태 변경 요청 주소
    const challengeOngoing = '/challenge/ongoing'

    const [challenges, setChallenges] = useState([]); // 챌린지 회차 목록
    const [posts, setPosts] = useState([]); // 해당 회차 챌린지 게시물 목록
    const [selectedIndex, setSeletedIndex] = useState(0); // 보여주고 있는 챌린지 인덱스
    const [selectedChallengeSeq, setSelectedChallengeSeq] = useState(null); // 보여주고 있는 챌린지 시퀀스

    const [selectedChallenge, setSelectedChallenge] = useState([]); // 보여주고 있는 챌린지

    // useEffect(() => {
    //     const fetchChallenges = async () => {
    //         try {
    //             // 챌린지 목록 요청
    //             const listResponse = await Axios.get(`${axiosAddr}${listUrl}`, {
    //                 headers: {
    //                     Authorization: `Bearer ${userToken}`,
    //                 },
    //             });
    
    //             if (listResponse) {
    //                 //console.log("챌린지 회차 목록: ", listResponse.data);
    //                 const updatedChallenges = await checkChallengeStatus(listResponse.data);
    //                 setChallenges(updatedChallenges);
    
    //                 // 진행 중인 챌린지 요청
    //                 const ongoingResponse = await Axios.get(`${axiosAddr}${challengeOngoing}`, {
    //                     headers: {
    //                         Authorization: `Bearer ${userToken}`,
    //                     },
    //                 });
    
    //                 if (ongoingResponse) {
    //                     //console.log("진행 중인 회차 가져오기: ", ongoingResponse.data);
    //                     const ongoingChallenge = ongoingResponse.data;
    //                     setSelectedChallengeSeq(ongoingResponse.data.challengeAdminSeq);
    //                     // challenges 배열에서 해당 챌린지의 index 찾기
    //                     const ongoingChallengeIndex = listResponse.data.findIndex(
    //                         challenge => challenge.challengeAdminSeq === ongoingChallenge.challengeAdminSeq
    //                     );
    
    //                     // index를 selectedIndex로 설정
    //                     if (ongoingChallengeIndex !== -1) {
    //                         //console.log("진행중인회차 인덱스", ongoingChallengeIndex)
    //                         setSeletedIndex(ongoingChallengeIndex);
    //                     }
    
    //                     // 선택된 챌린지 정보를 설정
    //                     setSelectedChallenge(ongoingChallenge);
    //                 }
    //             }
    //         } catch (error) {
    //             console.error('챌린지 목록 및 진행 중인 회차 가져오기 에러:', error);
    //         }
    //     };
    
    //     fetchChallenges();
    // }, []);

    return (
        <MainContainer>
                <Title>챌린지 랭킹</Title>
                { TagList && TagList.map((element, idx) => (
                        <Item>     
                            <Icon src={process.env.PUBLIC_URL + element.icon}></Icon>
                            <Nickname>{element.tagname}</Nickname>
                            <LikeCount>좋아요 28개</LikeCount>
                        </Item>
                    ))
                }
        </MainContainer>
    );
};

const MainContainer = styled.div`
    display : flex;
    width : 100%;
    background-color: white;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 32px 0px #FF9989;
    user-select: none;
    position: relative;
    padding-bottom: 10px;
`

const TitleContainer = styled.div`
    display : flex;
    width : 100%;
    height : 50px;
    justify-content : center;
    align-items : center;
    font-family: "Nanum Square" ;
    font-style: "bold";
    font-size : 18px;
    color : #3AEEC3;
`

const Title = styled.div`
    display : flex;
    width : 100%;
    height : 50px;
    justify-content : center;
    align-items : center;
    font-family: "Nanum Square" ;
    font-style: "bold";
    font-size : 18px;
    color : #3AEEC3;
`

const Item = styled.div`
    display : flex;

    height : 50px;
    flex-direction: row;
    justify-content : center;
    align-items: center;
`
const Icon = styled.img`
    position: absolute;
    height : 30px;
    width: 30px;
    left: 30px;
`

const Nickname = styled.div`
    font-size : 15px;
    color : #404040;
    font-weight: bold;
`
const LikeCount = styled.div`
    margin-left: 10px;
    font-size : 12px;
    color : #8E8B8B;
`

export default ChallengeRank;