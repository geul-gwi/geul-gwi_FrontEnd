import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Redux 사용 Library
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEdit, AiFillHeart, AiOutlineHeart, AiOutlineClose } from "react-icons/ai"; 

const PostContainer = (props) => {
    const navigate = useNavigate();
    const { axiosAddr } = useContext(AxiosAddrContext);
    const { userSeq, accessToken } = useSelector((state) => state.authReducer);
    const likeUrl = '/challenge/like/'; // 챌린지 글 좋아요 요청
    const unlikeUrl = '/challenge/unlike/'; // 챌린지 글 좋아요 취소 요청
    const postDeleteUrl = '/challenge/delete/'; // 챌린지 글 삭제 요청

    const onClickLikeButton = async (challengeSeq, isLiked) => {
        try {
            if (isLiked) {
                await axios.delete(`${axiosAddr}${unlikeUrl}${challengeSeq}/${userSeq}`, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                // 취소된 경우, -1하여 새로운 값 설정
                const updatedPosts = props.posts.map(post => {
                    if (post.challengeUserSeq === challengeSeq) {
                        return { ...post, isLiked: !isLiked, likeCount: post.likeCount - 1 };
                    }
                    return post;
                });
                props.setPosts(updatedPosts);
            } else {
                await axios.post(`${axiosAddr}${likeUrl}${challengeSeq}/${userSeq}`, {}, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                 // 좋아요 누른 경우, +1하여 새로운 값 설정
                const updatedPosts = props.posts.map(post => {
                    if (post.challengeUserSeq === challengeSeq) {
                        return { ...post, isLiked: !isLiked, likeCount: post.likeCount + 1 };
                    }
                    return post;
                });
                props.setPosts(updatedPosts);
            }
        } catch (error) {
            console.error("좋아요 처리 중 에러:", error);
        }
    }

    const onClickPostEdit = (post) => {
        const data = {
            challengeUserSeq: post.challengeUserSeq,
            challengeContent: post.challengeContent
        }
        navigate('/main/ChallengePostEdit', { state: data });
    };

    const onDeletePost = async (challengeUserSeq) => {
        const confirmed = window.confirm('해당 글 귀를 삭제하시겠습니까?');
        // 사용자가 확인을 클릭한 경우에만 삭제 동작을 실행
        if (confirmed) {
            try {
                const response = await axios.delete(`${axiosAddr}${postDeleteUrl}${challengeUserSeq}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response) {
                    alert("삭제가 완료되었습니다.");
                    window.location.reload();
                    console.log("챌린지 글 삭제: ", response);
                }
            } catch (error) {
                console.error("챌린지 글 삭제: ", error);
            }
        }
    };

    return (
        <Frame>
            {props.posts && props.posts.map((post) => (
                <Item>
                    {userSeq === post.userSeq && (
                        <HeaderButtonContainer>
                            <EditIcon><AiOutlineEdit size={20} color='gray' onClick={() => onClickPostEdit(post)} /></EditIcon>
                            <EditIcon><AiOutlineClose size={20} color='gray' onClick={() => onDeletePost(post.challengeUserSeq)} /></EditIcon>
                        </HeaderButtonContainer>
                    )}
                    <Nickname>{post.nickname}</Nickname>
                    <Content>{post.challengeContent}</Content>
                    <ItemBottom>
                        <LikeViewCount>{post.likeCount}</LikeViewCount>
                        <LikeButtonContainer>
                            {
                                post.isLiked ? <AiFillHeart class="likebtn" size={25} color={"red"} onClick={(event) => {
                                    event.stopPropagation();
                                    onClickLikeButton(post.challengeUserSeq, post.isLiked);
                                }} />
                                    :
                                    <AiOutlineHeart size={25} color={"#444444"} onClick={(event) => {
                                        event.stopPropagation();
                                        onClickLikeButton(post.challengeUserSeq, post.isLiked);
                                    }} />
                            }
                        </LikeButtonContainer>
                    </ItemBottom>
                </Item>
            ))}
        </Frame>
    );
};

// 메인 프레임
const Frame = styled.div`
    display : flex;
    width : 100%;
    min-height : 40px; 
    height : auto;
    padding : 20px;
    align-items: center;
    gap : 10px;
    flex-wrap : wrap;
`

// 챌린지 게시물 하나 프레임
const Item = styled.div`
    display : flex;
    width : calc(49% - 30px);   
    height : 140px;
    flex-direction : column;
    padding : 5px 10px 5px 10px;
    border-radius : 12px;
    box-shadow : 1px 1px 10px 0px rgba(70,70,70,0.2);
    position: relative;
`
// PostItem의 공통적인 부분 Frame으로 묶은 것
const PartFrame = styled.div`
    width : calc(100% - 20px); // padding 20px 값을 뺌
    padding : 5px 10px 5px 10px;
`

// 닉네임
const Nickname = styled(PartFrame)`
    display : flex;
    height : 20px;
    align-items : center;
    color : rgba(10,10,10, 1);
    font-size : 17px;
`
// PostItem의 본문부분
const Content = styled(PartFrame)`
    height : 70px;
    color : rgba(120,120,120,1);
    font-size : 15px;
    line-height : 20px;
`
// PostItem의 하단 부분 ( 좋아요 , 좋아요 갯수 )
const ItemBottom = styled.div`
    display : flex;
    width : 100%;
    height : 30px;
    justify-content : space-between;
    align-items : center;
`
// PostItem의 하단 부분의 왼쪽 ( 좋아요 수 표시 )
const LikeViewCount = styled.div`
    display : flex;
    min-width : 10px; width : auto;
    padding : 0px 0px 0px 5px;
    align-items : center;
    color : rgba(10,10,10,0.7); 
    font-size : 15px;
`
const LikeButtonContainer = styled.div`
    display : flex;
    width : 30px;
    height : 100%;
    justify-content : center; align-items : center;
    border-radius : 50%;
    cursor : pointer;
    z-index : 1px;
    &:hover{
        background-color : rgba(50,50,50,0.1);    
    }
`
const HeaderButtonContainer = styled.div`
  display: flex;
  gap: 5px;
  
   flex-direction: row;
    position: absolute; /* 아이콘의 위치를 조절하기 위해 상대 위치 설정 */
    top: 10px; /* 원하는 위치로 조절 (상단 여백) */
    right: 10px; /* 원하는 위치로 조절 (우측 여백) */
`;

const EditIcon = styled.div`
    cursor: pointer;
`;

export default PostContainer;