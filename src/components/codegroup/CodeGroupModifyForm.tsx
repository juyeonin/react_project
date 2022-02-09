import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../Shop.module.css";
import { CodeGroup } from "../../App";

interface Props {
  readonly codeGroup: CodeGroup | null;
  readonly isLoading: boolean;
  readonly onModify: (groupCode: string, groupName: string) => void;
}

function CodeGroupModifyForm({
  codeGroup,
  isLoading,
  onModify,
}: Props) {
  const [groupName, setGroupName] = useState("");

  const handleChangeGroupName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(codeGroup) {
      onModify(codeGroup.groupCode, groupName);
    }
  };

  useEffect(() => {
    if(codeGroup) {
      setGroupName(codeGroup.groupName);
    }
  }, [codeGroup]);

  return (
    <div className={styles.centered}>
      <br/>
      <h2>코드그룹 수정</h2>
      {isLoading && "로딩중..."}
      {!isLoading && codeGroup && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3 row">
            <label><strong>코드그룹코드</strong></label>
            <input type="text" className="form-control" value={codeGroup.groupCode} disabled />
          </div>
          <div className="mb-3 row">
            <label><strong>코드그룹명</strong></label>
            <input type="text" className="form-control" value={groupName} onChange={handleChangeGroupName} />
          </div>
          <div className={styles.align_center} style={{marginBottom:"50px"}}>
            <button className="btn btn-dark btn-sm" type="submit">수정</button>
            <Link className="btn btn-light btn-sm" to={`/codegroup/read/${codeGroup.groupCode}`}>취소</Link>
          </div>
        </form>
      )}
    </div>
  );
}

export default CodeGroupModifyForm;
