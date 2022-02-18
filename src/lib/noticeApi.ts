import client from './client';

//export const fetchNotice = (noticeNo: string) => client.get(`/notices/${noticeNo}`);
//export const fetchNoticeList = () => client.get('/notices');

async function fetchNotice(noticeNo: string): Promise<{
  noticeNo: string;
  title: string;
  content: string;
  regDate: string;
}> {
  try {
    const response = await client.get(`/notices/${noticeNo}`);
    return response.data;
  } catch (e) {
    throw e;
  }
}

async function fetchNoticeList(): Promise<
  {
    noticeNo: string;
    title: string;
    content: string;
    regDate: string;
  }[]
> {
  try {
    const response = await client.get('/notices');
    return response.data;
  } catch (e) {
    throw e;
  }
}

const noticeApi = {
  fetchNoticeList,
  fetchNotice,
};

export default noticeApi;
