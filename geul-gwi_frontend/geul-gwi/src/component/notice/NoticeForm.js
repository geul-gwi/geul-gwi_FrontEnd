import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { AxiosAddrContext } from 'contextStore/AxiosAddress';
import { useSelector } from 'react-redux'; // Redux 사용 Library
import NoticeItem from 'component/notice/NoticeItem';
import { AiOutlineClose } from 'react-icons/ai';

const TYPE = {};
TYPE['FRIEND'] = 'friendSeq';
TYPE['MESSAGE'] = 'meesageSeq';
TYPE['GEULGWI'] = 'geulgwiSeq';
TYPE['LIKE_GEULGWI'] = 'geulgwiLikeSeq';
TYPE['CHALLENGE'] = 'challenge';
TYPE['LIKE_CHALLENGE'] = 'challengeLickSeq';

const NoticeForm = (props) => {
    //const navigate = useNavigate();
    const axiosAddr = useContext(AxiosAddrContext).axiosAddr;
    const userSeq = useSelector((state) => state.authReducer.userSeq);
    const userToken = useSelector((state) => state.authReducer.accessToken);
    const noticeListUrl = '/notice/list/'; // 유저 세부 정보 불러오기 요청 주소
    const noticeUpdateUrl = '/notice/update/'; // 알림 읽으 요청 주소
    const noticeDeleteUrl = '/notice/delete/'; // 알림 삭제 요청 주소

    const [notices, setNotices] = useState([]); // 알림 데이터

    useEffect(() => {
        async function fetchUserProfile() {
            try {
                const response = await Axios.get(`${axiosAddr}${noticeListUrl}${userSeq}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                //console.log('알림 목록: ', response.data);
                setNotices(response.data.reverse());
            } catch (error) {
                console.error('알림 목록:', error);
            }
        }
        fetchUserProfile();
    }, []);

    // 알림 삭제 처리
    const noticeDeleteHandler = async (noticeSeq) => {
        try {
            const response = await Axios.delete(`${axiosAddr}${noticeDeleteUrl}${noticeSeq}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            // console.log('알림 삭제 완료 : ', response);
            setNotices((prevNotices) => prevNotices.filter((notice) => notice.noticeSeq !== noticeSeq));
        } catch (error) {
            console.error('알림 삭제 실패 : ', error);
        }
    };

    // 알림 확인 처리
    const noticeUpdateHandler = async (noticeSeq) => {
        try {
            const response = await Axios.post(`${axiosAddr}${noticeUpdateUrl}${noticeSeq}`, {}, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            //console.log('알림 업데이트 완료 : ', response);
        } catch (error) {
            console.error('알림 업데이트 실패:', error);
        }
        setNotices((prevNotices) => prevNotices.map((notice) =>
            notice.seq === noticeSeq ? { ...notice, checked: 'T' } : notice
        ));
    };

    // 닫기 버튼 클릭 시 처리
    const onClickCloseButton = async () => {
        // checked가 false인 알림 아이템들의 noticeSeq 모으기
        const uncheckedNoticeSeqs = notices
            .filter((notice) => 'F')
            .map((notice) => notice.noticeSeq);

        // 요청 보내기
        for (const noticeSeq of uncheckedNoticeSeqs) {
            noticeUpdateHandler(noticeSeq);
        }

        // 알림창 닫기
        props.handleAlertClick();
    };

    return (
        <Frame>
            <TitleContainer>
                <span>알림</span>
                <CloseButton onClick={onClickCloseButton}>
                    <AiOutlineClose size={15} color='gray' />
                </CloseButton>
            </TitleContainer>
            <ScrollableSubContainer>
                {notices.length === 0 ? (
                    <AlertEmptyMessage>알림이 없습니다.</AlertEmptyMessage>
                ) : (
                    notices.map((notice) => (
                        <NoticeItem
                            notice={notice}
                            noticeDeleteHandler={noticeDeleteHandler}
                            handleAlertClick={props.handleAlertClick}
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
  height: 100vh;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 0px 10px 10px 0px;
  background-color: white;
  padding: 5px;
  user-select: none;
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

export default NoticeForm;