import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PdsModifyForm from '../../components/pds/PdsModifyForm';
import * as api from '../../lib/api';
import {
  pdsActions
} from '../../modules/pds';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../modules';

interface Props {
  readonly itemId: string;
}

const PdsModifyContainer = ({ itemId }: Props) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { pdsItem, attachments, isLoading } = useSelector(
    ({ pds, loading }: RootState) => ({
      pdsItem: pds.pdsItem,
      attachments: pds.attachments,
      isLoading: loading.FETCH_ONE,
    }),
  );

  const onModify = async (
    itemId: string,
    itemName: string,
    description: string,
  ) => {
    const itemObject = {
      itemId: itemId,
      itemName: itemName,
      description: description,
      files: attachments,
    };

    try {
      await api.modifyPds(itemId, itemObject);

      alert('수정이 완료되었습니다.');

      history.push('/pds/read/' + itemId);
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

  useEffect(() => {
    dispatch(pdsActions.fetchPdsOne({dispatch, itemId}));
  }, [dispatch, itemId]);

  const onAddAttach = async (file: File) => {
    try {
      let formData = new FormData();

      formData.append('file', file);

      const response = await api.addAttach(formData);
      const attach = response.data;

      dispatch(pdsActions.add(attach));
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

  const onRemoveAttach = (index: number) => {
    dispatch(pdsActions.remove(index));
  };

  const getAttachList = useCallback(async () => {
    try {
      const response = await api.fetchAttachList(itemId);

      dispatch(pdsActions.attachList(response.data));
    } catch (e) {
      throw e;
    }
  }, [dispatch, itemId]);

  useEffect(() => {
    getAttachList();

    return () => {
      dispatch(pdsActions.reset());
    };
  }, [dispatch, getAttachList]);

  return (
    <PdsModifyForm
      pdsItem={pdsItem}
      attachments={attachments}
      isLoading={isLoading}
      onModify={onModify}
      onAddAttach={onAddAttach}
      onRemoveAttach={onRemoveAttach}
    />
  );
};

export default PdsModifyContainer;
