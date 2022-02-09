import { Dispatch } from "redux";
import { createAction } from "redux-actions";
import { createReducer } from "typesafe-actions";
import { Member } from "../App";
import * as api from "../lib/api";
import { startLoading, endLoading } from "./loading";

export const FETCH_ONE = "member/FETCH_ONE";
const FETCH_ONE_SUCCESS = "member/FETCH_ONE_SUCCESS";
const FETCH_ONE_FAILURE = "member/FETCH_ONE_FAILURE";

export const FETCH_LIST = "member/FETCH_LIST";
const FETCH_LIST_SUCCESS = "member/FETCH_LIST_SUCCESS";
const FETCH_LIST_FAILURE = "member/FETCH_LIST_FAILURE";

const fetchOneSuccess = createAction(FETCH_ONE_SUCCESS, (data:string)=>data);
const fetchOneFailure = createAction(FETCH_ONE_FAILURE, (err:any)=>err);

const fetchListSuccess = createAction(FETCH_LIST_SUCCESS, (data:string)=>data);
const fetchListFailure = createAction(FETCH_LIST_FAILURE, (err:any)=>err);

export const fetchOneThunk = (userNo:string) => async(dispath:Dispatch) => {
    dispath(startLoading("FETCH_ONE"));
    try {
        const response = await api.fetchMember(userNo);
        dispath(fetchOneSuccess(response.data));

    }catch (e) {
        dispath(fetchOneFailure(e));
    }
};
export const fetchListThunk = () => async(dispath:Dispatch) => {
    dispath(startLoading("FETCH_LIST"));
    try {

        const response = await api.fetchMemberList();
        console.log(response.data);
        dispath(fetchListSuccess(response.data));
    }catch (e) {
        dispath(fetchListFailure(e));
    }
    dispath(endLoading("FETCH_LIST"));
};

export interface MemberState {
    member: Member | null;
    members: Member[];
    error: any;
}

const initialState:MemberState = {
    member:null,
    members:[],
    error:null
};

const member = createReducer(
    initialState, 
    {
        [FETCH_ONE]: (state) => ({
            ...state,
            member: null,
          }),
          [FETCH_ONE_SUCCESS]: (state, action) => ({
            ...state,
            member: action.payload,
          }),
          [FETCH_ONE_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload,
          }),
          [FETCH_LIST]: (state) => ({
            ...state,
            members: [],
          }),
          [FETCH_LIST_SUCCESS]: (state, action) => ({
            ...state,
            members: action.payload,
          }),
          [FETCH_LIST_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload,
          }),

    }
);

export default member;