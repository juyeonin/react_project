import React from "react";
import MainLayout from "../../layout/MainLayout";
import ItemReadContainer from "../../containers/item/ItemReadContainer";
import { useParams } from "react-router-dom";

const ItemReadPage = () => {
    const { itemId }: { itemId: string } = useParams();

    return (
        <MainLayout>
            <ItemReadContainer itemId={itemId} />
        </MainLayout>
    );
};

export default ItemReadPage;