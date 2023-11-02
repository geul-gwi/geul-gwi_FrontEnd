import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// Axios Address Context
import { AxiosAddrContext } from 'contextStore/AxiosAddress'; 
// Import Library
import { useSelector } from 'react-redux'; // Redux 사용 Library
// component
import MemberItem from "./MemberItem";
import MemberInfoForm from 'component/manager/member/MemberInfoForm';
import imageDataFetcher from 'service/imageDataFetcher';

const MemberManagement = () => {
  const axiosAddress = useContext(AxiosAddrContext).axiosAddr;  
  const userListUrl = '/user/list'; // 회원 목록 조회 요청 주소
  const userDeleteUrl = '/user/admin/delete/'; // 유저 삭제 요청 주소
  const userDetailApi = '/user/detail/';
  // User 로그인 정보
  const userSeq = useSelector((state) => state.authReducer.userSeq);
  const userToken = useSelector((state) => state.authReducer.accessToken);

  const PAGE_SIZE = 8; // 한 페이지에 보여줄 회원 수

  const [users, setUsers] = useState([]); // 초기 사용자 데이터를 users 상태로 관리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호, 기본값은 1
  const [isShowProfile, setShowProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // 회원 목록 불러오기
  useEffect(() => {
    axios.get(`${axiosAddress}${userListUrl}`, {
      headers: {
        Authorization: "Bearer " + userToken
      }
    })
      .then(async response => {
        console.log("회원 목록 : ", response);
        const usersData = response.data;
  
        const updatedUsers = await Promise.all(
          usersData.map(async user => {
            const profileImage = await imageDataFetcher(axiosAddress, user.profile);
            return { ...user, profile: profileImage };
          })
        );
  
        setUsers(updatedUsers);
      })
      .catch(error => {
        console.error('회원 목록 불러오기 오류 :', error);
      });
  }, []);

  // 회원 삭제
  const handleDelete = (userSeq) => {
    const confirmDelete = window.confirm('정말로 이 사용자를 삭제하시겠습니까?');
    if (confirmDelete) {
      axios.delete(`${axiosAddress}${userDeleteUrl}${userSeq}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((response) => {
          console.log(response);
          if (response) {
            const updatedUsers = users.filter((user) => user.userSeq !== userSeq);
            setUsers(updatedUsers);
            setShowProfile(false);
            alert("회원 삭제가 완료되었습니다.");
          } 
        })
        .catch((error) => {
          console.error('유저 삭제:', error);
        });
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 세부 정보 확인하기
  const handleShowProfile = (userSeq) => {
    axios.get(`${axiosAddress}${userDetailApi}${Number(userSeq)}`, {
      headers: {
        Authorization: "Bearer " + userToken
      }
    })
      .then((response) => {
        //console.log("회원 세부정보: ", response.data);
        setSelectedUser(response.data);
        setShowProfile(true);
      })
      .catch((error) => {
        console.error('회원 세부정보:', error);
      });
  };

  const handleHideProfile = () => {
    setShowProfile(false);
  };

  const pageCount = Math.ceil(users.length / PAGE_SIZE);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const paginatedUsers = users.slice(startIdx, endIdx);

  return (
    <MainContainer>
      <SubContainer>
        <LeftContainer>
          <Title>목록</Title>
          <ItemContainer>
            {paginatedUsers.map((user) => (
              <MemberItem
                handleShowProfile={() => handleShowProfile(user.userSeq)}
                user={user}
                handleDelete={handleDelete}
                handleHideProfile={handleHideProfile}
              />
            ))}
          </ItemContainer>
          <Paging>
            {Array.from({ length: pageCount }).map((_, index) => (
              <PageButton
                key={index}
                onClick={() => handlePageChange(index + 1)}
                active={currentPage === index + 1}
              >
                {index + 1}
              </PageButton>
            ))}
          </Paging>
        </LeftContainer>
      </SubContainer>
      <SubContainer>
        {isShowProfile ?
          <MemberInfoForm user={selectedUser} /> : null}
      </SubContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 900px;
    margin: auto;
`;

const LeftContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  justify-items: center;
  background-color: white;
  margin: auto;
  width: 350px;
  padding: 20px;
  border-radius: 16px;
  height: 80vh;
  user-select: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Title = styled.span`
  font-size: 20px;
  margin-top: 10px;
`;

const SubContainer = styled.div`
  width: 800px;
  margin: 50px;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`;

const Paging = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const PageButton = styled.button`
  background-color: ${(props) => (props.active ? '#555' : '#FFF')};
  color: ${(props) => (props.active ? 'white' : '#555')};
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  margin: 0 4px;
  cursor: pointer;
`;

export default MemberManagement;