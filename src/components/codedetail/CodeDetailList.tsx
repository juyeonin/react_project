import React from "react";
import { Link } from "react-router-dom";
import { CodeDetail } from "../../App";
import styles from "../../Shop.module.css";

interface Props {
  readonly codeDetails: CodeDetail[];
  readonly isLoading: boolean;
}
const CodeDetailList = ({ codeDetails, isLoading }: Props) => {
  return (
    <div className={styles.centered}>
      <div className={styles.shop_table}>
        <h2>코드 목록</h2>
        {isLoading && "로딩중..."}
        {!isLoading && codeDetails && (
          <>
            <Link
              className="btn btn-outline-secondary btn-sm"
              to="/codedetail/create"
            >
              새로만들기
            </Link>
            <table className="table">
              <thead>
                <tr>
                  <th>그룹코드</th>
                  <th>코드값</th>
                  <th>코드명</th>
                  <th>정렬순서</th>
                  <th>등록일시</th>
                </tr>
              </thead>
              <tbody>
                {!codeDetails.length && (
                  <tr>
                    <td colSpan={6}>List is empty.</td>
                  </tr>
                )}
                {!!codeDetails.length &&
                  codeDetails.map((codeDetail) => (
                    <tr key={codeDetail.codeValue}>
                      <td>{codeDetail.groupCode}</td>
                      <td>{codeDetail.codeValue}</td>
                      <td>
                        <Link
                          to={`/codedetail/read/${codeDetail.groupCode}/${codeDetail.codeValue}`}
                        >
                          {codeDetail.codeName}
                        </Link>
                      </td>
                      <td>{codeDetail.sortSeq}</td>
                      <td>{codeDetail.regDate}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default CodeDetailList;
