import React from "react";
import BoardReadContainer from "../../containers/board/BoardReadContainer";
import MainLayout from "../../layout/MainLayout";
import { useParams } from 'react-router-dom';

function BoardReadPage() {
  const { boardNo }: { boardNo: string } = useParams();

  return (
    <MainLayout>
      <BoardReadContainer boardNo={boardNo} />
    </MainLayout>
  );
}

export default BoardReadPage;
