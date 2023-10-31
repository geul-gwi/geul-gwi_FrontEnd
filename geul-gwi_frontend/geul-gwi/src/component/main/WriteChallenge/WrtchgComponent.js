import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
// component
import ChallengeInfoForm from 'component/main/WriteChallenge/WrtChgInfo/ChallengeInfoForm';
import SortManager from './PostManager/SortManager';
import Axios from 'axios';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux';

const WrtchgComponent = () => {
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);

    const challengeListUrl = '/challenge/list'; // 챌린지 목록 요청
    const postListUrl = '/challenge/list/';
    const challengeStatusChange = '/challenge/status';

    const [challenges, setChallenges] = useState([]); // 챌린지 목록
    const [posts, setPosts] = useState([]); // 챌린지 게시물 목록
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

    // 해당 회차 글 목록 가져오기
    useEffect(() => {
        if (selectedChallengeSeq === null)
            return;
        const tagSearchHandler = async () => {
            try {
                const response = await Axios.get(`${axiosAddr}${postListUrl}${selectedChallengeSeq}?viewSeq=${userSeq}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                if (response) {
                    console.log("해당 챌린지 글 목록 : ", response.data);
                    setPosts(response.data);
                }
            } catch (error) {
                console.error('해당 챌린지 글 목록.', error);
            }
        };
        tagSearchHandler();
    }, [selectedChallengeSeq]);

    // 이전 버튼
    const PrevButtonClick = () => {
        if (challenges.length > 0 && selectedIndex > 0) {
            const newIndex = selectedIndex - 1;
            setSelectedChallengeSeq(challenges[newIndex].challengeAdminSeq);
            setSelectedChallenge(challenges[newIndex]);
            setSeletedIndex(newIndex);
        }
    }
    // 다음 버튼
    const NextButtonClick = () => {
        if (challenges.length > 0 && selectedIndex < challenges.length - 1) {
            const newIndex = selectedIndex + 1;
            setSelectedChallengeSeq(challenges[newIndex].challengeAdminSeq);
            setSelectedChallenge(challenges[newIndex]);
            setSeletedIndex(newIndex);
        }
    }

    const LikeButtonClick = (postNumber) => {
        // 좋아요 버튼 State에 따라 , 좋아요 취소 / 좋아요 클릭 됨  => 백엔드에게 전달하기
        const index = posts.indexOf(posts.find((post) => post.postNumber === postNumber));

        setPosts((prevPosts) => {
            // 해당 인덱스의 post 객체를 복사합니다.
            const updatedPost = { ...prevPosts[index] };

            // isLikeClicked 값을 토글합니다.
            updatedPost.isLikeClicked = !updatedPost.isLikeClicked;

            // 상태를 업데이트한 후, 해당 인덱스를 포함한 나머지 post 객체는 이전 상태를 그대로 사용합니다.
            const updatedPosts = [...prevPosts];
            updatedPosts[index] = updatedPost;

            return updatedPosts;
        });
    }

    return (
        <Frame>
            <FlexManager>
                <SelectContainer>
                    <FlexContainer>
                        <ArrowContainer onClick={PrevButtonClick}><BsChevronLeft /></ArrowContainer>
                        <ChallengeSelectContainer>{selectedIndex + 1 + "회차 챌린지"}</ChallengeSelectContainer>
                        <ArrowContainer onClick={NextButtonClick}><BsChevronRight /></ArrowContainer>
                    </FlexContainer>
                </SelectContainer>
                <ChallengeInfoForm
                    selectedIndex={selectedIndex}
                    selectedChallenge={selectedChallenge}
                />
                <SortManager
                    posts={posts}
                />
            </FlexManager>
        </Frame>
    );
};

// Frame
const Frame = styled.div`
    display : flex;
    width : 100%;
    height : auto;
    background-color: white;
    justify-content: center;
    user-select: none;
`
const FlexManager = styled.div`
    display : flex;
    width : 92%;
    min-height : calc(100% - 20px);
    height : auto;
    padding : 10px 0px 10px 0px;
    flex-direction: column;
    align-items : center;
    gap : 20px;
`
const SelectContainer = styled.div`
    display : flex;
    width : 100%;
    height : 50px;
    justify-content: center;
`
const FlexContainer = styled.div`
    display : flex;
    flex-direction: row;
    width : 100%;
    height : 100%;
    justify-content: space-between;
`

// Arrow Container
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

    &:hover{
        background-color: rgba(244,244,244,0.9);
    }
`

export default WrtchgComponent;