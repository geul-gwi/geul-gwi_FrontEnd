import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// css Import
import 'css/main/Writing/AddTagListComponent.css';

const AddTagListComponent = (props) => {
    const [selectedMenu, setSelectedMenu] = useState(true);
    const [selectedTag, setSelectedTag] = useState('');

    // 사용자지정 태그 목록 (임시로 지정해둠)
    const TagList = [];
    TagList.push({'tagname' : '사랑'});
    TagList.push({'tagname' : '우정'});
    TagList.push({'tagname' : '현실직시'});
    TagList.push({'tagname' : '명언'});
    TagList.push({'tagname' : '경제'});
    TagList.push({'tagname' : '우울함'});
    TagList.push({'tagname' : '경제'});
    TagList.push({'tagname' : '우울함'});

    // 선택된 태그 목록
    const [selectedTagList,setSelectedTagList] = useState([]);
    const [inputTag,setInputTag] = useState("");
    


    // 선택된 태그 추가 Handler
    const TagAddHandler = (tagname) => {
        const isDuplicate = selectedTagList.some(tag => tag.tagname === tagname);

        if (!isDuplicate){
            setSelectedTag(tagname);
            let prevList = [...selectedTagList];
            prevList.push({'tagname' : tagname});
            setSelectedTagList(prevList);
        }
    }
    // 직접 입력한 태그 Handler
    const InputTagHandler = (e) => {
        let value = e.target.value;
        setInputTag(value);
    }
    // 직접 입력한 Enter 이벤트 처리
    const OnEnterPress = (e) => {
        // 누른키가 Enter
        if(e.key === 'Enter'){
            TagAddHandler(inputTag);
        }
    }


    // 선택된 태그 삭제 Handler
    const SeletedTagDeleteHandler = (idx) => {
        setSelectedTagList(selectedTagList.filter( (_, index) => index !== idx ));
    }



    // 완료 버튼 클릭 -> FnTags에 태그들 재설정
    const OnCompleteClick = () => {
        props.SetFnTags(selectedTagList);
        props.ShowFunc();
    }

    
    return (
        <ComponentFrame>
            {/* 라디오 옵션 버튼 */}
            <TagMenuContainer>
                <TagMenuItemContainer><TagMenuItem onClick={() => {setSelectedMenu(true)}}>지정된 태그</TagMenuItem></TagMenuItemContainer>
                <TagMenuItemContainer><TagMenuItem onClick={() => {setSelectedMenu(false)}}>사용자 지정</TagMenuItem></TagMenuItemContainer>
            </TagMenuContainer>

            {/* 메뉴에 따라 보여주는 콘텐츠가 다름 => 지정된태그 or 사용자지정 */}
            {
                selectedMenu ? 
                <ExistTagList>
                    <SmallTitle_Container>사용할 태그를 체크해주세요</SmallTitle_Container>
                    <ExistTagListItemContainer>
                        {
                            TagList.map((element,idx) => (
                                <ExistTagItem 
                                key={idx}
                                onClick={() => TagAddHandler(element.tagname)}
                                className={`${selectedTag === element.tagname ? 'selectedTag' : ''}`}
                                >
                                    {'#' + element.tagname}
                                </ExistTagItem>
                            ))
                        }
                    </ExistTagListItemContainer>
                </ExistTagList>
                :
                <UserChooseTagList>
                    <SmallTitle_Container>태그를 직접 입력해주세요</SmallTitle_Container>
                    {/* 사용자가 원하는 태그를 직접 입력 */}
                    <UserChooseInputContainer>
                        {/* input 태그 */}
                        <UserChooseStyledInput 
                        type='text' 
                        placeholder="최대 20자 가능합니다." 
                        onChange={(e) => InputTagHandler(e)}
                        onKeyPress={(e) => OnEnterPress(e)}
                        />
                    </UserChooseInputContainer>
                </UserChooseTagList>
            }

            {/* 선택된 태그 보여줌 */}
            <SelectedTagContainer>
                {/* 제목 */}
                <SmallTitle_Container>선택된 태그</SmallTitle_Container>  
                {/* 아이템 콘테이너 */}
                <SelectedTagItemContainer>
                    {
                        selectedTagList.map((element,idx) => (
                            <SelectedButton 
                            key={idx}
                            onClick={() => SeletedTagDeleteHandler(idx)}
                            >
                                {element.tagname}
                            </SelectedButton>
                        ))
                    }
                </SelectedTagItemContainer>
            </SelectedTagContainer>

            {/* 완료버튼 */}
            <CompleteButtonContainer>
                <CompleteButton
                onClick={() => OnCompleteClick()}>
                    완료
                </CompleteButton>
            </CompleteButtonContainer>
        </ComponentFrame>
    );
};
// Common
const ContainerFrame = styled.div`
    width : 95%;
`
// 소제목 Container
const SmallTitle_Container = styled.div`
    display : flex;
    width : 100%;
    height : 40px;
    font-size : 14px;
    text-indent : 10px;
    flex-direction : row; justify-content: flex-start; align-items: center;
`

// ---------------------------------------------------

// 태그를 추가하는 리스트 컴포넌트의 프레임
const ComponentFrame = styled.div`
    display : flex;
    width : 100%;
    height : 100%;
    padding : 0px 0px 10px 0px;
    flex-direction: column;
    align-items: center;
`

// ---------------------------------------------------

// TagMenu level 1
// 사전에 서버에 지정된 태그를 선택할 것인지 , 사용자가 직접 작성한 태그를 사용할 것 인지 메뉴를 선택하는 메뉴
const TagMenuContainer = styled.div`
    display : flex;
    width : 100%;
    height : 50px;
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
    justify-content : center; align-items: center;
`
// TagMenu Level 3
// 태그메뉴 아이템
const TagMenuItem = styled.div`
    display : flex;
    width : 100%;
    height : 100%;
    border-radius : 8px 8px 0px 0px;
    justify-content: center; align-items: center;
    font-size : 16px;
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
    min-height : 100px;
    height : auto;
    flex-direction : column;
    align-items : center;
    padding-top : 20px;
    border-radius : 0px 0px 8px 8%;
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
    gap : 10px;
    flex-direction : row; justify-content: space-around; align-items: center; flex-wrap: wrap;
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
    height : 50px;
    justify-content: center; align-items: center;
`
// 태그를 직접추가하는 styled input
const UserChooseStyledInput = styled.input`
    width : 100%;
    height : 100%;
    text-indent: 10px;
    border-radius : 12px;
    border : 2px solid grey;
    box-shadow : none;
    color : #545454; font-size : 14px;
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
    justify-content : flex-start; align-items : center;
    flex-wrap : wrap;
    gap : 10px;
`
// 선택된 태그 버튼 Level 2
const SelectedButton = styled.div`
    display : flex;
    min-width : 40px; width : auto; height : 20px;
    border-radius : 16px;
    box-shadow : 0px 0px 10px 0px grey;
    padding : 0px 5px 0px 5px;
    justify-content : center; align-items : center;
    font-size : 12px; color : grey;
    cursor : pointer;

    &:hover{
        background-color : grey;
        color : white;
    }
`

// ---------------------------------------------------

const CompleteButtonContainer = styled(ContainerFrame)`
    display : flex;
    height : 30px;
    flex-direction: row; 
    justify-content: flex-end;
    align-items : center;
`
const CompleteButton = styled.div`
    display : flex;
    min-width : 80px; max-width : 100px; width : auto;
    height : 30px;
    border-radius : 16px;

    background-color: #21DD3F;
    color : white; font-size : 14px;
    justify-content: center; align-items: center;
    cursor : pointer;

    &:hover{
        background-color : #2DF24D;
    }
`

export default AddTagListComponent;