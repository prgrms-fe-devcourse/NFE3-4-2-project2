import React, { useEffect, useState } from "react";
import { ListProps } from "@/types/types";
import ListCard from "./ListCard";
import APIConnect from "@/utils/api";
import Pagination from "./Pagination";

// HistoricalTourItem 타입
interface HistoricalTourItem {
   title: string;
   addr1: string;
   firstimage?: string;
   mapx?: number;
   mapy?: number;
   contentid: number;
   contenttypeid: number;
}

const CardList: React.FC<{ selectedOption: string }> = ({ selectedOption }) => {
   const [tourData, setTourData] = useState<ListProps[] | undefined>(undefined);
   const [loading, setLoading] = useState<boolean>(true);
   const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 상태
   const [totalCount, setTotalCount] = useState<number>(0); // 전체 관광지 개수 상태
   const [totalPages, setTotalPages] = useState<number>(0); // 전체 페이지 수 상태

   // HistoricalTourItem을 ListProps로 변환하는 함수
   const transformToListProps = (data: HistoricalTourItem[]): ListProps[] => {
      return data.map((item) => ({
         imageUrl: item.firstimage || "/images/ready.png",
         area: item.addr1 || "",
         title: item.title || "",
         contentId: item.contentid || 0,
         contentTypeId: item.contenttypeid || 0,
      }));
   };

   const fetchData = async (page: number) => {
      setLoading(true);
      try {
         let response: HistoricalTourItem[] = [];
         let fetchedTotalCount = 0; // totalCount 값을 저장할 변수

         switch (selectedOption) {
            case "계절별 관광지":
               // response = await APIConnect.getSeasonalTourList(page);
               break;
            case "자연별 관광지":
               // response = await APIConnect.getNatureTourList(page);
               break;
            case "문화·역사별 관광지":
               response = (await APIConnect.getHistoricalTourList(page)) || [];
               fetchedTotalCount = 285; // 예시로 전체 데이터 개수를 넣음, 실제 API에서 totalCount 받기
               break;
            default:
               response = [];
         }

         setTourData(transformToListProps(response));

         // totalCount를 사용하여 totalPages 계산
         setTotalCount(fetchedTotalCount);
         setTotalPages(Math.ceil(fetchedTotalCount / 12)); // 1페이지당 12개 항목을 기준으로 totalPages 계산

         setLoading(false);
      } catch (err) {
         console.error("API 요청 실패:", err);
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchData(currentPage); // currentPage가 변경될 때마다 fetchData 호출
   }, [selectedOption, currentPage]); // selectedOption과 currentPage가 변경될 때마다 데이터를 다시 불러옴

   // 로딩 중일 때
   if (loading) {
      return <div>Loading...</div>;
   }

   // 데이터가 없을 때
   if (!tourData || tourData.length === 0) {
      return <div>No data available</div>;
   }

   // 페이지 범위 계산
   let pageRange: number[] = [];
   if (totalPages <= 5) {
      // 총 페이지 수가 5개 이하일 경우, 모든 페이지 표시
      pageRange = Array.from({ length: totalPages }, (_, index) => index + 1);
   } else {
      // 총 페이지 수가 5개 이상일 경우, 최대 5페이지까지만 표시
      if (currentPage <= 3) {
         pageRange = [1, 2, 3, 4, 5]; // 현재 페이지가 3 이하일 경우 1, 2, 3, 4, 5를 표시
      } else if (currentPage >= totalPages - 2) {
         pageRange = [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]; // 마지막 5페이지를 표시
      } else {
         pageRange = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]; // 현재 페이지를 기준으로 5페이지 범위
      }
   }

   // 데이터를 모두 불러왔을 때
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

         {/* 페이지네이션 컴포넌트 */}
         <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageRange={pageRange}
            onPageChange={setCurrentPage} // 페이지 변경 시 currentPage 상태 업데이트
         />
      </div>
   );
};

export default CardList;
