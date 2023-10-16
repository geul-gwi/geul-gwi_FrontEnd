import React from 'react';
import styled from 'styled-components';

// import React icons
import { FiChevronDown } from "react-icons/fi";

const SortButton = (props) => {
    return (
        <ButtonFrame onClick={() => props.handleTabShowToggle()}>
            정렬
            <FiChevronDown />
        </ButtonFrame>
    );
};

const ButtonFrame = styled.div`
    display : flex;
    min-width : 100px; width : auto; max-width : 100px;
    height : 35px;
    border-radius : 16px;
    justify-content : space-evenly; align-items : center;
    font-size : 14px;
    letter-spacing : 1px;
    border : 2px solid white;
    background-color : #E37E7D;
    color : white;
    cursor : pointer;
    transition : 0.2s;

    &:hover{
        border: 2px solid #E37E7D;
        background-color: white;
        color : rgba(40,40,40,1);
    }
`

export default SortButton;