import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import styled from 'styled-components';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
// Import Library
import { useSelector } from 'react-redux'; // Redux 사용 Library
// component
import ProfilePostList from 'component/user/profile/ProfilePostList';

const Profile = () => {
  const navigate = useNavigate();
  const axiosAddress = useContext(AxiosAddrContext).axiosAddr;
  const userDetailUrl = '/user/detail/'; 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({}); // 유저 프로필 정보
  // 유저 로그인 정보
  const userSeq = useSelector((state) => state.authReducer.userSeq);
  const userToken = useSelector((state) => state.authReducer.accessToken);
  
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        //console.log('요청 주소 : ', `${axiosAddress}${userDetailUrl}${userSeq}`);
        const response = await Axios.get(`${axiosAddress}${userDetailUrl}${userSeq}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        setUserInfo(response.data);
        //console.log('바디 : ', response.data);
        console.log('프로필 : ', response.data.profile);

        // 이미지 가져오는 함수를 호출
        fetchImageData(response.data.profile);
        
      } catch (error) {
        console.log('프로필 불러오기 실패:', error);
      }
    }
    fetchUserProfile();
  }, []);

    // 이미지 데이터를 가져오는 함수
  const fetchImageData = async (path) => {
    try {
      const encodedPath = encodeURIComponent(path);
      const response = await Axios.get(`${axiosAddress}/file?file=${encodedPath}`, {
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

  return (
    <>
      <ProfileContainer>
        <ProfilePicture
          src={userInfo.profile}
          onClick={onProfileClick}
        />
        <ProfileInfo>
          <NameText>{userInfo.nickname}</NameText>
          <CommentText>{userInfo.comment}</CommentText>
          <TagsContainer>
            {userInfo.tags && userInfo.tags.map(tag => (
              <TagButton
                key={tag.value}
                fontColor={tag.fontColor}
                backColor={tag.backColor}
              >
                {tag.value}
              </TagButton>
            ))}
          </TagsContainer>
          <EditButton onClick={onEditClick}>프로필 편집</EditButton>
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

const TagButton = styled.button`
    background-color: ${props => props.backColor};
    color: ${props => props.fontColor};
    border: none;
    border-radius: 20px;
    padding: 8px 15px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    transition: all 0.3s ease-in-out;
`;

const ProfilePicture = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    cursor: pointer;
    object-fit: cover;
    border: 1px solid gray;
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

const EditButton = styled.div`
    padding: 10px 50px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 15px;
    cursor: pointer;
    &:hover {
      background-color: #f2f2f2;
    }
`;

const NameText = styled.p`
    margin: 10px 0;
    font-size: 25px;
`;

const CommentText = styled.p`
    margin: 0px;
    margin-bottom: 15px;
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