import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Context Import
import UserStore from 'contextStore/UserStore';

// Component Import
import User from 'Routes/user/User';
import MainRoute from 'Routes/main/MainRoute';
import Home from 'pageComponent/Home';
import ManagerRoute from 'Routes/manager/ManagerRoute';

const RootRoute = () => {
    return (
        
        <BrowserRouter> 
            <UserStore>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/user/*' element={<User />}></Route>
                    <Route path='/main/*' element={<MainRoute />}></Route>
                    <Route path='/manager/*' element={<ManagerRoute />}></Route>
                </Routes>
                
            </UserStore>
        </BrowserRouter>
    );
};


export default RootRoute;