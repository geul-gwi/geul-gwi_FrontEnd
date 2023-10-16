import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Component
import Home from 'pageComponent/Home';

// Import Context
import UserStore from 'contextStore/UserStore';

const MainRoute = () => {
    return (
        <Routes>
            <Route path='/*' element={<Home />}></Route>
        </Routes>
    );
};

export default MainRoute;