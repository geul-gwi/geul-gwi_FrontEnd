import React, { useState } from 'react';
import styled from 'styled-components';


// css import
import "css/main/Post.css"
// React-icons
import {AiFillHeart,AiOutlineHeart} from "react-icons/ai"
// import { faEnvelopeasRegularEnvelope } from '@fortawesome/free-regular-svg-icons';



const Post = (props) => {
    const [HeartFill,setHeartFill] = useState(false);
    

    const HeartChange = (e) =>{
        setHeartFill(!HeartFill);
    }

    return (
        <PostFrame>
            <PostProfileContainer>
                <ProfileImage><img src={props.profilePath}></img></ProfileImage>
                <ProfileName>
                    <Name>{props.userNick}</Name>
                    <SubName>{props.userTitle}</SubName>
                </ProfileName>
            </PostProfileContainer>
            <PostImageContainer><img src={props.imagePath}></img></PostImageContainer>
            <PostSayingContainer>{props.contentSaying}</PostSayingContainer>
            <TagButtonContainer>
                <TagContainer>
                    {
                        props.taglst.map((element,idx)=>(
                            <TagItem style={{color : element.color}} >{element.tagName}</TagItem>
                        ))
                    }
                </TagContainer>
                <ButtonContainer>
                    {
                        HeartFill ? <AiFillHeart class="likebtn" size={30} color={"red"} onClick={HeartChange}/> :
                        <AiOutlineHeart class="likebtn" size={30} onClick={HeartChange}/>
                        
                    }
                </ButtonContainer>
            </TagButtonContainer>
        </PostFrame>
    );
};

const PostFrame = styled.div`
    display : flex;
    width : calc(85% - 40px);
    min-height : 200px;
    height : auto;
    padding : 15px; padding-left : 20px; padding-right : 20px;
    border-radius : 16px;
    box-shadow: 3px 3px 8px 0px #b3b3b3;
    background-color : white;

    flex-direction: column;
    margin-top : 50px;
`
// level 1 Container
const PostProfileContainer = styled.div`
    display : flex;
    width : 100%;
    height : 50px;
    align-items: center;
    justify-content : space-between;
    margin-bottom:20px;
`
const PostImageContainer = styled.div`
    display : flex;
    width : 100%;
    min-height : 20px;
    height : auto;
    justify-content : center;
    align-items : center;
    margin-bottom:20px;
`
const  PostSayingContainer = styled.div`
    width : 100%;
    min-height : 20px;
    height : auto;
    padding-bottom : 20px;
    margin-bottom:10px;
`
const TagButtonContainer = styled.div`
    display : flex;
    width : 100%;
    height : 30px;
`

// level 2 Container
    // Profile Container
    const ProfileImage = styled.div`
        width : 50px;
        height : 100%;
        border-radius : 70%;
        overflow:hidden;
    `
    const ProfileName = styled.div`
        display : flex;
        width : calc(100% - 60px);
        height : 100%;
        
        flex-direction: column;
        justify-content : space-evenly;
    `
    const TagContainer = styled.div`
        display : flex;
        width : calc(100% - 30px);
        height : 100%;
    `
    const ButtonContainer = styled.div`
        display : flex;
        justify-content : center;
        align-items : center;
        width : 30px;
        height : 100%;
        border-radius : 16px;

        cursor : pointer;
        &:hover{
            background-color : #BCBABA;
        }
    `

    //level 3
        // Profile Items
        const Name = styled.div`
            width : 100%;
            height : 35%;

            font-family : "Nanum Square";
            font-style : "bold";
            font-size : 16px;
            color : #5F5F5F;
        `
        const SubName = styled.div`
            width : 100%;
            height : 35%;

            font-family : "Nanum Square";
            font-style : "normal";
            font-size : 12px;
            color : #9C9C9C;
        `

        // Tag Item
        const TagItem = styled.div`
            display : flex;
            min-width : 10px;
            width : auto;
            height : 100%;
            padding : 0px 10px 0px 10px;
            justify-content: center;
            align-items: center;
        `


export default Post;