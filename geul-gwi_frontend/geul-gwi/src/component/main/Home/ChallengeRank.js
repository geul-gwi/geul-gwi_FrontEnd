import styled from 'styled-components';
import React, { useEffect, useContext, useState } from 'react';
import Axios from 'axios';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux';

const ChallengeRank = () => {
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);

    const icons = [
        "/icon/Rank/free-icon-medal-2583344.png",
        "/icon/Rank/free-icon-medal-2583319.png",
        "/icon/Rank/free-icon-medal-2583434.png"
    ];

    const listUrl = '/challenge/list'; // 챌린지 목록 or 해당 회차 글 요청 주소
    const statusChangeUrl = '/challenge/status'; // 챌린지 상태 변경 요청 주소
    const challengeOngoing = '/challenge/ongoing'

    const [posts, setPosts] = useState([]); // 해당 회차 챌린지 게시물 목록
    const [selectedChallengeSeq, setSelectedChallengeSeq] = useState(null); // 보여주고 있는 챌린지 시퀀스

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
                    //console.log("챌린지 회차 목록: ", listResponse.data);
                    const updatedChallenges = await checkChallengeStatus(listResponse.data);

                    if (updatedChallenges.length === 0)
                        return;

                    const ongoingResponse = await Axios.get(`${axiosAddr}${challengeOngoing}`, {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                    });

                    if (ongoingResponse) {
                        setSelectedChallengeSeq(ongoingResponse.data.challengeAdminSeq);
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

    const findTopThreeMostLiked = () => {
        if (posts.length > 0) {
            // posts를 likeCount로 내림차순 정렬
            const sortedPosts = posts.sort((a, b) => b.likeCount - a.likeCount);

            // 상위 3개의 요소의 nickname과 likeCount를 저장할 배열
            const topThreeDetails = [];

            // 상위 3개의 요소의 nickname과 likeCount를 찾기
            for (let i = 0; i < 3 && i < sortedPosts.length; i++) {
                topThreeDetails.push({
                    nickname: sortedPosts[i].nickname,
                    likeCount: sortedPosts[i].likeCount
                });
            }

            return topThreeDetails;
        }
        return [];
    };

    const topThreeDetails = findTopThreeMostLiked();

    return (
        <MainContainer>
            <Title>챌린지 랭킹</Title>
            {topThreeDetails.map((detail, idx) => (
                <Item key={idx}>
                    <Icon src={`${process.env.PUBLIC_URL}${icons[idx]}`} />
                    <Nickname>{detail.nickname}</Nickname>
                    <LikeCount>좋아요 {detail.likeCount}개</LikeCount>
                </Item>
                
            ))}
        </MainContainer>
    );
};

const MainContainer = styled.div`
    display: flex;
    width: 100%;
    background-color: white;
    flex-direction: column;
    box-shadow: 0px 0px 32px 0px #ccebb5;
    user-select: none;
    position: relative;
    padding-bottom: 10px;
    align-items: center;
    border-radius: 16px;
`;

const Title = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: center;
    align-items: center;
    font-style: bold;
    font-size: 18px;
    color: #3AEEC3;
`;

const Item = styled.div`
    display: flex;
    height: 50px;
    flex-direction: row;
    align-items: center;
`;

const Icon = styled.img`
    position: absolute;
    left: 20px;
    height: 40px;
    width: 40px;
    background-color: #F2F2F2;
    border-radius: 50%; /* 이미지를 둥글게 만듭니다 */
    padding: 5px; /* 여백을 줍니다 */
    margin-right: 10px; /* 우측 여백을 줍니다 */
`;

const Nickname = styled.div`
    font-size: 17px;
    color: #404040;
    font-weight: bold;
    position: absolute;
    left: 80px;
`;

const LikeCount = styled.div`
    font-size: 11px;
    color: #8E8B8B;
    position: absolute;
    right: 20px;
`;

export default ChallengeRank;