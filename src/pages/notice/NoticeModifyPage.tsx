import React from "react";
import NoticeModifyContainer from "../../containers/notice/NoticeModifyContainer";
import MainLayout from "../../layout/MainLayout";
import { useParams } from 'react-router-dom';

function NoticeModifyPage() {
  const { noticeNo }: { noticeNo: string } = useParams();

  return (
    <MainLayout>
      <NoticeModifyContainer noticeNo={noticeNo} />
    </MainLayout>
  );
}

export default NoticeModifyPage;
