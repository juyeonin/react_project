import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Board } from "../../App";
import styles from "../../Shop.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Paging from "../common/Pagination";

interface Props {
  readonly boards: Board[];
  readonly isLoading: boolean;
  readonly isMember: boolean;
}
const BoardList = ({ boards, isLoading, isMember }: Props) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit; //n번째 페이지 첫 게시물의 위치

  return (
    <div className={styles.centered}>
      <div className={styles.shop_table}>
        <h2>게시판 목록</h2>
        {isLoading && "로딩중..."}
        {!isLoading && boards && (
          <>
            {isMember && (
              <Link
                className="btn btn-outline-secondary btn-sm"
                to="/board/create"
              >
                새로만들기
              </Link>
            )}
            <table className="table">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>등록일시</th>
                </tr>
              </thead>
              <tbody>
                {!boards.length && (
                  <tr>
                    <td colSpan={4}>List is empty.</td>
                  </tr>
                )}
                {!!boards.length &&
                  boards.map((board) => (
                    <tr key={board.boardNo}>
                      <td>{board.boardNo}</td>
                      <td>
                        <Link to={`/board/read/${board.boardNo}`}>
                          {board.title}
                        </Link>
                      </td>
                      <td>{board.writer}</td>
                      <td>{board.regDate}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className={styles.searchBox}>
              <select className={styles.searchLeft}>
                <option>제목</option>
                <option>작성자</option>
              </select>
              <input
                className={styles.searchCenter}
                type="text"
                placeholder="검색어"
              />
              <button className={styles.searchRight}>
                <FontAwesomeIcon icon={faSearch} />

                <span className={styles.tooltiptext}>검색</span>
              </button>
            </div>
          </>
        )}
      </div>
      <Paging
        total={boards.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default BoardList;
