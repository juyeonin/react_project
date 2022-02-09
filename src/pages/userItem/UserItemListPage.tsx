import React from "react";
import UserItemListContainer from "../../containers/userItem/UserItemListContainer";
import MainLayout from "../../layout/MainLayout";

const UserItemListPage = () => {
    return (
        <MainLayout>
            <UserItemListContainer />
        </MainLayout>
    );
};

export default UserItemListPage;