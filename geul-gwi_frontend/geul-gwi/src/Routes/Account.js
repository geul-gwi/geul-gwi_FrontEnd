import React from "react";
import 'css/Login.css'
import styled from "styled-components";
import {Routes, Route} from 'react-router-dom';

// component
import Register from "component/user/register/RegisterAction";
import LoginForm from "component/user/login/LoginForm";
import PasswordRecoveryForm from 'component/user/login/PasswordRecoveryForm';
import IDRecoveryForm from "component/user/login/IDRecoveryForm";

const Account = () => {
    return (
        <div className="Login" style={{overflow : "hidden"}}>
            <Circle1 /><Circle2 /><Circle3 /><Circle4 />
        <Routes>
            <Route path="/" element={<LoginForm />}></Route>
            <Route path="/register/*" element={<Register />}></Route>
            <Route path="/id/*" element={<IDRecoveryForm />}></Route>
            <Route path="/password/*" element={<PasswordRecoveryForm />}></Route>
        </Routes>
        </div>
    );
};


// StyleComponent CSS 
const Circle_frame=styled.div`
    width : 25px;
    height : 25px;
    border-radius: 50%;
    background-color: white;
    opacity: 0;

    @keyframes wave{
        0%{
            scale: 100%;
            opacity: 0.8;
        }
        40%{
            opacity : 0.3;
        }
        100%{
            scale: 2000%;
            opacity: 0;
        }
    }
`
const L_Circle_frame=styled(Circle_frame)`
    position: absolute;
    bottom: -25px;
    left: -25px;
`
const R_Circle_frame=styled(Circle_frame)`
    position: absolute;
    top: -25px;
    right: -25px;
`
const Circle1=styled(L_Circle_frame)`
    animation: wave 4s infinite linear;
`
const Circle2=styled(L_Circle_frame)`
    animation: wave 4s infinite 0.5s linear;
`
const Circle3=styled(R_Circle_frame)`
    animation: wave 4s infinite linear;
`
const Circle4=styled(R_Circle_frame)`
    animation: wave 4s infinite 2s linear;
`
export default Account;