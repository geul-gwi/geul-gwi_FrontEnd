import React from 'react'
import { useState } from 'react';

export const userStoreContext = React.createContext({
    loggedUser : {
            userid : '',
            nickname : ''
    },
    loggedIn : false,
    setLoggedUser : () => {},
    setLoggedIn : () => {}
});

const UserStore = ({children}) => {
    const setLoggedUser = (data) => {
        setState(prevState => (
            {
                ...prevState,
                loggedUser : data
            }
        ))
    }

    const setLoggedIn = (isTrue) => {
        setState(prevState => (
            {
                ...prevState,
                loggedIn : !prevState.loggedIn 
            }
        ))
    }

    const initialState = {
        loggedUser : {},
        loggedIn : false,
        setLoggedUser,
        setLoggedIn
    }

    const [state, setState] = useState(initialState)

    return (
        <userStoreContext.Provider value={state}>
            {children}
        </userStoreContext.Provider>
    );
};

export default UserStore;

