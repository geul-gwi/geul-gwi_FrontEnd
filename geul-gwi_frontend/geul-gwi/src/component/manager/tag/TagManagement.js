import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios'; 
// Import Library
import { useSelector } from 'react-redux'; // Redux 사용 Library
// Axios Address Context
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { TagButton } from 'component/common/button/Tag';

const TagManagement = () => {
  // Axios Address
  const AxiosAddress = useContext(AxiosAddrContext).axiosAddr;
  const getTagListMapping = "/tag/admin/list"; 
  const addTagApiMapping =  "/tag/register";

  // State 값 변수
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState('');
  const [tagFontColor, setTagFontColor] = useState('#FBD929'); 
  const [tagBackColor, setTagBackColor] = useState('white'); 
  // User 로그인 정보
  const UserSequence = useSelector((state) => state.authReducer.userSeq);
  const UserToken = useSelector((state) => state.authReducer.accessToken);

  const onTagHandler = (event) => {
    setTag(event.currentTarget.value);
  };
  // 태그 font 색상 선택 처리 
  const onTagFontColorChange = (event) => {
    setTagFontColor(event.target.value);
  };

  // 태그 back 색상 선택 처리 
  const onTagBackColorChange = (event) => {
    setTagBackColor(event.target.value);
  };

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
        fontColor: tagFontColor,
        backColor: tagBackColor,
        value: tag,
      };
      //console.log("태그 추가중 : "+newTag);
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
      <Title>태그 목록</Title>
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
        <ColorPickerContainer>
          <SubTitle>배경 색상</SubTitle>
          <ColorPicker 
            type='color' 
            value={tagBackColor} 
            onChange={onTagBackColorChange} 
          />
          <SubTitle>글자 색상</SubTitle>
          <ColorPicker
            type='color'
            value={tagFontColor}
            onChange={onTagFontColorChange}
          />
       </ColorPickerContainer>
      </TagInputContainer>
      <ButtonGroup>
        <Button onClick={onAddTagHandler}>추가</Button>
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

  border: none;
  cursor: pointer;
`;

const Title = styled.p`
  font-size: 20px;
`;

const SubTitle = styled.span`
    font-size: 12px;
      margin-left: 10px;
            margin-right: 10px;
`;

const ColorPickerContainer = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
  width: 100%;
  height: auto;
  margin-left: 10px;
`;

export default TagManagement;