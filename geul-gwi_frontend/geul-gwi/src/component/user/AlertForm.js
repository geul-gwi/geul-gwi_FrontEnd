import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AlertBox from "component/user/AlertBox";

const generateAlertMessage = (type, commentText) => {
    switch (type) {
        case 'like':
            return '님이 회원님의 게시물을 좋아합니다.';
        case 'follow':
            return '님이 회원님을 팔로우하기 시작했습니다.';
        case 'comment':
            return `님이 댓글을 남겼습니다: ${commentText}`;
        default:
            return '알 수 없는 알림 타입';
    }
};

const AlertForm = () => {
    const [alertData, setAlertData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/alertData') 
            .then((response) => {
                setAlertData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('데이터 불러오기 실패:', error);
                setLoading(false);
            });
    }, []);

    // 알림 삭제 처리 함수
    const handleDeleteAlert = (index) => {
        const updatedData = alertData.filter((_, idx) => idx !== index);
        setAlertData(updatedData);
    };

    return (
        <Frame>
            <TitleContainer>
                <span>알람</span>
            </TitleContainer>
            <ScrollableSubContainer>
                {alertData.length === 0 ? (
                    <AlertEmptyMessage>알림이 없습니다.</AlertEmptyMessage>
                ) : (
                    alertData.map((element, idx) => (
                        <AlertBox
                            key={idx}
                            index={idx}
                            userName={element.userName}
                            alert={generateAlertMessage(element.type, element.commentText)}
                            profile={element.profile}
                            time={element.time}
                            type={element.type}
                            isFollowing={element.isFollowing}
                            commentText={element.commentText}
                            onDelete={handleDeleteAlert}
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