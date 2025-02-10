'use client';

import React, { useState, useEffect } from 'react';
import { PaginationProps } from '../types/HeritageData';

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalCnt, pageUnit, onPageChange }) => {
  const totalPages = Math.ceil(totalCnt / pageUnit);
  const pageGroupSize = 5; 

  const [startPage, setStartPage] = useState<number>(1);
  const [endPage, setEndPage] = useState<number>(Math.min(pageGroupSize, totalPages));

  useEffect(() => {
    const halfGroupSize = Math.floor(pageGroupSize / 2);

    let newStartPage = currentPage - halfGroupSize;
    let newEndPage = currentPage + halfGroupSize;

    if (newStartPage < 1) {
      newStartPage = 1;
      newEndPage = Math.min(pageGroupSize, totalPages);
    }

    if (newEndPage > totalPages) {
      newEndPage = totalPages;
      newStartPage = Math.max(1, totalPages - pageGroupSize + 1);
    }

    setStartPage(newStartPage);
    setEndPage(newEndPage);
  }, [currentPage, totalPages]);

  const handlePageClick = (pageNum: number) => {
    if (pageNum !== currentPage) {
      onPageChange(pageNum);
      window.scrollTo(0, 0);
    }
  };

  const goToFirstPage = () => {
    onPageChange(1);
    window.scrollTo(0, 0);
  };

  const goToLastPage = () => {
    onPageChange(totalPages);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex justify-center items-center font-pretendard space-x-4 mt-8">
      {/* 첫 페이지로 가는 버튼 */}
      <button
        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        onClick={goToFirstPage}
        disabled={currentPage === 1}
      >
        {'첫번째 페이지'}
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((pageNum) => (
        <button
          key={pageNum}
          className={`px-4 py-2 rounded-lg ${pageNum === currentPage ? 'bg-[#4F6CF3] text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          onClick={() => handlePageClick(pageNum)}
        >
          {pageNum}
        </button>
      ))}

      {/* 마지막 페이지로 가는 버튼 */}
      <button
        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        onClick={goToLastPage}
        disabled={currentPage === totalPages}
      >
        {'마지막 페이지'}
      </button>
    </div>
  );
};

export default Pagination;
