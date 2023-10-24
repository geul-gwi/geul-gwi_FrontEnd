import React, { Fragment, memo, useState } from 'react';
import styled from 'styled-components';

// 컴포넌트 임포트
import AddTagListComponent from 'component/main/Writing/AddTagListComponent';
import { Tag } from 'component/common/button/Tag';

const AddTagButton = (props) => {
    // Icon Public 경로
    const PublicWritingIconPath = process.env.PUBLIC_URL + "/icon/Writing/"
    const [showTagList, setShowTagList] = useState(false); // 태그 추가 리스트를 보여줄지 True False

    // Function
    // 태그 추가 리스트 , 열고 닫기
    const onShowList = () => {
        setShowTagList(!showTagList);
    }

    return (
        <Fragment>
            <AddTagFrame>
                {/* 태그를 추가하라는 설명 */}
                태그 지정
                {/* 태그 추가 버튼 */}
                <ShowButton onClick={onShowList}>
                    <ButtonTextContainer>태그 추가</ButtonTextContainer>
                    <ButtonIconContainer>
                        <Iconimg src={PublicWritingIconPath + "plus.svg"} />
                    </ButtonIconContainer>
                </ShowButton>
                {/* 태그 추가 리스트 보기 */}
                {showTagList &&
                    <AddTagListContainer>
                        <AddTagListComponent
                            FnTagSetHandler={props.FnTagSetHandler}
                            onShowList={onShowList}
                            fnTags={props.fnTags}
                            post={props.post}
                        />
                    </AddTagListContainer>
                }
            </AddTagFrame>
            {/* 선택한 태그 */}
            {!showTagList &&
                <FnTagsShowContainer>
                    {props.fnTags && props.fnTags.map((tag) => (
                        <Tag
                            fontColor={tag.fontColor}
                            backColor={tag.backColor}
                        >
                            {`#${tag.value}`}
                        </Tag>
                    ))
                    }
                </FnTagsShowContainer>
            }
        </Fragment>
    );
};
// Frame
const AddTagFrame = styled.div`
    position : relative;
    display : flex;
    width : 100%;
    height : 40px;
    justify-content : flex-start; 
    align-items: center;
    font-size : 20px;
    color : black;//#6F6A6A;
`

// 태그 추가 버튼 Frame - Leevl 1
const ShowButton = styled.div`
    position : absolute;
    display : flex;
    top : 0px; right : 0px;
    width : 140px;
    height : 100%;
    padding : 0px 10px 0px 10px;
    border-radius: 16px;
    background: #FFF;
    box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.25);
    align-items: center; 
    justify-content: space-between;
    cursor : pointer;
    transition : 0.2s;
    &:hover{    
        background-color : mistyrose;
    }
`
// 태그 추가하는 영억 - Level 1
const AddTagListContainer = styled.div`
    position : absolute; 
    display : flex;
    width : 100%;
    min-height : 300px; 
    height : auto;
    top : 50px; 
    right : 0px;
    padding : 0px 0px 10px 0px;
    border-radius : 12px;
    box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.25);
    background-color : white;
    justify-content: center;
`

// 태그 추가하기 버튼 - 텍스트 Container - Level 2
const ButtonTextContainer = styled.div`
    display : flex;
    width : 60%;
    height : 100%;
    justify-content: center; align-items: center;
    font-size : 12px; color : black;
`
// 태그 추가하기 버튼 - Icon Container - Level 2
const ButtonIconContainer = styled.div`
    display : flex;
    width : 15px;
    height : 15px;
    justify-content: center;
    align-items: center;
`
// 태그 추가하기 버튼의 Icon 이미지
const Iconimg = styled.img`
    width : 100%;
    height : 100%;
    object-fit: contain;
`

// 선택된 태그를 보여주는 Container - FnTags
const FnTagsShowContainer = styled.div`
    display : flex;
    width : 100%;
    height : 50px;
    justify-content: flex-end;
    align-items : center;
    gap : 5px;
`

export default AddTagButton;