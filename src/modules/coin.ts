import { createAction } from "redux-actions";
import { createReducer } from "typesafe-actions";
import { startLoading, endLoading } from "./loading";
import * as api from "../lib/api";
import { Dispatch } from "redux";
import { ChargeCoin, PayCoin } from "../App";

export const FETCH_CHARGE_LIST = "coin/FETCH_CHAGE_LIST";
const FETCH_CHARGE_LIST_SUCCESS = "coin/FETCH_CHARGE_LIST_SUCCESS";
const FETCH_CHARGE_LIST_FAILURE = "coin/FETCH_CHARGE_LIST_FAILURE";

export const fetchChargeListSuccess = createAction(FETCH_CHARGE_LIST_SUCCESS, (data:string)=>data);
export const fetchChargeListFailure = createAction(FETCH_CHARGE_LIST_FAILURE, (err:any)=>err);

export const fetchChargeListThunk = () => async(dispath:Dispatch) => {
    dispath(startLoading("FETCH_LIST"));
    try {
        const response = await api.fetchChargeCoinList();
        dispath(fetchChargeListSuccess(response.data));

    }catch (e) {
        dispath(fetchChargeListFailure(e));
    }
    dispath(endLoading("FETCH_LIST"));
};

export const FETCH_PAY_LIST = "coin/FETCH_PAY_LIST";
const FETCH_PAY_LIST_SUCCESS = "coin/FETCH_PAY_LIST_SUCCESS";
const FETCH_PAY_LIST_FAILURE = "coin/FETCH_PAY_LIST_FAILURE";

export const fetchPayListSuccess = createAction(FETCH_PAY_LIST_SUCCESS, (data:string)=>data);
export const fetchPayListFailure = createAction(FETCH_PAY_LIST_FAILURE, (err:any)=>err);

export const fetchPayListThunk = () => async(dispatch:Dispatch) => {
    dispatch(startLoading("FETCH_PAY_LIST"));
    try {
        const response = await api.fetchPayCoinList();
        fetchPayListSuccess(response.data);
    }catch (e) {
        fetchPayListFailure(e);
    }
    dispatch(endLoading("FETCH_PAY_LIST"));
}

export interface CoinState {
    chargeCoins:ChargeCoin[];
    payCoins: PayCoin[];
    error: any;

}

const initialState:CoinState = {
    chargeCoins:[],
    payCoins: [],
    error: null,
};

const coin = createReducer(
    initialState,
    {
        [FETCH_CHARGE_LIST]: (state) => ({
            ...state,
            chargeCoins: [],
        }),
        [FETCH_CHARGE_LIST_SUCCESS]: (state, action) => ({
            ...state,
            chargeCoins: action.payload,
        }),
        [FETCH_CHARGE_LIST_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload,
        }),
        [FETCH_PAY_LIST]: (state) => ({
            ...state,
            chargeCoins: [],
        }),
        [FETCH_PAY_LIST_SUCCESS]: (state, action) => ({
            ...state,
            chargeCoins: action.payload,
        }),
        [FETCH_PAY_LIST_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload,
        })
    }
);

export default coin;