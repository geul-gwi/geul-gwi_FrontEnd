import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { FiUsers, FiTrello, FiTag } from 'react-icons/fi';

const ManagerLeftNav = () => {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState(null);

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <NavBar>
            <ItemContainer>
                <Item
                    onClick={() => handleNavigation('/manager/member')}
                    active={activeItem === 'member'}
                    onMouseEnter={() => setActiveItem('member')}
                    onMouseLeave={() => setActiveItem(null)}
                >
                    <IconContainer active={activeItem === 'member'}>
                        <FiUsers size={24} />
                    </IconContainer>
                    <ItemLabel active={activeItem === 'member'}>회원</ItemLabel>
                </Item>
                <Item
                    onClick={() => handleNavigation('/manager/challenge')}
                    active={activeItem === 'challenge'}
                    onMouseEnter={() => setActiveItem('challenge')}
                    onMouseLeave={() => setActiveItem(null)}
                >
                    <IconContainer active={activeItem === 'challenge'}>
                        <FiTrello size={24} />
                    </IconContainer>
                    <ItemLabel active={activeItem === 'challenge'}>챌린지</ItemLabel>
                </Item>
                <Item
                    onClick={() => handleNavigation('/manager')}
                    active={activeItem === 'tag'}
                    onMouseEnter={() => setActiveItem('tag')}
                    onMouseLeave={() => setActiveItem(null)}
                >
                    <IconContainer active={activeItem === 'tag'}>
                        <FiTag size={24} />
                    </IconContainer>
                    <ItemLabel active={activeItem === 'tag'}>태그</ItemLabel>
                </Item>
            </ItemContainer>
        </NavBar>
    );
};


const NavBar = styled.div`
    position: fixed;
    width: 80px;
    height: 50vh;
    top: 25%;
    left: 0;
    margin: auto;
    background-color: white;
    border-radius: 8px;
    user-select: none;
`;


const ItemContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
`;

const Item = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 80px;
    justify-content: center;
    margin-bottom: 10px;
    cursor: pointer;
    transition: border 0.2s ease;
`;


const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    margin-bottom: 8px;
    transition: opacity 0.3s ease;
    ${(props) =>
        props.active &&
        css`
            opacity: 1;
        `}
    &:hover {
        opacity: 1;
    }
`;

const ItemLabel = styled.h4`
    margin: 0;
    font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
`;

export default ManagerLeftNav;