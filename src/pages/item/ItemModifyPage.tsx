import React from "react";
import MainLayout from "../../layout/MainLayout";
import ItemModifyContainer from "../../containers/item/ItemModifyContainer";
import { useParams } from "react-router-dom";

const ItemModifyPage = () => {
    const {itemId}:{itemId:string} = useParams();

    return(
        <MainLayout>
            <ItemModifyContainer itemId={itemId} />
        </MainLayout>
    );
};

export default ItemModifyPage;