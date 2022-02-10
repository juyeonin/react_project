import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PdsRead from '../../components/pds/PdsRead';
import { fetchOneThunk } from '../../modules/pds';
import * as api from '../../lib/api';
import { fetchAttachList, resetAttach } from '../../modules/pds';
import { isAdmin as hasRoleAdmin } from '../../modules/selector';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../modules';

interface Props {
  readonly itemId: string;
}

const PdsReadContainer = ({ itemId }: Props) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { pdsItem, attachments, isLoading, isAdmin } = useSelector(
    (state: RootState) => ({
      pdsItem: state.pds.pdsItem,
      attachments: state.pds.attachments,
      isLoading: state.loading.FETCH_ONE,
      isAdmin: hasRoleAdmin(state),
    }),
  );

  useEffect(() => {
    dispatch(fetchOneThunk(itemId));
  }, [dispatch, itemId]);

  const onRemove = async () => {
    try {
      await api.removePds(itemId);

      alert('삭제가 완료되었습니다.');

      history.push('/pds');
    } catch (e: any) {
      if (e.response.status === 400) {
        alert('잘못된 요청입니다.');
      } else if (e.response.status === 401) {
        alert('로그인이 필요합니다.');
        history.push('/signin');
      } else if (e.response.status === 403) {
        alert('접근 권한이 없습니다.');
        history.goBack();
      } else {
        alert(e.response.data.message);
      }
    }
  };

  const getAttachList = useCallback(async () => {
    try {
      const response = await api.fetchAttachList(itemId);

      dispatch(fetchAttachList(response.data));
    } catch (e) {
      throw e;
    }
  }, [dispatch, itemId]);

  useEffect(() => {
    getAttachList();

    return () => {
      dispatch(resetAttach());
    };
  }, [dispatch, getAttachList]);

  return (
    <PdsRead
      pdsItem={pdsItem}
      attachments={attachments}
      isLoading={isLoading}
      itemId={itemId}
      onRemove={onRemove}
      isAdmin={isAdmin}
    />
  );
};

export default PdsReadContainer;
