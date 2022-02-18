import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PdsList from '../../components/pds/PdsList';
import { pdsActions } from '../../modules/pds';
import { isAdmin as hasRoleAdmin } from '../../modules/selector';
import { RootState } from '../../modules';

const PdsListContainer = () => {
  const dispatch = useDispatch();

  const { pdsItems, isLoading, isAdmin } = useSelector((state: RootState) => ({
    pdsItems: state.pds.pdsItems,
    isLoading: state.loading.FETCH_LIST,
    isAdmin: hasRoleAdmin(state),
  }));

  useEffect(() => {
    dispatch(pdsActions.fetchPdsList(dispatch));
  }, [dispatch]);

  return (
    <PdsList pdsItems={pdsItems} isLoading={isLoading} isAdmin={isAdmin} />
  );
};

export default PdsListContainer;
