import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardModifyForm from "../../components/board/BoardModifyForm";
import * as api from "../../lib/api";
import { fetchOneThunk } from "../../modules/board";
import { useHistory } from "react-router-dom";
import { RootState } from "../../modules";

interface Props {
  readonly boardNo: string;
}

const BoardModifyContainer = ({ boardNo }: Props) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { board, isLoading, myInfo } = useSelector(
    ({ board, loading, auth }: RootState) => ({
      board: board.board,
      isLoading: loading.FETCH_ONE,
      myInfo: auth.myInfo,
    })
  );

  const onModify = async (
    boardNo: string,
    title: string,
    content: string,
    writer: string
  ) => {
    try {
      await api.modifyBoard(boardNo, title, content, writer);

      alert("수정이 완료되었습니다.");

      history.push("/board/read/" + boardNo);
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
    dispatch(fetchOneThunk(boardNo));
  }, [dispatch, boardNo]);

  return (
    <BoardModifyForm
      board={board}
      isLoading={isLoading}
      onModify={onModify}
      myInfo={myInfo}
    />
  );
};

export default BoardModifyContainer;
