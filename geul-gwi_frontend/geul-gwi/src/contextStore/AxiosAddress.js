import React from 'react';
import { useState } from 'react';

export const AxiosAddrContext = React.createContext({ axiosAddr: 'http://44.213.22.241:8080'})

const AxiosAddr = (children) => {
    const address = '44.213.22.241:8080/';

    return (
        <AxiosAddrContext.Provider value={address}>{children}</AxiosAddrContext.Provider>
    );
}

export default AxiosAddr;