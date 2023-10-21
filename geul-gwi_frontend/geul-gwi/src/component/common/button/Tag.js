import styled from 'styled-components';

export const TagButton = styled.button`
    background-color: ${props => props.backColor};
    color: ${props => props.fontColor};
    border: none;
    border-radius: 20px;
    padding: 8px 15px;
    cursor: pointer;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: ${props => props.selected ? props.backColor : '#f0f0f0'};
        transform: translateY(-2px);
        box-shadow: ${props => props.selected ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'};
    }
`;

export const Tag = styled.div`
    background-color: ${props => props.backColor};
    color: ${props => props.fontColor};
    border: none;
    border-radius: 20px;
    padding: 8px 15px;
    cursor: pointer;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    transition: all 0.3s ease-in-out;
`;