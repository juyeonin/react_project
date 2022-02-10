import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAndroid } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './menuBar.css';

interface Props {
  readonly isAuthorized: boolean;
  readonly isAdmin: boolean;
}

function MenuBar({ isAuthorized, isAdmin }: Props) {
  const [menuToggle, setMenuToggle] = useState<boolean>(false);

  const onClick = () => {
    setMenuToggle(!menuToggle);
  };

  return (
    <nav className="nav_bar">
      <div className="nav_bar_logo">
        <Link to="/">
          <FontAwesomeIcon icon={faAndroid} style={{ marginRight: '5px' }} />
          HOME
        </Link>
      </div>
      {isAuthorized && isAdmin && (
        <ul className={'nav_bar_menu' + (menuToggle ? ' active' : '')}>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/calendar">달력</Link>
          </li>
          <li>
            <Link to="/codegroup">코드그룹관리</Link>
          </li>
          <li>
            <Link to="/codedetail">코드관리</Link>
          </li>
          <li>
            <Link to="/member">회원관리</Link>
          </li>
          <li>
            <Link to="/board">회원게시판</Link>
          </li>
          <li>
            <Link to="/notice">공지사항관리</Link>
          </li>
          <li>
            <Link to="/item">상품관리</Link>
          </li>
          <li>
            <Link to="/pds">공개자료실</Link>
          </li>
        </ul>
      )}
      {isAuthorized && !isAdmin && (
        <ul className={'nav_bar_menu' + (menuToggle ? ' active' : '')}>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/calendar">달력</Link>
          </li>
          <li>
            <Link to="/board">회원게시판</Link>
          </li>
          <li>
            <Link to="/notice">공지사항</Link>
          </li>
          <li>
            <Link to="/item">상품</Link>
          </li>
          <li>
            <Link to="/coin/create">코인충전</Link>
          </li>
          <li>
            <Link to="/coin/charge">코인충전내역</Link>
          </li>
          <li>
            <Link to="/userItem">구매내역</Link>
          </li>
          <li>
            <Link to="/pds">공개자료실</Link>
          </li>
        </ul>
      )}
      {!isAuthorized && (
        //로그인 안했을 경우
        <ul className={'nav_bar_menu' + (menuToggle ? ' active' : '')}>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/calendar">달력</Link>
          </li>
          <li>
            <Link to="/board">회원게시판</Link>
          </li>
          <li>
            <Link to="/notice">공지사항</Link>
          </li>
          <li>
            <Link to="/item">상품</Link>
          </li>
          <li>
            <Link to="/pds">공개자료실</Link>
          </li>
        </ul>
      )}
      <ul className={'nav_bar_icons' + (menuToggle ? ' active' : '')}>
        <li>
          <FontAwesomeIcon icon={faTwitter} />
        </li>
      </ul>

      <Link to="#" className="nav_bar_toggleBtn" onClick={onClick}>
        <FontAwesomeIcon
          icon={faBars}
          className={
            'nav_bar_toggleBtn_burgers' + (menuToggle ? ' active' : '')
          }
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={'nav_bar_toggleBtn_times' + (menuToggle ? ' active' : '')}
        />
      </Link>
    </nav>
  );
}

export default MenuBar;
