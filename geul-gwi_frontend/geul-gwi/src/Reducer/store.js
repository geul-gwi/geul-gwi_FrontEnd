import { configureStore } from '@reduxjs/toolkit';
import { legacy_createStore as createStore } from 'redux';


// Import rootReducer
import rootReducer from './rootReducer';
// Import persistReducer => rootReducer에 persist Config를 적용하였기 때문에 이걸 사용합니다
import persistReducer from 'Reducer/persistReducer';

// const store = configureStore({
//     reducer : rootReducer,
//     devTools: true,
//     preloadedState : {
//         auth: {
//             token : ''
//         }
//     }
const store = createStore(persistReducer);

export default store;

