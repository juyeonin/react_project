import { createAction } from "redux-actions";
import { createReducer } from "typesafe-actions";
import * as api from "../lib/api"
import { UserItem } from "../App";
import { Dispatch } from "redux";
import { startLoading, endLoading } from "./loading";

export const FETCH_ONE = "userItem/FETCH_ONE";
const FETCH_ONE_SUCCESS = "userItem/FETCH_ONE_SUCCESS";
const FETCH_ONE_FAILURE = "userItem/FETCH_ONE_FAILURE";

export const FETCH_LIST = "userItem/FETCH_LIST";
const FETCH_LIST_SUCCESS = "userItem/FETCH_LIST_SUCCESS";
const FETCH_LIST_FAILURE = "userItem/FETCH_LIST_FAILURE";

export const fetchOneSuccess = createAction(FETCH_ONE_SUCCESS, (data: string) => data);
export const fetchOneFailure = createAction(FETCH_ONE_FAILURE, (err:any)=>err);

export const fetchListSuccess = createAction(FETCH_LIST_SUCCESS, (data:string)=>data);
export const fetchListFailure = createAction(FETCH_LIST_FAILURE, (err:any)=>err);

export const fetchOneThunk = (userItemNo:string) => async(dispatch:Dispatch) => {
    dispatch(startLoading("FETCH_ONE"));
    try {
        const response = await api.fetchUserItem(userItemNo);
        dispatch(fetchOneSuccess(response.data));
    }catch(e) {
        dispatch(fetchOneFailure(e));
    }
    dispatch(endLoading("FETCH_ONE"));
};

export const fetchListThunk = () => async(dispatch:Dispatch) => {
    dispatch(startLoading("FETCH_LIST"));
    try {
        const response = await api.fetchUserItemList();
        dispatch(fetchListSuccess(response.data));
    }catch(e) {
        dispatch(fetchListFailure(e));
    }
    dispatch(endLoading("FETCH_LIST"));
};

export interface UserItemState {
  userItem: UserItem | null;
  userItems: UserItem[];
  error: any;
}

const initialState: UserItemState = {
  userItem: null,
  userItems: [],
  error: null,
};

const userItem = createReducer(
  initialState,
  {
    [FETCH_ONE]: (state) => ({
      ...state,
      userItem: null,
    }),
    [FETCH_ONE_SUCCESS]: (state, action) => ({
      ...state,
      userItem: action.payload,
    }),
    [FETCH_ONE_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    [FETCH_LIST]: (state) => ({
      ...state,
      userItems: [],
    }),
    [FETCH_LIST_SUCCESS]: (state, action) => ({
      ...state,
      userItems: action.payload,
    }),
    [FETCH_LIST_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  },
);

export default userItem;
