import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Component
import Home from 'pageComponent/Home';
import ManagerPage from 'pageComponent/ManagerPage';

// Import Context
import UserStore from 'contextStore/UserStore';

const MainRoute = () => {
    return (
        <Routes>
            <Route path='/*' element={<Home />}></Route>
            <Route path='/manager/*' element={<ManagerPage />}></Route>
        </Routes>
    );
};

export default MainRoute;