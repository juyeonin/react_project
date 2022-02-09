import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Item } from "../../App";
import styles from "../../Shop.module.css";

interface Props {
  readonly item: Item | null;
  readonly isLoading: boolean;
  readonly isAdmin: boolean;
  readonly itemId: string;
  readonly onRemove: () => void;
  readonly onBuy: () => void;
}

const ItemRead = ({
  item,
  isLoading,
  isAdmin,
  itemId,
  onRemove,
  onBuy,
}: Props): JSX.Element => {
  const previewUrl = () => {
    return (
      "/items/preview?itemId=" + itemId + "&timestamp=" + new Date().getTime()
    );
  };

  const copyRef = useRef<HTMLInputElement>(null);

  const onCopy = () => {
    copyRef.current?.select();
    document.execCommand("copy");

    alert("클립보드에 복사됨");
  };

  return (
    <div className={styles.centered}>
      <br />
      <h2>상품 상세보기</h2>
      {isLoading && "로딩중.."}
      {!isLoading && item && (
        <>
          <table>
            <tbody>
              <tr>
                <td>상품번호</td>
                <td>
                  <input
                    type="text"
                    className="form-control-plaintext"
                    value={"No." + item.itemId}
                    readOnly
                    style={{ fontWeight: "bold" }}
                  />
                </td>
              </tr>
              <tr>
                <td>상품명</td>
                <td>
                  <input
                    style={{
                      marginRight: 0,
                      display: "inline-block",
                      width: "auto",
                    }}
                    type="text"
                    className="form-control-plaintext"
                    value={item.itemName}
                    readOnly
                    ref={copyRef}
                  />
                  <button
                    onClick={onCopy}
                    style={{
                      border: "none",
                      backgroundColor: "white",
                      fontWeight: "600",
                    }}
                  >
                    복사
                  </button>
                </td>
              </tr>
              <tr>
                <td>상품가격</td>
                <td>
                  <input
                    type="text"
                    className="form-control-plaintext"
                    value={item.price + "원"}
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <td>미리보기</td>
                <td>
                  <img src={previewUrl()} alt="" width="200" />
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
                <td>상품설명</td>
                <td>
                  <pre dangerouslySetInnerHTML={{ __html: item.description }} />
                </td>
              </tr>
            </tbody>
          </table>
          <div className={styles.align_center} style={{ marginBottom: "50px" }}>
            {isAdmin && (
              <>
                <Link
                  className="btn btn-light btn-sm"
                  to={`/item/edit/${itemId}`}
                >
                  편집
                </Link>
                <button className="btn btn-dark btn-sm" onClick={onRemove}>
                  삭제
                </button>
              </>
            )}
            {!isAdmin && (
              <>
                <button className="btn btn-dark btn-sm" onClick={onBuy}>
                  구매
                </button>
              </>
            )}
            <Link className="btn btn-light btn-sm" to="/item">
              목록
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ItemRead;
