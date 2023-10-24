import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import styled from 'styled-components';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux'; // Redux 사용 Library
import AlertBox from "component/user/AlertBox";

const TYPE = {};
TYPE['FRIEND'] = 'friendSeq';
TYPE['MESSAGE'] = 'meesageSeq';
TYPE['GEULGWI'] = 'geulgwiSeq';
TYPE['LIKE_GEULGWI'] = 'geulgwiLikeSeq';
TYPE['CHALLENGE'] = 'challenge';
TYPE['LIKE_CHALLENGE'] = 'challengeLickSeq';

const AlertForm = () => {
    const navigate = useNavigate();
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);
    const noticeListUrl = '/notice/list/'; // 유저 세부 정보 불러오기 요청 주소

    const [noticeList, setNoticeList] = useState();

    useEffect(() => {
        async function fetchUserProfile() {
            try {
                const response = await Axios.get(`${axiosAddr}${noticeListUrl}${userSeq}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });

                console.log('알림 리스트 불러오기 성공 : ', response.data);
                setNoticeList(response.data);

            } catch (error) {
                console.log('알림 리스트 불러오기 실패:', error);
            }
        }
        fetchUserProfile();
    }, []);

    // 알림 삭제 처리 함수
    const handleDeleteAlert = async (index) => {
        try {
            const response = await Axios.delete(`${axiosAddr}${noticeListUrl}${userSeq}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            console.log('처음에 받은 프로필 : ', response.data.profile);

        } catch (error) {
            console.log('프로필 불러오기 실패:', error);
        }

        const updatedData = noticeListUrl.filter((_, idx) => idx !== index);
        setNoticeList(updatedData);
    };

    return (
        <Frame>
            <TitleContainer>
                <span>알람</span>
            </TitleContainer>
            <ScrollableSubContainer>
                {noticeList === null ? ( // noticeList가 null인 경우
                    <AlertEmptyMessage>알림이 없습니다.</AlertEmptyMessage>
                ) : (
                    noticeList.map((element) => (
                        <AlertBox
                            element={element}
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
  width: 450px;
  height: 600px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: white;
  padding: 5px;
  user-select: none;
`;

const AlertEmptyMessage = styled.div`
  margin-top: 20px;
  font-size: 13px;
  color: gray;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 15px 20px;
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

export default AlertForm;