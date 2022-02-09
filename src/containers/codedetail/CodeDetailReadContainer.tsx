import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CodeDetailRead from "../../components/codedetail/CodeDetailRead";
import { RootState } from "../../modules";
import { fetchOneThunk } from "../../modules/codedetail";
import * as api from "../../lib/api";

interface Props {
  readonly groupCode: string;
  readonly codeValue: string;
}
const CodeDetailReadContainer = ({ groupCode, codeValue }: Props) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { codeDetail, isLoading } = useSelector(
    ({ codedetail, loading }: RootState) => ({
      codeDetail: codedetail.codeDetail,
      isLoading: loading.FETCH_ONE,
    })
  );

  useEffect(() => {
    dispatch(fetchOneThunk({ groupCode, codeValue }));
  }, [dispatch, groupCode, codeValue]);

  const onRemove = async () => {
    try {
      await api.removeCodeDetail(groupCode, codeValue);
      alert("삭제가 완료되었습니다.");
      history.push("/codedetail");
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
    <CodeDetailRead
      codeDetail={codeDetail}
      isLoading={isLoading}
      groupCode={groupCode}
      codeValue={codeValue}
      onRemove={onRemove}
    />
  );
};

export default CodeDetailReadContainer;
