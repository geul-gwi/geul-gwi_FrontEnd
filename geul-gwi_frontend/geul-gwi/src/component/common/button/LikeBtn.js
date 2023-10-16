import React from 'react';
import styled from 'styled-components';


const Like = styled.img`
    width : 20px;
    height : 20px;

`

// Path import
const EmptyLikePath = process.env.PUBLIC_URL+'/icon/LikeBtn/likeRegular.png';
const FillLikePath = process.env.PUBLIC_URL+'/icon/LikeBtn/likeSolid.png';

const LikeBtn = ({like, onClick}) => {
    return (
        <div>
            <Like src={like?EmptyLikePath:FillLikePath} />
        </div>
    );
};

export default LikeBtn;