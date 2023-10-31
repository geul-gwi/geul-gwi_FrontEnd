import React, { useState } from 'react';
import styled from 'styled-components';
// component
import PostContainer from 'component/main/WriteChallenge/PostManager/PostContainer';
import SortButton from 'component/main/WriteChallenge/PostManager/SortButton';

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
                {sortTabShow &&
                    <TabFrame onMouseLeave={handleTabShowToggle}>
                        <Item onClick={() => SortFunc("인기순")}>인기순</Item>
                        <Item>최신순</Item>
                        <Item>오래된순</Item>
                    </TabFrame>
                }
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
const TabFrame = styled.div`
    position : absolute;
    top : calc(100% + 5px);
    right : 0px;
    display : flex;
    position : absolute;
    z-index : 5;
    width : 90px;
    min-height: 20px; height : auto;
    background-color: white;
    border-radius : 16px;
    box-shadow : 1px 1px 10px 2px rgba(40,40,40,0.4);
    padding : 10px 5px 10px 5px;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    gap : 15px;
`
const Item = styled.div`
    display : flex;
    width : 100%;
    height : 20px;
    padding : 5px 0px 5px 0px;
    justify-content : center; align-items : center;
    border-radius : 12px;
    font-size : 14px;
    cursor : pointer;
    &:hover{
        background-color : rgba(40,40,40,0.1);
    }
`

export default SortManager;