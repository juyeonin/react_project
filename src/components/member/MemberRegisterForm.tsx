import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CodeValue } from "../../App";
import * as api from "../../lib/api";
import styles from "../../Shop.module.css";

interface Props {
    readonly onRegister: (userId: string, userName: string, password: string, job: string) => void;
}
const MemberRegisterForm = ({ onRegister }: Props) => {
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [job, setJob] = useState("00");
    const [jobCodes, setJobCodes] = useState<CodeValue[]>([]);

    const handleChangeUserId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(e.target.value);
    }, []);

    const handleChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }, []);

    const handleChangeUserName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    }, []);

    const handleChangeJob = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setJob(e.target.value);
    }, []);

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onRegister(userId, userName, password, job);
    }, [userId, userName, password, job, onRegister]);

    const getJobCodeList = async () => {
        try {
            const response = await api.fetchJobCodeList();
            setJobCodes(response.data);
        } catch (e) {
            throw e;
        }
    };

    useEffect(() => {
        getJobCodeList();
    }, []);

    return (
        <div className={styles.centered}>
            <h2>회원 등록</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="ID" value={userId} onChange={handleChangeUserId} />
                    <label htmlFor="floatingInput">ID</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={handleChangePassword} />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingPassword" placeholder="Password" value={userName} onChange={handleChangeUserName} />
                    <label htmlFor="floatingPassword">UserName</label>
                </div>
                <div className="form-floating mb-3">
                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example" value={job} onChange={handleChangeJob}>
                        {jobCodes.map((jobCode) => (
                            <option value={jobCode.value} key={jobCode.value}>{jobCode.label}</option>
                        ))}
                    </select>
                    <label htmlFor="floatingSelect">Works with selects</label>
                </div>
                <div className={styles.align_center} style={{ marginBottom: "50px" }}>
                    <button className="btn btn-dark btn-sm" type="submit">등록</button>
                    <Link className="btn btn-light btn-sm" to="/member">취소</Link>
                </div>
            </form>
        </div>
    );
};

export default MemberRegisterForm;