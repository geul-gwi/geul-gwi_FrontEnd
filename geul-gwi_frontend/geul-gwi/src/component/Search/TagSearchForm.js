import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { AxiosAddrContext } from 'contextStore/AxiosAddress';

const TagSearchForm = (props) => {
  const PublicWritingIconPath = process.env.PUBLIC_URL + "/icon/Writing/";
  const axiosAddress = useContext(AxiosAddrContext).axiosAddr;   // Axios Address
  const defaultTagUrl = '/tag/list/DEFAULT';

  const [tags, setTags] = useState([]); // 전체 태그 리스트

  const [searchContainerVisible, setSearchContainerVisible] = useState(false); // 필터 On/Off

  useEffect(() => {
    axios.post(`${axiosAddress}${defaultTagUrl}`)
      .then(response => {
        //console.log("태그 요청 : ", response.data);
        setTags(response.data);
      })
      .catch(error => {
        console.error("태그 요청 실패: ", error);
      });
  }, []);

  const toggleSearchContainer = () => {
    setSearchContainerVisible(!searchContainerVisible);
  };

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
      <SearchButton onClick={toggleSearchContainer}>
        <ButtonTextContainer >태그 필터</ButtonTextContainer>
        <ButtonIconContainer>
          <Iconimg src={PublicWritingIconPath + "plus.svg"} />
        </ButtonIconContainer>
      </SearchButton>
      {searchContainerVisible && (<>
        <Title>검색하고 싶은 태그를 선택하세요.</Title>
        <TagContainer>
          <TagsContainer>
            {tags && tags.map(tag => (
              <TagButton fontColor={tag.fontColor} backColor={tag.backColor}
                selected={props.selectedTag === tag}
                onClick={() => handleTagClick(tag)}
              >
                {'# ' + tag.value}
              </TagButton>
            ))}
          </TagsContainer>
        </TagContainer>
        <Button onClick={onClickSearchButton}>적용</Button>
      </>
      )}
    </SearchContainer>
  )
};

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: white;
  user-select: none;
  padding: 20px; /* 패딩을 추가하려면 여기서 조절합니다. */
`;

const Title = styled.p`
  margin: 0px;
  font-size: 15px;
  margin-bottom: 10px;
`;

const TagContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Button = styled.div`
  position: absolute;
  top: 23px;
  right: -10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 8px 30px;
  cursor: pointer;

  &:hover {
        background-color: #f2f2f2;
    }
`;

const TagButton = styled.button`
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