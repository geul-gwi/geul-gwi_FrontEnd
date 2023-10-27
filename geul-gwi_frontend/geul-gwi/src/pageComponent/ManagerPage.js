import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import ManagerLeftNav from 'component/manager/ManagerLeftNav';

import TagManagement from 'component/manager/tag/TagManagement';
import MemberManagement from 'component/manager/member/MemberManagement';
import ChallengeManagement from 'component/manager/challenge/ChallengeManagement';
import Navigation from 'component/main/Home/Navigation';
import path from 'img/back_gradient.jpg';

const ManagerPage = () => {
    return (
        <MainContainer>
            <Navigation/>
            <ManagerLeftNav />
            <HeadBackImg />
            <MainContainaer>
                <Routes>
                    <Route path="/" element={<TagManagement />} ></Route>
                    <Route path="/challenge/*" element={<ChallengeManagement />} ></Route>
                    <Route path="/member/*" element={<MemberManagement />}></Route>
                </Routes>
            </MainContainaer>
        </MainContainer>
    );
};

const MainContainer = styled.div`
    height: 100vh;
`

const HeadBackImg = styled.div`
    position : absolute;
    width : 100%;
    height : 1200px;
    top: 0;
    left : 0;
    z-index: -1;
    background-image: url(${path});
    background-position : "center";
    background-repeat : "no-repeat";
    background-size: cover;
`

const MainContainaer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width : 100%;
    height : 100%;                
    text-align: center;
`

const HeadContainer = styled.div`
    position : relative;
    top : 0%;
    width : 100%;
    height : 150px;
`

export default ManagerPage;