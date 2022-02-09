import React, { useState, useRef, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../Shop.module.css";
import { Notice } from "../../App";
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 


interface Props {
  readonly notice: Notice | null;
  readonly isLoading: boolean;
  readonly onModify: (noticeNo: string, title: string, content: string) => void;
}

function NoticeModifyForm({
  notice,
  isLoading,
  onModify,
}: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const quillRef = useRef<ReactQuill>();

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

    if(notice) {
      onModify(notice.noticeNo, title, content);
    }
  };

  useEffect(() => {
    if(notice) {
      setTitle(notice.title);
      setContent(notice.content);
    }
  }, [notice]);

  return (
    <div className={styles.centered}>
      <br/>
      <h2>공지사항 수정</h2>
      {isLoading && "로딩중..."}
      {!isLoading && notice && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3 row">
                <label htmlFor="staticNoticeNumber" className="col-sm-2 col-form-label"><strong>번호</strong></label>
                <div className="col-sm-10">
                    <input type="text" className="form-control-plaintext" value={notice.noticeNo} id="staticNoticeNumber" disabled />
                </div>
            </div>
          <div className="mb-3 row">
                <label htmlFor="staticNoticeDate" className="col-sm-2 col-form-label"><strong>등록일시</strong></label>
                <div className="col-sm-10">
                    <input type="text" className="form-control-plaintext" value={notice.regDate} id="staticNoticeDate" disabled />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="staticTitle" className="col-sm-2 col-form-label"><strong>제목</strong></label>
                <div className="col-sm-10">
                    <input type="text" className="form-control-plaintext" value={title} onChange={handleChangeTitle} id="staticTitle" placeholder="제목을 입력해주세요." />
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
            style={{minHeight:"300px", marginBottom: '6%'}}
            theme="snow"
            placeholder="내용을 입력해주세요."
          />
        </div>
          <div className={styles.align_center} style={{marginBottom:"50px"}}>
            <button className="btn btn-dark btn-sm" type="submit">수정</button>
            <Link className="btn btn-light btn-sm" to={`/notice/read/${notice.noticeNo}`}>취소</Link>
          </div>
        </form>
      )}
    </div>
  );
}

export default NoticeModifyForm;
