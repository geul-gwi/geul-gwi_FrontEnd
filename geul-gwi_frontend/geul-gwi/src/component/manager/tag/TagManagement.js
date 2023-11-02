import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios'; 
// Import Library
import { useSelector } from 'react-redux'; // Redux 사용 Library
// Axios Address Context
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { TagButton } from 'component/common/button/Tag';

const TagManagement = () => {
  const AxiosAddress = useContext(AxiosAddrContext).axiosAddr;
  const getTagListMapping = "/tag/admin/list"; // 전체 태그 목록 요청 주소
  const addTagApiMapping =  "/tag/register/"; // 태그 추가 요청 주소
  const deleteTagUrl = "/tag/delete/"; // 태그 삭제 요청 주소

  // State 값 변수
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState('');
  const [tagFontColor, setTagFontColor] = useState('white'); 
  const [tagBackColor, setTagBackColor] = useState('#FBD929'); 
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
  }, []);

  // Tags값 할당 or 재할당
  const TagsRefresh = () => {
    axios.post(`${AxiosAddress}${getTagListMapping}`, {} ,{
        headers: {
          Authorization: "Bearer " + UserToken
        },
      })
      .then(response => {
        console.log(response);
        setTags(response.data); // 태그 목록 배열로 반환
      })
      .catch(error => {
        console.error(error);
      });
  }

  // 태그 삭제
  const handleRemoveTag = async (tagSeq) => {
    await axios.delete(`${AxiosAddress}${deleteTagUrl}${tagSeq}`, {
      headers: {
        Authorization: "Bearer " + UserToken
      },
    });
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
      }
      await axios.post(AxiosAddress + addTagApiMapping + `${UserSequence}`, 
        newTag,
        {
          headers : {
            Authorization : "Bearer "+UserToken
        },
      }).then((response) => {
        console.log(response);
        
      }).catch((error) => {
        console.error("태그 등록", error);
      })
      TagsRefresh();
    }
  };

  return (
    <MainContainer>
      <Title>태그 목록</Title>
      <TagContainer>
        <TagsContainer>
          {tags && tags.map(tag => (
            <TagButton fontColor={tag.fontColor} backColor={tag.backColor}
              onClick={() => handleRemoveTag(tag.tagSeq)}
            >
              {'# '+ tag.value} x
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
  width: 200px;
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
  height: 80vh;
  width: 500px;
  padding: 20px 50px;
  text-align: center;
  background-color: white;
  margin: auto;
  user-select: none;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const TagContainer = styled.div`
margin-top: 20px;
  width: 100%;
  height: 90%;
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
  margin-top: 10px;
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
`;

export default TagManagement;