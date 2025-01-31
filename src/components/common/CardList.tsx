import React, { useEffect, useState } from "react";
import { ListProps } from "@/types/types";
import ListCard from "./ListCard";
import APIConnect from "@/utils/api";
import Pagination from "./Pagination";

interface TourItem {
   title: string;
   addr1: string;
   firstimage?: string;
   contentid: number;
   contenttypeid: number;
}

const CardList: React.FC<{ selectedOption: string; selectedCulture: string | null; selectedSeason: string | null; selectedNature: string | null; }> = ({ selectedOption, selectedCulture, selectedSeason, selectedNature }) => {
   const [allTourData, setAllTourData] = useState<TourItem[]>([]);
   const [tourData, setTourData] = useState<ListProps[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [currentPage, setCurrentPage] = useState<number>(1);
   const [totalPages, setTotalPages] = useState<number>(1);
   const itemsPerPage = 12;

   useEffect(() => {
      const fetchData = async () => {
         setLoading(true);
         try {
            let response: TourItem[] = [];

            console.log(`📌 선택된 옵션: ${selectedOption}`);

            if (selectedOption === "문화·역사별 관광지") {
               if (!selectedCulture) {
                  response = await APIConnect.getHistoricalTourList(1);
               } else {
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
                  }
               }
            } else if (selectedOption === "계절별 관광지" && selectedSeason) {
               // API가 없으므로 빈 배열 반환
               response = [];
               console.log("🚧 계절별 관광지 API 개발 중");
            } else if (selectedOption === "자연별 관광지" && selectedNature) {
               response = [];
               console.log("🚧 자연별 관광지 API 개발 중");
            } else if (selectedOption === "지역별 관광지") {
               response = [];
               console.log("🚧 지역별 관광지 API 개발 중");
            } else {
               response = [];
            }

            console.log(`🔍 API 응답 데이터 개수: ${response.length}`);
            setAllTourData(response);
            setTotalPages(Math.max(1, Math.ceil(response.length / itemsPerPage)));
            setLoading(false);
         } catch (err) {
            console.error("❌ API 요청 실패:", err);
            setLoading(false);
         }
      };

      fetchData();
   }, [selectedOption, selectedCulture, selectedSeason, selectedNature]);

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

   useEffect(() => {
      setCurrentPage(1);
   }, [selectedOption, selectedCulture, selectedSeason, selectedNature]);

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