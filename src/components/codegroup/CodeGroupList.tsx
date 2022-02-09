import React from "react";
import { Link } from "react-router-dom";
import styles from "../../Shop.module.css";
import { CodeGroup } from "../../App";

interface Props {
  readonly codeGroups: CodeGroup[];
  readonly isLoading: boolean;
}

function CodeGroupList({ codeGroups, isLoading }: Props) {
  return (
    <div className={styles.centered}>
      <div className={styles.shop_table}>
      <h2>코드그룹 목록</h2>
      {isLoading && "로딩중..."}
      {!isLoading && codeGroups && (
        <>
          <Link className="btn btn-outline-secondary btn-sm" to="/codegroup/create">새로만들기</Link>
          <table className="table">
            <thead>
              <tr>
                <th>코드그룹코드</th>
                <th>코드그룹명</th>
                <th>등록일시</th>
              </tr>
            </thead>
            <tbody>
              {!codeGroups.length && (
                <tr>
                  <td colSpan={3}>
                    List is empty.
                  </td>
                </tr>
              )}
              {!!codeGroups.length && codeGroups.map((codeGroup) => (
                <tr key={codeGroup.groupCode}>
                  <td>{codeGroup.groupCode}</td>
                  <td>
                    <Link to={`/codegroup/read/${codeGroup.groupCode}`}>
                      {codeGroup.groupName}
                    </Link>
                  </td>
                  <td>{codeGroup.regDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      </div>
    </div>
  );
}

export default CodeGroupList;
