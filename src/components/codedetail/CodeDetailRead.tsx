import React, { useState, useEffect } from "react";
import { CodeDetail, CodeValue } from "../../App";
import styles from "../../Shop.module.css";
import * as api from "../../lib/api";
import { Link } from "react-router-dom";

interface Props {
  readonly codeDetail: CodeDetail | null;
  readonly isLoading: boolean;
  readonly groupCode: string;
  readonly codeValue: string;
  readonly onRemove: () => void;
}
const CodeDetailRead = ({ codeDetail, isLoading, groupCode, codeValue, onRemove }: Props) => {
  const [groupCodes, setGroupCodes] = useState<CodeValue[]>([]);

  const getGroupCodeList = async () => {
    try {
      const response = await api.fetchGroupCodeList();
      setGroupCodes(response.data);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    getGroupCodeList();
  }, []);

  return (
    <div className={styles.centered}>
      <h2>코드 상세보기</h2>
      {isLoading && "로딩중..."}
      {!isLoading && codeDetail && (
        <>
          <div className="mb-3 row">
            <label><strong>그룹코드</strong></label>
            <select value={codeDetail.groupCode} disabled className="form-select">
              {groupCodes.map((groupCode) => (
                <option value={groupCode.value} key={groupCode.value}>{groupCode.label}</option>
              ))}
            </select>
          </div>
          <div className="mb-3 row">
            <label><strong>코드값</strong></label>
            <input type="text" className="form-control" value={codeDetail.codeValue} readOnly />
          </div>
          <div className="mb-3 row">
            <label><strong>코드명</strong></label>
            <input type="text" className="form-control" value={codeDetail.codeName} readOnly />
          </div>

          <div className={styles.align_center} style={{ marginBottom: "50px" }}>
            <Link className="btn btn-light btn-sm" to={`/codedetail/edit/${groupCode}/${codeValue}`}>편집</Link>
            <button className="btn btn-dark btn-sm" onClick={onRemove}>삭제</button>
            <Link className="btn btn-light btn-sm" to={"/codedetail"}>목록</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CodeDetailRead;