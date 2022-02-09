import { createAction } from "redux-actions";
import { createReducer } from "typesafe-actions";
import { startLoading, endLoading } from "./loading";
import * as api from "../lib/api";
import { Dispatch } from "redux";
import { Item } from "../App";

export const FETCH_ONE = "item/FETCH_ONE";
const FETCH_ONE_SUCCESS = "item/FETCH_ONE_SUCCESS";
const FETCH_ONE_FAILURE = "item/FETCH_ONE_FAILURE";

export const FETCH_LIST = "item/FETCH_LIST";
const FETCH_LIST_SUCCESS = "item/FETCH_LIST_SUCCESS";
const FETCH_LIST_FAILURE = "item/FETCH_LIST_FAILURE";

export const fetchOneSuccess = createAction(FETCH_ONE_SUCCESS, (data:string)=>data);
export const fetchOneFailure = createAction(FETCH_ONE_FAILURE, (err:any)=>err);

export const fetchListSuccess = createAction(FETCH_LIST_SUCCESS, (data:string)=>data);
export const fetchListFailure = createAction(FETCH_LIST_FAILURE, (err:any)=>err);

export const fetchOneThunk = (itemId:string) => async (dispath:Dispatch) => {
    dispath(startLoading("FETCH_ONE"));
    try {
        const response = await api.fetchItem(itemId);
        dispath(fetchOneSuccess(response.data));

    }catch (e) {
        dispath(fetchOneFailure(e));
    }
    dispath(endLoading("FETCH_ONE"));
};

export const fetchListThunk = () => async(dispath:Dispatch) => {
    dispath(startLoading("FETCH_LIST"));
    try {
        const response = await api.fetchItemList();
        dispath(fetchListSuccess(response.data));

    }catch (e) {
        dispath(fetchListFailure(e));
    }
    dispath(endLoading("FETCH_LIST"));
};

export interface ItemState {
    item: Item | null;
    items: Item[];
    error: any;

}

const initialState:ItemState = {
    item: null,
    items: [],
    error: null,
};

const item = createReducer(
    initialState,
    {
        [FETCH_ONE]: (state) => ({
            ...state,
            item: null,
        }),
        [FETCH_ONE_SUCCESS]: (state, action) => ({
            ...state,
            item: action.payload,
        }),
        [FETCH_ONE_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload,
        }),
        [FETCH_LIST]: (state) => ({
            ...state,
            items: [],
        }),
        [FETCH_LIST_SUCCESS]: (state, action) => ({
            ...state,
            items: action.payload,
        }),
        [FETCH_LIST_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload,
        }),

    }
);

export default item;