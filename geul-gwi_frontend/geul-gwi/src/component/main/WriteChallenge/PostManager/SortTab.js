import React, { Fragment } from 'react';
import styled from 'styled-components';

// 정렬창을 띄우는 Component
const SortTab = (props) => {
    return (
        <Fragment>
            {
                props.sortTabShow?
                <TabFrame onMouseLeave={() => props.handleTabShowToggle()}>
                    <Item onClick={() => props.SortFunc("인기순")}>인기순</Item>
                    <Item onClick={() => props.SortFunc("비인기순")}>비인기순</Item>
                    <Item>최신순</Item>
                    <Item>오래된순</Item>
                </TabFrame>
                :
                ""
            }
        </Fragment>
    );
};

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

export default SortTab;