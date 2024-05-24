import { combineReducers } from "redux";
import loginState from "./loginState";
import galleryState from "./galleryState";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from "redux-persist";


const rootReducer = combineReducers({
    loginState,
    galleryState,
});

const persistConfig = {
    key: ['isLogin', 'gallery_id'],
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


export default persistedReducer;
