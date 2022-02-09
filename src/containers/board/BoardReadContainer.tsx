import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardRead from "../../components/board/BoardRead";
import { fetchOneThunk } from "../../modules/board";
import * as api from "../../lib/api";
import { useHistory } from "react-router-dom";
import { RootState } from "../../modules";
import { Comment } from "../../App";

interface Props {
  readonly boardNo: string;
}

const BoardReadContainer = ({ boardNo }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [comments, setComments] = useState<Comment[]>([]);

  const { board, isLoading, myInfo } = useSelector(
    ({ board, loading, auth }: RootState) => ({
      board: board.board,
      isLoading: loading.FETCH_ONE,
      myInfo: auth.myInfo,
    })
  );

  useEffect(() => {
    dispatch(fetchOneThunk(boardNo));
  }, [dispatch, boardNo]);

  const onRemove = async () => {
    try {
      if (board) {
        await api.removeBoard(boardNo, board.writer);

        alert("삭제가 완료되었습니다.");

        history.push("/board");
      }
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

  // 댓글 작성
  const addComment = (comment: string, commentWriter: string) => {
    setComments(
      comments.concat({
        content: comment,
        commentWriter: commentWriter,
      })
    );
  };

  return (
    <BoardRead
      board={board}
      isLoading={isLoading}
      boardNo={boardNo}
      onRemove={onRemove}
      myInfo={myInfo}
      addComment={addComment}
      comments={comments}
    />
  );
};

export default BoardReadContainer;
