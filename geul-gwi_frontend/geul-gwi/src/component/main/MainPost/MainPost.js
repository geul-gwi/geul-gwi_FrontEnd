import React from 'react';

//component import
import Post from "component/main/Home/ShowPost"
//styled component
import styled from 'styled-components';



const TempPostData = []
TempPostData.push({"userNick" : "안건","userTitle":"감성 글 작가","profilePath":"/profile1.jpg","imagePath":"/content_img1.jpg",
"contentSaying":"너의 신념을 남에게 이해시키지 말아라,  너가 믿는 것보다 더 중요한 것은 없다"})
TempPostData.push({"userNick" : "안건","userTitle":"감성 글 작가","profilePath":"/profile1.jpg","imagePath":"/content_img1.jpg",
"contentSaying":"너의 신념을 남에게 이해시키지 말아라,  너가 믿는 것보다 더 중요한 것은 없다"})
TempPostData.push({"userNick" : "안건","userTitle":"감성 글 작가","profilePath":"/profile1.jpg","imagePath":"/content_img1.jpg",
"contentSaying":"너의 신념을 남에게 이해시키지 말아라,  너가 믿는 것보다 더 중요한 것은 없다"})

const MainPost = () => {
    const imagePath = process.env.PUBLIC_URL+'/img/';

    return (
        <div>
            <MainContentsContainer>
            {/* 게시글 2개 넣어보기 ( 정적이라 동적으로 바꾸어 주어야함 )
            => 예를 들어) 기본적으로 최소 5개 콘텐츠를 보여주고, 스크롤 할 때마다 추가하는 식으로
            => 아마 보이지 않는 게시글들은 자원을 효율적으로 사용하기 위해 활성화 되지 않다가 
            => 다시 이전꺼를 보기 위해 활성화 시켜주는 식으로 */}
            {
                TempPostData.map((element,idx) => (
                    <Post userNick={element.userNick} userTitle={element.userTitle} 
                    profilePath={imagePath + element.profilePath} imagePath={imagePath + element.imagePath} 
                    contentSaying={element.contentSaying}
                    taglst={[{'tagName':'#감성', 'color':'#DE7373'},{'tagName':'#위로','color':'#CCD00E'}]}/>
                ))

            }
            </MainContentsContainer>
        </div>
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
<<<<<<< HEAD
=======

    //border : 1px solid black;
>>>>>>> 5dda5c908a35d94689ed2c5ba26832d7a69f59ce
`