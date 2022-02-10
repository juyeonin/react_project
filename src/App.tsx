import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignInPage from './pages/auth/SignInPage';
import AdminSetupPage from './pages/member/AdminSetupPage';

import CodeGroupListPage from './pages/codegroup/CodeGroupListPage';
import CodeGroupRegisterPage from './pages/codegroup/CodeGroupRegisterPage';
import CodeGroupModifyPage from './pages/codegroup/CodeGroupModifyPage';
import CodeGroupReadPage from './pages/codegroup/CodeGroupReadPage';

import CodeDetailListPage from './pages/codedetail/CodeDetailListPage';
import CodeDetailModifyPage from './pages/codedetail/CodeDetailModifyPage';
import CodeDetailReadPage from './pages/codedetail/CodeDetailReadPage';
import CodeDetailRegisterPage from './pages/codedetail/CodeDetailRegisterPage';

import SignUpPage from './pages/auth/SignUpPage';
import MemberListPage from './pages/member/MemberListPage';
import MemberRegisterPage from './pages/member/MemberRegisterPage';

import BoardRegisterPage from './pages/board/BoardRegisterPage';
import BoardListPage from './pages/board/BoardListPage';
import BoardReadPage from './pages/board/BoardReadPage';
import BoardModifyPage from './pages/board/BoardModifyPage';

import NoticeListPage from './pages/notice/NoticeListPage';
import NoticeRegisterPage from './pages/notice/NoticeRegisterPage';
import NoticeModifyPage from './pages/notice/NoticeModifyPage';
import NoticeReadPage from './pages/notice/NoticeReadPage';

import ItemRegisterPage from './pages/item/ItemRegisterPage';
import ItemListPage from './pages/item/ItemListPage';
import ItemReadPage from './pages/item/ItemReadPage';
import ItemModifyPage from './pages/item/ItemModifyPage';

import CoinChargeRegisterPage from './pages/coin/CoinChargeRegisterPage';
import CoinChargeListPage from './pages/coin/CoinChargeListPage';

import UserItemListPage from './pages/userItem/UserItemListPage';

import CalendarPage from './pages/calendar/CalendarPage';

import PdsListPage from './pages/pds/PdsListPage';
import PdsRegisterPage from './pages/pds/PdsRegisterPage';
import PdsModifyPage from './pages/pds/PdsModifyPage';
import PdsReadPage from './pages/pds/PdsReadPage';

export interface LoginInput {
  userId: string;
  password: string;
}

export interface AuthInfo {
  auth: string;
}

export interface MyInfo {
  userId: string;
  userName: string;
  authList: AuthInfo[];
}

export interface CodeGroup {
  groupCode: string;
  groupName: string;
  regDate: string;
}

export interface CodeDetailKey {
  groupCode: string;
  codeValue: string;
}

export interface CodeDetail {
  groupCode: string;
  codeValue: string;
  codeName: string;
  sortSeq: number;
  regDate: string;
}

export interface CodeValue {
  label: string;
  value: string;
}

export interface Member {
  userNo: string;
  userId: string;
  userName: string;
  userPw: string;
  job: string;
  authList: AuthInfo[];
  regDate: string;
}

export interface UserAuth {
  userNo: string;
  auth: string;
}

export interface UserObject {
  userId: string;
  userPw: string;
  userName: string;
  jop: string;
  authList: UserAuth[];
}

export interface Board {
  boardNo: string;
  title: string;
  writer: string;
  content: string;
  regDate: string;
}

export interface MyInfo {
  userId: string;
  userName: string;
  authList: AuthInfo[];
}

export interface Notice {
  noticeNo: string;
  title: string;
  content: string;
  regDate: string;
}

export interface Item {
  itemId: string;
  itemName: string;
  price: number;
  description: string;
}

export interface ChargeCoin {
  historyNo: string;
  amount: number;
  regDate: string;
}

export interface PayCoin {
  readonly historyNo: string;
  readonly itemName: string;
  readonly amount: number;
  readonly regDate: string;
}

export interface UserItem {
  readonly userItemNo: string;
  readonly itemId: string;
  readonly itemName: string;
  readonly price: number;
  readonly description: string;
  readonly regDate: string;
}

export interface Comment {
  readonly commentWriter: string;
  readonly content: string;
}
export interface Pds {
  readonly itemId: string;
  readonly itemName: string;
  readonly description: string;
  readonly viewCnt: number;
}
export interface ItemObject {
  readonly itemId?: string;
  readonly itemName: string;
  readonly description: string;
  readonly files: string[];
}

function App() {
  return (
    <>
      <Route component={HomePage} path="/" exact />
      <Route component={SignInPage} path="/signin" exact />
      <Route component={AdminSetupPage} path="/member/setup" />

      <Route component={CodeGroupListPage} path="/codegroup" exact />
      <Route component={CodeGroupRegisterPage} path="/codegroup/create" />
      <Route
        component={CodeGroupModifyPage}
        path="/codegroup/edit/:groupCode"
      />
      <Route component={CodeGroupReadPage} path="/codegroup/read/:groupCode" />

      <Route component={CodeDetailListPage} path="/codedetail" exact />
      <Route component={CodeDetailRegisterPage} path="/codedetail/create" />
      <Route
        component={CodeDetailModifyPage}
        path="/codedetail/edit/:groupCode/:codeValue"
      />
      <Route
        component={CodeDetailReadPage}
        path="/codedetail/read/:groupCode/:codeValue"
      />

      <Route component={SignUpPage} path="/signup" exact />

      <Route component={MemberListPage} path="/member" exact />
      <Route component={MemberRegisterPage} path="/member/create" />

      <Route component={BoardListPage} path="/board" exact />
      <Route component={BoardRegisterPage} path="/board/create" />
      <Route component={BoardModifyPage} path="/board/edit/:boardNo" />
      <Route component={BoardReadPage} path="/board/read/:boardNo" />

      <Route component={NoticeListPage} path="/notice" exact />
      <Route component={NoticeRegisterPage} path="/notice/create" />
      <Route component={NoticeModifyPage} path="/notice/edit/:noticeNo" />
      <Route component={NoticeReadPage} path="/notice/read/:noticeNo" />

      <Route component={ItemListPage} path="/item" exact />
      <Route component={ItemRegisterPage} path="/item/create" />
      <Route component={ItemModifyPage} path="/item/edit/:itemId" />
      <Route component={ItemReadPage} path="/item/read/:itemId" />

      <Route component={CoinChargeListPage} path="/coin/charge" />
      <Route component={CoinChargeRegisterPage} path="/coin/create" />

      <Route component={UserItemListPage} path="/userItem" exact />

      <Route component={CalendarPage} path={'/calendar'} exact />

      <Route component={PdsListPage} path="/pds" exact />
      <Route component={PdsRegisterPage} path="/pds/create" />
      <Route component={PdsModifyPage} path="/pds/edit/:itemId" />
      <Route component={PdsReadPage} path="/pds/read/:itemId" />
    </>
  );
}

export default App;
