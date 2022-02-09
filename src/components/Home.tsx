import React from "react";
import styles from "../Shop.module.css";

function Home() {
  return (
    <div className={styles.centered}>
      <img
        style={{ margin: "20px" }}
        alt=""
        src="https://lh3.googleusercontent.com/JdJ2k_krwfcr7ZDabiAG4sNLZHuAoRZcOa_K3keevOFdU3vpC2n0lfTJkv9qiw0qG-BonhT9Uo75ViVXm8v867k223E6in-44xGMRIqrLEAO7DBtMyRfmg"
      />
      <br /><br />
      <h1>Image Shop에 오신 것을 환영합니다.</h1>
      <p>{new Date().toString()}</p>
      <br /><br />
      <strong>React Project</strong>
      <br /><br />
    </div>
  );
}

export default Home;
