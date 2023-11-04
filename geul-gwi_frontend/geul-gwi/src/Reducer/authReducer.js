// authReducer.js

// Redux 스토어에 구독 상태를 관리하는 리듀서를 생성하고 
// 액션을 디스패치하여 해당 상태를 변경합니다.

// 초기 상태
const initialState = {
  accessToken: null,
  userSeq: null,
  userProfile: null,
  userNickname: null,
  role: null,
  isSubscribed: false, // 초기 구독 상태
};

// 액션 타입 정의
const LOGIN = 'auth/LOGIN';
const LOGOUT = 'auth/LOGOUT';
const SETUSERSEQ = 'auth/SETUSERSEQ';
const SET_USER_PROFILE = 'auth/SET_USER_PROFILE';
const SET_USER_NICKNAME = 'auth/SET_USER_NICKNAME';
const ROLE = 'auth/ROLE';

// action types
export const SUBSCRIBE = 'SUBSCRIBE'; // 구독

// action creators
export const subscribeAction = (isSubscribed) => {
  return {
    type: SUBSCRIBE,
    payload: isSubscribed,
  };
};


// 액션 생성자 함수
export const login = (accessToken) => ({
  type: LOGIN,
  payload: accessToken,
});

export const logout = () => ({
  type: LOGOUT,
});

export const setUserSeq = (userSequenceNumber) => ({
  type: SETUSERSEQ,
  payload: userSequenceNumber,
});

export const setProfile = (userProfile) => ({
  type: SET_USER_PROFILE,
  payload: userProfile,
});

export const setNickname = (userNickname) => ({
  type: SET_USER_NICKNAME,
  payload: userNickname,
});

export const setRole = (role) => ({
  type: ROLE,
  payload: role,
});

// 리듀서 함수
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        accessToken: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        accessToken: null,
        userSeq: null,
        userProfile: null,
        userNickname: null,
        role: null,
      };
    case SETUSERSEQ:
      return {
        ...state,
        userSeq: action.payload,
      };

    case SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };

    case ROLE:
      return {
        ...state,
        role: action.payload,
      };

    case SET_USER_NICKNAME:
      return {
        ...state,
        userNickname: action.payload,
      };
      
    case SUBSCRIBE:
      return {
        ...state,
        isSubscribed: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;