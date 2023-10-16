import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Session Storage를 사용할 것이기 때문에 Session Storage를 Import
import sessionStorage from 'redux-persist/lib/storage';

// Import rootReducer
// 루트 리듀서를 감싸줍니다 persist로
import rootReducer from './rootReducer';

// config 작성
const persistConfig = {
  key: "root", // localStorage key 
  storage : sessionStorage, // localStorage
  whitelist: ["authReducer"], // target (reducer name)
}
// persistReducer로 감싸기
export default persistReducer(persistConfig, rootReducer);