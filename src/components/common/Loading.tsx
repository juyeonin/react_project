import React from "react";
import styles from "../../Shop.module.css";

const Loading = () => {
  return (
    <div className={styles.loadingBox}>
      <div className={styles.dim}></div>
      <div className={styles.circle}></div>
    </div>
  );
};

export default Loading;
