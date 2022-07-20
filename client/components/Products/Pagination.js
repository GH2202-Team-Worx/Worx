import React, { useState } from "react";

const Pagination = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const maxPage = Math.ceil(props.productList.length / itemsPerPage);
  let pagArray = props.productList;

  const paginationNumbers = () => {
    return Array.from({ length: maxPage }, (v, i) => i + 1);
  };

  let pagNums = paginationNumbers();
  // console.log("PAGNUMS:", pagNums);

  // const currentData = () => {
  //   const begin = (currentPage - 1) * itemsPerPage;
  //   const end = begin + itemsPerPage;
  //   return pagArray.slice(begin, end);
  // };

  const next = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  };

  const prev = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const jump = (page) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  };

  return (
    <div className="pagination-container">
      <button id="previous" type="button" onClick={prev}>
        <i className="fa-solid fa-angle-left" id="icon" id="icon"></i>
      </button>
      {pagNums.length === 0 ? (
        <p>no products</p>
      ) : (
        pagNums.map((num) => {
          return (
            <button key={num.id} onClick={() => props.paginate(num)}>
              {num}
            </button>
          );
        })
      )}
      <button id="next" type="button" onClick={next}>
        <i className="fa-solid fa-angle-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
