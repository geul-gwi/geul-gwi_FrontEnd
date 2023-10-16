import React , {useState} from 'react';
import styled from 'styled-components';

// 알람 타입 : 좋아요, 팔로우, 댓글

const AlertBox = (props) => {

    const [isFollowing, setIsFollowing] = useState(props.isFollowing);

    const handleDelete = () => {
        props.onDelete(props.index);
    };

    const handleToggleFollow = () => {

        // 팔로우/팔로잉 동작 처리 로직 추가
        setIsFollowing(!isFollowing);
        
        // 상위 컴포넌트로 팔로우 상태를 전달
        if (props.onToggleFollow) {
            props.onToggleFollow(!isFollowing);
        }
    };

    return (
        <Frame>
            <ProfileImage src={props.profile || '/img/defaultProfile.png'} />
            <ContentContainer>
                <TopRow>
                    <Name>{props.userName}</Name>
                    <Content>{props.alert}</Content>
                </TopRow>
                <Time>{props.time}</Time>
            </ContentContainer>
            {props.type === "follow" && (
                <FollowButton
                    onClick={handleToggleFollow}
                    isFollowing={isFollowing}
                >
                    {isFollowing ? "팔로잉" : "팔로우"}
                </FollowButton>
            )}
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