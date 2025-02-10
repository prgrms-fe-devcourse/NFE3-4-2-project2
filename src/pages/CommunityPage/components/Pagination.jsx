import React from 'react';
import leftArrow from '/icons/left-array.svg';
import rightArrow from '/icons/right-array.svg';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getDisplayedPages = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(
      1,
      Math.min(currentPage - Math.floor(maxVisiblePages / 2), totalPages - maxVisiblePages + 1)
    );

    for (let i = startPage; i < startPage + maxVisiblePages && i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  };

  const displayedPages = getDisplayedPages();

  return (
    <div className="flex items-center justify-center space-x-4 mt-30">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <img src={leftArrow} alt="이전" className="w-15 h-15 opacity-60" />
      </button>

      <div className="flex space-x-6">
        {displayedPages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-40 h-40 flex items-center justify-center rounded-full text-lg font-medium ${
              currentPage === page
                ? 'bg-orange-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <img src={rightArrow} alt="다음" className="w-15 h-15 opacity-60" />
      </button>
    </div>
  );
};

export default Pagination;
