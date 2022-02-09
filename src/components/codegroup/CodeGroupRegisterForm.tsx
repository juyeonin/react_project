import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import styles from "../../Shop.module.css";

interface Props {
  readonly onRegister: (groupCode: string, groupName: string) => void;
}

function CodeGroupRegisterForm({ onRegister }: Props) {
  const [groupCode, setGroupCode] = useState("");
  const [groupName, setGroupName] = useState("");

  const handleChangeGroupCode = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupCode(e.target.value);
  }, []);

  const handleChangeGroupName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      onRegister(groupCode, groupName);
    },
    [groupCode, groupName, onRegister]
  );

  return (
    <div className={styles.centered}>
      <br/>
      <h2>코드그룹 등록</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
            <label><strong>그룹코드</strong></label>
            <input type="text" className="form-control" value={groupCode} onChange={handleChangeGroupCode} />
          </div>
          <div className="mb-3 row">
            <label><strong>코드그룹명</strong></label>
            <input type="text" className="form-control" value={groupName} onChange={handleChangeGroupName} />
          </div>
          <div className={styles.align_center} style={{marginBottom:"50px"}}>
            <button className="btn btn-dark btn-sm" type="submit">등록</button>
            <Link className="btn btn-light btn-sm" to="/codegroup">취소</Link>
          </div>
      </form>
    </div>
  );
}

export default CodeGroupRegisterForm;
