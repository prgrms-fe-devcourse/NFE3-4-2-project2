import React, { useState, useEffect } from "react";
import { ListProps, HistoricalTourItem } from "@/types/types";
import ListCard from "./ListCard";
import APIConnect from "@/utils/api";
import Pagination from "./Pagination";

const CardList = () => {
   const [tourData, setTourData] = useState<ListProps[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 상태
   const [totalPages, setTotalPages] = useState<number>(5); // 총 페이지 수
   const [pageRange, setPageRange] = useState<number[]>([]); // 표시할 페이지 번호 범위

   // 페이지네이션을 위해 데이터를 불러오는 함수
   const loadData = async (page: number) => {
      setLoading(true);
      try {
         const response = await APIConnect.getHistoricalTourList(page); // `response` 그대로 사용

         // 받아온 data가 HistoricalTourItem[] 형식이라면, 그 자체로 사용
         const formattedData: ListProps[] = response.map((item: HistoricalTourItem) => ({
            imageUrl: item.firstimage || item.firstimage2 || "/images/ready.png",
            area: item.addr1 || "지역 정보 없음",
            title: item.title || "제목 없음",
            contentId: item.contentid,
            contentTypeId: item.contenttypeid,
         }));

         setTourData(formattedData);
         setCurrentPage(page); // 현재 페이지 갱신

         // totalCount가 별도로 포함된 경우, 해당 값으로 totalPages 설정
         const totalCount = 100; // 실제 API 응답에 맞게 변경 필요
         const numOfRows = 10;
         setTotalPages(Math.ceil(totalCount / numOfRows)); // 전체 페이지 수 계산

         setLoading(false);

         // 페이지 범위 계산 (5개씩 보여주기)
         const startPage = Math.floor((page - 1) / 5) * 5 + 1;
         const endPage = Math.min(startPage + 4, totalPages); // 최대 5개의 페이지 번호
         const range = [];
         for (let i = startPage; i <= endPage; i++) {
            range.push(i);
         }
         setPageRange(range);
      } catch (err) {
         console.error("API 요청 실패:", err);
         setLoading(false);
      }
   };

   // 컴포넌트가 마운트될 때 첫 번째 페이지 데이터 불러오기
   useEffect(() => {
      loadData(1);
   }, []); // loadData를 의존성 배열에 추가

   // 페이지 변경 시 호출되는 함수
   const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages) {
         loadData(page);
      }
   };

   if (loading) {
      return <div>Loading...</div>;
   }

   return (
      <div className="w-[1280px] h-[1376px] mx-auto px-6 mt-16">
         <div className="grid grid-cols-3 gap-8">
            {tourData.map((item, index) => (
               <ListCard
                  key={index}
                  imageUrl={item.imageUrl}
                  area={item.area}
                  title={item.title}
                  contentId={item.contentId}
                  contentTypeId={item.contentTypeId}
               />
            ))}
         </div>

         <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageRange={pageRange}
            onPageChange={handlePageChange}
         />
      </div>
   );
};

export default CardList;
