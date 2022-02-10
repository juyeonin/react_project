import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PdsRegisterForm from '../../components/pds/PdsRegisterForm';
import * as api from '../../lib/api';
import { addAttach, removeAttach } from '../../modules/pds';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../modules';
import { ItemObject } from '../../App';

const PdsRegisterContainer = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const { attachments } = useSelector(({ pds }: RootState) => ({
    attachments: pds.attachments,
  }));

  const onRegister = async (itemName: string, description: string) => {
    const itemObject: ItemObject = {
      itemName: itemName,
      description: description,
      files: attachments,
    };

    try {
      const response = await api.writePds(itemObject);

      alert('등록이 완료되었습니다.');

      history.push('/pds/read/' + response.data.itemId);
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

  const onAddAttach = async (file: File) => {
    try {
      let formData = new FormData();

      formData.append('file', file);

      const response = await api.addAttach(formData);
      const attach = response.data;
      console.log(attach);
      dispatch(addAttach(attach));
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
    dispatch(removeAttach(index));
  };

  return (
    <PdsRegisterForm
      attachments={attachments}
      onRegister={onRegister}
      onAddAttach={onAddAttach}
      onRemoveAttach={onRemoveAttach}
    />
  );
};

export default PdsRegisterContainer;
