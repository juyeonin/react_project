import React from "react";
import { connect } from "react-redux";
import MenuBar from "../../components/common/MenuBar";
import { getAuthorized, isAdmin } from "../../modules/selector";
import { RootState } from "../../modules";

interface Props {
  readonly isAuthorized: boolean;
  readonly isAdmin: boolean;
}

const MenuBarContainer = ({ isAuthorized, isAdmin }: Props) => {
  return (
    <MenuBar
      isAuthorized={isAuthorized}
      isAdmin={isAdmin}
    />
  );
};

export default connect((state: RootState) => {
  return {
    isAuthorized: getAuthorized(state),
    isAdmin: isAdmin(state),
  };
})(MenuBarContainer);
