import React, { useEffect, useContext, useState } from 'react';
import Axios from 'axios';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux';
// component
import ChallengeComponent from 'component/main/WriteChallenge/ChallengeComponent';
import imageDataFetcher from 'service/imageDataFetcher';

// 챌린지 폼 관련 함수, 변수 관리
const WrtchgAction = () => {
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
                    //console.log("챌린지 회차 목록111111: ", listResponse.data);
                    const updatedChallenges = await checkChallengeStatus(listResponse.data);
                    setChallenges(updatedChallenges);

                    // 진행 중인 챌린지 요청
                    const ongoingResponse = await Axios.get(`${axiosAddr}${challengeOngoing}`, {
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

    // 해당 회차 글 목록 가져오기
    useEffect(() => {
        if (selectedChallengeSeq === null)
            return;

        const tagSearchHandler = async () => {
            try {
                const response = await Axios.get(`${axiosAddr}${listUrl}/${selectedChallengeSeq}?viewSeq=${userSeq}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                setPosts(await imageChange(response.data));
            } catch (error) {
                console.error('해당 챌린지 글 목록.', error);
            }
        };

        const imageChange = async (posts) => {
            try {
                return await Promise.all(posts.map(async (post) => {
                    try {
                        const profileImageUrl = await imageDataFetcher(axiosAddr, post.profile);
        
                        if (profileImageUrl) {
                            post.profile = profileImageUrl; // 프로필 데이터를 이미지 URL로 설정
                        }
        
                        return post;
                    } catch (error) {
                        console.error('프로필 가져오기 에러:', error);
                        return post; // 에러 발생 시 현재 post 객체를 반환하여 업데이트
                    }
                }));
            } catch (error) {
                console.error('게시물 업데이트 에러:', error);
                return posts;
            }
        };

        tagSearchHandler();
    }, [selectedChallengeSeq]);


    // 이전 버튼
    const PrevButtonClick = () => {
        //console.log("이전글", challenges);
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

    return (
        <ChallengeComponent
            challengeList={challenges} // 챌린지 회차 목록
            setPosts={setPosts}
            posts={posts} // 해당 회차 게시물 목록
            PrevButtonClick={PrevButtonClick}
            NextButtonClick={NextButtonClick}
            selectedIndex={selectedIndex}
            selectedChallenge={selectedChallenge}
        />
    );
};

export default WrtchgAction;