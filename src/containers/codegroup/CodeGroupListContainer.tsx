import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CodeGroupList from "../../components/codegroup/CodeGroupList";
import { fetchListThunk } from "../../modules/codegroup";
import { RootState } from "../../modules";

const CodeGroupListContainer = () => {
  const dispatch = useDispatch();

  const { codeGroups, isLoading } = useSelector(
    ({ codegroup, loading }: RootState) => ({
      codeGroups: codegroup.codeGroups,
      isLoading: loading.FETCH_LIST,
    })
  );

  useEffect(() => {
    dispatch(fetchListThunk());
  }, [dispatch]);

  return <CodeGroupList codeGroups={codeGroups} isLoading={isLoading} />;
};

export default CodeGroupListContainer;
