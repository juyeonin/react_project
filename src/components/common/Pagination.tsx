import React from "react";
import styled from "styled-components";

const Paging = (props: {
  total: number;
  limit: number;
  page: number;
  setPage: (page: number) => void;
}): JSX.Element => {
  const totalPages = Math.ceil(props.total / props.limit);

  const pageNumber: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumber.push(i);
  }

  return (
    <>
      <div style={{ display: "inline-block" }}>
        <Nav>
          <Button
            onClick={() => props.setPage(props.page - 1)}
            disabled={props.page === 1}
          >
            &lt;
          </Button>
          {pageNumber.map((pageNum) => (
            <Button
              key={pageNum}
              onClick={() => props.setPage(pageNum)}
              aria-current={props.page === pageNum ? "page" : undefined}
            >
              {pageNum}
            </Button>
          ))}
          <Button
            onClick={() => props.setPage(props.page + 1)}
            disabled={props.page === totalPages}
          >
            &gt;
          </Button>
        </Nav>
      </div>
    </>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  background-color: white;
  margin: 0;
  font-size: 14px;
  color: gray;

  &:hover {
    color: black;
    font-weight: bold;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: white;
    color: white;
    cursor: revert;
    transform: revert;
    border: none;
  }

  &[aria-current] {
    color: black;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;
export default Paging;
