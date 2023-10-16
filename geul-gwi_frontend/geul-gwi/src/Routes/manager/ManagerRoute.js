import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

// Import Component
import ManagerForm from 'component/manager/ManagerForm';
import TagManagement from 'component/manager/tag/TagManagement';
import MemberManagement from 'component/manager/member/MemberManagement';
import ChallengeManagement from 'component/manager/challenge/ChallengeManagement';

const ManagerRoute = () => {
    return (
        <div>
            <ManagerForm />
            <MainContainaer>
                <Routes>
                    <Route path="/" element={<TagManagement />} ></Route>
                    <Route path="/challengeManagement/*" element={<ChallengeManagement />} ></Route>
                    <Route path="/memberManagement/*" element={<MemberManagement />}></Route>
                </Routes>
            </MainContainaer>
        </div>
    );
};

const MainContainaer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width : 100%;
    height : 100%;                
    text-align: center;
`

export default ManagerRoute;