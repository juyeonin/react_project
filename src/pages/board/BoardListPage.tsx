import React from "react";
import MainLayout from "../../layout/MainLayout";
import BoardListContainer from "../../containers/board/BoardListContainer";

const BoardListPage = () => {
    return (
        <MainLayout>
            <BoardListContainer />
        </MainLayout>
    );
};

export default BoardListPage;