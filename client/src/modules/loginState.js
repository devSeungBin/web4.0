import { createAction, handleActions } from "redux-actions";

// Action Type 정의
const LOGIN = 'loginState/LOGIN';
const LOGOUT = 'loginState/LOGOUT';

// Action Type 반환 함수
export const login = createAction(LOGIN);
export const logout = createAction(LOGOUT);

// 초기 상태 작성
const initialState =  {
    isLogin : false,
}

// Reducer 함수 작성 
const loginState = handleActions({
    [LOGIN]: (state) => {
        return { ...state, isLogin : true };
    },
    [LOGOUT]: (state) => {
        return { ...state, isLogin : false };
    }
}, initialState);

export default loginState;
