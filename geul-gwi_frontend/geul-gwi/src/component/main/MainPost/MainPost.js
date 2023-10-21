import React, { useState, useEffect, useContext } from 'react';
//styled component
import styled from 'styled-components';
// component 
import Post from "component/main/Home/ShowPost";

/* 기본적으로 최소 5개 콘텐츠를 보여주고, 
스크롤 할 때마다 추가하는 식으로 아마 보이지 않는 게시글들은 자원을 효율적으로 
사용하기 위해 활성화 되지 않다가 다시 이전꺼를 보기 위해 활성화 시켜주는 식으로  */

const MainPost = () => {
    const imagePath = process.env.PUBLIC_URL + '/img/';
    const [posts, setPosts] = useState([]);

    return (
        <>
            <MainContentsContainer>
                {posts && posts.map((post) => (
                    <Post
                        nickname={post.nickname}
                        profile={imagePath + post.profilePath}
                        imagePath={imagePath + post.imagePath}
                        comment={post.content}
                        tags={post.tags}
                    />
                ))
                }
            </MainContentsContainer>
        </>
    );
};

export default MainPost;

const MainContentsContainer = styled.div`
    display : flex;
    width : 100%;
    height : auto;
    min-height : 100px;
    flex-direction : column;
    align-items : center;
    padding-bottom : 50px;
`