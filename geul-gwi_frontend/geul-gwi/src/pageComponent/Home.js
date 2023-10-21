// Library Import!
import React, {useContext, useState} from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';


// component Import!
import Header from 'component/common/header/Header';
import Navigation from 'component/main/Home/Navigation';
import Weather from "component/main/Home/Weather"
import ShowTrend from 'component/main/Home/ShowTrend';

// Page Component Import
import FeedPage from 'pageComponent/FeedPage';
import WritePage from 'pageComponent/WritePage';
import WriteChallengePage from 'pageComponent/WriteChallengePage';
import ProfilePage from 'pageComponent/ProfilePage';
import ProfileEditPage from 'pageComponent/ProfileEditPage';
import SearchPage from 'pageComponent/SearchPage';
import MessagePage from 'pageComponent/MessagePage';
import MessageWritingPage from 'pageComponent/MessageWritingPage';

// src Import!
import path from 'img/back_gradient.jpg';
// Context Import
import { userStoreContext } from 'contextStore/UserStore';
// Redux Import
import { useDispatch, useSelector } from 'react-redux'; // Redux 사용 Library


const Home = () => {
    // const userContext = useContext(userStoreContext);
    const isLogged = useSelector((state) => state.authReducer.accessToken === null ? false : true);
    console.log("accessToken in Reducer : "+useSelector((state) => state.authReducer.accessToken));
    console.log("Userseq in Reducer : "+useSelector((state) => state.authReducer.userSeq));


    // userContext.isLogged;

    // state For "window Size Check"
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    }
    const componentDidMount = () =>{
        window.addEventListener('resize',this.handleResize);
    }
    const componentWillUnMount = () =>{
        window.removeEventListener('resize', this.handleResize);
    }
    
    return (
        <div>
            <HeadWhite/>
            <BackImg/>
            <Frame>
                {/* <img src={process.env.PUBLIC_URL + "/icon/Navigation/home.svg"}></img> */}
                { isLogged?
                '' : <h1><Navigate to="/user/login" replace={true}/></h1>
                    
                }
                
                
                {/* 헤드 Container */}
                <HeadContainer>
                    <Header />
                </HeadContainer>

                {/* 왼쪽 Container */}
                <LeftContainer>
                    <Navigation/>
                    <Weather />
                </LeftContainer>
                {/* 가운데 Container */}
                <MidContainer>
                    <Routes>
                        <Route path="/" element={<FeedPage /> }></Route>
                        <Route path="/Writing" element={<WritePage />}></Route>
                        <Route path="/WritingChallenge" element={<WriteChallengePage />}></Route> 
                        <Route path="/Profile" element={<ProfilePage />}></Route>
                        <Route path="/ProfileEdit" element={<ProfileEditPage />}></Route>
                        <Route path="/Search" element={<SearchPage />}></Route>
                        <Route path="/Message" element={<MessagePage />}></Route>
                        <Route path="/MessageWriting" element={<MessageWritingPage />}></Route>
                    </Routes>

                </MidContainer>
                {/* 오른쪽 Container */}
                {
                    window.innerWidth <= '1200px' ?
                    "" :
                    <RightContainer>
                        <ShowTrend />
                    </RightContainer>
                }
                


                {/* 콘텐츠들을 담아줄  Container */}
                
                
                

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
    height : 100vh;
    top: 0;
    left : 0;
    z-index: -1;
    background-image: url(${path});
    /* background-color : red;   */
    background-position : "center";
    background-repeat : "no-repeat";
    background-size: cover;
`


// Container는 LeftContainer , MidContainer , RightContainer 세 부분으로 나뉜다
// StyledComponent
const HeadWhite = styled.div`
    position : fixed;
    width : 100%;
    height : 70px;
    background-color : white;
    z-index : 1;
`

const HeadContainer = styled.div`
    position : fixed;
    top : 0%;
    left : 0%;
    width : 100%;
    height : 70px;
    z-index : 1;
`
const ContainerFrame = styled.div`
    position : absolute;
    width : 180px;
    height: 700px;
    margin-top : 20px;
`

const LeftContainer = styled(ContainerFrame)`
    position : fixed;
    display : flex;
    left : 40px;
    top : 100px;
    height : 470px;
    z-index : 1;
    flex-direction : column;
    justify-content: space-between;
`
const MidContainer = styled(ContainerFrame)`
    position : absolute;
    top : 100px;
    left : calc(50% - 350px);
    width : 630px;
    min-height : 600px;
    height : auto;
`
const RightContainer = styled(ContainerFrame)`
    position : fixed;
    display : flex;
    width : 250px;
    right : 40px;
    top : 100px;

    flex-direction : column;
    justify-content: space-between;
`

// 메인 게시글 콘테이너




export default Home;