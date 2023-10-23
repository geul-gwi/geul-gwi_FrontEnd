import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {AxiosAddrContext} from 'contextStore/AxiosAddress';

const ProfileEditTagForm = (props) => {
    const axiosAddress = useContext(AxiosAddrContext).axiosAddr;
    const [tags, setTags] = useState([]);
    const tagListUrl = '/tag/list/DEFAULT'
    useEffect(() => {
        axios.post(`${axiosAddress}${tagListUrl}`)
            .then(response => {
                console.log(response);
                setTags(response.data);
            })
            .catch(error => {
                console.log('사용자 태그 리스트 불러오기 실패' + error);
            });
    }, []);

    // 태그 선택
    const handleAddTag = (tagToAdd) => {
        if (props.selectedTags.length >= 3) return; 
        if (props.selectedTags.some((selectedTag) => selectedTag.value === tagToAdd.value)) {
            
            return; // 이미 선택된 태그인 경우 추가하지 않음
        }

        props.setSelectedTags((prevSelectTags) => [...prevSelectTags, tagToAdd]);
    };

    // 태그 선택 취소
    const handleRemoveTag = (tagToRemove) => {
        const updatedTags = props.selectedTags.filter((tag) => tag.value !== tagToRemove.value);
        props.setSelectedTags(updatedTags);
    };

    return (
        <MainContainer>
            <Title>태그 설정</Title>
            <TagsContainer>
                {tags && tags.map(tag => (
                    <TagButton
                        fontColor={tag.fontColor}
                        backColor={tag.backColor}
                        onClick={() => handleAddTag(tag)}
                    >
                        {'# ' + tag.value}
                    </TagButton>
                ))}
            </TagsContainer>
            <Title>선택한 태그</Title>
            <TagsContainer>
                <SelectedTagsList>
                    {props.selectedTags && props.selectedTags.map(tag => (
                        <SelectedTag>
                            {'# ' + tag.value}
                            <RemoveTagButton onClick={() => handleRemoveTag(tag)}>x</RemoveTagButton>
                        </SelectedTag>
                    ))}
                </SelectedTagsList>
            </TagsContainer> 
        </MainContainer>
    );
};

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 30px 0px;
`;

const Title = styled.p`
    font-size: 18px;
    margin: 0px;
    margin-left: 20px;
`;

const TagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 20px;
`;

const TagButton = styled.button`
    background-color: ${props => props.backColor};
    color: ${props => props.fontColor};
    border: none;
    border-radius: 20px;
    padding: 8px 15px;
    cursor: pointer;
    font-size: 14px;
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

const SelectedTagsList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const SelectedTag = styled.div`
    background-color: #F0F2F5;
    color: #7A6B8A;
    border-radius: 20px;
    padding: 8px 15px;
    display: flex;
    align-items: center;
    font-size: 14px;
    position: relative;
`;

const RemoveTagButton = styled.button`
    background: none;
    border: none;
    color: red;
    cursor: pointer;
    margin-left: 8px;
    font-size: 18px;
`;

export default ProfileEditTagForm;