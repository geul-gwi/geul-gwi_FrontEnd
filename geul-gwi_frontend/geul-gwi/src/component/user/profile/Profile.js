import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import styled from 'styled-components';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux'; // Redux 사용 Library
import ProfilePostList from 'component/user/profile/ProfilePostList';
import { Tag } from 'component/common/button/Tag'
import { Button } from 'component/common/button/Button'

// profileUserSeq => 보여줄 유저의 프로필 시퀀스
const Profile = ({profileUserSeq}) => {
  const navigate = useNavigate();
  const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
  const userSeq = useSelector((state) => state.authReducer.userSeq);
  const userToken = useSelector((state) => state.authReducer.accessToken);
  const userDetailUrl = '/user/detail/'; // 유저 세부 정보 불러오기 요청 주소
  const friendRequestUrl = '/friend/confirm'; // 친구 요청 주소

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({}); // 유저 프로필 정보

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await Axios.get(`${axiosAddr}${userDetailUrl}${profileUserSeq}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setUserInfo(response.data);
        // 이미지 가져오는 함수를 호출
        fetchImageData(response.data.profile);
      } catch (error) {
        console.log('프로필 불러오기 실패:', error);
      }
    }
    fetchUserProfile();
  
  }, [profileUserSeq]);

  // 이미지 데이터를 가져오는 함수
  const fetchImageData = async (path) => {
    try {
      const encodedPath = encodeURIComponent(path);
      const response = await Axios.get(`${axiosAddr}/file?file=${encodedPath}`, {
        responseType: 'blob',
      });

      if (response) {
        const newFile = new File([response.data], 'profile');
        const reader = new FileReader();
        reader.onload = (event) => {
          const profileImageUrl = event.target.result;
          setUserInfo((prevUserInfo) => {
            return { ...prevUserInfo, profile: profileImageUrl };
          });
        };
        reader.readAsDataURL(newFile);
      }
    } catch (error) {
      console.error('이미지 가져오기에 실패했습니다.', error);
    }
  }

  // 프로필 사진 클릭
  const onProfileClick = () => {
    if (null == userInfo.profile) return;
    setIsModalOpen(true);
  };

  // 프로필 자세히 보기 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 프로필 편집 버튼 클릭
  const onEditClick = () => {
    navigate('/main/ProfileEdit', { state: userInfo }); // 프로필 정보 넘기기
  };

  // 친구 요청 클릭 
  const sendFriendRequest = async () => {
    try {
      const friendDTO = {
        'toUser' : profileUserSeq, // 요청 받는 사람
        'fromUser' : userSeq, // 요청 보낸 사람
      };
      const response = await Axios.post(`${axiosAddr}${friendRequestUrl}`, friendDTO, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log('친구 요청 성공 : ', response.data);
    } catch (error) {
      console.error('친구 요청 실패:', error);
    }
  };

  return (
    <>
      <ProfileContainer>
        <ProfilePicture
          src={userInfo.profile ? userInfo.profile : '/img/defaultProfile.png'}
          onClick={onProfileClick}
        />
        <ProfileInfo>
          <NameText>{userInfo.nickname}</NameText>
          <CommentText>{userInfo.comment}</CommentText>
          <TagsContainer>
            {userInfo.tags && userInfo.tags.map(tag => (
              <Tag fontColor={tag.fontColor} backColor={tag.backColor}>
                {'# ' + tag.value}
              </Tag>
            ))}
          </TagsContainer>
          {userSeq === profileUserSeq && (
            <Button onClick={onEditClick}>프로필 편집</Button>
          )}
          <Button onClick={sendFriendRequest}>친구 요청</Button>
        </ProfileInfo>
        {isModalOpen && (
          <ModalOverlay onClick={closeModal}>
            <ModalContent>
              <img src={userInfo.profile} />
            </ModalContent>
          </ModalOverlay>
        )}
      </ProfileContainer>
      <ProfilePostList 
          profileUserSeq={profileUserSeq} 
          profile={userInfo.profile} 
          nickname={userInfo.nickname} 
          comment={userInfo.comment}
      />
    </>
  );
};

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    background-color: white;
    padding: 25px 0px;
    user-select: none;
`;

const TagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 20px;
`;

const ProfilePicture = styled.img`
    width: 140px;
    height: 140px;
    border-radius: 50%;
    cursor: pointer;
    object-fit: cover;
    border: 1px solid #ccc;
    
    &:hover {
      transform: scale(1.1);
      transition: transform 0.2s ease-in-out;
    }
`;

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`;

const NameText = styled.p`
    margin: 10px 0;
    font-size: 22px;
`;

const CommentText = styled.p`
    margin: 0px;
    color: grey;
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
`;

const ModalContent = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    img {
      width: 100%;
      max-width: 400px;
      border-radius: 5px;
    }
`;

export default Profile;