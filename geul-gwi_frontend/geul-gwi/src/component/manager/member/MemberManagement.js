import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AxiosAddrContext } from 'contextStore/AxiosAddress'; // Axios Address Context
// Import Library
import { useSelector } from 'react-redux'; // Redux 사용 Library
// component
import MemberItem from "./MemberItem";
import MemberInfoForm from 'component/manager/member/MemberInfoForm'

const MemberManagement = () => {
  // Axios Address
  const axiosAddress = useState(useContext(AxiosAddrContext).axiosAddr);  
  // Api Mapping
  const userListApi = '/user/list/';
  const userDeleteApi = '/user/admin/delete/';

  const PAGE_SIZE = 8; // 한 페이지에 보여줄 회원 수

  const [users, setUsers] = useState([]); // 초기 사용자 데이터를 users 상태로 관리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호, 기본값은 1
  const [isShowProfile, setShowProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // 회원 목록 load
  useEffect(() => {
    console.log("회원 조회(전체) url 주소: " + axiosAddress + userListApi);
    axios.post(axiosAddress + userListApi)
      .then((response) => {
        console.log("load Request => ");  // response 찍어보기
        console.log(response);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('회원 목록을 가져오는 동안 오류 발생:', error);
      });
  }, []);


  // 회원 삭제
  const handleDelete = (userSeq) => {
    const confirmDelete = window.confirm('정말로 이 사용자를 삭제하시겠습니까?');
    if (confirmDelete) {
      // 회원 삭제 요청
      console.log("회원 삭제 url 주소 : " `${axiosAddress}${userDeleteApi}${userSeq}`);
      axios.delete(`${axiosAddress}${userDeleteApi}${userSeq}`)
        .then((response) => {
          console.log("load Request => ");  // response 찍어보기
          console.log(response);
          if (response) {
            // 삭제 성공, 사용자 목록에서 해당 회원 제거
            const updatedUsers = users.filter((user) => user.userSeq !== userSeq);
            setUsers(updatedUsers);
            setShowProfile(false);
          } else {
            console.error('유저 삭제에 실패했습니다.');
          }
        })
        .catch((error) => {
          console.error('유저 삭제 요청 중 오류 발생:', error);
        });
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleShowProfile = (userSeq) => {
    setSelectedUser(userSeq);
    setShowProfile(true);
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
                handleShowProfile={() => handleShowProfile(user)}
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
    width: 1000px;
    margin: auto;
`;

const LeftContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  justify-items: center;
  align-items: start;
  background-color: white;
  margin: auto;
  gap: 20px;
  width: 350px;
  padding: 10px;
  border-radius: 8px;
  user-select: none;
`;

const Title = styled.span`
  font-size: 18px;
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