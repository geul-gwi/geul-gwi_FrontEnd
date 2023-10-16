import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import React from "react";
import styled from "styled-components";

const TagButton = (props) => {
    return (
        <ButtonFrame 
        style={{backgroundColor : props.selected ? `rgba(255,255,255,1)` : props.backColor , color : props.selected ? `black` : props.fontColor , boxShadow : props.selected ? `1px 1px 10px 2px grey` : `none`}}
        onClick={() => {
            props.TagClick(props.value);
        }}
        >
            {props.value}
        </ButtonFrame>
    );
};

// Styled component 
const ButtonFrame = styled.div`
    display : flex;
    width : 28%;
    height : 40px;
    border-radius : 8px;
    justify-content : center;
    align-items : center;
    font-size : 14px;
    cursor : pointer;
    padding : 0px 5px 0px 5px;
    transition : 0.2s;
`

export default TagButton;