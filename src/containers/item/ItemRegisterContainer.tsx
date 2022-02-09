import React from "react";
import { useHistory } from "react-router-dom";
import ItemRegisterForm from "../../components/item/ItemRegisterForm";
import * as api from "../../lib/api";

const ItemRegisterContainer = () => {
    const history = useHistory();

    const onRegister = async(itemName:string, price:number, description:string, file:File, previewFile:File) => {
        try {
            const itemObject = {
                itemName: itemName,
                price: price,
                description: description
            }
            
            let formData = new FormData();

            formData.append("file", file);
            formData.append("file2", previewFile);
            formData.append("item", JSON.stringify(itemObject));
            
            const response = await api.writeItem(formData);

            alert("등록이 완료되었습니다.");

            history.push("/item/read/"+response.data.itemId);

        }catch (e:any) {
            if (e.response.status === 400) {
                alert("잘못된 요청입니다.");
            } else if (e.response.status === 401) {
                alert("로그인이 필요합니다.");
                history.push("/signin");
            } else if (e.response.status === 403) {
                alert("접근 권한이 없습니다.");
                history.goBack();
            } else {
                alert(e.response.data.message);
            }    
        }
    };

    return <ItemRegisterForm onRegister={onRegister} />;
};

export default ItemRegisterContainer;