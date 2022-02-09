import React from "react";
import NoticeReadContainer from "../../containers/notice/NoticeReadContainer";
import MainLayout from "../../layout/MainLayout";
import { useParams } from 'react-router-dom';

function NoticeReadPage() {
  const { noticeNo }: { noticeNo: string } = useParams();

  return (
    <MainLayout>
      <NoticeReadContainer noticeNo={noticeNo} />
    </MainLayout>
  );
}

export default NoticeReadPage;
