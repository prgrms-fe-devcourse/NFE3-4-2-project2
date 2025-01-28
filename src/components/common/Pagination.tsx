import React from "react";

interface PaginationProps {
   currentPage: number;
   totalPages: number;
   pageRange: number[];
   onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, pageRange, onPageChange }) => {
   return (
      <div className="flex justify-center items-center space-x-2 mt-10 mb-10">
         {/* 이전 페이지 버튼 */}
         <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-full text-neutral-500 hover:bg-neutral-200">
            {"<"}
         </button>

         {/* 페이지 번호 버튼들 */}
         {pageRange.map((pageNum) => (
            <button
               key={pageNum}
               onClick={() => onPageChange(pageNum)}
               className={`px-3 py-1 border rounded-full text-neutral-500 hover:bg-neutral-200 ${
                  pageNum === currentPage ? "bg-blue-500 text-white" : ""
               }`}>
               {pageNum}
            </button>
         ))}

         {/* 다음 페이지 버튼 */}
         <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-full text-neutral-500 hover:bg-neutral-200">
            {">"}
         </button>
      </div>
   );
};

export default Pagination;
