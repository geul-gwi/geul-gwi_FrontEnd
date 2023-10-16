import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ManagerLeftNav from 'component/manager/ManagerLeftNav';
import Header from 'component/common/header/HeaderUserMenu'

import path from 'img/back_gradient.jpg';

const ManagerForm = () => {
    return (
        <div style={{height : "auto"}}>
            <ManagerLeftNav />
            <HeadBackImg />
            <HeadContainer>
                <Header />
            </HeadContainer>
        </div>
    );
};

const HeadBackImg = styled.div`
    position : absolute;
    width : 100%;
    height : 1200px;
    top: 0;
    left : 0;
    z-index: -1;
    background-image: url(${path});
    background-position : "center";
    background-repeat : "no-repeat";
    background-size: cover;
`

const HeadContainer = styled.div`
    position : relative;
    top : 0%;
    width : 100%;
    height : 150px;
`

export default ManagerForm;