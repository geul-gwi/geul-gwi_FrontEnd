import React from 'react';
import styled from 'styled-components';

// import Component
import SelectChg from 'component/main/WriteChallenge/SelectChallenge/SelectChg';
import WrtChgInfo from 'component/main/WriteChallenge/WrtChgInfo/WrtChgInfo';
import SortManager from './PostManager/SortManager';
import ModalPage from 'component/common/modal/ModalPage';


const WrtchgComponent = (props) => {
    return (
        <Frame>
            <FlexManager>
                <SelectChg
                prevButtonClick={props.prevButtonClick}
                nextButtonClick={props.nextButtonClick}
                selectedChallenge={props.selectedChallenge}
                />

                <WrtChgInfo
                selectedChallenge={props.selectedChallenge}
                />

                <SortManager
                    postList = {props.postList}
                    likeBtnClick = {props.likeBtnClick}    // 좋아요 처리 함수
                    ModalOpen = {props.ModalOpen}     // 모달을 여는 함수
                    LikeCountConverter={props.LikeCountConverter}
                />

                {
                    props.ModalState?
                    <ModalPage 
                        ModalClosed = {props.ModalClosed} // 모달 닫는 함수
                        ModalData = {props.ModalData}     // 모달이 열릴 때, 전달할 Object State 함수
                        likeBtnClick = {props.likeBtnClick} // 좋아요 처리 함수
                        LikeCountConverter={props.LikeCountConverter}
                    />
                    : 
                    ""
                }
                
            </FlexManager>
        </Frame>
    );
};

// Frame
const Frame = styled.div`
    display : flex;
    width : 100%;
    height : auto;
    background-color: white;
    justify-content: center;
    user-select: none;
`
const FlexManager = styled.div`
    display : flex;
    width : 92%;
    min-height : calc(100% - 20px);
    height : auto;
    padding : 10px 0px 10px 0px;
    flex-direction: column;
    align-items : center;
    gap : 20px;
`


export default WrtchgComponent;