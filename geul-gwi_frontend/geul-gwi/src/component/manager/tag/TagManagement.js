import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios'; 
// Import Library
import { useSelector } from 'react-redux'; // Redux 사용 Library

// Axios Address Context
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { authReducer } from 'Reducer/authReducer';

const TagManagement = () => {
  

  // Axios Address
  const AxiosAddress = useContext(AxiosAddrContext).axiosAddr;
  // Api Mapping
  const getTagListMapping = "/tag/admin/list"; // Tag Api Mapping값
  const addTagApiMapping =  "/tag/register";


  // State 값 변수
  const [tags, setTags] = useState([
  ]);
  const [editTags, setEditTags] = useState(tags);
  const [tag, setTag] = useState(null);
  const [tagColor, setTagColor] = useState('#FBD929'); // 기본 색상은 노란색
  const [deleteTags, setDeleteTags] = useState([]); // 삭제한 태그 배열
  const [addTags, setAddTags] = useState([]); // 추가한 태그 배열
  // User 로그인 정보
  const UserSequence = useSelector((state) => state.authReducer.userSeq);
  const UserToken = useSelector((state) => state.authReducer.accessToken);


  // Handler
  // Tag값 Handler
  const onTagHandler = (event) => {
    setTag(event.currentTarget.value);
  };
  // 색상 선택 처리 
  const onColorChange = (event) => {
    setTagColor(event.target.value);
  };


  // Function

  // Onload
  useEffect(() => {
    TagsRefresh(); // Tag목록 초기화
    console.log(UserSequence);
    console.log(UserToken);
  }, []);

  // Tags값 할당 or 재할당
  const TagsRefresh = () => {
    axios.post(AxiosAddress + getTagListMapping)
      .then(response => {
        console.log("load Request => ");  // response 찍어보기
        console.log(response);
        setTags(response.data); // 태그 목록 배열로 반환
      })
      .catch(error => {
        console.log(error);
      });
  }


  // 적용 버튼 클릭
  const onSaveChanges = async () => {
    console.log("적용 버튼 클릭");
    if (addTags.length === 0 && deleteTags.length === 0) {
      alert('변경 사항이 없습니다.');
      return;
    }
    try {
      // AddTag Request For문
      for (const tag of addTags) {
        console.log("추가된 태그 쏘는 중 : "+tag);
        await axios.post(AxiosAddress + addTagApiMapping + `/${UserSequence}`, 
          {
            backColor : tag.backColor,
            fontColor : tag.fontColor,
            value : tag.value
          },
          {
            headers : {
              Authorization : "Bearer "+UserToken
            },
          });
      }
      setAddTags([]);
      setDeleteTags([]);
      console.log('태그 추가 및 삭제 요청이 성공했습니다.');
    } catch (error) {
      console.error('태그 추가 및 삭제 요청 중 오류 발생:', error);
    }
  };

  

  // 태그 삭제
  const handleRemoveTag = async (tagSeq) => {
    await axios.delete(AxiosAddress+`/tag/delete/${tagSeq}`);
    TagsRefresh();
  };

  // 태그 추가 
  const onAddTagHandler = async() => {
    if (tag.trim() === '') {
      alert('태그를 입력하세요.');
      return;
    }

    // 태그가 서버의 태그목록에 없을 경우
    if (!tags.some((item) => item.value === tag)){
      const newTag = {
        fontColor: '#FFFFFF',
        backColor: tagColor,
        value: '#' + tag,
      };
      console.log("태그 추가중 : "+newTag);
      await axios.post(AxiosAddress + addTagApiMapping + `/${UserSequence}`, 
        newTag,
        {
          headers : {
            Authorization : "Bearer "+UserToken
        },
      }).then((response) => {
        console.log("Tag 등록 성공");
        console.log(response);
        
      }).catch((error) => {
        console.log("Tag 등록 실패");
        console.log(error);
      })
      TagsRefresh();
    }
  };

  return (
    <MainContainer>
      <Tittle>태그 목록</Tittle>
      <TagContainer>
        <TagsContainer>
          {tags.map(tag => (
            <TagButton
              key={tag.value}
              fontColor={tag.fontColor}
              backColor={tag.backColor}
              onClick={() => handleRemoveTag(tag.tagSeq)}
            >
              {tag.value} x
            </TagButton>
          ))}
        </TagsContainer>
      </TagContainer>
      <TagInputContainer>
        <InputTag 
          type='text' 
          value={tag} 
          onChange={onTagHandler} 
          placeholder='태그를 입력하세요' 
        />
        <ColorPicker 
          type='color' 
          value={tagColor} 
          onChange={onColorChange} 
        />
      </TagInputContainer>
      <ButtonGroup>
        <Button onClick={onAddTagHandler}>추가</Button>
        <Button onClick={onSaveChanges}>적용</Button>
      </ButtonGroup>
    </MainContainer>
  );
};

const InputTag = styled.input`
  width: 150px;
  margin-bottom: 10px;
  padding: 0 10px;
  border: 2px solid #ccc;
  border-radius: 8px;
`;

const ButtonGroup = styled.div`
    display: flex;
    margin: auto;
    margin-bottom: 20px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 600px;
  padding: 10px 50px;
  border-radius: 8px;
  text-align: center;
  background-color: white;
  margin: auto;
  user-select: none;
`;

const TagContainer = styled.div`
  width: 100%;
  height: 90%;
  margin-bottom: 30px;
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

const Button = styled.div`
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 8px 40px;
  cursor: pointer;
  margin-left: 10px;
  font-size: 15px;
`;

const TagInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

const ColorPicker = styled.input`
  width: 30px;
  height: 30px;
  margin-left: 10px;
  border: none;
  cursor: pointer;
`;

const Tittle = styled.p`
  font-size: 20px;
`;

export default TagManagement;