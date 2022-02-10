import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../Shop.module.css';
import { Pds } from '../../App';

interface Props {
  readonly pdsItems: Pds[];
  readonly isLoading: boolean;
  readonly isAdmin: boolean;
}

function PdsList({ pdsItems, isLoading, isAdmin }: Props) {
  return (
    <div className={styles.centered}>
      <br />
      <div className={styles.shop_table}>
        <h2>공개자료실 목록</h2>
        {isLoading && '로딩중...'}
        {!isLoading && pdsItems && (
          <>
            {isAdmin && (
              <Link
                to="/pds/create"
                className="btn btn-outline-secondary btn-sm"
              >
                새로만들기
              </Link>
            )}
            <table className="table">
              <thead>
                <tr>
                  <th>자료번호</th>
                  <th>자료명</th>
                  <th>조회수</th>
                </tr>
              </thead>
              <tbody>
                {!pdsItems.length && (
                  <tr>
                    <td colSpan={3}>List is empty.</td>
                  </tr>
                )}
                {!!pdsItems.length &&
                  pdsItems.map((pdsItem) => (
                    <tr key={pdsItem.itemId}>
                      <td>{pdsItem.itemId}</td>
                      <td>
                        <Link to={`/pds/read/${pdsItem.itemId}`}>
                          {pdsItem.itemName}
                        </Link>
                      </td>
                      <td>{pdsItem.viewCnt}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default PdsList;
