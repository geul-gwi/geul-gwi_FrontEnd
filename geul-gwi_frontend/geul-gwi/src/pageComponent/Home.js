import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

// component 
import Navigation from 'component/main/LeftNavi/Navigation';
import Weather from "component/main/Home/Weather"
import ShowTrend from 'component/main/Home/ShowTrend';
import ChallengeRank from 'component/main/Home/ChallengeRank';

// page
import SearchPage from 'pageComponent/SearchPage';
import WritePage from 'pageComponent/WritePage';
import WriteChallengePage from 'pageComponent/WriteChallengePage';
import ProfilePage from 'pageComponent/ProfilePage';
import ProfileEditPage from 'pageComponent/ProfileEditPage';
import MessagePage from 'pageComponent/MessagePage';
import MessageWritingPage from 'pageComponent/MessageWritingPage';
import PostEditPage from 'pageComponent/PostEditPage';
import ChallengePostEditPage from 'pageComponent/ChallengePostEditPage';

import path from 'img/background.jpg';

// Redux Import
import { useSelector } from 'react-redux'; // Redux 사용 Library

const Home = () => {
    const isLogged = useSelector((state) => state.authReducer.accessToken === null ? false : true);

    return (
        <div>
            <BackImg />
            <Frame>
                {isLogged ? '' : <h1><Navigate to="/accounts" replace={true} /></h1>}
                <LeftContainer>
                    <Navigation />
                </LeftContainer>
                <MidContainer>
                    <Routes>
                        <Route path="/" element={<SearchPage />}></Route>
                        <Route path="/Writing" element={<WritePage />}></Route>
                        <Route path="/WritingChallenge" element={<WriteChallengePage />}></Route>
                        <Route path="/Profile" element={<ProfilePage />}></Route>
                        <Route path="/ProfileEdit" element={<ProfileEditPage />}></Route>
                        <Route path="/Search" element={<SearchPage />}></Route>
                        <Route path="/Message" element={<MessagePage />}></Route>
                        <Route path="/MessageWriting" element={<MessageWritingPage />}></Route>
                        <Route path="/PostEdit" element={<PostEditPage />}></Route>
                        <Route path="/ChallengePostEdit" element={<ChallengePostEditPage />}></Route>
                    </Routes>
                </MidContainer>
                {
                    window.innerWidth <= '1000px' ?
                        "" :
                        <RightContainer>
                            <Weather />
                            <ChallengeRank/>
                            <ShowTrend />
                        </RightContainer>
                }
            </Frame>
        </div>
    );
};

const Frame = styled.div`
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
`;

const BackImg = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    background: #F9F7DA;
    z-index: -1;
`;

const ContainerFrame = styled.div`
    display: flex;
    position: relative;
`;

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

    @media (max-width: 1300px) {
        width: 80px; /* 반절 크기로 축소 */
    }
`

const MidContainer = styled(ContainerFrame)`
    flex: 1;
    margin: 0 20px;
`

const RightContainer = styled(ContainerFrame)`
    position: fixed;
    display: flex;
    width: 250px;
    right: 50px;
    top: 30px;
    flex-direction: column;
    gap: 30px;
    z-index: 10;
    @media (max-width: 1300px) {
        display: none;
    }
`

export default Home;