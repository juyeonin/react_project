import React from "react";
import NoticeRegisterForm from "../../components/notice/NoticeRegisterForm";
import * as api from "../../lib/api";
import { useHistory } from "react-router-dom";

const NoticeRegisterContainer = () => {
  const history = useHistory();

  const onRegister = async (title: string, content: string) => {
    try {
      const response = await api.writeNotice(title, content);

      alert("등록이 완료되었습니다.");

      history.push("/notice/read/" + response.data.noticeNo);
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
  };

  return <NoticeRegisterForm onRegister={onRegister} />;
};

export default NoticeRegisterContainer;
