import React from "react";
import { Link } from "react-router-dom";
import { Member } from "../../App";
import styles from "../../Shop.module.css";

interface Props {
  readonly members: Member[];
  readonly isLoading: boolean;
}
const MemberList = ({ members, isLoading }: Props) => {
  return (
    <div className={styles.centered}>
      <br />
      <h2>회원 목록</h2>
      {isLoading && "로딩중..."}
      {!isLoading && members && (
        <>
          <Link
            className="btn btn-outline-secondary btn-sm"
            to="/member/create"
          >
            새로만들기
          </Link>
          <table
            className="table"
            style={{ width: "75%", textAlign: "center" }}
          >
            <thead>
              <tr>
                <th>번호</th>
                <th>아이디</th>
                <th>비밀번호</th>
                <th>사용자명</th>
                <th>직업</th>
                <th>등록일시</th>
              </tr>
            </thead>
            <tbody>
              {!members.length && (
                <tr>
                  <td colSpan={6}>List is empty.</td>
                </tr>
              )}
              {!!members.length &&
                members.map((member) => (
                  <tr key={member.userNo}>
                    <td>{member.userNo}</td>
                    <td>{member.userId}</td>
                    <td>{member.userPw}</td>
                    <td>{member.userName}</td>
                    <td>{member.job}</td>
                    <td>{member.regDate}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default MemberList;
