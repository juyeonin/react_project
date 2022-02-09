import React from "react";
import { ChargeCoin } from "../../App";
import styles from "../../Shop.module.css";

interface Props {
  readonly chargeCoins: ChargeCoin[];
  readonly isLoading: boolean;
}
const CoinChargeList = ({ chargeCoins, isLoading }: Props) => {
  console.log(chargeCoins);
  return (
    <div className={styles.centered}>
      <div className={styles.shop_table}>
        <h2>충전내역</h2>
        {isLoading && "로딩중.."}
        {!isLoading && chargeCoins && (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>충전금액</th>
                  <th>등록일</th>
                </tr>
              </thead>
              <tbody>
                {!chargeCoins.length && (
                  <tr>
                    <td colSpan={3}>List is empty.</td>
                  </tr>
                )}
                {!!chargeCoins.length &&
                  chargeCoins.map((chargeCoin) => (
                    <tr key={chargeCoin.historyNo}>
                      <td>{chargeCoin.historyNo}</td>
                      <td>
                        <strong>
                          {chargeCoin.amount
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"}
                        </strong>
                      </td>
                      <td>{chargeCoin.regDate}</td>
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

export default CoinChargeList;
