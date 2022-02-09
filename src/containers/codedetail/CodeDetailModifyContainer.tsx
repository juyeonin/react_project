import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CodeDetailModifyForm from "../../components/codedetail/CodeDetailModifyForm";
import { RootState } from "../../modules";
import { fetchOneThunk } from "../../modules/codedetail";
import * as api from "../../lib/api";

interface Props {
  readonly groupCode: string;
  readonly codeValue: string;
}
const CodeDetailModifyContainer = ({ groupCode, codeValue }: Props) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { codeDetail, isLoading } = useSelector(
    ({ codedetail, loading }: RootState) => ({
      codeDetail: codedetail.codeDetail,
      isLoading: loading.FETCH_ONE,
    })
  );

  const onModify = async (
    groupCode: string,
    codeValue: string,
    codeName: string
  ) => {
    try {
      await api.modifyCodeDetail(groupCode, codeValue, codeName);

      history.push(`/codedetail/read/${groupCode}/${codeValue}`);
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
    dispatch(fetchOneThunk({ groupCode, codeValue }));
  }, [dispatch, groupCode, codeValue]);

  return (
    <CodeDetailModifyForm
      codeDetail={codeDetail}
      isLoading={isLoading}
      onModify={onModify}
    />
  );
};

export default CodeDetailModifyContainer;
