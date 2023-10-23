import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// css Import
import 'css/main/Writing/AddTagListComponent.css';
// Import Library
import { useSelector } from 'react-redux'; // Redux 사용 Library
// Axios Address Context
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { Tag, TagButton } from 'component/common/button/Tag'

const AddTagListComponent = (props) => {
    const axiosAddress = useContext(AxiosAddrContext).axiosAddr;  // Axios Address
    const defaultTagUrl = "/tag/list/DEFAULT";
    const addTagUrl = "/tag/register/";
    // 로그인 정보
    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);

    const [selectedMenu, setSelectedMenu] = useState(true); // 태그 선택 폼 On/Off
    const [defaultTags, setDefaultTags] = useState([]); // DEFAULT 전채 태그
    const [selectedTags, setSelectedTags] = useState(props.fnTags ? props.fnTags : []); // 선택한 태그 목록

    // 사용자가 추가 중인 태그 정보 변수들
    const [tagValue, setTagValue] = useState('');
    const [tagFontColor, setTagFontColor] = useState('white');
    const [tagBackColor, setTagBackColor] = useState('#FBD929');

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
                TagAddHandler(response.data);

            }).catch((error) => {
                console.error("사용자 지정 태그 추가 실패", error);
            })
    }

    // 선택한 태그 추가 Handler
    const TagAddHandler = (tag) => {
        // 선택 개수 3개 제한
        if (selectedTags.length >= 3) {
            alert('태그는 최대 3개까지 선택 가능합니다.');
            return;
        }
        // 이미 추가한 태그인지 유효성 검사
        if (selectedTags.some(selectedTag => selectedTag.value === tag.value)) {
            alert('이미 선택한 태그입니다.');
            return;
        }

        setSelectedTags([...selectedTags, tag]);
    }

    // 선택된 태그 삭제 Handler
    const SeletedTagDeleteHandler = (idx) => {
        setSelectedTags(selectedTags.filter((_, index) => index !== idx));
    }

    // 완료 버튼 클릭 -> FnTags에 태그들 재설정
    const OnCompleteClick = () => {
        props.FnTagSetHandler(selectedTags);
        props.onShowList();
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
                            <Tag
                                fontColor={tag.fontColor}
                                backColor={tag.backColor}
                                onClick={() => TagAddHandler(tag)}
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
                    {selectedTags && selectedTags.map((tag, idx) => (
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
            <CompleteButtonContainer>
                <CompleteButton onClick={() => OnCompleteClick()}>완료</CompleteButton>
            </CompleteButtonContainer>
        </ComponentFrame>
    );
};
// Common
const ContainerFrame = styled.div`
    user-select: none;
    width : 95%;
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
// ExistTagList 태그 아이템 Level 3
const ExistTagItem = styled.div`
    display : flex;
    width : 30%;
    height : 30px;
    box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.25);
    border-radius : 16px;
    font-size : 14px;
    cursor : pointer;
    justify-content: center; align-items: center;

    &:hover{
        background-color : rgba(245,245,245, 0.9);
       color : black;
    }
`

// ---------------------------------------------------

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
// 선택된 태그 버튼 Level 2
const SelectedButton = styled.div`
    background-color: ${props => props.backColor};
    color: ${props => props.fontColor};
    display : flex;
    min-width : 40px; 
    width : auto; 
    height : 20px;
    border-radius : 16px;
    box-shadow : 0px 0px 10px 0px grey;
    padding : 0px 5px 0px 5px;
    justify-content : center; 
    align-items : center;
    font-size : 12px; 
    color : grey;
    cursor : pointer;

    &:hover {
        background-color: ${props => props.selected ? props.backColor : '#f0f0f0'};
        transform: translateY(-2px);
        box-shadow: ${props => props.selected ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'};
    }
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

export default AddTagListComponent;