import React from "react";
import { connect, useDispatch } from "react-redux";
import MainHeader from "../../components/common/MainHeader";
import { getAuthorized } from "../../modules/selector";
import { MyInfo } from "../../App";
import { RootState } from "../../modules";
import { setAccessToken, setMyInfo } from "../../modules/auth";
import client from "../../lib/client";
import Cookies from "js-cookie";

interface Props {
  readonly isAuthorized: boolean;
  readonly myInfo: MyInfo | null;
}

const MainHeaderContainer = ({ isAuthorized, myInfo }: Props) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    delete client.defaults.headers.common.Authorization;
    Cookies.remove("accessToken");

    dispatch(setAccessToken(""));
    dispatch(setMyInfo(null));
  };

  return (
    <MainHeader
      myInfo={myInfo}
      isAuthorized={isAuthorized}
      onLogout={onLogout}
    />
  );
};

export default connect((state: RootState) => {
  return {
    isAuthorized: getAuthorized(state),
    myInfo: state.auth.myInfo,
  };
})(MainHeaderContainer);
