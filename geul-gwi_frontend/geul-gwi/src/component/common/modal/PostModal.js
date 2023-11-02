import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import Post from 'component/user/profile/Post';
import imageDataFetcher from 'service/imageDataFetcher';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';

const PostModal = (props) => {
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profile = await imageDataFetcher(axiosAddr, props.post.userProfile);
                setProfileImage(profile);
            } catch (error) {
                console.error('Error fetching profile image:', error);
            }
        };

        fetchData();
    }, [axiosAddr, props.post.userProfile]);

    return (
        <ModelFrame onClick={() => props.ModalClose()}>
            <ViewPage onClick={(event) => event.stopPropagation()}>
                <Post
                    profile={profileImage}
                    nickname={props.post.nickname}
                    comment={props.post.comment}
                    geulgwiContent={props.post.geulgwiContent}
                    regDate={props.post.regDate}
                    files={props.post.files}
                    tags={props.post.tags}
                    likeCount={props.post.likeCount}
                    liked={props.post.liked}
                    geulgwiSeq={props.post.geulgwiSeq}
                    userSeq={props.post.userSeq}
                />
            </ViewPage>
        </ModelFrame>
    )
};

const ModelFrame = styled.div`
    user-select: none;
    position : fixed;
    top : 0; 
    left : 0;
    z-index : 998;
    display : flex;
    width : 100%;
    height : 100%;
    justify-content : center; align-items : center;
    background-color : rgba(20,20,20,0.6);
`

const ViewPage = styled.div`
    position : relative;
    display : flex;
    width: 800px;
    height: 600px;
    z-index:  999;
    border-radius : 16px;
    justify-content : center; 
    align-items : center;

`

export default PostModal;