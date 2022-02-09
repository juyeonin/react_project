import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../Shop.module.css";
import { Notice } from "../../App";
import Paging from "../common/Pagination";

interface Props {
  readonly notices: Notice[];
  readonly isLoading: boolean;
  readonly isAdmin: boolean;
  readonly delClick: (noticeNo: string) => void;
  checkItems: String[];
  handleSingleCheck: (checked: boolean, id: string) => void;
  handleAlLCheck: (checked: boolean) => void;
  allDelClick: () => void;
  selectedDelClick: () => void;
}

function NoticeList({
  notices,
  isLoading,
  isAdmin,
  delClick,
  checkItems,
  handleSingleCheck,
  handleAlLCheck,
  allDelClick,
  selectedDelClick,
}: Props) {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit; //n번째 페이지 첫 게시물의 위치

  return (
    <div className={styles.centered}>
      <div className={styles.shop_table}>
        <h2>공지사항 목록</h2>
        {isLoading && "로딩중..."}
        {!isLoading && !notices && (
          <table className="table">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>등록일시</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={3}>List is empty.</td>
              </tr>
            </tbody>
          </table>
        )}
        {!isLoading && notices && (
          <>
            {isAdmin && (
              <Link
                className="btn btn-outline-secondary btn-sm"
                to="/notice/create"
              >
                새로만들기
              </Link>
            )}
            <table className="table">
              <thead>
                <tr>
                  {isAdmin && (
                    <th>
                      <input
                        className="form-check-input me-1 "
                        type="checkbox"
                        value=""
                        aria-label="..."
                        checked={
                          notices.length === checkItems.length ? true : false
                        }
                        onChange={(e) => handleAlLCheck(e.target.checked)}
                      />
                    </th>
                  )}
                  <th>번호</th>
                  <th>제목</th>
                  <th>등록일시</th>
                  {isAdmin && <th>삭제</th>}
                </tr>
              </thead>
              <tbody>
                {!notices.length && (
                  <tr>
                    {isAdmin && <td colSpan={5}>List is empty.</td>}
                    {!isAdmin && <td colSpan={3}>List is empty.</td>}
                  </tr>
                )}
                {!!notices.length &&
                  notices.slice(offset, offset + limit).map((notice) => (
                    <tr key={notice.noticeNo}>
                      {isAdmin && (
                        <td>
                          <input
                            className="form-check-input me-1"
                            type="checkbox"
                            value=""
                            aria-label="..."
                            checked={
                              checkItems.includes(notice.noticeNo)
                                ? true
                                : false
                            }
                            onChange={(e) =>
                              handleSingleCheck(
                                e.target.checked,
                                notice.noticeNo
                              )
                            }
                          />
                        </td>
                      )}
                      <td>{notice.noticeNo}</td>
                      <td>
                        <Link to={`/notice/read/${notice.noticeNo}`}>
                          {notice.title}
                        </Link>
                      </td>
                      <td>{notice.regDate}</td>
                      {isAdmin && (
                        <td>
                          <button
                            style={{
                              border: "none",
                              background: "none",
                              cursor: "pointer",
                            }}
                            onClick={() => delClick(notice.noticeNo)}
                          >
                            <strong>X</strong>
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
            {isAdmin && (
              <div style={{ display: "inlineBlock", float: "right" }}>
                <button
                  style={{ marginRight: "5px" }}
                  className="btn btn-danger btn-sm"
                  onClick={allDelClick}
                >
                  전체삭제
                </button>
                <button
                  className="btn btn-light btn-sm"
                  onClick={selectedDelClick}
                >
                  선택삭제
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Paging
        total={notices.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}

export default NoticeList;
