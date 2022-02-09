import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CodeValue } from "../../App";
import * as api from "../../lib/api";
import styles from "../../Shop.module.css";

interface Props {
    readonly onSignUp: (userId: string, userName: string, password: string, job: string) => void;
}
const SignUpForm = ({ onSignUp }: Props) => {
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPasseword] = useState("");
    const [job, setJob] = useState("00");
    const [jobCodes, setJobCodes] = useState<CodeValue[]>([]);

    const handleChangeUserId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(e.target.value);
    }, []);

    const handleChangeUserName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    }, []);

    const handleChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPasseword(e.target.value);
    }, []);

    const handleChangeJob = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setJob(e.target.value);
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        onSignUp(userId, userName, password, job);
    }, [userId, userName, password, job, onSignUp]);

    const getJobCodeList = async () => {
        try {
            const response = await api.fetchJobCodeList();
            setJobCodes(response.data);
        } catch (e) {
            throw e;
        }
    }

    useEffect(() => {
        getJobCodeList();
    }, []);

    return (
        <div className={styles.centered}>
            <br />
            <h2>회원가입</h2>
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
                <br />
                <div className="d-grid gap-2 col-6 mx-auto">
                    <button className="btn btn-outline-dark" type="submit">회원가입</button>
                </div>
            </form>
            <p><Link className="btn btn-link" to="/signin">로그인</Link></p>
        </div>
    );

};

export default SignUpForm;
