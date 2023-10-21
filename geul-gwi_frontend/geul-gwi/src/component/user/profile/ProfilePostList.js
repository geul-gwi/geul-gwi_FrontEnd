import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux'; // Redux 사용 Library
// component 
import Post from "component/main/Home/ShowPost";

// List < GeulgwiSrchDTO.Response > {
//     geulgwiContent(String),
//     userSeq(Long),
//     regDate(String),
//     files(String),
//     tags(List<TagDTO.Response >),
//     likeCount(int),
//     isLiked(Boolean)
// }

// 유저 프로필 밑에 표시되는 게시물을 모두 불러오는 폼
const ProfilePostList = (props) => {
    const axiosAddress = useContext(AxiosAddrContext).axiosAddr;
    const userPostsUrl = '/geulgwi/list/';
    // 유저 로그인 정보
    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);

    const [posts, setPosts] = useState([]); // 해당 유저 게시물 전체 리스트

    useEffect(() => {
        async function fetchUserPosts() {
            try {
                //console.log('요청 주소 : ', `${axiosAddress}${userPostsUrl}${userSeq}`);
                const response = await Axios.get(`${axiosAddress}${userPostsUrl}${userSeq}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });

                setPosts(response.data);

                console.log('게시물 목록 불러오기 성공 : ', response.data);

            } catch (error) {
                console.log('게시물 목록 불러오기 실패:', error);
            }
        }
        fetchUserPosts();
    }, []);

    return (
        <Container>
            {posts && posts.map((post) => (
                <Post 
                    nickname={props.nickname}
                    comment={props.comment}
                    geulgwiContent={post.geulgwiContent}
                    userSeq={post.userSeq}
                    regDate={post.regDate}
                    files={post.files}
                    tags={post.tags}
                    likeCount={post.likeCount}
                    isLiked={post.isLiked}
                />
            ))}
        </Container>
    );
};

export default ProfilePostList;

const Container = styled.div`
    display : flex;
    width : 100%;
    height : auto;
    min-height : 100px;
    flex-direction : column;
    align-items : center;
    padding-bottom : 50px;
`