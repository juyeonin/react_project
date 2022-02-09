import { createAction } from "redux-actions";
import { createReducer } from "typesafe-actions";
import * as api from "../lib/api"
import { Notice } from "../App";
import { Dispatch } from "redux";
import { startLoading, endLoading } from "./loading";

export const FETCH_ONE = "notice/FETCH_ONE";
const FETCH_ONE_SUCCESS = "notice/FETCH_ONE_SUCCESS";
const FETCH_ONE_FAILURE = "notice/FETCH_ONE_FAILURE";

export const FETCH_LIST = "notice/FETCH_LIST";
const FETCH_LIST_SUCCESS = "notice/FETCH_LIST_SUCCESS";
const FETCH_LIST_FAILURE = "notice/FETCH_LIST_FAILURE";

export const fetchOneSuccess = createAction(FETCH_ONE_SUCCESS, (data: string) => data);
export const fetchOneFailure = createAction(FETCH_ONE_FAILURE, (err:any)=>err);

export const fetchListSuccess = createAction(FETCH_LIST_SUCCESS, (data:string)=>data);
export const fetchListFailure = createAction(FETCH_LIST_FAILURE, (err:any)=>err);

export const fetchOneThunk = (noticeNo:string) => async(dispatch:Dispatch) => {
    dispatch(startLoading("FETCH_ONE"));
    try {
        const response = await api.fetchNotice(noticeNo);
        dispatch(fetchOneSuccess(response.data));
    }catch(e) {
        dispatch(fetchOneFailure(e));
    }
    dispatch(endLoading("FETCH_ONE"));
};

export const fetchListThunk = () => async(dispatch:Dispatch) => {
    dispatch(startLoading("FETCH_LIST"));
    try {
        const response = await api.fetchNoticeList();
        dispatch(fetchListSuccess(response.data));
    }catch(e) {
        dispatch(fetchListFailure(e));
    }
    dispatch(endLoading("FETCH_LIST"));
};

export interface NoticeState {
  notice: Notice | null;
  notices: Notice[];
  error: any;
}

const initialState: NoticeState = {
  notice: null,
  notices: [],
  error: null,
};

const notice = createReducer(
  initialState,
  {
    [FETCH_ONE]: (state) => ({
      ...state,
      notice: null,
    }),
    [FETCH_ONE_SUCCESS]: (state, action) => ({
      ...state,
      notice: action.payload,
    }),
    [FETCH_ONE_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    [FETCH_LIST]: (state) => ({
      ...state,
      notices: [],
    }),
    [FETCH_LIST_SUCCESS]: (state, action) => ({
      ...state,
      notices: action.payload,
    }),
    [FETCH_LIST_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  },
);

export default notice;
