import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Axios Address Context
import { AxiosAddrContext } from 'contextStore/AxiosAddress';

const TagSearchForm = () => {
  const PublicWritingIconPath = process.env.PUBLIC_URL + "/icon/Writing/";
  // Axios Address
  const AxiosAddress = useState(useContext(AxiosAddrContext).axiosAddr);
  // tag list
  const [tags, setTags] = useState([
    { "fontColor": "white", "backColor": "#E3DFFF", "value": "#위로" },
    { "fontColor": "white", "backColor": "#FED9D9", "value": "#동기부여" },
    { "fontColor": "white", "backColor": "#D9F7D9", "value": "#감사" },
    { "fontColor": "white", "backColor": "#FFEAA7", "value": "#시" },
    { "fontColor": "white", "backColor": "#B2F5EA", "value": "#현실직시" },
    { "fontColor": "white", "backColor": "#F0E68C", "value": "#자연" },
    { "fontColor": "white", "backColor": "#B0C4DE", "value": "#명언" },
    { "fontColor": "white", "backColor": "#F5DEB3", "value": "#소설속명언" },
    { "fontColor": "white", "backColor": "#FFB6C1", "value": "#열정" },
    { "fontColor": "white", "backColor": "#FFA07A", "value": "#사랑" }
  ]);

  // 태그 삭제
  const handleRemoveTag = (tag) => {

  };

  const [searchContainerVisible, setSearchContainerVisible] = useState(false);

  const toggleSearchContainer = () => {
    setSearchContainerVisible(!searchContainerVisible);
  };

  return (
    <Container>
      <SearchButton onClick={toggleSearchContainer}>
        <ButtonTextContainer >필터</ButtonTextContainer>
        <ButtonIconContainer>
          <Iconimg src={PublicWritingIconPath + "plus.svg"} />
        </ButtonIconContainer>
      </SearchButton>
      {searchContainerVisible && (
        <SearchContainer>
          <Title>검색하고 싶은 태그를 선택하세요</Title>
          <TagContainer>
            <TagsContainer>
              {tags.map(tag => (
                <TagButton
                  key={tag.value}
                  fontColor={tag.fontColor}
                  backColor={tag.backColor}
                  onClick={() => handleRemoveTag(tag)}
                >
                  {tag.value}
                </TagButton>
              ))}
            </TagsContainer>
          </TagContainer>
        </SearchContainer>
      )}
    </Container>
  )
};

const Container = styled.div`

`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: white;
  user-select: none;
  padding: 20px;
`;

const Title = styled.p`
  margin: 0px;
  font-size: 15px;
  margin-bottom: 10px;
`;

const RemoveTagButton = styled.button`
    background: none;
    border: none;
    color: red;
    cursor: pointer;
    margin-left: 8px;
`;
const SelectedTagsList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const SelectedTag = styled.div`
    background-color: #F0F2F5;
    color: #7A6B8A;
    border-radius: 20px;
    padding: 8px 15px;
    display: flex;
    align-items: center;
    font-size: 15px;
    position: relative;
`;

const TagContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const TagButton = styled.button`
    background-color: ${props => props.backColor};
    color: ${props => props.fontColor};
    border: none;
    border-radius: 20px;
    padding: 8px 15px;
    cursor: pointer;
    font-size: 15px;
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

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SearchButton = styled.div`
    display : flex;
    background: white;
    width : 100px;
    height : 45px;
    padding : 0px 10px;
    border-radius: 18px;
    box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.25);
    align-items: center; 
    justify-content: space-between;
    cursor : pointer;
    transition : 0.2s;
    margin-bottom: 10px;
    user-select: none;
    &:hover {
        background-color: #f2f2f2;
    }
`

const ButtonTextContainer = styled.div`
    display : flex;
    width : 80px;
    height : 75px;
    justify-content: center; 
    align-items: center;
    font-size : 14px; 
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

export default TagSearchForm;