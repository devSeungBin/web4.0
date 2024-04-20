import { combineReducers } from "redux";
import loginState from "./loginState";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from "redux-persist";


const rootReducer = combineReducers({
    loginState,
});

const persistConfig = {
    key: 'isLogin',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


export default persistedReducer;
