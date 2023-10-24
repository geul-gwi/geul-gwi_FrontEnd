import React, { Fragment, useEffect, useContext, useState } from 'react';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import styled from 'styled-components';
import axios from 'axios';
import 'css/main/Writing/AddTagListComponent.css';
import { useSelector } from 'react-redux'; 
import { Tag, TagButton } from 'component/common/button/Tag'

const AddTagButtonForm = (props) => {
    const axiosAddress = useContext(AxiosAddrContext).axiosAddr;  // Axios Address
    const defaultTagUrl = "/tag/list/DEFAULT";
    const addTagUrl = "/tag/register/";

    const { userSeq, userToken } = useSelector((state) => state.authReducer.userSeq);

    const [selectedMenu, setSelectedMenu] = useState(true); // 태그 선택 폼 On/Off
    const [defaultTags, setDefaultTags] = useState([]); // DEFAULT 전채 태그
    //const [selectedTags, setSelectedTags] = useState(props.tags); // 선택한 태그 목록

    // 사용자가 추가 중인 태그 정보 변수들
    const [tagValue, setTagValue] = useState('');
    const [tagFontColor, setTagFontColor] = useState('white');
    const [tagBackColor, setTagBackColor] = useState('#FBD929');

    // Icon Public 경로
    const PublicWritingIconPath = process.env.PUBLIC_URL + "/icon/Writing/"
    const [showTagList, setShowTagList] = useState(false); // 태그 추가 리스트를 보여줄지 True False

    // 태그 추가 리스트 , 열고 닫기
    const onShowList = () => {
        setShowTagList(!showTagList);
    }

    // DEFAULT 전채 태그 불러오기
    useEffect(() => {
        axios.post(`${axiosAddress}${defaultTagUrl}`)
            .then(response => {
                setDefaultTags(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // 직접 입력한 태그 Handler
    const InputTagHandler = (e) => {
        setTagValue(e.target.value);
    }

    // 유저가 직접 입력한 태그 Enter 이벤트 처리
    const OnEnterPress = (e) => {
        if (e.key !== 'Enter') {
            return;
        }
        if (tagValue.trim() === '') {
            alert('태그를 입력하세요.');
            return;
        }

        // 사용자 지정 태그는 서버에 바로 요청 넣어서 시퀀스 값 받는다.

        const userAddTag = {
            fontColor: tagFontColor,
            backColor: tagBackColor,
            value: tagValue,
        };

        // 사용자가 추가한 태그 요청
        axios.post(`${axiosAddress}${addTagUrl}${userSeq}`,
            userAddTag,
            {
                headers: {
                    Authorization: "Bearer " + userToken
                },
            }).then((response) => {
                console.log("사용자 지정 태그 추가 성공", response);
                onAddTag(response.data);

            }).catch((error) => {
                console.error("사용자 지정 태그 추가 실패", error);
            })
    }

    // 선택한 태그 추가 Handler
    const onAddTag = (tag) => {
        // 선택 개수 3개 제한
        if (props.tags.length >= 3) {
            alert('태그는 최대 3개까지 선택 가능합니다.');
            return;
        }
        // 이미 추가한 태그인지 유효성 검사
        if (props.tags.some(selectedTag => selectedTag.value === tag.value)) {
            alert('이미 선택한 태그입니다.');
            return;
        }

        props.setTags([...props.tags, tag]);
    }

    // 선택된 태그 삭제 Handler
    const SeletedTagDeleteHandler = (idx) => {
        props.setTags(props.tags.filter((_, index) => index !== idx));
    }

    // 태그 font 색상 선택 처리 
    const onTagFontColorChange = (event) => {
        setTagFontColor(event.target.value);
    };

    // 태그 back 색상 선택 처리 
    const onTagBackColorChange = (event) => {
        setTagBackColor(event.target.value);
    };

    return (
        <Fragment>
            <AddTagFrame>
                태그 지정
                <ShowButton onClick={onShowList}>
                    <ButtonTextContainer>태그 추가</ButtonTextContainer>
                    <ButtonIconContainer>
                        <Iconimg src={PublicWritingIconPath + "plus.svg"} />
                    </ButtonIconContainer>
                </ShowButton>
                {/* 태그 추가 리스트 보기 */}
                {showTagList &&
                    <ComponentFrame>
                        <TagMenuContainer>
                            <TagMenuItemContainer><TagMenuItem onClick={() => { setSelectedMenu(true) }}>지정된 태그</TagMenuItem></TagMenuItemContainer>
                            <TagMenuItemContainer><TagMenuItem onClick={() => { setSelectedMenu(false) }}>사용자 지정</TagMenuItem></TagMenuItemContainer>
                        </TagMenuContainer>
                        {/* 메뉴에 따라 보여주는 콘텐츠가 다름 => 지정된태그 or 사용자지정 */}
                        {selectedMenu ?
                            <ExistTagList>
                                <SmallTitle_Container>사용할 태그를 선택해주세요</SmallTitle_Container>
                                <ExistTagListItemContainer>
                                    {defaultTags && defaultTags.map((tag) => (
                                        <Tag fontColor={tag.fontColor} backColor={tag.backColor}
                                            onClick={() => onAddTag(tag)}
                                        >
                                            {'# ' + tag.value}
                                        </Tag>
                                    ))
                                    }
                                </ExistTagListItemContainer>
                            </ExistTagList>
                            :
                            <UserChooseTagList>
                                <SmallTitle_Container>원하는 태그를 설정해주세요</SmallTitle_Container>
                                <UserChooseInputContainer>
                                    <UserChooseStyledInput
                                        type='text'
                                        placeholder="최대 10자 가능합니다."
                                        onChange={(e) => InputTagHandler(e)}
                                        onKeyPress={(e) => OnEnterPress(e)}
                                    />
                                </UserChooseInputContainer>
                                <ColorPickerContainer>
                                    <Title>태그 글자 색상</Title>
                                    <ColorPicker
                                        type='color'
                                        value={tagFontColor}
                                        onChange={onTagFontColorChange}
                                    />
                                    <Title>태그 배경 색상</Title>
                                    <ColorPicker
                                        type='color'
                                        value={tagBackColor}
                                        onChange={onTagBackColorChange}
                                    />
                                </ColorPickerContainer>
                                <SelectedTagsPreview>
                                    <SelectedTagsContainer>
                                        <Tag fontColor={tagFontColor} backColor={tagBackColor}>
                                            {'# ' + tagValue}
                                        </Tag>
                                    </SelectedTagsContainer>
                                </SelectedTagsPreview>
                            </UserChooseTagList>
                        }
                        <SelectedTagContainer>
                            <SmallTitle_Container>선택된 태그</SmallTitle_Container>
                            <SelectedTagItemContainer>
                                {props.tags && props.tags.map((tag, idx) => (
                                    <TagButton
                                        key={idx}
                                        fontColor={tag.fontColor}
                                        backColor={tag.backColor}
                                        onClick={() => SeletedTagDeleteHandler(idx)}
                                    >
                                        {'#' + tag.value}
                                    </TagButton>
                                ))
                                }
                            </SelectedTagItemContainer>
                        </SelectedTagContainer>
                    </ComponentFrame>
                }
            </AddTagFrame>
            {/* 선택한 태그 보여주는 컨테이너 */}
            {!showTagList &&
                <FnTagsShowContainer>
                    {props.tags && props.tags.map((tag) => (
                        <Tag fontColor={tag.fontColor} backColor={tag.backColor}>
                            {`#${tag.value}`}
                        </Tag>
                    ))}
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
    background-color: white;
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

const ContainerFrame = styled.div`
    user-select: none;
    width : 100%;
    background-color: white;
`
// 소제목 Container
const SmallTitle_Container = styled.div`
    display : flex;
    width : 100%;
    height : 40px;
    font-size : 14px;
    text-indent : 10px;
    flex-direction : row; 
    justify-content: flex-start; 
    align-items: center;
`
// ---------------------------------------------------

// 태그를 추가하는 리스트 컴포넌트의 프레임
const ComponentFrame = styled.div`
    display : flex;
    width : 100%;
    height : 100%;
    //padding : 0px 0px 10px 0px;
    flex-direction: column;
    align-items: center;
`
// ---------------------------------------------------

// TagMenu level 1
// 사전에 서버에 지정된 태그를 선택할 것인지 , 사용자가 직접 작성한 태그를 사용할 것 인지 메뉴를 선택하는 메뉴
const TagMenuContainer = styled.div`
    display : flex;
    width : 100%;
    height : 45px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
// TagMenu Level 2 
// 태그메뉴 안에 들어갈 메뉴 Container
const TagMenuItemContainer = styled.div`
    display : flex;
    width : 50%;
    height : 100%;
    justify-content : center; 
    align-items: center;
`
// TagMenu Level 3
// 태그메뉴 아이템
const TagMenuItem = styled.div`
    display : flex;
    width : 100%;
    height : 100%;
    border-radius : 8px 8px 0px 0px;
    justify-content: center; 
    align-items: center;
    font-size : 15px;
    transition : 0.1s;
    cursor : pointer;
    &:hover{
        box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.25);
    }
`

// ---------------------------------------------------

// TagList의 프레임
const TagListContainer = styled(ContainerFrame)`
    display : flex;
    min-height : 120px;
    height : auto;
    flex-direction : column;
    align-items : center;
    padding-top : 10px;
    //border-radius : 0px 0px 8px 8%;
    /* box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25); */
`

// ---------------------------------------------------

// ExistTagList 지정된 태그 Level 1
const ExistTagList = styled(TagListContainer)`
`

// ExistTagList 지정된 태그 Level 2
const ExistTagListItemContainer = styled.div`
    display : flex;
    width : 100%;
    min-height : 60px;
    height : auto;
    padding : 5px 0px 5px 0px;
    gap : 5px;
    flex-direction : row; 
    justify-content: space-around; 
    align-items: center; 
    flex-wrap: wrap;
`

// TagList 사용자 지정 태그 level 1
const UserChooseTagList = styled(TagListContainer)`

`
// Input 태그를 담는 Container
const UserChooseInputContainer = styled.div`
    display : flex;
    width : 100%;
    height : 45px;
    justify-content: center; 
    align-items: center;
    margin-bottom: 10px;
`
// 태그를 직접추가하는 styled input
const UserChooseStyledInput = styled.input`
    width : 100%;
    height : 40px;
    text-indent: 10px;
    border-radius : 12px;
    border : 2px solid #CCC;
    box-shadow : none;
    color : #545454; 
    font-size : 14px;
`

// ---------------------------------------------------

// 선택된 태그 확인 Container Level 1
const SelectedTagContainer = styled(ContainerFrame)`
    display : flex;
    min-height : 40px;
    height : auto;
    
    flex-direction : column;
`
// 선택된 아이템 보여주는 Container
const SelectedTagItemContainer = styled.div`
    display : flex;
    width : 100%;
    min-height : 40px;
    height : auto;
    justify-content : flex-start; 
    align-items : center;
    gap : 10px;
`

const CompleteButtonContainer = styled(ContainerFrame)`
    display : flex;
    height : 30px;
    flex-direction: row; 
    justify-content: flex-end;
    align-items : center;
`

const CompleteButton = styled.div`
    display : flex;
    min-width : 80px; 
    max-width : 100px; 
    width : auto;
    height : 30px;
    border-radius : 16px;
    background-color: #21DD3F;
    color : white; 
    font-size : 14px;
    justify-content: center; 
    align-items: center;
    cursor : pointer;

    &:hover{
        background-color : #2DF24D;
    }
`

const ColorPickerContainer = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
  width: 100%;
  height: auto;
`;

const ColorPicker = styled.input`
  width: 30px;
  height: 30px;
  margin-left: 10px;
  border: none;
  cursor: pointer;
  margin-right: 10px;
`;

const Title = styled.span`
    font-size: 12px;
`;

// 미리보기
const SelectedTagsPreview = styled(ContainerFrame)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`;

const SelectedTagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
`;

export default AddTagButtonForm;