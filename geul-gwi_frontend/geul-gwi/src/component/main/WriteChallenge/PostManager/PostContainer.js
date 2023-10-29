import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from 'axios';
import { useSelector } from 'react-redux'; // Redux 사용 Library
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useNavigate } from 'react-router-dom';

const PostContainer = (props) => {
    const navigate = useNavigate();

    const { axiosAddr } = useContext(AxiosAddrContext);
    const { userSeq, accessToken } = useSelector((state) => state.authReducer);
    const likeUrl = '/challenge/like/';
    const unlikeUrl = '/challenge/unlike/';

    const onClickLikeButton = async (challengeSeq, isLiked) => {
        if (isLiked) {
            try {
                const response = await axios.delete(`${axiosAddr}${unlikeUrl}${challengeSeq}/${userSeq}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response) {
                    console.log("좋아요 취소: ", response);
                }
            } catch (error) {
                console.error("좋아요 취소: ", error);
            }
        } else {
            try {
                const response = await axios.post(`${axiosAddr}${likeUrl}${challengeSeq}/${userSeq}`, {}, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response) {
                    console.log("좋아요: ", response);
                }
            } catch (error) {
                console.error("좋아요: ", error);
            }
        }
    }

    const onClickPostEdit = () => {
        const data = {

        }

        navigate('/main/PostEdit', { state: data });
    };

    return (
        <PostManager>
            {props.posts && props.posts.map((post) => (
                <PostItem>
                    <ItemProfile>{post.nickname}</ItemProfile>
                    <ItemMainText>{post.challengeContent}</ItemMainText>
                    <ItemBottom>
                        <LikeViewCount>{post.likeCount}</LikeViewCount>
                        <LikeButtonContainer>
                            {
                                post.isLiked ? <AiFillHeart class="likebtn" size={20} color={"red"} onClick={(event) => {
                                    event.stopPropagation();
                                    onClickLikeButton(post.seq, post.isLiked);
                                }} />
                                    :
                                    <AiOutlineHeart size={20} color={"#444444"} onClick={(event) => {
                                        event.stopPropagation();
                                        onClickLikeButton(post.seq, post.isLiked);
                                    }} />
                            }
                        </LikeButtonContainer>
                    </ItemBottom>
                </PostItem>
            ))
            }
        </PostManager>
    );
};

const PostManager = styled.div`
    display : flex;
    width : 100%;
    min-height : 40px; height : auto;
    padding : 20px 0px 20px 0px;

    flex-direction : row;
    justify-content : space-between;
    gap : 20px;
    flex-wrap : wrap;
`

const PostItem = styled.div`
    display : flex;
    width : calc(49% - 30px);   
    height : 140px;
    flex-direction : column;
    padding : 5px 10px 5px 10px;
    border-radius : 12px;
    box-shadow : 1px 1px 10px 0px rgba(70,70,70,0.2);
`
// PostItem의 공통적인 부분 Frame으로 묶은 것
const PartFrame = styled.div`
    width : calc(100% - 20px); // padding 20px 값을 뺌
    padding : 5px 10px 5px 10px;
`

// PostItem의 제목부분
const ItemProfile = styled(PartFrame)`
    display : flex;height : 20px;
    align-items : center;
    color : rgba(10,10,10, 1);
    font-size : 16px;
`
// PostItem의 본문부분
const ItemMainText = styled(PartFrame)`
    height : 70px;
    color : rgba(120,120,120,1);
    font-size : 14px;
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


export default PostContainer;