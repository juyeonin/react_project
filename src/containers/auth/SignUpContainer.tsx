import React from "react";
import SignUpForm from "../../components/auth/SignUpForm";
import { useHistory } from "react-router-dom";
import * as api from "../../lib/api";

const SignUpContainer = () => {
  const history = useHistory();

  const onSignUp = async (
    userId: string,
    userName: string,
    password: string,
    job: string
  ) => {
    try {
      await api.signUp(userId, userName, password, job);

      alert("회원가입이 완료되었습니다.");
      history.push("/signin");
    } catch (e: any) {
      if (e.response.data === 400) {
        alert("잘못된 요청입니다.");
      } else {
        alert(e.response.data.message);
      }
    }
  };
  return <SignUpForm onSignUp={onSignUp} />;
};

export default SignUpContainer;
