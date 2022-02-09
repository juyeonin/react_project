import React from "react";
import CodeGroupModifyContainer from "../../containers/codegroup/CodeGroupModifyContainer";
import MainLayout from "../../layout/MainLayout";
import { useParams } from 'react-router-dom';

function CodeGroupModifyPage() {
  const { groupCode }: { groupCode: string } = useParams();

  return (
    <MainLayout>
      <CodeGroupModifyContainer groupCode={groupCode} />
    </MainLayout>
  );
}

export default CodeGroupModifyPage;
