import { combineReducers } from "redux";

// Import Item Reducer
import auth from './auth';
import authReducer from 'Reducer/authReducer'

const rootReducer = combineReducers({
    auth : auth,
    authReducer : authReducer
})

export default rootReducer;