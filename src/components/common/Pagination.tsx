import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [];
  const maxVisiblePages = 5;

  // 페이지 그룹을 나누기 위한 시작 페이지와 끝 페이지 계산 (api 불러오고 추후 수정 예정)
  const startPage =
    Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  // 페이지 번호 리스트 생성
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-4 mb-14 ">
      {/* 이전 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded-full text-neutral-500 hover:bg-neutral-200"
      >
        {"<"}
      </button>

      {startPage > 1 && <span className="px-3 py-1 text-neutral-500">...</span>}

      {/* 페이지 번호들 */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 border rounded-full ${
            currentPage === page
              ? "bg-sky-500 text-white"
              : "text-neutral-500 hover:bg-neutral-200"
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <span className="px-3 py-1 text-neutral-500">...</span>
      )}

      {/* 다음 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded-full text-neutral-500 hover:bg-neutral-200"
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
