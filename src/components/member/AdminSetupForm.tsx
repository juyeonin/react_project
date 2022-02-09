import React, { useState, useCallback } from "react";
import styles from "../../Shop.module.css";

interface Props {
  readonly onRegister: (userId: string, userName: string, password: string) => void;
}

function AdminSetupForm({ onRegister }: Props) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleChangeUserId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  }, []);

  const handleChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const handleChangeUserName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      onRegister(userId, userName, password);
    },
    [userId, userName, password, onRegister]
  );

  return (
    <div className={styles.centered}>
      <h2>최초관리자 등록</h2>

      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>관리자아이디</td>
              <td>
                <input
                  type="text"
                  value={userId}
                  onChange={handleChangeUserId}
                />
              </td>
            </tr>
            <tr>
              <td>비밀번호</td>
              <td>
                <input
                  type="password"
                  value={password}
                  onChange={handleChangePassword}
                />
              </td>
            </tr>
            <tr>
              <td>관리자명</td>
              <td>
                <input
                  type="text" 
                  value={userName}
                  onChange={handleChangeUserName}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className={styles.align_center}>
          <button type="submit">등록</button>
        </div>
      </form>
    </div>
  );
}

export default AdminSetupForm;
