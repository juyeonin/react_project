import { Dispatch } from "redux";
import { createAction } from "redux-actions";
import { createReducer } from "typesafe-actions";
import { Board } from "../App";
import * as api from "../lib/api";
import { endLoading, startLoading } from "./loading";

export const FETCH_ONE = "board/FETCH_ONE";
const FETCH_ONE_SUCCESS = "board/FETCH_ONE_SUCCESS";
const FETCH_ONE_FAILURE = "board/FETCH_ONE_FAILURE";

export const FETCH_LIST = "board/FETCH_LIST";
const FETCH_LIST_SUCCESS = "board/FETCH_LIST_SUCCESS";
const FETCH_LIST_FAILURE = "board/FETCH_LIST_FAILURE";

export const fetchOneSuccess = createAction(FETCH_ONE_SUCCESS, (data:string)=>data);
export const fetchOneFailure = createAction(FETCH_ONE_FAILURE, (err:any)=>err);

export const fetchListSuccess = createAction(FETCH_LIST_SUCCESS, (data:string)=>data);
export const fetchListFailure = createAction(FETCH_LIST_FAILURE, (err:any)=>err);

export const fetchOneThunk = (boardNo:string) => async (dispath:Dispatch) => {
    dispath(startLoading("FETCH_ONE"));
    try {
        const response = await api.fetchBoard(boardNo);
        dispath(fetchOneSuccess(response.data));

    }catch (e) {
        dispath(fetchOneFailure(e));
    }
    dispath(endLoading("FETCH_ONE"));
};

export const fetchListThunk = () => async(dispath:Dispatch) => {
    dispath(startLoading("FETCH_LIST"));
    try {
        const response = await api.fetchBoardList();
        dispath(fetchListSuccess(response.data));

    }catch (e) {
        dispath(fetchListFailure(e));
    }
    dispath(endLoading("FETCH_LIST"));
};

export interface BoardState {
    board: Board | null;
    boards: Board[];
    error: any;

}

const initialState:BoardState = {
    board: null,
    boards: [],
    error: null,
};

const board = createReducer(
    initialState,
    {
        [FETCH_ONE]: (state) => ({
            ...state,
            board: null,
        }),
        [FETCH_ONE_SUCCESS]: (state, action) => ({
            ...state,
            board: action.payload,
        }),
        [FETCH_ONE_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload,
        }),
        [FETCH_LIST]: (state) => ({
            ...state,
            boards: [],
        }),
        [FETCH_LIST_SUCCESS]: (state, action) => ({
            ...state,
            boards: action.payload,
        }),
        [FETCH_LIST_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload,
        }),

    }
);

export default board;