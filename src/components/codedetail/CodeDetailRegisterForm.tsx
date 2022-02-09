import React, {useCallback, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { CodeValue } from "../../App";
import * as api from "../../lib/api";
import styles from "../../Shop.module.css";

interface Props {
    readonly onRegister: (groupCode:string, codeValue:string, codeName:string) => void;
}
const CodeDetailRegisterForm = ({onRegister}:Props) => {
    const [groupCode, setGroupCode] = useState("A01");
    const [groupCodes, setGroupCodes] = useState<CodeValue[]>([]);
    const [codeValue, setCodeValue] = useState("");
    const [codeName, setCodeName] = useState("");

    const handleChangeGroupCode = useCallback((e:React.ChangeEvent<HTMLSelectElement>)=> {
        setGroupCode(e.target.value);
    },[]);
    const handleChagneCodeValue = useCallback((e:React.ChangeEvent<HTMLInputElement>)=> {
        setCodeValue(e.target.value);
    },[]);
    const handleChangeCodeName = useCallback((e:React.ChangeEvent<HTMLInputElement>)=> {
        setCodeName(e.target.value);
    },[]);

    const handleSubmit = useCallback((e:React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        onRegister(groupCode, codeValue, codeName);
    },[groupCode, codeValue, codeName, onRegister]);

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


    return (
        <div className={styles.centered}>
          <br/>
        <h2>코드 등록</h2>
          <form onSubmit={handleSubmit}>
          <div className="mb-3 row">
            <label><strong>그룹코드</strong></label>
              <select value={groupCode} onChange={handleChangeGroupCode} className="form-select" aria-label="Default select example">
                {groupCodes.map((groupCode)=> (
                  <option value={groupCode.value} key={groupCode.value}>{groupCode.label}</option>
                ))}
              </select>
          </div>
          <div className="mb-3 row">
            <label><strong>코드값</strong></label>
            <input type="text" className="form-control" value={codeValue} onChange={handleChagneCodeValue} />
          </div>
          <div className="mb-3 row">
            <label><strong>코드명</strong></label>
            <input type="text" className="form-control" value={codeName} onChange={handleChangeCodeName} />
          </div>
            <div className={styles.align_center}>
              <button className="btn btn-dark btn-sm" type="submit">등록</button>
              <Link className="btn btn-light btn-sm" to={"/codedetail"}>취소</Link>
            </div>
          </form>
      </div>
      );
}

export default CodeDetailRegisterForm;