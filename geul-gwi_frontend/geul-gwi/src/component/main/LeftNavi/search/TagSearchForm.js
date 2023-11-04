import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';

const TagSearchForm = (props) => {
  const axiosAddress = useContext(AxiosAddrContext).axiosAddr;   
  const defaultTagUrl = '/tag/list/DEFAULT';

  const [tags, setTags] = useState([]); // 전체 태그 리스트

  useEffect(() => {
    axios.post(`${axiosAddress}${defaultTagUrl}`)
      .then(response => {
        setTags(response.data);
      })
      .catch(error => {
        console.error("태그 요청 실패: ", error);
      });
  }, []);

  const handleTagClick = (tag) => {
    if (props.selectedTag === tag) {
      props.setSelectedTag(null);
    } else {
      props.setSelectedTag(tag);
    }
  };

  const onClickSearchButton = () => {
    props.tagSearchHandler();
  };

  return (
    <SearchContainer>
      <Title>검색하고 싶은 태그를 선택하세요.</Title>
      <TagContainer>
        <TagsContainer>
          {tags && tags.map(tag => (
            <TagButton 
              key={tag.value}
              fontColor={tag.fontColor} 
              backColor={tag.backColor}
              selected={props.selectedTag === tag}
              onClick={() => handleTagClick(tag)}
            >
              {props.selectedTag === tag ? '# ' + tag.value + " x" : '# ' + tag.value}
            </TagButton>
          ))}
        </TagsContainer>
      </TagContainer>
      <Button onClick={onClickSearchButton}>적용</Button>
    </SearchContainer>
  )
};

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 675px;
  height: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: white;
  user-select: none;
  padding: 30px;
  border-radius: 16px;
`;

const Title = styled.p`
  margin: 0;
  font-size: 16px;
  margin-bottom: 30px;
`;

const TagContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Button = styled.div`
  background-color: #ccebb5;
  color: white;
  position: absolute;
  top: 23px;
  right: -20px;
  border-radius: 12px;
  padding: 8px 30px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
        background-color: #daf1c7;
    }
`;

const TagButton = React.memo(styled.button`
    background-color: ${props => (props.selected ? props.backColor : '#f0f0f0')};
    color: ${props => (props.selected ? props.fontColor : 'black')};
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
        background-color: ${props => (props.selected ? props.backColor : '#f0f0f0')};
        transform: translateY(-2px);
        box-shadow: ${props => (props.selected ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none')};
    }
`);

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export default TagSearchForm;