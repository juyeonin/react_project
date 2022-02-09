import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoticeRead from "../../components/notice/NoticeRead";
import { fetchOneThunk } from "../../modules/notice";
import * as api from "../../lib/api";
import { isAdmin as hasRoleAdmin } from "../../modules/selector";
import { useHistory } from "react-router-dom";
import { RootState } from "../../modules";

interface Props {
  readonly noticeNo: string;
}

const NoticeReadContainer = ({ noticeNo }: Props) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { notice, isLoading, isAdmin } = useSelector((state: RootState) => ({
    notice: state.notice.notice,
    isLoading: state.loading.FETCH_ONE,
    isAdmin: hasRoleAdmin(state),
  }));

  useEffect(() => {
    dispatch(fetchOneThunk(noticeNo));
  }, [dispatch, noticeNo]);

  const onRemove = async () => {
    try {
      await api.removeNotice(noticeNo);

      alert("삭제가 완료되었습니다.");

      history.push("/notice");
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

  return (
    <NoticeRead
      notice={notice}
      isLoading={isLoading}
      noticeNo={noticeNo}
      onRemove={onRemove}
      isAdmin={isAdmin}
    />
  );
};

export default NoticeReadContainer;
