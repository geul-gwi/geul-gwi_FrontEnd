import React, { useState } from 'react';
import styled from 'styled-components';

import PasswordChangeForm from 'component/user/profile/edit/PasswordChangeForm';

const ProfileEditUser = (props) => {
    const PublicWritingIconPath = process.env.PUBLIC_URL + "/icon/Writing/"
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [showProfileImage, setShoeProfileImage] = useState(props.newProfile);

    // 프로필 사진 삭제 
    const handleDeleteProfileImg = () => {
        props.setNewProfile(null);
        setShoeProfileImage(null);
    };

    // 모달 창 ON/OFF
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // 프로필 사진 변경
    const handleProfileImgChange = (event) => {
        const file = event.target.files[0];
        props.setNewProfile(file);
        setShoeProfileImage(URL.createObjectURL(file));
    };

    return (
        <MainContainer>
            <Tittle>프로필 수정</Tittle>
            <ProfilePicture
                src={showProfileImage ? (showProfileImage) : null || '/img/defaultProfile.png'}
                onClick={toggleModal}
            />
            <ImageEditButton onClick={setIsModalOpen}>
                사진 수정 또는 삭제
            </ImageEditButton>
            <NameText>
                <InputTittle>닉네임</InputTittle>
                <NameInput
                    value={props.newNickName}
                    onChange={(e) => props.setNewNickname(e.target.value)}
                    onBlur={props.CheckNickname}
                />
                <ErrorMessage>{props.newNicknameError}</ErrorMessage>
            </NameText>
            
            <NameText>
                <InputTittle>소개</InputTittle>
                <IntroInput
                    value={props.newComment}
                    onChange={(e) => props.setNewComment(e.target.value)}
                    onBlur={props.CheckComment}
                />
                <ErrorMessage>{props.newCommentError}</ErrorMessage>
                <CharCount>{props.newComment ? `${props.newComment.length} / 300자` : "0 / 300자"}</CharCount>
            </NameText>

            <ShowButton onClick={() => props.setShowPasswordChange(!props.showPasswordChange)}>
                <ButtonTextContainer>비밀번호 재설정</ButtonTextContainer>
                <ButtonIconContainer>
                    <Iconimg src={PublicWritingIconPath + "plus.svg"} />
                </ButtonIconContainer>
            </ShowButton>

            {props.showPasswordChange && (
                <PasswordChangeForm
                    curPassword={props.curPassword}
                    setCurPassword={props.setCurPassword}
                    newPassword={props.newPassword}
                    confirmNewPassword={props.confirmNewPassword}
                    setNewPassword={props.setNewPassword}
                    setConfirmNewPassword={props.setConfirmNewPassword}
                    currentPasswordError={props.currentPasswordError}
                    confirmNewPasswordError={props.confirmNewPasswordError}
                    passwordChangeError={props.passwordChangeError}
                    CheckConfirmNewPassword={props.CheckConfirmNewPassword}
                    CheckCurPassword={props.CheckCurPassword}
                    CheckNewPassword={props.CheckNewPassword}
                />
            )}

            {isModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <img src={showProfileImage} />
                        <ModalButtonGroup>
                            <input id="fileInput" type="file" accept="image/*" onChange={handleProfileImgChange} />
                            <Button onClick={handleDeleteProfileImg}>삭제</Button>
                            <Button onClick={toggleModal}>닫기</Button>
                        </ModalButtonGroup>
                    </ModalContent>
                </ModalOverlay>
            )}
            
            <DeleteAccountText onClick={() => props.setIsAcountDelete(!props.isAcountDelete)}>계정 탈퇴하기</DeleteAccountText>
            {props.isAcountDelete && (<>
                <PasswordInput
                    value={props.accountDeletePassword}
                    onChange={(e) => props.setAccountDeletePassword(e.target.value)}
                />
                <AccountDeleteText>비밀번호 입력 후 확인을 눌러주세요</AccountDeleteText>
                <Button onClick={props.handleDeleteAccount}>확인</Button>
            </>
            )}
        </MainContainer>
    );
};

const DeleteAccountText = styled.div`
    color: red; // 스타일을 원하는 대로 수정할 수 있습니다.
    cursor: pointer;
    font-size: 12px;
    margin-top: 20px;
    &:hover {
        text-decoration: underline;
    }
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: 12px;
    margin: 0px;
`;

 const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: auto;
    padding: 30px 0px;
    user-select: none;
    border-radius: 16px;
`;

 const Tittle = styled.span`
    font-size: 20px;
    margin: 0;
    margin-bottom: 30px;
`;

 const ImageEditButton = styled.p`
    color: #007bff;
    cursor: pointer;
    font-size: 12px;
    margin: 0px;
    &:hover {
        text-decoration: underline;
    }
`;

 const ProfilePicture = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 15px;
    cursor: pointer;
    object-fit: cover; 
    border: 2px solid #ccc;

    &:hover {
        transform: scale(1.1);
        transition: transform 0.2s ease-in-out;
    }
`;

 const Button = styled.button`
    background-color: white;
    width: 100px;
    height: 35px;
    border: 1px solid #ccc;
    border-radius: 8px;
    cursor: pointer;
    
    &:hover {
        background-color: #f2f2f2;
    }
`;

 const ModalOverlay = styled.div`
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

 const ModalContent = styled.div`
    width: 500px;
    height: 500px;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 100%;
        max-width: 400px;
    }
`;

 const ModalButtonGroup = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
`;

 const NameText = styled.p`
    margin: 0px;
    margin: 10px 0px;
    font-size: 30px;

`;

const AccountDeleteText = styled.p`
    font-size: 12px;
    color: red;
    margin: 0px;
    margin-bottom: 10px;
`;

 const InputTittle = styled.p`
    font-size: 14px;
    color: #444;
    margin: 0;
`;

 const CharCount = styled.div`
    font-size: 12px;
    color: gray;
    margin-top: 5px;
`;

// 이름 입력 필드 스타일
 const NameInput = styled.input`
    width: 400px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 8px;

    &:focus {
        outline: none;
    }
`;

const PasswordInput = styled.input`
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin: 10px;
    &:focus {
        outline: none;
    }
`;

// 소개 입력 필드 스타일
 const IntroInput = styled.textarea`
    width: 400px;
    height: 100px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 8px;

    &:focus {
        outline: none;
    }
`;

 const ShowButton = styled.div`
    display : flex;
    width : 140px;
    height : 50px;
    padding : 0px 10px;
    border-radius: 18px;
    box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.25);
    align-items: center; 
    justify-content: space-between;
    cursor : pointer;
    transition : 0.2s;

    &:hover {
        background-color: #f2f2f2;
    }
`

 const ButtonTextContainer = styled.div`
    display : flex;
    width : 100px;
    height : 80px;
    justify-content: center; 
    align-items: center;
    font-size : 12px; color : black;
`
 const ButtonIconContainer = styled.div`
    display : flex;
    width : 15px;
    height : 15px;
    justify-content: center;
    align-items: center;
`

 const Iconimg = styled.img`
    width : 100%;
    height : 100%;
    object-fit: contain;
`


export default ProfileEditUser;