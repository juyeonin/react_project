import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoticeModifyForm from "../../components/notice/NoticeModifyForm";
import * as api from "../../lib/api";
import { fetchOneThunk } from "../../modules/notice";
import { useHistory } from "react-router-dom";
import { RootState } from "../../modules";

interface Props {
  readonly noticeNo: string;
}

const NoticeModifyContainer = ({ noticeNo }: Props) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { notice, isLoading } = useSelector(
    ({ notice, loading }: RootState) => ({
      notice: notice.notice,
      isLoading: loading.FETCH_ONE,
    })
  );

  const onModify = async (noticeNo: string, title: string, content: string) => {
    try {
      await api.modifyNotice(noticeNo, title, content);

      alert("수정이 완료되었습니다.");

      history.push("/notice/read/" + noticeNo);
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

  useEffect(() => {
    dispatch(fetchOneThunk(noticeNo));
  }, [dispatch, noticeNo]);

  return (
    <NoticeModifyForm
      notice={notice}
      isLoading={isLoading}
      onModify={onModify}
    />
  );
};

export default NoticeModifyContainer;
