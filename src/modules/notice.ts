import { createAction } from 'redux-actions';
import { createReducer } from 'typesafe-actions';
import * as api from '../lib/api';
import noticeApi from '../lib/noticeApi';
import { Notice } from '../App';
import { Dispatch } from 'redux';
import { startLoading, endLoading } from './loading';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

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

// reduxjs/toolkit 사용해서 redux 적용해보기 연습

const fetchList = createAsyncThunk(
  'notices/fetchList',
  async (dispatch:Dispatch) => {

  dispatch(startLoading('FETCH_LIST'));
  try {
    const response = await api.fetchNoticeList();
    console.log('================:response', response);

    dispatch(endLoading('FETCH_LIST'));
    return response.data;
  } catch (e) {
    dispatch(endLoading('FETCH_LIST'));
    return e;
  }
});

const fetchOne = createAsyncThunk(
  'notices/fetchOne',
  async (notices: { dispatch: Dispatch; noticeNo: string }) => {
    const { dispatch, noticeNo } = notices;
    dispatch(startLoading('FETCH_ONE'));
    try {
      const response = await api.fetchNotice(noticeNo);
      console.log('================:response', response);

      dispatch(endLoading('FETCH_ONE'));
      return response.data;
    } catch (e) {
      dispatch(endLoading('FETCH_ONE'));
      return e;
    }
  },
);

const noticeSlice = createSlice({
  name: 'notices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchList.fulfilled, (state, { payload }) => {
        console.log('payload:================', payload);
        state.notices = payload;
      })
      .addCase(fetchOne.fulfilled, (state, { payload }) => {
        console.log('payload:================', payload);
        state.notice = payload;
      });
  },
});

export default noticeSlice;

export const noticesActions = {
  fetchList,
  fetchOne,
};

// export const FETCH_ONE = "notice/FETCH_ONE";
// const FETCH_ONE_SUCCESS = "notice/FETCH_ONE_SUCCESS";
// const FETCH_ONE_FAILURE = "notice/FETCH_ONE_FAILURE";

// export const FETCH_LIST = "notice/FETCH_LIST";
// const FETCH_LIST_SUCCESS = "notice/FETCH_LIST_SUCCESS";
// const FETCH_LIST_FAILURE = "notice/FETCH_LIST_FAILURE";

// export const fetchOneSuccess = createAction(FETCH_ONE_SUCCESS, (data: string) => data);
// export const fetchOneFailure = createAction(FETCH_ONE_FAILURE, (err:any)=>err);

// export const fetchListSuccess = createAction(FETCH_LIST_SUCCESS, (data:string)=>data);
// export const fetchListFailure = createAction(FETCH_LIST_FAILURE, (err:any)=>err);

// export const fetchOneThunk = (noticeNo:string) => async(dispatch:Dispatch) => {
//     dispatch(startLoading("FETCH_ONE"));
//     try {
//         const response = await api.fetchNotice(noticeNo);
//         dispatch(fetchOneSuccess(response.data));
//     }catch(e) {
//         dispatch(fetchOneFailure(e));
//     }
//     dispatch(endLoading("FETCH_ONE"));
// };

// export const fetchListThunk = () => async(dispatch:Dispatch) => {
//     dispatch(startLoading("FETCH_LIST"));
//     try {
//         const response = await api.fetchNoticeList();
//         dispatch(fetchListSuccess(response.data));
//     }catch(e) {
//         dispatch(fetchListFailure(e));
//     }
//     dispatch(endLoading("FETCH_LIST"));
// };

// const notice = createReducer(
//   initialState,
//   {
//     [FETCH_ONE]: (state) => ({
//       ...state,
//       notice: null,
//     }),
//     [FETCH_ONE_SUCCESS]: (state, action) => ({
//       ...state,
//       notice: action.payload,
//     }),
//     [FETCH_ONE_FAILURE]: (state, action) => ({
//       ...state,
//       error: action.payload,
//     }),
//     [FETCH_LIST]: (state) => ({
//       ...state,
//       notices: [],
//     }),
//     [FETCH_LIST_SUCCESS]: (state, action) => ({
//       ...state,
//       notices: action.payload,
//     }),
//     [FETCH_LIST_FAILURE]: (state, action) => ({
//       ...state,
//       error: action.payload,
//     }),
//   },
// );

// export default notice;
