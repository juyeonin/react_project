import React from "react";
import ItemListContainer from "../../containers/item/ItemListContainer";
import MainLayout from "../../layout/MainLayout";

const ItemListPage = () => {
    return (
        <MainLayout>
            <ItemListContainer />
        </MainLayout>
    );
};

export default ItemListPage;