import React, { useEffect, useState } from "react";
import { ListProps } from "@/types/types";
import ListCard from "./ListCard";
import APIConnect from "@/utils/api";
import Pagination from "./Pagination";

interface HistoricalTourItem {
   title: string;
   addr1: string;
   firstimage?: string;
   contentid: number;
   contenttypeid: number;
}

const CardList: React.FC<{ selectedOption: string; selectedCulture: string | null }> = ({ selectedOption, selectedCulture }) => {
   const [allTourData, setAllTourData] = useState<HistoricalTourItem[]>([]); // 전체 데이터 저장
   const [tourData, setTourData] = useState<ListProps[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [currentPage, setCurrentPage] = useState<number>(1);
   const [totalPages, setTotalPages] = useState<number>(1);
   const itemsPerPage = 12; // 한 페이지당 12개 표시

   useEffect(() => {
      const fetchData = async () => {
         setLoading(true);
         try {
            let response: HistoricalTourItem[] = [];

            console.log(`📌 선택된 옵션: ${selectedOption}, 선택된 문화 카테고리: ${selectedCulture}`);
            console.log(`📢 현재 페이지: ${currentPage}`);

            if (selectedOption === "문화·역사별 관광지") {
               if (!selectedCulture) {
                  console.log("📢 전체 문화·역사별 관광지 데이터를 불러옵니다.");
                  
                  let allResults: HistoricalTourItem[] = [];
                  let page = 1;
                  let fetchMore = true;

                  while (fetchMore) {
                     const pageData = await APIConnect.getHistoricalTourList(page);
                     allResults = [...allResults, ...pageData];

                     if (pageData.length < itemsPerPage) {
                        fetchMore = false; // 더 이상 가져올 데이터가 없음
                     } else {
                        page++;
                     }
                  }

                  response = allResults;
               } else {
                  console.log(`📢 ${selectedCulture} 데이터를 불러옵니다.`);

                  switch (selectedCulture) {
                     case "미술관·박물관":
                        response = await APIConnect.getMuseumTourList();
                        break;
                     case "유적지":
                        response = await APIConnect.getHistoricTourList();
                        break;
                     case "종교":
                        response = await APIConnect.getRegionSitesData();
                        break;
                     case "기타":
                        response = await APIConnect.getEtcSitesData();
                        break;
                     default:
                        response = [];
                        console.warn("⚠️ 선택된 문화 카테고리가 올바르지 않습니다.");
                  }
               }
            } else {
               console.log("📢 전체 데이터를 불러옵니다.");

               let allResults: HistoricalTourItem[] = [];
               let page = 1;
               let fetchMore = true;

               while (fetchMore) {
                  const pageData = await APIConnect.getHistoricalTourList(page);
                  allResults = [...allResults, ...pageData];

                  if (pageData.length < itemsPerPage) {
                     fetchMore = false;
                  } else {
                     page++;
                  }
               }

               response = allResults;
            }

            console.log(`🔍 API 응답 데이터 개수: ${response.length}`);

            // 전체 데이터를 저장
            setAllTourData(response);

            // 총 페이지 수 계산
            const totalPageCount = Math.max(1, Math.ceil(response.length / itemsPerPage));
            setTotalPages(totalPageCount);

            setLoading(false);
         } catch (err) {
            console.error("❌ API 요청 실패:", err);
            setLoading(false);
         }
      };

      fetchData();
   }, [selectedOption, selectedCulture]);

   // ✅ 페이지 변경 시 데이터 필터링
   useEffect(() => {
      const paginatedData = allTourData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
      
      setTourData(
         paginatedData.map((item) => ({
            imageUrl: item.firstimage || "/images/ready.png",
            area: item.addr1 || "",
            title: item.title || "",
            contentId: item.contentid,
            contentTypeId: item.contenttypeid,
         }))
      );
   }, [currentPage, allTourData]);

   // ✅ 카테고리가 변경될 때 페이지를 초기화
   useEffect(() => {
      setCurrentPage(1);
   }, [selectedOption, selectedCulture]);

   if (loading) return <div>Loading...</div>;
   if (!tourData.length) return <div>No data available</div>;

   return (
      <div className="w-[1280px] h-[1376px] mx-auto px-6 mt-16">
         <div className="grid grid-cols-3 gap-8">
            {tourData.map((item) => <ListCard key={item.contentId} {...item} />)}
         </div>

         {totalPages > 1 && (
            <Pagination
               currentPage={currentPage}
               totalPages={totalPages}
               onPageChange={setCurrentPage}
            />
         )}
      </div>
   );
};

export default CardList;
