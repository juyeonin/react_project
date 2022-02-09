import { createAction } from "redux-actions";
import { createReducer } from "typesafe-actions";
import * as api from "../lib/api";
import { CodeGroup } from "../App";
import { Dispatch } from "redux";
import { endLoading, startLoading } from "./loading";

export const FETCH_ONE = "codeGroup/FETCH_ONE";
const FETCH_ONE_SUCCESS = "codeGroup/FETCH_ONE_SUCCESS";
const FETCH_ONE_FAILURE = "codeGroup/FETCH_ONE_FAILURE";

export const FETCH_LIST = "codeGroup/FETCH_LIST";
const FETCH_LIST_SUCCESS = "codeGroup/FETCH_LIST_SUCCESS";
const FETCH_LIST_FAILURE = "codeGroup/FETCH_LIST_FAILURE";

//export const fetchOne = createAction(FETCH_ONE, (groupCode: string) => groupCode);
export const fetchOneSuccess = createAction(FETCH_ONE_SUCCESS, (data:string)=>data);
export const fetchOneFailure = createAction(FETCH_ONE_FAILURE, (err:any)=>err);

//export const fetchList = createAction(FETCH_LIST);
export const fetchListSuccess = createAction(FETCH_LIST_SUCCESS, (data:string)=>data);
export const fetchListFailure = createAction(FETCH_LIST_FAILURE, (err:any)=>err);

//const fetchOneSaga = createRequestSaga(FETCH_ONE, api.fetchCodeGroup);
//const fetchListSaga = createRequestSaga(FETCH_LIST, api.fetchCodeGroupList);

export const fetchListThunk = () => async(dispatch:Dispatch) => {
  dispatch(startLoading("FETCH_LIST"));
  try {
    const response = await api.fetchCodeGroupList();
    dispatch(fetchListSuccess(response.data));
  }catch(e) {
    dispatch(fetchListFailure(e));
  }
  dispatch(endLoading("FETCH_LIST"));
}

export const fetchOneThunk = (groupCode:string) => async(dispatch:Dispatch)=> {
  dispatch(startLoading("FETCH_ONE"));
  try {
    const response = await api.fetchCodeGroup(groupCode);
    dispatch(fetchOneSuccess(response.data));
  }catch(e) {
    dispatch(fetchOneFailure(e));
  }
  dispatch(endLoading("FETCH_ONE"));
}

// export function* codeGroupSaga() {
//   yield takeLatest(FETCH_ONE, fetchOneSaga);
//   yield takeLatest(FETCH_LIST, fetchListSaga);
// }

export interface CodeGroupState {
  codeGroup: CodeGroup | null;
  codeGroups: CodeGroup[];
  error: any;
}

const initialState: CodeGroupState = {
  codeGroup: null,
  codeGroups: [],
  error: null,
};

const codeGroup = createReducer(
  initialState,
  {
    [FETCH_ONE]: (state) => ({
      ...state,
      codeGroup: null,
    }),
    [FETCH_ONE_SUCCESS]: (state, action) => ({
      ...state,
      codeGroup: action.payload,
    }),
    [FETCH_ONE_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    [FETCH_LIST]: (state) => ({
      ...state,
      codeGroups: [],
    }),
    [FETCH_LIST_SUCCESS]: (state, action) => ({
      ...state,
      codeGroups: action.payload,
    }),
    [FETCH_LIST_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  },
);

export default codeGroup;
