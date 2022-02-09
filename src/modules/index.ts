import { combineReducers } from "redux";
import auth from "./auth";
import { AuthState } from "../modules/auth";
import { CodeGroupState } from "../modules/codegroup";
import { LoadingState } from "../modules/loading";
import loading from "./loading";
import codegroup from "./codegroup";
import { CodeDetailState } from "../modules/codedetail";
import codedetail from "./codedetail";
import member from "./member";
import { MemberState } from "../modules/member";
import board from "./board";
import { BoardState } from "../modules/board";
import notice from "./notice";
import { NoticeState } from "../modules/notice";
import item from "./item";
import { ItemState } from "../modules/item";
import coin from "./coin";
import { CoinState } from "../modules/coin";
import { UserItemState } from "../modules/userItem";
import userItem from "./userItem";

export interface RootState {
  auth: AuthState;
  codegroup: CodeGroupState;
  loading: LoadingState;
  codedetail: CodeDetailState;
  member: MemberState;
  board: BoardState;
  notice: NoticeState;
  item: ItemState;
  coin: CoinState;
  userItem: UserItemState;
}

const rootReducer = combineReducers({
  auth,
  loading,
  codegroup,
  codedetail,
  member,
  board,
  notice,
  item,
  coin,
  userItem
});

export default rootReducer;
