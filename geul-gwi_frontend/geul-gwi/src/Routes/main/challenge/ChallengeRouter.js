import Home from "component/main/Home";
import React from "react";
import { Route, Router, Routes } from "react-router-dom";

// Import Component
import WriteChallenge from "./WriteChallenge";

const ChallengeRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<WriteChallenge />}></Route>
            <Route path='/show_post/*' elemen={''}></Route>
            <Route path='/write_post/*' element={<WriteChallenge />}></Route>
        </Routes>
    );
}

export default ChallengeRouter;