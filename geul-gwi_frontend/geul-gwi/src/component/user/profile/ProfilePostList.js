import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux'; // Redux 사용 Library
// component 
import Post from "component/user/profile/Post";
import imageDataFetcher from 'service/imageDataFetcher';

// 유저 프로필 밑에 표시되는 게시물을 모두 불러오는 폼
const ProfilePostList = (props) => {
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const userPostsUrl = '/geulgwi/list/';
    const postListApi = '/geulgwi/list'; // 게시물 목록 요청 주소
    const postDetailApi = '/geulgwi/search/';
    // 유저 로그인 정보
    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);

    const [posts, setPosts] = useState([]); // 해당 유저 게시물 전체 리스트

    useEffect(() => {
        async function fetchUserPosts() {
            try {
                //console.log('요청 주소 : ', `${axiosAddress}${userPostsUrl}${userSeq}`);
                const response = await Axios.get(`${axiosAddr}${userPostsUrl}${props.profileUserSeq}?viewSeq=${userSeq}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                //console.log('게시물 목록 불러오기 성공 : ', response.data);
                setPosts(response.data);
                ReFactData(response.data);
            } catch (error) {
                console.log('프로필 게시물 목록 불러오기 실패:', error);
            }
        }
        fetchUserPosts();
    }, []);

    const ReFactData = async (posts) => {
        try {
            const updatedPosts = await Promise.all(posts.map(async (post) => {
                const response = await Axios.get(axiosAddr + postDetailApi + post.geulgwiSeq + "?viewSeq=" + userSeq, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    }
                });
                const files = response.data.files;
                const imageSrcs = await Promise.all(files.map(async (file) => {
                    try {
                        return await imageDataFetcher(axiosAddr, file);
                    } catch (error) {
                        console.log("getFileError : " + error);
                        return null;
                    }
                }));
                return {
                    ...post,
                    files: imageSrcs,
                };
            }));

            setPosts(updatedPosts);
        } catch (error) {
            console.error("Error in ReFactData:", error);
        }
    };

    return (
        <Container>
            {posts && posts.map((post) => (
                <Post 
                    profileUserSeq={props.profileUserSeq}
                    profile={props.profile}
                    nickname={props.nickname}
                    comment={props.comment}
                    geulgwiContent={post.geulgwiContent}
                    userSeq={post.userSeq}
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