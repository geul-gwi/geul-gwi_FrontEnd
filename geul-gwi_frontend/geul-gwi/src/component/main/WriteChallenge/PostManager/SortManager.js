import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


// import Component
import PostContainer from 'component/main/WriteChallenge/PostManager/PostContainer';
import SortTab from 'component/main/WriteChallenge/PostManager/SortTab';
// import Button
import SortButton from 'component/main/WriteChallenge/PostManager/SortButton';


const SortManager = (props) => {
    const [sortedList, setSortedList] = useState([...props.postList]);
    const [sortTabShow, setSortTabShow] = useState(false);
    useEffect(() => {
    }, [sortedList]);

    const handleTabShowToggle = () => {
        setSortTabShow(!sortTabShow);
        console.log(sortTabShow);
    }

    const SortFunc = (sortby) => {
        const sortedItems = [...props.postList];
        if (sortby === "인기순"){
            sortedItems.sort((a,b) => b.likeCount - a.likeCount);
        }
        else if(sortby === "비인기순"){
            sortedItems.sort((a,b) => a.likeCount - b.likeCount);
        }
        setSortedList(sortedItems);
    }


    return (
        <Frame>
            {/* 정렬 버튼 Container */}
            <ManagerFrame>
                {/* Sort Button 누르면 absolute로 아래에 정렬창 띄우기 */}
                <SortButton handleTabShowToggle={handleTabShowToggle}/>
                <SortTab
                sortTabShow={sortTabShow}
                handleTabShowToggle={handleTabShowToggle}
                SortFunc={SortFunc}
                />
            </ManagerFrame>
            {/* 글 들을 나열할 Container */}
            <PostContainer
                postList = {sortedList}
                likeBtnClick = {props.likeBtnClick}

                ModalOpen = {props.ModalOpen}     // 모달을 여는 함수
                LikeCountConverter={props.LikeCountConverter} // LikeView 숫자를 Refactoring해줌
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