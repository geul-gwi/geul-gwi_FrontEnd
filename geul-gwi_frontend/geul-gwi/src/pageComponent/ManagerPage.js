import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import ManagerLeftNav from 'component/manager/ManagerLeftNav';

import TagManagement from 'component/manager/tag/TagManagement';
import MemberManagement from 'component/manager/member/MemberManagement';
import ChallengeManagement from 'component/manager/challenge/ChallengeManagement';
import Navigation from 'component/main/Home/Navigation';

const ManagerPage = () => {
    return (
        <MainContainer>
                <LeftContainer>
                    <Navigation />
                </LeftContainer>
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
    position : fixed;
    width : 100%;
    top: 0;
    left : 0;
    z-index: -1;
    //background: linear-gradient(to right, #F9F7DA, #F5ED98);
    height: 100vh;
    background:#F9F7DA
`

const MainContainaer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width : 100%;
    height : 100%;                
    text-align: center;
`

const ContainerFrame = styled.div`
    position : absolute;
    width : 200px;
    height: 700px;
`

const LeftContainer = styled(ContainerFrame)`
    position : fixed;
    display : flex;
    left : 0px;
    top : 0px;
    height : 100vh;
    width: 320px;
    z-index : 10;
    flex-direction : column;
    justify-content: space-between;

    @media (max-width: 1000px) {
        width: 80px; /* 반절 크기로 축소 */
    }
`

export default ManagerPage;