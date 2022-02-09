import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Board, Comment, MyInfo } from "../../App";
import styles from "../../Shop.module.css";
import "./boardRead.css";

interface Props {
  readonly board: Board | null;
  readonly isLoading: boolean;
  readonly boardNo: string;
  readonly onRemove: () => void;
  readonly myInfo: MyInfo | null;
  readonly addComment: (comment: string, commentWriter: string) => void;
  readonly comments: Comment[];
}

const BoardRead = ({
  board,
  isLoading,
  boardNo,
  onRemove,
  myInfo,
  addComment,
  comments,
}: Props) => {
  const [comment, setComment] = useState("");
  const [commentWriter, setCommentWriter] = useState("Anonymous");

  let isOwn = false;
  if (myInfo && board) {
    if (myInfo.userId === board.writer) {
      isOwn = true;
    }
  }

  let isAdmin = false;
  if (myInfo && myInfo.authList[0].auth === "ROLE_ADMIN") {
    isAdmin = true;
  }

  const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleChangeCommentWriter = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommentWriter(e.target.value);
  };

  const handleSubmitComment = (comment: string, commentWriter: string) => {
    addComment(comment, commentWriter);
    setComment("");
    setCommentWriter("Anonymous");
  };

  return (
    <div className={styles.centered}>
      <br />
      <h2>게시판 상세보기</h2>
      {isLoading && "로딩중..."}
      {!isLoading && board && (
        <>
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>번호</strong>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control-plaintext"
                    style={{ fontWeight: "bold" }}
                    value={"No." + board.boardNo}
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <strong>등록일시</strong>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control-plaintext"
                    value={board.regDate}
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <strong>제목</strong>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control-plaintext"
                    value={board.title}
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <strong>작성자</strong>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control-plaintext"
                    value={board.writer}
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <p style={{ textAlign: "center" }}>
                    <strong>====================</strong>
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>내용</strong>
                </td>
                <td>
                  <pre dangerouslySetInnerHTML={{ __html: board.content }} />
                </td>
              </tr>
            </tbody>
          </table>
          <div className={styles.align_center} style={{ marginBottom: "50px" }}>
            {isOwn && (
              <>
                <Link
                  className="btn btn-light btn-sm"
                  to={`/board/edit/${boardNo}`}
                >
                  편집
                </Link>
                <button className="btn btn-dark btn-sm" onClick={onRemove}>
                  삭제
                </button>
              </>
            )}
            {isAdmin && (
              <button className="btn btn-dark btn-sm" onClick={onRemove}>
                삭제
              </button>
            )}
            <Link className="btn btn-light btn-sm" to="/board">
              목록
            </Link>
          </div>

          {/* 댓글 달기 */}
          <div>
            <p>
              <strong>Comment</strong>
            </p>
            <input
              className="formControlWriter"
              type="text"
              value={commentWriter}
              onChange={handleChangeCommentWriter}
            />
            <input
              className="formControl"
              type="text"
              value={comment}
              onChange={handleChangeComment}
              placeholder="댓글을 입력하세요."
            />
            <button
              className="btn btn-dark btn-sm"
              style={{ margin: "0 0 5px 2px" }}
              onClick={() => handleSubmitComment(comment, commentWriter)}
            >
              등록
            </button>
            <div>
              {comments &&
                comments.map((comment, index) => (
                  <li className="commentList" key={index}>
                    <strong>작성자: {comment.commentWriter}</strong>
                    <br />
                    {comment.content}
                  </li>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BoardRead;
