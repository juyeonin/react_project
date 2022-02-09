import React from "react";
import { Link } from "react-router-dom";
import styles from "../../Shop.module.css";
import { MyInfo } from "../../App";

interface Props {
  readonly myInfo: MyInfo | null;
  readonly isAuthorized: boolean;
  readonly onLogout: () => void;
}

function MainHeader({ myInfo, isAuthorized, onLogout }: Props) {
  return (
    <div className={styles.align_right}>
      {isAuthorized && myInfo && (
        <div>
          <span><mark><strong>{myInfo.userName}</strong></mark>님 환영합니다. &nbsp;</span>
          <button className="btn btn-dark btn-sm" onClick={onLogout}>로그아웃</button>
        </div>
      )}
      {!isAuthorized && !myInfo && (
        <>
          <Link className="btn btn-dark btn-sm" to="/signin">로그인</Link>
          <Link className="btn btn-light btn-sm" to="/signUp">회원가입</Link>
        </>
      )}
    </div>
  );
}

export default MainHeader;
