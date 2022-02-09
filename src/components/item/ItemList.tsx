import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Item } from "../../App";
import styles from "../../Shop.module.css";
import Paging from "../common/Pagination";
import "./flexMode.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
  readonly items: Item[];
  readonly isLoading: boolean;
  readonly isAdmin: boolean;
}
const ItemList = ({ items, isLoading, isAdmin }: Props) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit; //n번째 페이지 첫 게시물의 위치

  const [toggle, setToggle] = useState<boolean>(false);
  const [icon, setIcon] = useState<string>("그리드로 보기");
  const [type, setType] = useState<IconProp>(faBars);
  const onToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (toggle) {
      setType(faBars);
      setLimit(6);
      setIcon("리스트로 보기");
    } else {
      setType(faFolder);
      setLimit(10);
      setIcon("그리드로 보기");
    }
  }, [toggle]);

  return (
    <div className={styles.centered}>
      <br />
      <h3>상품 목록</h3>
      {isLoading && "로딩중..."}
      {!isLoading && items && (
        <>
          {isAdmin && (
            <Link
              className="btn btn-outline-secondary btn-sm"
              to="/item/create"
            >
              새로만들기
            </Link>
          )}
          {!isAdmin && (
            <button onClick={onToggle} className="listFlexButton">
              <FontAwesomeIcon icon={type} />
              <span className="listFlexButtonHover">{icon}</span>
            </button>
          )}
          <div className={"listTable" + (toggle ? " active" : "")}>
            <table className="table">
              <thead>
                <tr>
                  <th>상품아이디</th>
                  <th>상품명</th>
                  <th>상품가격</th>
                </tr>
              </thead>
              <tbody>
                {!items.length && (
                  <tr>
                    <td colSpan={3}>List is empty.</td>
                  </tr>
                )}
                {!!items.length &&
                  items.slice(offset, offset + limit).map((item) => (
                    <tr key={item.itemId}>
                      <td>{item.itemId}</td>
                      <td>
                        <Link to={`/item/read/${item.itemId}`}>
                          {item.itemName}
                        </Link>
                      </td>
                      <td>{item.price}원</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className={"flexTable" + (toggle ? "" : " active")}>
            {!items.length && <strong>List is empty..</strong>}
            {!!items.length &&
              items.slice(offset, offset + limit).map((item) => (
                <div className="flexList" key={item.itemId}>
                  <div className="flexListImage">
                    <Link to={`/item/read/${item.itemId}`}>
                      <img
                        src={
                          "/items/preview?itemId=" +
                          item.itemId +
                          "&timestamp=" +
                          new Date().getTime()
                        }
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="flexListName">
                    상품명 :&nbsp;
                    <Link to={`/item/read/${item.itemId}`}>
                      {item.itemName}
                    </Link>
                  </div>
                  <div className="flexListPrice">가격 : {item.price}원</div>
                </div>
              ))}
          </div>
        </>
      )}
      <Paging
        total={items.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default ItemList;
