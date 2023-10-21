import React from 'react';
import styled from 'styled-components';

const MemberInfoForm = ({ user }) => {
  
  return (
    <Container>
      <ProfileImage src={user.profile || '/img/defaultProfile.png'} />
      <Title>회원 정보</Title>
      <UserInfo>
        <InfoLabel>Role:</InfoLabel>
        <InfoValue>{user.role}</InfoValue>
      </UserInfo>
      <UserInfo>
        <InfoLabel>아이디:</InfoLabel>
        <InfoValue>{user.userId}</InfoValue>
      </UserInfo>
      <UserInfo>
        <InfoLabel>닉네임:</InfoLabel>
        <InfoValue>{user.nickname}</InfoValue>
      </UserInfo>
      <UserInfo>
        <InfoLabel>소개:</InfoLabel>
        <InfoValue>{user.comment || '없음'}</InfoValue>
      </UserInfo>
      <TagContainer>
        <UserInfo>
          <InfoLabel>선택한 태그</InfoLabel>
        </UserInfo>
        <TagsContainer>
          {user.tags && user.tags.map(tag => (
            <TagButton
              key={tag.value}
              fontColor={tag.fontColor}
              backColor={tag.backColor}
            >
              {tag.value}
            </TagButton>
          ))}
        </TagsContainer>
      </TagContainer>

    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  margin: 0 auto;
  user-select: none;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const Title = styled.p`
  font-size: 20px;
  margin: 0 0 30px 0;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

const InfoLabel = styled.p`
  margin: 0;
`;

const InfoValue = styled.span`
  color: #555;
`;

const TagContainer = styled.div`
  margin-top: 30px;
  width: 100%;
`;

const TagButton = styled.button`
    background-color: ${props => props.backColor};
    color: ${props => props.fontColor};
    border: none;
    border-radius: 20px;
    padding: 8px 15px;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    transition: all 0.3s ease-in-out;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export default MemberInfoForm;