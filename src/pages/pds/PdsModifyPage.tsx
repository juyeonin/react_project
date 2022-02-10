import React from "react";
import PdsModifyContainer from "../../containers/pds/PdsModifyContainer";
import MainLayout from "../../layout/MainLayout";
import { useParams } from 'react-router-dom';

function PdsModifyPage() {
  const { itemId }: { itemId: string } = useParams();

  return (
    <MainLayout>
      <PdsModifyContainer itemId={itemId} />
    </MainLayout>
  );
}

export default PdsModifyPage;
