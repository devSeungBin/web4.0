import { createAction, handleActions } from "redux-actions";

// Action Type 정의
const GALLERYIN = 'galleryState/GALLERYIN';
const GALLERYOUT = 'galleryState/GALLERYOUT';

// Action Type 반환 함수
export const galleryIn = createAction(GALLERYIN);
export const galleryOut = createAction(GALLERYOUT);

// 초기 상태 작성
const initialState =  {
    gallery_id : null,
}

// Reducer 함수 작성 
const galleryState = handleActions({
    [GALLERYIN]: (state, action) => {
        if (action.payload) {
            return { ...state, gallery_id : action.payload };
        } else {
            console.log("galleryState 저장 에러");
            return { ...state, gallery_id : null };
        }  
    },
    [GALLERYOUT]: (state) => {
        return { ...state, gallery_id : null };
    }
}, initialState);

export default galleryState;
