import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserStore from 'contextStore/UserStore';

// Component 
import Account from 'Routes/Account';
import MainRoute from 'Routes/main/MainRoute';
import Home from 'pageComponent/Home';
import ManagerPage from 'pageComponent/ManagerPage';

const RootRoute = () => {
    return (
        <BrowserRouter> 
            <UserStore>
                <Routes>
                    <Route path='/main/*' element={<Home />}></Route>
                    <Route path='/*' element={<Account />}></Route>
                    <Route path='/main/*' element={<MainRoute />}></Route>
                    <Route path='/manager/*' element={<ManagerPage />}></Route>
                </Routes>
            </UserStore>
        </BrowserRouter>
    );
};


export default RootRoute;