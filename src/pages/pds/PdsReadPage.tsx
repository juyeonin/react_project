import React from "react";
import PdsReadContainer from "../../containers/pds/PdsReadContainer";
import MainLayout from "../../layout/MainLayout";
import { useParams } from 'react-router-dom';

function PdsReadPage() {
  const { itemId }: { itemId: string } = useParams();

  return (
    <MainLayout>
      <PdsReadContainer itemId={itemId} />
    </MainLayout>
  );
}

export default PdsReadPage;
