import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListThunk } from "../../modules/member";
import { RootState } from "../../modules";
import MemberList from "../../components/member/MemberList";

const MemberListContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListThunk());
  }, [dispatch]);

  const { members, isLoading } = useSelector(
    ({ member, loading }: RootState) => ({
      members: member.members,
      isLoading: loading.FETCH_LIST,
    })
  );

  return <MemberList members={members} isLoading={isLoading} />;
};

export default MemberListContainer;
