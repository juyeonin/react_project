import React from "react";
import { Link } from "react-router-dom";
import styles from "../../Shop.module.css";
import { CodeGroup } from "../../App";

interface Props {
  readonly codeGroup: CodeGroup | null;
  readonly isLoading: boolean;
  readonly groupCode: string;
  readonly onRemove: () => void;
}

function CodeGroupRead({ 
  codeGroup, 
  isLoading, 
  groupCode, 
  onRemove 
}: Props) {
  return (
    <div className={styles.centered}>
      <br/>
      <h2>코드그룹 상세보기</h2>
      {isLoading && "로딩중..."}
      {!isLoading && codeGroup && (
        <>
          <div className="mb-3 row">
            <label><strong>코드그룹코드</strong></label>
            <input type="text" className="form-control" value={codeGroup.groupCode} readOnly />
          </div>
          <div className="mb-3 row">
            <label><strong>코드그룹명</strong></label>
            <input type="text" className="form-control" value={codeGroup.groupName} readOnly />
          </div>
          <div className={styles.align_center} style={{marginBottom:"50px"}}>
            <Link className="btn btn-light btn-sm" to={`/codegroup/edit/${groupCode}`}>편집</Link>
            <button className="btn btn-dark btn-sm" onClick={onRemove}>삭제</button>
            <Link className="btn btn-light btn-sm" to="/codeGroup">목록</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default CodeGroupRead;
