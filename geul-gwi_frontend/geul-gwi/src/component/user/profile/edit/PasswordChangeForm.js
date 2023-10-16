import React from 'react';
import styled from 'styled-components';

const PasswordChangeForm = (props) => {
    return (
        <Container>
            <Field>
                <Tittle>기존 비밀번호 입력</Tittle>
                <Input
                    type="password"
                    onChange={(e) => props.setCurPassword(e.target.value)}
                    onBlur={props.CheckCurPassword}
                />
                <ErrorMessage>{props.currentPasswordError}</ErrorMessage>
            </Field>
            <Field>
                <Tittle>새 비밀번호 입력</Tittle>
                <Input
                    type="password"
                    onChange={(e) => props.setNewPassword(e.target.value)}
                    onBlur={props.CheckNewPassword}
                />
               <ErrorMessage>{props.passwordChangeError}</ErrorMessage>
            </Field>
            <Field>
                <Tittle>새 비밀번호 재입력</Tittle>
                <Input
                    type="password"
                    onChange={(e) => props.setConfirmNewPassword(e.target.value)}
                    onBlur={props.CheckNewPassword}
                />
                <ErrorMessage>{props.confirmNewPasswordError}</ErrorMessage>
            </Field>
            <h5>비밀번호 재설정을 원치 않는 경우 창을 닫아주세요!</h5>
        </Container>
    );
};

const Container = styled.div`
    display : flex;
    align-items: center;
    flex-direction: column;
    height: auto;
    padding: 20px;
    margin-top: 20px;
    justify-content: center;
    user-select: none;
`;

const Field = styled.div`
    margin: 10px 0px;
    width: 400px;
`;

const Tittle = styled.p`
    font-size: 14px;
    color: #444;
    margin: 0;
`;

const Input = styled.input`
    font-size: 18px;
    margin-bottom: 10px;
    padding: 3px;
    border: 1px solid #ccc;
    border-radius: 8px;

    &:focus {
        outline: none;
    }
`;

const Button = styled.button`
    margin-top: 20px;
    background-color: white;
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    
    /* 호버 효과 추가 */
    &:hover {
        background-color: #f2f2f2;
    }
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: 12px;
    margin: 0px;
`;

export default PasswordChangeForm; 