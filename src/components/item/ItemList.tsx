import React from "react";
import { Link } from "react-router-dom";
import { Item } from "../../App";
import styles from "../../Shop.module.css";

interface Props {
  readonly items: Item[];
  readonly isLoading: boolean;
  readonly isAdmin: boolean;
}
const ItemList = ({ items, isLoading, isAdmin }: Props) => {
  return (
    <div className={styles.centered}>
      <div className={styles.shop_table}>
        <h2>상품 목록</h2>
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
            <table className="table">
              <thead>
                <tr>
                  <th className={styles.w_80}>상품아이디</th>
                  <th className={styles.w_300}>상품명</th>
                  <th className={styles.w_100}>상품가격</th>
                  {isAdmin && <th>삭제</th>}
                </tr>
              </thead>
              <tbody>
                {!items.length && (
                  <tr>
                    {isAdmin ? (
                      <td colSpan={4}>List is empty.</td>
                    ) : (
                      <td colSpan={3}>List is empty.</td>
                    )}
                  </tr>
                )}
                {!!items.length &&
                  items.map((item) => (
                    <tr key={item.itemId}>
                      <td>{item.itemId}</td>
                      <td>
                        <Link to={`/item/read/${item.itemId}`}>
                          {item.itemName}
                        </Link>
                      </td>
                      <td>{item.price}원</td>
                      {isAdmin && (
                        <td>
                          <button
                            style={{
                              border: "none",
                              background: "none",
                              cursor: "pointer",
                            }}
                          >
                            <strong>X</strong>
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemList;
