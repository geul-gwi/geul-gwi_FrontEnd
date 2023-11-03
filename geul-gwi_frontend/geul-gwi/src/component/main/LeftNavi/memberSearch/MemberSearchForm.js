import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import MemberSearchItem from './MemberSearchItem';

const MemberSearchForm = (props) => {
    //const navigate = useNavigate();
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);
    const memberListUrl = '/user/list'; // 회원 목록 요청 주소

    const [members, setMembers] = useState([]); 
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchMembers() {
            try {
                const response = await Axios.get(`${axiosAddr}${memberListUrl}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                //console.log('회원 목록: ', response.data);
                setMembers(response.data);
            } catch (error) {
                console.error('회원 목록:', error);
            }
        }
        fetchMembers();
    }, []);

    const onClickCloseButton = () => {
        props.handleMemberClick();
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredMembers = members.filter((member) => {
        return member.nickname.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <Frame>
            <TitleContainer>
                <span>회원</span>
                <CloseButton onClick={onClickCloseButton}><AiOutlineClose size={15} color='gray' /></CloseButton>
            </TitleContainer>
            <SearchContainer>
                <SearchInput
                    placeholder='검색'
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </SearchContainer>
            <ScrollableSubContainer>
                {members.length === 0 ? (
                    <AlertEmptyMessage>회원이 없습니다.</AlertEmptyMessage>
                ) : (
                    filteredMembers.map((member) => (
                        <MemberSearchItem
                            key={member.id}
                            member={member}
                            handleMemberClick={props.handleMemberClick}
                        />
                    ))
                )}
            </ScrollableSubContainer>
        </Frame>
    );
};

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100vh;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 0px 16px 16px 0px;
  background-color: white;
  padding: 5px;
  user-select: none;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.div` // 닫기 버튼
    position: absolute; 
    right: 15px; 
    cursor: pointer;
`;

const AlertEmptyMessage = styled.div` 
  margin-top: 20px;
  font-size: 13px;
  color: gray;
`;

const TitleContainer = styled.div`
  display: flex;
  width: 90%;
  padding: 15px 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  text-align: center;
  margin: 10px;
`;

const SearchInput = styled.input`
  padding: 5px;
  height: 20px;
  border-radius: 8px;
  margin: auto;

  &:focus {
        outline: none;
        border-color:  #ccebb5; 
        box-shadow: 0 0 5px  #ccebb5;
    }
`;

const ScrollableSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  border-top: 1px solid rgb(235, 235, 235);
  scrollbar-width: thin;
  scrollbar-color: gray lightgray;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: gray;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: darkgray;
  }

  ::-webkit-scrollbar-track {
    background-color: lightgray;
  }
`;

export default MemberSearchForm;