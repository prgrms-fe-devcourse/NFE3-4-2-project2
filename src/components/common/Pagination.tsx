import React from "react";

interface PaginationProps {
   currentPage: number;
   totalPages: number;
   onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
   const getPageRange = (): number[] => {
      if (totalPages <= 5) {
         return Array.from({ length: totalPages }, (_, index) => index + 1);
      } else {
         if (currentPage <= 3) {
            return [1, 2, 3, 4, 5];
         } else if (currentPage >= totalPages - 2) {
            return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
         } else {
            return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
         }
      }
   };

   return (
      <div className="flex justify-center items-center space-x-2 mt-10 mb-10">
         {/* 이전 페이지 버튼 */}
         <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded-full ${
               currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-neutral-500 hover:bg-neutral-200"
            }`}>
            {"<"}
         </button>

         {/* 페이지 번호 버튼들 */}
         {getPageRange().map((pageNum) => (
            <button
               key={pageNum}
               onClick={() => onPageChange(pageNum)}
               className={`px-3 py-1 border rounded-full ${
                  pageNum === currentPage ? "bg-blue-500 text-white" : "text-neutral-500 hover:bg-neutral-200"
               }`}>
               {pageNum}
            </button>
         ))}

         {/* 다음 페이지 버튼 */}
         <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded-full ${
               currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-neutral-500 hover:bg-neutral-200"
            }`}>
            {">"}
         </button>
      </div>
   );
};

export default Pagination;
