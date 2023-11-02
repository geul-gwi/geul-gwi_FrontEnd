import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

// component 
import Navigation from 'component/main/Home/Navigation';
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
    position : relative;
    width : 1200px;
    height: auto;
    min-height : 100vh;
    margin : 0 auto;
    
`

const BackImg = styled.div`
    position : fixed;
    width : 100%;
    top: 0;
    left : 0;
    z-index: -1;
    //background: linear-gradient(to right, #F9F7DA, #F5ED98);
    height: 100vh;
    background:#F9F7DA
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

const MidContainer = styled(ContainerFrame)`
    position : absolute;
    top : 30px;
    left : calc(50% - 350px);
    width : 630px;
    min-height : 100vh;
    height : auto;

    @media (max-width: 1000px) {
        left: calc(50% - 165px); /* 조정된 가운데 정렬 */
    }
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
    @media (max-width: 1000px) {
        display: none;
    }
`

export default Home;