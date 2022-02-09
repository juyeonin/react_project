import React, { useState } from "react";
import { Notice } from "../../App";
import styled from "styled-components";

interface Props {
  notices: Notice[];
  pageLimit: number;
}
const Paging = ({ notices, pageLimit }: Props) => {
  const [page, setPage] = useState(1);
  const handlePageChange = (page: number) => {
    setPage(page);
  };
  return <h1>Page</h1>;
};
export default Paging;
