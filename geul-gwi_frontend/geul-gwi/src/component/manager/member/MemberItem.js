import React from 'react';
import styled from 'styled-components';

const MemberItem = (props) => {
  const { user, handleShowProfile, handleDelete } = props;

  const handleClick = () => {
    handleShowProfile(user);
  };

  return (
    <Item onClick={handleClick}>
      <Container>
        <ProfileImage
          src={user.profile || '/img/defaultProfile.png'}
        />
        <UserName>{user.nickname}</UserName>
      </Container>
      <ButtonContainer>
        <DeleteButton onClick={() => handleDelete(user.userSeq)}>삭제</DeleteButton>
      </ButtonContainer>
    </Item>
  )
};

const Item = styled.div`
  user-select: none;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative; 
`;

const ProfileImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
      :hover{
      cursor: pointer;
    }
`;

const UserName = styled.p`
    margin-left: 10px;
    font-size: 15px;
        :hover{
      cursor: pointer;
    }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DeleteButton = styled.div`
    background-color: #f2f2f2;
    padding: 8px 18px;
    border-radius: 8px;
    font-size: 15px;
    user-select: none;
    :hover{
      cursor: pointer;
    }

`;

export default MemberItem;