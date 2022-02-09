import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserItemList from "../../components/userItem/UserItemList";
import { RootState } from "../../modules";
import { fetchListThunk } from "../../modules/userItem";

const UserItemListContainer = () => {
  const dispatch = useDispatch();

  const { userItems, isLoading } = useSelector(
    ({ userItem, loading }: RootState) => ({
      userItems: userItem.userItems,
      isLoading: loading.FETCH_LIST,
    })
  );

  useEffect(() => {
    dispatch(fetchListThunk());
  }, [dispatch]);

  return <UserItemList userItems={userItems} isLoading={isLoading} />;
};

export default UserItemListContainer;
