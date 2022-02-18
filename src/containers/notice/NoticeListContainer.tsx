import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoticeList from "../../components/notice/NoticeList";
import { noticesActions } from "../../modules/notice";
import { isAdmin as hasRoleAdmin } from "../../modules/selector";
import { RootState } from "../../modules";
import { useHistory } from "react-router-dom";
import * as api from "../../lib/api";

const NoticeListContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { notices, isLoading, isAdmin } = useSelector((state: RootState) => ({
    notices: state.notice.notices,
    isLoading: state.loading.FETCH_LIST,
    isAdmin: hasRoleAdmin(state),
  }));

  //테이블에 삭제버튼
  const delClick = async (noticeNo: string) => {
    console.log(noticeNo);

    if (window.confirm("삭제하시겠습니까?")) {
      try {
        await api.removeNotice(noticeNo);

        alert("삭제가 완료되었습니다.");

        window.location.replace("/notice");
      } catch (e: any) {
        if (e.response.status === 400) {
          alert("잘못된 요청입니다.");
        } else if (e.response.status === 401) {
          alert("로그인이 필요합니다.");
          history.push("/signin");
        } else if (e.response.status === 403) {
          alert("접근 권한이 없습니다.");
          history.goBack();
        } else {
          alert(e.response.data.message);
        }
      }
    }
  };

  //전체삭제
  const allDelClick = () => {
    if (window.confirm("전체 삭제 하시겠습니까?")) {
      notices.forEach((notice) => {
        try {
          api.removeNotice(notice.noticeNo);
        } catch (e: any) {
          alert(e.response.data.message);
        }
      });

      window.location.reload();
    }
  };

  //체크박스 선텍식제
  const selectedDelClick = () => {
    console.log(checkItems);
    if (window.confirm("선택 삭제 하시겠습니까?")) {
      if (checkItems.length === 0) {
        alert("선택된 공지가 없습니다.");
      } else {
        checkItems.forEach((checkItem) => {
          try {
            api.removeNotice(checkItem);
          } catch (e: any) {
            alert(e.response.data.message);
          }
        });

        window.location.reload();
      }
    }
  };
  const [checkItems, setCheckItems] = useState<string[]>([]);

  // 체크박스 전체 선택
  const handleAllCheck = (checked: boolean) => {
    if (checked) {
      const idArray: string[] = [];
      // 전체 체크 박스가 체크 되면 배열에 넣어
      notices.map((notice) => idArray.push(notice.noticeNo));
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  // 체크박스 한 개 선택
  const handleSingleCheck = (checked: boolean, id: string) => {
    if (checked) {
      setCheckItems([...checkItems, id]);
    } else {
      // 체크 해제
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  useEffect(() => {
    dispatch(noticesActions.fetchList(dispatch));
  }, [dispatch]);

  return (
    <>
      <NoticeList
        notices={notices}
        isLoading={isLoading}
        isAdmin={isAdmin}
        delClick={delClick}
        checkItems={checkItems}
        handleSingleCheck={handleSingleCheck}
        handleAlLCheck={handleAllCheck}
        allDelClick={allDelClick}
        selectedDelClick={selectedDelClick}
      />
    </>
  );
};

export default NoticeListContainer;
