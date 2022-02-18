import client from './client';
import { CodeDetailKey, ItemObject, UserObject } from '../App';

export const adminSetup = (userId: string, userName: string, userPw: string) =>
  client.post('/users/setup', { userId, userName, userPw });

export const signIn = (userId: string, password: string) =>
  client.post(`/api/authenticate?username=${userId}&password=${password}`);
export const signUp = (
  userId: string,
  userName: string,
  userPw: string,
  job: string,
) => client.post('/users', { userId, userName, userPw, job });

export const getMyInfo = () => client.get('/users/myinfo');

export const fetchCodeGroup = (groupCode: string) =>
  client.get(`/codegroups/${groupCode}`);
export const fetchCodeGroupList = () => client.get('/codegroups');
export const modifyCodeGroup = (groupCode: string, groupName: string) =>
  client.put(`/codegroups/${groupCode}`, { groupName });
export const writeCodeGroup = (groupCode: string, groupName: string) =>
  client.post('/codegroups', { groupCode, groupName });
export const removeCodeGroup = (groupCode: string) =>
  client.delete(`/codegroups/${groupCode}`);

export const fetchCodeDetail = ({ groupCode, codeValue }: CodeDetailKey) =>
  client.get(`/codedetails/${groupCode}/${codeValue}`);
export const fetchCodeDetailList = () => client.get('/codedetails');
export const modifyCodeDetail = (
  groupCode: string,
  codeValue: string,
  codeName: string,
) =>
  client.put(`/codedetails/${groupCode}/${codeValue}`, { codeValue, codeName });
export const writeCodeDetail = (
  groupCode: string,
  codeValue: string,
  codeName: string,
) => client.post('/codedetails', { groupCode, codeValue, codeName });
export const removeCodeDetail = (groupCode: string, codeValue: string) =>
  client.delete(`/codedetails/${groupCode}/${codeValue}`);

export const fetchGroupCodeList = () => client.get('/codes/codeGroup');
export const fetchJobCodeList = () => client.get('/codes/job');

export const fetchMember = (userNo: string) => client.get(`/users/${userNo}`);
export const fetchMemberList = () => client.get('/users');
export const modifyMember = (userNo: string, payload: UserObject) =>
  client.put(`/users/${userNo}`, payload);
export const writeMember = (
  userId: string,
  userName: string,
  userPw: string,
  job: string,
) => client.post('/users', { userId, userName, userPw, job });
export const removeMember = (userNo: string) =>
  client.delete(`/users/${userNo}`);

export const fetchBoard = (boardNo: string) => client.get(`/boards/${boardNo}`);
export const fetchBoardList = () => client.get('/boards');
export const modifyBoard = (
  boardNo: string,
  title: string,
  content: string,
  writer: string,
) => client.put(`/boards/${boardNo}`, { title, content, writer });
export const writeBoard = (title: string, content: string) =>
  client.post('/boards', { title, content });
export const removeBoard = (boardNo: string, writer: string) =>
  client.delete(`/boards/${boardNo}?writer=${writer}`);

export const fetchNotice = (noticeNo: string) => client.get(`/notices/${noticeNo}`);
export const fetchNoticeList = () => client.get('/notices');
export const modifyNotice = (
  noticeNo: string,
  title: string,
  content: string,
) => client.put(`/notices/${noticeNo}`, { title, content });
export const writeNotice = (title: string, content: string) =>
  client.post('/notices', { title, content });
export const removeNotice = (noticeNo: string) =>
  client.delete(`/notices/${noticeNo}`);

export const fetchItem = (itemId: string) => client.get(`/items/${itemId}`);
export const fetchItemList = () => client.get('/items');
export const modifyItem = (itemId: string, formData: FormData) =>
  client.put(`/items/${itemId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
export const writeItem = (formData: FormData) =>
  client.post('/items', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
export const removeItem = (itemId: string) => client.delete(`/items/${itemId}`);
export const buyItem = (itemId: string) => client.get(`/items/buy/${itemId}`);

export const fetchChargeCoinList = () => client.get('/coins');
export const chargeCoin = (amount: number) =>
  client.post(`/coins/charge/${amount}`, { amount });
export const fetchPayCoinList = () => client.get('/coins/pay');

export const fetchUserItem = (userItemNo: string) =>
  client.get(`/useritems/${userItemNo}`);
export const fetchUserItemList = () => client.get('/useritems');

//pds
export const fetchPds = (itemId: string) => client.get(`/pds/${itemId}`);
export const fetchPdsList = () => client.get('/pds');
export const modifyPds = (itemId: string, itemObject: ItemObject) =>
  client.put(`/pds/${itemId}`, itemObject);
export const writePds = (itemObject: ItemObject) =>
  client.post('/pds', itemObject);
export const removePds = (itemId: string) => client.delete(`/pds/${itemId}`);

export const addAttach = (formData: FormData) =>
  client.post('/pds/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const fetchAttachList = (itemId: string) =>
  client.get(`/pds/attach/${itemId}`);
