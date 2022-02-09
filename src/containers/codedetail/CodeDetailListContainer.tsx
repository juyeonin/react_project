import React, { useEffect } from "react";
import CodeDeatilList from "../../components/codedetail/CodeDetailList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { fetchListThunk } from "../../modules/codedetail";

const CodeDetailListContainer = () => {
  const dispatch = useDispatch();

  const { codeDetails, isLoading } = useSelector(
    ({ codedetail, loading }: RootState) => ({
      codeDetails: codedetail.codeDetails,
      isLoading: loading.FETCH_LIST,
    })
  );

  useEffect(() => {
    dispatch(fetchListThunk());
  }, [dispatch]);
  return <CodeDeatilList codeDetails={codeDetails} isLoading={isLoading} />;
};

export default CodeDetailListContainer;
