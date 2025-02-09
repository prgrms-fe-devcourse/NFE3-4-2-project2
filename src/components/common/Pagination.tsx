import React from "react";

import { SelectedChildParam } from "@/types/types";

interface PaginationProps {
   totalPages: number;
}

const Pagination: React.FC<SelectedChildParam & PaginationProps> = ({ totalPages, selected, changeUrl }) => {
   const getPageRange = (): number[] => {
      if (totalPages <= 5) {
         return Array.from({ length: totalPages }, (_, index) => index + 1);
      } else {
         if (selected.page <= 3) {
            return [1, 2, 3, 4, 5];
         } else if (selected.page >= totalPages - 2) {
            return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
         } else {
            return [selected.page - 2, selected.page - 1, selected.page, selected.page + 1, selected.page + 2];
         }
      }
   };

   return (
      <div className="flex justify-center items-center space-x-2 mt-10 mb-10">
         {/* 이전 페이지 버튼 */}
         <button
            onClick={() => changeUrl({...selected, page:Math.max(1, selected.page - 1)})}
            disabled={selected.page === 1}
            className={`px-3 py-1 border rounded-full ${
               selected.page === 1 ? "text-gray-400 cursor-not-allowed" : "text-neutral-500 hover:bg-neutral-200"
            }`}>
            {"<"}
         </button>

         {/* 페이지 번호 버튼들 */}
         {getPageRange().map((pageNum) => (
            <button
               key={pageNum}
               onClick={() => changeUrl({...selected, page:pageNum})}
               className={`px-3 py-1 border rounded-full ${
                  selected.page === pageNum ? "bg-blue-500 text-white" : "text-neutral-500 hover:bg-neutral-200"
               }`}>
               {pageNum}
            </button>
         ))}

         {/* 다음 페이지 버튼 */}
         <button
            onClick={() => changeUrl({...selected, page:Math.min(totalPages, selected.page + 1)})}
            disabled={selected.page === totalPages}
            className={`px-3 py-1 border rounded-full ${
               selected.page === totalPages ? "text-gray-400 cursor-not-allowed" : "text-neutral-500 hover:bg-neutral-200"
            }`}>
            {">"}
         </button>
      </div>
   );
};

export default Pagination;
