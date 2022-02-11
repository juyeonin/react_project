import { createAction } from 'redux-actions';
import { createReducer } from 'typesafe-actions';
import * as api from '../lib/api';
import { Pds } from '../App';
import { Dispatch } from 'redux';
import { endLoading, startLoading } from './loading';

//import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface PdsState {
  pdsItem: Pds | null;
  pdsItems: Pds[];
  attachments: string[];
  error: any;
}

const initialState: PdsState = {
  pdsItem: null,
  pdsItems: [],
  attachments: [],
  error: null,
};

// reduxjs/toolkit 사용해서 redux 적용해보기 연습

// export const fetchPdsList = createAsyncThunk(
//   'pds/fetchPdsList',
//   async (dispatch: Dispatch) => {
//     dispatch(startLoading('FETCH_LIST'));
//     try {
//       const response = await api.fetchPdsList();
//       console.log('================:response', response.data);
//       dispatch(endLoading('FETCH_LIST'));
//       return response.data;
//     } catch (e) {
//       dispatch(endLoading('FETCH_LIST'));
//       return e;
//     }
//   },
// );

// export const fetchPdsOne = createAsyncThunk(
//   'pds/fetchOneList',
//   async (pds: { dispatch: Dispatch; itemId: string }) => {
//     const { dispatch, itemId } = pds;
//     dispatch(startLoading('FETCH_ONE'));
//     try {
//       const response = await api.fetchPds(itemId);
//       console.log('================:response', response.data);
//       dispatch(endLoading('FETCH_ONE'));
//       return response.data;
//     } catch (e) {
//       dispatch(endLoading('FETCH_ONE'));
//       return e;
//     }
//   },
// );

// export const fetchAttachList = createAsyncThunk(
//   'pds/fetchOneList',
//   async (pds: { dispatch: Dispatch; itemId: string }) => {
//     const { dispatch, itemId } = pds;
//     dispatch(startLoading('FETCH_LIST'));
//     try {
//       const response = await api.fetchAttachList(itemId);
//       console.log('================:response', response.data);
//       dispatch(endLoading('FETCH_LIST'));
//       return response.data;
//     } catch (e) {
//       dispatch(endLoading('FETCH_LIST'));
//       return e;
//     }
//   },
// );

// const pdsSlice = createSlice({
//   name: 'pds',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPdsList.fulfilled, (state, { payload }) => {
//         console.log('================:payload', payload);
//         state.pdsItems = payload;
//       })
//       .addCase(fetchPdsOne.fulfilled, (state, { payload }) => {
//         console.log('================:payload', payload);
//         state.pdsItem = payload;
//       })
//       .addCase(fetchAttachList.fulfilled, (state, { payload }) => {
//         console.log('================:payload', payload);
//         state.pdsItem = payload;
//       });
//   },
// });

export const FETCH_ONE = 'pds/FETCH_ONE';
const FETCH_ONE_SUCCESS = 'pds/FETCH_ONE_SUCCESS';
const FETCH_ONE_FAILURE = 'pds/FETCH_ONE_FAILURE';

export const FETCH_LIST = 'pds/FETCH_LIST';
const FETCH_LIST_SUCCESS = 'pds/FETCH_LIST_SUCCESS';
const FETCH_LIST_FAILURE = 'pds/FETCH_LIST_FAILURE';

const ADD_ATTACH = 'pds/ADD_ATTACH';
const REMOVE_ATTACH = 'pds/REMOVE_ATTACH';
const RESET_ATTACH = 'pds/RESET_ATTACH';
const FETCH_ATTACH_LIST = 'pds/FETCH_ATTACH_LIST';

export const fetchOneSuccess = createAction(
  FETCH_ONE_SUCCESS,
  (data: string) => data,
);
export const fetchOneFailure = createAction(
  FETCH_ONE_FAILURE,
  (err: any) => err,
);

export const fetchListSuccess = createAction(
  FETCH_LIST_SUCCESS,
  (data: string) => data,
);
export const fetchListFailure = createAction(
  FETCH_LIST_FAILURE,
  (err: any) => err,
);

export const addAttach = createAction(ADD_ATTACH, (attach: string) => attach);
export const removeAttach = createAction(
  REMOVE_ATTACH,
  (index: number) => index,
);
export const resetAttach = createAction(RESET_ATTACH);
export const fetchAttachList = createAction(
  FETCH_ATTACH_LIST,
  (data: string) => data,
);

export const fetchOneThunk = (itemId: string) => async (dispath: Dispatch) => {
  dispath(startLoading('FETCH_ONE'));
  try {
    const response = await api.fetchPds(itemId);
    dispath(fetchOneSuccess(response.data));
  } catch (e) {
    dispath(fetchOneFailure(e));
  }
  dispath(endLoading('FETCH_ONE'));
};

export const fetchListThunk = () => async (dispath: Dispatch) => {
  dispath(startLoading('FETCH_LIST'));
  try {
    const response = await api.fetchPdsList();
    dispath(fetchListSuccess(response.data));
  } catch (e) {
    dispath(fetchListFailure(e));
  }
  dispath(endLoading('FETCH_LIST'));
};

const pds = createReducer(initialState, {
  [FETCH_ONE]: (state) => ({
    ...state,
    pdsItem: null,
  }),
  [FETCH_ONE_SUCCESS]: (state, action) => ({
    ...state,
    pdsItem: action.payload,
  }),
  [FETCH_ONE_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
  [FETCH_LIST]: (state) => ({
    ...state,
    pdsItems: [],
  }),
  [FETCH_LIST_SUCCESS]: (state, action) => ({
    ...state,
    pdsItems: action.payload,
  }),
  [FETCH_LIST_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
  [ADD_ATTACH]: (state, { payload: attach }) => {
    const newAttach = state.attachments.concat(attach);
    return {
      ...state,
      attachments: newAttach,
    };
  },
  [REMOVE_ATTACH]: (state, { payload: index }) => {
    const attachmentsClone = [...state.attachments];

    attachmentsClone.splice(index, 1);

    return {
      ...state,
      attachments: attachmentsClone,
    };
  },
  [FETCH_ATTACH_LIST]: (state, action) => ({
    ...state,
    attachments: action.payload,
  }),
  [RESET_ATTACH]: (state) => ({
    ...state,
    attachments: [],
  }),
});

export default pds;
// export default pdsSlice.reducer;

// export const pdsActions = {
//   fetchPdsList,
// };
