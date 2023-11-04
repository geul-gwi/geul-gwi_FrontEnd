import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux'; // Redux 사용 Library
// component 
import Post from "component/user/profile/Post";

// 유저 프로필 밑에 표시되는 게시물을 모두 불러오는 폼
const ProfilePostList = (props) => {
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);

    const userPostsUrl = '/geulgwi/list/'; 
    const postDetailApi = '/geulgwi/search/';

    const [posts, setPosts] = useState([]); // 해당 유저 게시물 전체 리스트

    useEffect(() => {
        async function fetchUserPosts() {
            try {
                // 특정 유저의 게시물 목록 불러오기
                const response = await Axios.get(`${axiosAddr}${userPostsUrl}${props.profileUserSeq}?viewSeq=${userSeq}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                setPosts(response.data);
            } catch (error) {
                console.log('프로필 게시물 목록 불러오기 실패:', error);
            }
        }

        fetchUserPosts();
    }, [props.profileUserSeq, userSeq, userToken, axiosAddr, userPostsUrl, postDetailApi, posts]);


    return (
        <Container>
            {posts && posts.map((post) => (
                <Post 
                    userSeq={props.profileUserSeq}
                    profile={props.profile}
                    nickname={props.nickname}
                    comment={props.comment}
                    geulgwiContent={post.geulgwiContent}
                    regDate={post.regDate}
                    files={post.files}
                    tags={post.tags}
                    likeCount={post.likeCount}
                    liked={post.liked}
                    geulgwiSeq={post.geulgwiSeq}
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
    flex-direction : column;
    align-items : center;
    padding-bottom : 30px;
`