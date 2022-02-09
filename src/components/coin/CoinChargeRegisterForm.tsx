import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../Shop.module.css";

interface Props {
  readonly onRegister: (amount: number) => void;
}
const CoinChargeRegisterForm = ({ onRegister }: Props) => {
  const [amount, setAmount] = useState(0);

  const handleChangeAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAmount(Number.parseInt(e.target.value));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      onRegister(amount);
    },
    [amount, onRegister]
  );

  return (
    <div className={styles.centered}>
      <br />
      <h2>코인 충전</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label>
            <strong>충전금액</strong>
          </label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={handleChangeAmount}
          />
        </div>
        <div className={styles.align_center} style={{ marginBottom: "50px" }}>
          <button className="btn btn-dark btn-sm" type="submit">
            충전하기
          </button>
          <Link className="btn btn-light btn-sm" to="/coin/charge">
            충전내역
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CoinChargeRegisterForm;
