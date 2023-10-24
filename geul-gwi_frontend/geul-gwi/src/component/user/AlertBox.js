import React , {useState} from 'react';
import styled from 'styled-components';



const TYPE = {};
TYPE['FRIEND'] = 'friendSeq';
TYPE['MESSAGE'] = 'messageSeq';
TYPE['GEULGWI'] = 'geulgwiSeq';
TYPE['LIKE_GEULGWI'] = 'geulgwiLikeSeq';
TYPE['CHALLENGE'] = 'challenge';
TYPE['LIKE_CHALLENGE'] = 'challengeLickSeq';

const AlertBox = (props) => {

    const { type, noticeSeq, fromUser, nickname, profile, regDate, checked } = props;
    const { messageSeq, friendSeq, geulgwiSeq, geulgwiLikeSeq, challengeeLikeSeq } = props; // 값 존재 or null

    const handleDelete = () => {
        props.onDelete(props.index);
    };

    const generateMessage = () => {
        switch (type) {
            case 'FRIEND':
                return `${nickname}님이 친구 요청을 했습니다.`;
            case 'MESSAGE':
                return `${nickname}님이 쪽지를 보냈습니다.`;
            case 'GEULGWI':
                return `${nickname}님이 글 귀를 작성했습니다.`;
            case 'LIKE_GEULGWI':
                return `${nickname}님이 회원님의 글 귀에 좋아요를 눌렀습니다.`;
            case 'CHALLENGE':
                return `${nickname}님이 챌린지 글 귀를 작성했습니다.`;
            case 'LIKE_CHALLENGE':
                return `${nickname}님이 회원님의 챌린지에 좋아요를 눌렀습니다.`;
            default:
                return '알 수 없는 알림 타입';
        }
    };

    return (
        <Frame>
            <ProfileImage src={profile || '/img/defaultProfile.png'} />
            <ContentContainer>
                <TopRow>
                    <Content>{generateMessage()}</Content>
                </TopRow>
                <Time>{regDate}</Time>
            </ContentContainer>
            <CloseButton onClick={handleDelete}>&times;</CloseButton>
        </Frame>
    );
};

const Frame = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: auto;
    background-color: white;
    transition: background-color 0.2s;
    font-size: 14px;
    padding: 5px;
    border-radius: 5px;
    &:hover {
        cursor: pointer;
        background-color: rgb(245, 245, 245);
    }
`;

const TopRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 4px;
`;

const ProfileImage = styled.img`
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid #ccc;
    margin-right: 10px;
    margin-left: 10px;
`;

const ContentContainer = styled.div`
    flex: 1;
`;

const Name = styled.div`
    font-weight: bold;
    margin-bottom: 2px;
`;

const Content = styled.div`
    color: #333;
    margin-bottom: 4px;
`;

const Time = styled.div`
    color: rgb(150, 150, 150);
    font-size: 12px;
`;

const CloseButton = styled.div`
    margin-left: auto;
    padding: 0 10px;
    font-size: 20px;
    cursor: pointer;
`;

const FollowButton = styled.button`
    background-color: ${props => props.isFollowing ? "#f2f2f2" : "#3498db"};
    color: ${props => props.isFollowing ? "#333" : "white"}; 
    border: none;
    padding: 5px 15px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 12px;
    transition: background-color 0.3s, color 0.3s;
    
    &:hover {
        background-color: ${props => props.isFollowing ? "#e0e0e0" : "#2380c1"};
    }
`;

export default AlertBox;