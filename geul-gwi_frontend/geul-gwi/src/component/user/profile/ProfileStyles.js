import styled from 'styled-components';
import { FaUserFriends } from 'react-icons/fa';

export const MainContainer = styled.div`
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

export const ProfilePicture = styled.img`
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

export const StatsContainer = styled.div`
    display: flex;
    align-items: center; 
    margin-bottom: 15px;
    div {
        margin: 0 10px;
        display: flex; 
        align-items: center; 
    }
    svg {
        margin-right: 5px; 
    }
`;

export const Button = styled.div`
    padding: 10px 50px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 15px;
    cursor: pointer;

    &:hover {
        background-color: #f2f2f2;
    }
`;

export const ModalOverlay = styled.div`
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

export const ModalContent = styled.div`
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

export const UserFriendsIcon = styled(FaUserFriends)`
    font-size: 20x;
    margin-right: 5px;
`;

export const NameText = styled.p`
    margin: 30px 0px;
    font-size: 25px;
`;

export const InfoText = styled.p`
    margin: 0px;
    margin-bottom: 15px;
    color: grey;
`;

export const StatCount = styled.p`
    margin-left: 5px;
`;

export const StatLabel = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #444;
    margin-bottom: 10px;

    svg {
        margin-right: 5px;
    }
`;