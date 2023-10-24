// authReducer.js

// 초기 상태
const initialState = {
  accessToken: null,
  userSeq: null,
  userProfile: null,
  userNickname: null
};

// 액션 타입 정의
const LOGIN = 'auth/LOGIN';
const LOGOUT = 'auth/LOGOUT';
const SETUSERSEQ = 'auth/SETUSERSEQ';
const SET_USER_PROFILE = 'auth/SET_USER_PROFILE';
const SET_USER_NICKNAME = 'auth/SET_USER_NICKNAME';

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

export const setUserProfile = (userProfile) => ({
  type: SET_USER_PROFILE,
  payload: userProfile,
});

export const setUserNickname = (userNickname) => ({
  type: SET_USER_NICKNAME,
  payload: userNickname,
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
        userSeq : null,
        userProfile: null,
        userNickname: null
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

    case SET_USER_NICKNAME:
      return {
        ...state,
        userNickname: action.payload,
      };


    default:
      return state;
  }
};

export default authReducer;