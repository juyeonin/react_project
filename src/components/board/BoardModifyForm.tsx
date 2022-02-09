import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import styles from "../../Shop.module.css";
import { Board, MyInfo } from "../../App";
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 

interface Props {
  readonly board: Board | null;
  readonly isLoading: boolean;
  readonly onModify: (boardNo: string, title: string, content: string, writer: string) => void;
  readonly myInfo: MyInfo | null;
}

function BoardModifyForm({
  board,
  isLoading,
  onModify,
  myInfo,
}: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const quillRef = useRef<ReactQuill>();

  let isOwn = false;
  if(myInfo && board) {
    if(myInfo.userId === board.writer) {
      isOwn = true;
    }
  }

  const modules = useMemo(
    () => ({
        toolbar: { // 툴바에 넣을 기능
            container: [
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ size: ["small", false, "large", "huge"] }, { color: [] }],
                [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                    { align: [] },
                ],
            ],
        },
    }), []
);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(board) {
      onModify(board.boardNo, title, content, board.writer);
    }
  };

  useEffect(() => {
    if(board) {
      setTitle(board.title);
      setContent(board.content);
    }
  }, [board]);

  return (
    <div className={styles.centered}>
      <h2>게시판 수정</h2>
      {isLoading && "로딩중..."}
      {!isLoading && board && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3 row">
              <label htmlFor="staticNumber" className="col-sm-2 col-form-label"><strong>번호</strong></label>
              <div className="col-sm-10">
                <input type="text" className="form-control-plaintext" value={board.boardNo} id="staticNumber" disabled />
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="staticDate" className="col-sm-2 col-form-label"><strong>등록일시</strong></label>
              <div className="col-sm-10">
                <input type="text" className="form-control-plaintext" value={board.regDate} id="staticDate" disabled />
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label"><strong>제목</strong></label>
              <div className="col-sm-10">
                <input type="text" className="form-control-plaintext" value={title} onChange={handleChangeTitle} id="staticEmail" placeholder="제목을 입력해주세요." />
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="staticWriter" className="col-sm-2 col-form-label"><strong>작성자</strong></label>
              <div className="col-sm-10">
                <input type="text" className="form-control-plaintext" value={board.writer} id="staticWriter" disabled />
              </div>
          </div>
          <div className="mb-3 row">
            <label><strong>내용</strong></label>
            <ReactQuill
              ref={(element) => {
                if (element !== null) {
                  quillRef.current = element;
                }
              }}
              value={content}
              onChange={setContent}
              modules={modules}
              style={{minHeight: '500px', marginBottom: '6%'}}
              theme="snow"
              placeholder="내용을 입력해주세요."
            />
          </div>
          <div className={styles.align_center} style={{marginBottom:"50px"}}>
            {isOwn && (
              <button className="btn btn-dark btn-sm" type="submit">수정</button>
            )}
            <Link className="btn btn-light btn-sm" to={`/board/read/${board.boardNo}`}>취소</Link>
          </div>
        </form>
      )}
    </div>
    
  );
}

export default BoardModifyForm;
