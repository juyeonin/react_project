import React from "react";
import { useHistory } from "react-router-dom";
import MemberRegisterForm from "../../components/member/MemberRegisterForm";
import * as api from "../../lib/api";

const MemberRegisterContainer = () => {
  const history = useHistory();

  const onRegister = async (userId: string, userName: string, password: string, job: string) => {
    try {
      await api.writeMember(userId, userName, password, job);
      alert("등록이 완료되었습니다.");
      history.push("/member");
    } catch (e: any) {
      if (e.response.status === 400) {
        alert("잘못된 요청입니다.");
      } else if (e.response.status === 401) {
        alert("로그인이 필요합니다.");
        history.push("/signin");
      } else if (e.response.status === 403) {
        alert("접근 권한이 없습니다.");
        history.goBack();
      } else {
        alert(e.response.data.message);
      }
    }
  }

  return <MemberRegisterForm onRegister={onRegister} />;
};

export default MemberRegisterContainer;