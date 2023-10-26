import { React, useState } from 'react';
import styled from 'styled-components';

const TagList = [
  { "fontColor": "#7A6B8A", "backColor": "#E3DFFF", "value": "#위로" },
  { "fontColor": "#7A6B8A", "backColor": "#FED9D9", "value": "#동기부여" },
  { "fontColor": "#7A6B8A", "backColor": "#D9F7D9", "value": "#감사" },
  { "fontColor": "#7A6B8A", "backColor": "#FFEAA7", "value": "#시" },
  { "fontColor": "#7A6B8A", "backColor": "#B2F5EA", "value": "#현실직시" },
  { "fontColor": "#7A6B8A", "backColor": "#F0E68C", "value": "#자연" },
  { "fontColor": "#7A6B8A", "backColor": "#B0C4DE", "value": "#명언" },
  { "fontColor": "#7A6B8A", "backColor": "#F5DEB3", "value": "#소설속명언" },
  { "fontColor": "#7A6B8A", "backColor": "#FFB6C1", "value": "#열정" },
  { "fontColor": "#7A6B8A", "backColor": "#FFA07A", "value": "#사랑" }
];


const ChallengeManagement = () => {
  const PublicWritingIconPath = process.env.PUBLIC_URL + "/icon/Writing/"
  const [showTagList, setShowTagList] = useState(true);
  const ShowList = () => {
    setShowTagList(!showTagList);
  }
  const [selectedTags, setSelectedTags] = useState([]);

  const handleAddTag = (tag) => {
    if (selectedTags.length >= 3 || selectedTags.some(selectedTag => selectedTag.value === tag.value)) {
      return;
    }
    setSelectedTags([...selectedTags, tag]);
  };

  const handleRemoveTag = (tag) => {
    setSelectedTags(selectedTags.filter(selectedTag => selectedTag.value !== tag.value));
  };

  return (
    <MainContainer>
      <TopContainer>
        <Title>챌린지</Title>
      </TopContainer>
      <ShowButton onClick={ShowList}>
        <ButtonTextContainer>챌린지 추가</ButtonTextContainer>
        <ButtonIconContainer>
          <Iconimg src={PublicWritingIconPath + "plus.svg"} />
        </ButtonIconContainer>
      </ShowButton>
      { showTagList ? "" :
      <BottomContainer>
        <Container>
          <Title>코멘트 작성</Title>
          <InputComent></InputComent>
        </Container>
        <Container>
        <Title>태그 목록</Title>
        <p>챌린지로 등록할 태그 3개 선택해 주세요</p>
        <TagsContainer>
          {TagList.map(tag => (
            <TagButton
              key={tag.value}
              fontColor={tag.fontColor}
              backColor={tag.backColor}
              selected={selectedTags.some(selectedTag => selectedTag.value === tag.value)}
              onClick={() => selectedTags.some(selectedTag => selectedTag.value === tag.value)
                ? handleRemoveTag(tag)
                : handleAddTag(tag)}
            >
              {tag.value}
            </TagButton>
          ))}
        </TagsContainer>
          <Title>선택한 태그</Title>
          <TagsContainer>
            <SelectedTagsList>
              {selectedTags.map(tag => (
                <SelectedTag key={tag.value}>
                  {tag.value}
                  <RemoveTagButton onClick={() => handleRemoveTag(tag)}>x</RemoveTagButton>
                </SelectedTag>
              ))}
            </SelectedTagsList>
          </TagsContainer>
            <Button>추가</Button>
        </Container>

      </BottomContainer>
      }        

    </MainContainer>
  );
};


const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
`
const Button = styled.div`
  background-color: white;
  border-radius: 8px;
  border: 1px solid gray;
  padding: 10px 50px;
`

const TopContainer = styled.div`
  
  background-color: white;
  width: 600px;
  height: 350px;
  margin: auto;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
`

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  padding: 10px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: auto;
  margin: 20px;
  align-items: center;
`

const Title = styled.span`
  font-size: 18px;
  margin-top: 10px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 10px;
`;

const InputComent = styled.textarea`
  width: 100%;
  height: 100px;
  border-radius: 8px;
  border: 1px solid #ddd;
  padding: 10px;
  resize: vertical;
  margin-top: 10px;
`;

const TagButton = styled.button`
    background-color: ${props => props.backColor};
    color: ${props => props.fontColor};
    border: none;
    border-radius: 20px;
    padding: 8px 15px;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    transition: all 0.3s ease-in-out;
   

    &:hover {
        background-color: ${props => props.selected ? props.backColor : '#f0f0f0'};
        transform: translateY(-2px);
        box-shadow: ${props => props.selected ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'};
    }
`;

const SelectedTagsList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
`;

const SelectedTag = styled.div`
    background-color: #F0F2F5;
    color: #7A6B8A;
    border-radius: 20px;
    padding: 8px 15px;
    display: flex;
    align-items: center;
    font-size: 16px;
    position: relative;
`;

const RemoveTagButton = styled.button`
    background: none;
    border: none;
    color: red;
    cursor: pointer;
    margin-left: 8px;
    font-size: 18px;
`;


const ShowButton = styled.div`
    display : flex;
    width : 140px;
    height : 50px;
    padding : 0px 10px 0px 10px;
    border-radius: 16px;
    margin-bottom: 20px;
    background: #FFF;
    box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.25);
    align-items: center; justify-content: space-between;
    cursor : pointer;
    transition : 0.2s;
    &:hover{
        background-color : mistyrose;
    }
`
 const ButtonTextContainer = styled.div`
    display : flex;
    width : 100px;
    height : 80px;
    justify-content: center; 
    align-items: center;
    font-size : 12px; color : black;
`
 const ButtonIconContainer = styled.div`
    display : flex;
    width : 15px;
    height : 15px;
    justify-content: center;
    align-items: center;
`
 const Iconimg = styled.img`
    width : 100%;
    height : 100%;
    object-fit: contain;
`

export default ChallengeManagement;