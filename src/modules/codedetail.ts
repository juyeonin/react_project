import { Dispatch } from "redux";
import { createAction } from "redux-actions";
import { createReducer } from "typesafe-actions";
import { CodeDetail, CodeDetailKey } from "../App";
import * as api from "../lib/api";
import { endLoading, startLoading } from "./loading";

export const FETCH_ONE = "codeDetail/FETCH_ONE";
const FETCH_ONE_SUCCESS = "codeDetail/FETCH_ONE_SUCCESS";
const FETCH_ONE_FAILURE = "codeDetail/FETCH_ONE_FAILURE";

export const FETCH_LIST = "codeDetail/FETCH_LIST";
const FETCH_LIST_SUCCESS = "codeDetail/FETCH_LIST_SUCCESS";
const FETCH_LIST_FAILURE = "codeDetail/FETCH_LIST_FAILURE";

const fetchOneSuccess = createAction(FETCH_ONE_SUCCESS, (data:string)=>data);
const fetchOneFailure = createAction(FETCH_ONE_FAILURE, (err:any)=>err);

const fetchListSuccess = createAction(FETCH_LIST_SUCCESS, (data:string)=>data);
const fetchListFailure = createAction(FETCH_LIST_FAILURE, (err:any)=>err);

export const fetchListThunk = () => async(dispatch:Dispatch) => {
    dispatch(startLoading("FETCH_LIST"));
    try {
      const response = await api.fetchCodeDetailList();
      console.log(response.data);
      dispatch(fetchListSuccess(response.data));
    }catch(e) {
      dispatch(fetchListFailure(e));
    }
    dispatch(endLoading("FETCH_LIST"));
  }
  
export const fetchOneThunk = ({groupCode, codeValue}:CodeDetailKey) => async(dispatch:Dispatch)=> {
    dispatch(startLoading("FETCH_ONE"));
    try {
      const response = await api.fetchCodeDetail({groupCode, codeValue});
      dispatch(fetchOneSuccess(response.data));
    }catch(e) {
      dispatch(fetchOneFailure(e));
    }
    dispatch(endLoading("FETCH_ONE"));
  }

export interface CodeDetailState {
    codeDetail: CodeDetail | null;
    codeDetails: CodeDetail[];
    error:any;
}

const initialState: CodeDetailState = {
    codeDetail: null,
    codeDetails: [],
    error:null
};

const codeDetail = createReducer(
    initialState,
    {
      [FETCH_ONE]: (state) => ({
        ...state,
        codeDetail: null,
      }),
      [FETCH_ONE_SUCCESS]: (state, action) => ({
        ...state,
        codeDetail: action.payload,
      }),
      [FETCH_ONE_FAILURE]: (state, action) => ({
        ...state,
        error: action.payload,
      }),
      [FETCH_LIST]: (state) => ({
        ...state,
        codeDetails: [],
      }),
      [FETCH_LIST_SUCCESS]: (state, action) => ({
        ...state,
        codeDetails: action.payload,
      }),
      [FETCH_LIST_FAILURE]: (state, action) => ({
        ...state,
        error: action.payload,
      }),
    }
);

export default codeDetail;