import React, {useState, useEffect} from "react";
import { CodeDetail, CodeValue } from "../../App";
import styles from "../../Shop.module.css";
import * as api from "../../lib/api";
import { Link } from "react-router-dom";

interface Props {
    readonly codeDetail: CodeDetail | null;
    readonly isLoading: boolean;
    readonly onModify: (groupCode:string, codeValue:string, codeName:string) => void;
}
const CodeDetailModifyForm = ({codeDetail, isLoading, onModify}:Props) => {
    const [groupCodes, setGroupCodes] = useState<CodeValue[]>([]);
    const [codeValue, setCodeValue] = useState("");
    const [codeName, setCodeName] = useState("");

    const handleChangeCodeName = (e:React.ChangeEvent<HTMLInputElement>) => {
        setCodeName(e.target.value);
    };
    
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(codeDetail){
            onModify(codeDetail.groupCode, codeValue, codeName);
        }
    };

    const getGroupCodeList = async() => {
        try {
            const response = await api.fetchGroupCodeList();
            setGroupCodes(response.data);
        }catch(e) {
            throw e;
        }
    };

    useEffect(()=>{
        getGroupCodeList();
    }, []);

    useEffect(()=>{
        if(codeDetail) {
            setCodeValue(codeDetail.codeValue);
            setCodeName(codeDetail.codeName);
        }
    }, [codeDetail]);

    return (
        <div className={styles.centered}>
      <h2>코드그룹 수정</h2>
      {isLoading && "로딩중..."}
      {!isLoading && codeDetail && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3 row">
            <label><strong>그룹코드</strong></label>
            <select value={codeDetail.groupCode} disabled className="form-select" aria-label="Default select example">
              {groupCodes.map((groupCode)=> (
                <option value={groupCode.value} key={groupCode.value}>{groupCode.label}</option>
              ))}
            </select>
          </div>
          <div className="mb-3 row">
            <label><strong>코드값</strong></label>
            <input type="text" className="form-control" value={codeValue} disabled />
          </div>
          <div className="mb-3 row">
            <label><strong>코드명</strong></label>
            <input type="text" className="form-control" value={codeName} onChange={handleChangeCodeName} />
          </div>
          
          <div className={styles.align_center} style={{marginBottom:"50px"}}>
            <button className="btn btn-dark btn-sm" type="submit">수정</button>
            <Link className="btn btn-light btn-sm" to={`/codedetail/read/${codeDetail.groupCode}/${codeDetail.codeValue}`}>취소</Link>
          </div>
        </form>
      )}
    </div>
    );
};

export default CodeDetailModifyForm;