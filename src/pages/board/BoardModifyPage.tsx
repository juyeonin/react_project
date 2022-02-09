import React from "react";
import BoardModifyContainer from "../../containers/board/BoardModifyContainer";
import MainLayout from "../../layout/MainLayout";
import { useParams } from 'react-router-dom';

function BoardModifyPage() {
  const { boardNo }: { boardNo: string } = useParams();

  return (
    <MainLayout>
      <BoardModifyContainer boardNo={boardNo} />
    </MainLayout>
  );
}

export default BoardModifyPage;
