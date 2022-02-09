import React from "react";
import { Link } from "react-router-dom";
import styles from "../../Shop.module.css";
import { Notice } from "../../App";

interface Props {
  readonly notice: Notice | null;
  readonly isLoading: boolean;
  readonly noticeNo: string;
  readonly onRemove: () => void;
  readonly isAdmin: boolean;
}

function NoticeRead({ notice, isLoading, noticeNo, onRemove, isAdmin }: Props) {
  return (
    <div className={styles.centered}>
      <br />
      <h2>공지사항 상세보기</h2>
      {isLoading && "로딩중..."}
      {!isLoading && notice && (
        <>
          <table>
            <tbody>
              <tr>
                <td>번호</td>
                <td>
                  <input
                    type="text"
                    className="form-control-plaintext"
                    style={{ fontWeight: "bold" }}
                    value={"No." + notice.noticeNo}
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <td>등록일시</td>
                <td>
                  <input
                    type="text"
                    className="form-control-plaintext"
                    value={notice.regDate}
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <td>제목</td>
                <td>
                  <input
                    type="text"
                    className="form-control-plaintext"
                    value={notice.title}
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
                <td>내용</td>
                <td>
                  <pre dangerouslySetInnerHTML={{ __html: notice.content }} />
                </td>
              </tr>
            </tbody>
          </table>
          <div className={styles.align_center} style={{ marginBottom: "50px" }}>
            {isAdmin && (
              <>
                <Link
                  className="btn btn-light btn-sm"
                  to={`/notice/edit/${noticeNo}`}
                >
                  편집
                </Link>
                <button className="btn btn-dark btn-sm" onClick={onRemove}>
                  삭제
                </button>
              </>
            )}
            <Link className="btn btn-light btn-sm" to="/notice">
              목록
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default NoticeRead;
