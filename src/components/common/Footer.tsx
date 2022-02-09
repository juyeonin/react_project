import React from "react";
import { Link } from "react-router-dom";
import styles from "../../Shop.module.css";

function Footer() {
  return (
    <div className={`${styles.align_center} ${styles.footer}`}>
      <strong>Footer</strong>
      <br />
      <Link to="/" style={{ float: "right" }}>
        홈 바로가기
      </Link>
    </div>
  );
}

export default Footer;
