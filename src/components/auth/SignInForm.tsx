import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import styles from "../../Shop.module.css";

interface Props {
  readonly onSignIn: (userId: string, password: string) => void;
}

function SignInForm({ onSignIn }: Props) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUserId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  }, []);

  const handleChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      onSignIn(userId, password);
    },
    [userId, password, onSignIn]
  );

  return (
    <div className={styles.centered}>
      <br />
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="floatingInput" placeholder="ID" value={userId} onChange={handleChangeUserId} />
          <label htmlFor="floatingInput">ID</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={handleChangePassword} />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <br />
        <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn btn-outline-dark" type="submit">로그인</button>
        </div>
      </form>
      <p><Link className="btn btn-link" to="/signUp">회원가입</Link></p>
      </div>
  );
}

export default SignInForm;
