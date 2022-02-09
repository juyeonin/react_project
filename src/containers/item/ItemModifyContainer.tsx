import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../../lib/api";
import { fetchOneThunk } from "../../modules/item";
import { useHistory } from "react-router-dom";
import { RootState } from "../../modules";
import ItemModifyForm from "../../components/item/ItemModifyForm";

interface Props {
  readonly itemId: string;
}

const ItemModifyContainer = ({ itemId }: Props) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { item, isLoading } = useSelector(({ item, loading }: RootState) => ({
    item: item.item,
    isLoading: loading.FETCH_ONE,
  }));

  const onModify = async (
    itemId: string,
    itemName: string,
    price: number,
    description: string,
    file?: File,
    previewFile?: File
  ) => {
    const itemObject = {
      itemId: itemId,
      itemName: itemName,
      price: price,
      description: description,
    };

    let formData = new FormData();

    if (file) {
      formData.append("file", file);
    }
    if (previewFile) {
      formData.append("file2", previewFile);
    }

    formData.append("item", JSON.stringify(itemObject));

    try {
      await api.modifyItem(itemId, formData);

      alert("수정이 완료되었습니다.");

      history.push("/item/read/" + itemId);
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
    dispatch(fetchOneThunk(itemId));
  }, [dispatch, itemId]);

  return (
    <ItemModifyForm item={item} isLoading={isLoading} onModify={onModify} />
  );
};

export default ItemModifyContainer;
