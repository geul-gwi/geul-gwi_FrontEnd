import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEdit, AiFillHeart, AiOutlineHeart, AiOutlineClose } from "react-icons/ai"; 
const { formatDateTime } = require('service/dateTimeUtils');

const PostContainer = (props) => {
    const navigate = useNavigate();
    const { axiosAddr } = useContext(AxiosAddrContext);
    const { userSeq, accessToken } = useSelector((state) => state.authReducer);

    const likeUrl = '/challenge/like/'; // 챌린지 글 좋아요 요청
    const unlikeUrl = '/challenge/unlike/'; // 챌린지 글 좋아요 취소 요청
    const postDeleteUrl = '/challenge/delete/'; // 챌린지 글 삭제 요청

    
    const onClickProfile = (userSeq) => {
        navigate('/main/Profile', { state: { profileUserSeq: userSeq } });
    };

    const updatePostsWithLike = (challengeSeq, isLiked) => {
        const updatedPosts = props.posts.map(post => {
            if (post.challengeUserSeq === challengeSeq) {
                return { ...post, isLiked: !isLiked, likeCount: post.likeCount + (isLiked ? -1 : 1) };
            }
            return post;
        });
        props.setPosts(updatedPosts);
    };

    const onClickLikeButton = async (challengeSeq, isLiked) => {
        try {
            const url = isLiked ? unlikeUrl : likeUrl;
            await axios[isLiked ? 'delete' : 'post'](`${axiosAddr}${url}${challengeSeq}/${userSeq}`, {}, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            updatePostsWithLike(challengeSeq, isLiked);
        } catch (error) {
            console.error("좋아요:", error);
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
        const confirmed = window.confirm('해당 글을 삭제하시겠습니까?');
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
                <Item key={post.challengeUserSeq}>
                    {userSeq === post.userSeq && (
                        <HeaderButtonContainer>
                            <EditIcon><AiOutlineEdit size={20} color='gray' onClick={() => onClickPostEdit(post)} /></EditIcon>
                            <EditIcon><AiOutlineClose size={20} color='gray' onClick={() => onDeletePost(post.challengeUserSeq)} /></EditIcon>
                        </HeaderButtonContainer>
                    )}
                    <ProfileContainer>
                        <ProfilePicture 
                            src={post.profile ? post.profile : '/img/defaultProfile.png'} 
                            onClick={() => onClickProfile(post.userSeq)}
                        />
                        <Nickname onClick={() => onClickProfile(post.userSeq)}>
                            {post.nickname}
                        </Nickname>

                    </ProfileContainer>
                    <Content>{post.challengeContent}</Content>
                    <ItemBottom>
                        <Date>{formatDateTime(post.regDate)}</Date>
                        <LikeCount>{post.likeCount}</LikeCount>
                        <LikeButtonContainer>
                        {
                                post.isLiked ? (
                                    <AiFillHeart
                                        size={25}
                                        color={"red"}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            onClickLikeButton(post.challengeUserSeq, post.isLiked);
                                        }}
                                    />
                                ) : (
                                    <AiOutlineHeart
                                        size={25}
                                        color={"#444444"}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            onClickLikeButton(post.challengeUserSeq, post.isLiked);
                                        }}
                                    />
                                )
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


const ProfileContainer = styled.div`
    display : flex;
    width : 100%;
    height : 40px;
    align-items: center;
    margin-bottom:10px;
        
`

const ProfilePicture = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 1px solid #ccc;
    cursor: pointer;
    object-fit: cover;
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }
`;


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

    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }
`
// PostItem의 공통적인 부분 Frame으로 묶은 것
const PartFrame = styled.div`
    width : calc(100% - 20px); // padding 20px 값을 뺌
    padding : 5px 10px 5px 10px;
`

// 닉네임
const Date = styled(PartFrame)`
    display : flex;
    align-items : center;
    color : rgba(10,10,10, 1);
    font-size : 12px;
    cursor: pointer;
`

// 닉네임
const Nickname = styled(PartFrame)`
    display : flex;
    height : 20px;
    align-items : center;
    color : rgba(10,10,10, 1);
    font-size : 17px;
    cursor: pointer;
`
// PostItem의 본문부분
const Content = styled(PartFrame)`
    height : 80px;
    color : rgba(120,120,120,1);
    font-size : 14px;
    line-height : 20px;
`
// PostItem의 하단 부분 ( 좋아요 , 좋아요 갯수 )
const ItemBottom = styled.div`
    display : flex;
    width : 100%;
    height : 30px;
    justify-content: flex-end;
`
// PostItem의 하단 부분의 왼쪽 ( 좋아요 수 표시 )
const LikeCount = styled.div`
    display : flex;
    padding : 0px 0px 0px 5px;
    align-items : center;
    font-size : 14px;
    margin-top: 3px;
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