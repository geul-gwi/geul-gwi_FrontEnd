import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


// import Component
import PostContainer from 'component/main/WriteChallenge/PostManager/PostContainer';
import SortTab from 'component/main/WriteChallenge/PostManager/SortTab';
// import Button
import SortButton from 'component/main/WriteChallenge/PostManager/SortButton';

// List < ChallengeSrchDTO > {
//     seq(Long),
//     challengeContent(String),
//     regDate(String),
//     likeCount(int),
//     isLiked(boolean)
// }

const SortManager = (props) => {
    const [sortedList, setSortedList] = useState(props.posts);
    const [sortTabShow, setSortTabShow] = useState(false);

    const handleTabShowToggle = () => {
        setSortTabShow(!sortTabShow);
        console.log(sortTabShow);
    }

    const SortFunc = (sortby) => {
        const sortedItems = [...props.postList];
        if (sortby === "인기순"){
            sortedItems.sort((a,b) => b.likeCount - a.likeCount);
        }
        setSortedList(sortedItems);
    }

    return (
        <Frame>
            <ManagerFrame>
                <SortButton handleTabShowToggle={handleTabShowToggle}/>
                <SortTab
                    sortTabShow={sortTabShow}
                    handleTabShowToggle={handleTabShowToggle}
                    SortFunc={SortFunc}
                />
            </ManagerFrame>
            <PostContainer
                posts={props.posts}
            />
        </Frame>
    );
};

// Frame
const Frame = styled.div`
    display : flex;
    width : calc(100% - 40px);
    min-height : 20px;
    height : auto;
    padding : 10px 0px 0px 20px;
    flex-direction : column;
    align-items : center;
`

const ManagerFrame = styled.div`
    position : relative;
    display : flex;
    width : calc(100%);
    min-height : 10px; height : auto;
    justify-content : flex-end;
`


export default SortManager;