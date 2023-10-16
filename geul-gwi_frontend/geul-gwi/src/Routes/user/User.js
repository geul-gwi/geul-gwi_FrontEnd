import React from "react";
import {Routes, Route} from 'react-router-dom';

import UserForm from "../../component/user/login/UserForm";
const User = () =>{
    return (
        <Routes>
            {/* <Route path="/" element={<Login/>}></Route> */}
            <Route path="/login/*" element={<UserForm action={true} />}></Route>
            <Route path="/register/*" element={<UserForm action={false} />}></Route>
        </Routes>
    );
};
export default User;
