import React from "react";
import { Link } from "react-router-dom";
import { UserItem } from "../../App";
import styles from "../../Shop.module.css";

interface Props {
    readonly userItems: UserItem[];
    readonly isLoading: boolean;
}
const UserItemList = ({userItems, isLoading}:Props) => {
    return (
        <div className={styles.centered}>
            <div className={styles.shop_table}>
            <h2>구매 내역</h2>
            {isLoading && "로딩중.."}
            {!isLoading && userItems && (
                <>
                <table className="table">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>상품명</th>
                            <th>상품가격</th>
                            <th>구매일시</th>
                        </tr>
                    </thead>
                   <tbody>
                     {!userItems.length && (
                         <tr>
                             <td colSpan={4}>List is empty..</td>
                         </tr>
                     )}
                     {!!userItems.length && userItems.map((userItem)=>(
                         <tr key={userItem.userItemNo}>
                             <td>{userItem.userItemNo}</td>
                             <td>{userItem.itemName}</td>
                             <td>{userItem.price}원</td>
                             <td>{userItem.regDate}</td>
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

export default UserItemList;