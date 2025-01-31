"use client";

import React, { useEffect, useState } from "react";
import { ListProps, SeasonType, SelectedChildParam } from "@/types/types";
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
const itemsPerPage = 12;

const CardList: React.FC<SelectedChildParam> =({selected}) => {
   
   const [allTourData, setAllTourData] = useState<TourItem[]>([]);
   const [tourData, setTourData] = useState<ListProps[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [currentPage, setCurrentPage] = useState<number>(1);
   const [totalPages, setTotalPages] = useState<number>(1);

   useEffect(() => {
      const fetchData = async () => {
         // setLoading(true);
         try {
            let response: TourItem[] = [];

            console.log(`🌸 [API 요청] 관광지 리스트 가져오기 🌸`);
            console.log(`📌 선택된 카테고리: ${selected.cat}, 선택된 필터: ${selected.filter ? selected.filter : "없음"}`);

            if(selected.cat == "season"){ //계절별 
               console.log("🚧 계절별 관광지 API 개발 중");
               if(selected?.filter){
                  // response = await APIConnect.getSeasonTourList(selected.filter);
               }
            }
            if(selected.cat == "region"){ //지역별
               if(selected.filter){
                  response = await APIConnect.getTourAreaList(selected.filter);
               }
            }
            if(selected.cat == "culture"){//문화별
               if(!selected.filter){
                  response = await APIConnect.getHistoricalTourList(1);
               }else{
                  switch (selected.filter) {
                     case "museum":
                        console.log('박물관 API')
                        response = await APIConnect.getMuseumTourList();
                        break;
                     case "historic":
                        console.log('문화유적 API')
                        response = await APIConnect.getHistoricTourList();
                        break;
                     case "region":
                        console.log('지역')
                        response = await APIConnect.getRegionSitesData();
                        break;
                     case "etc":
                        console.log('기타')
                        response = await APIConnect.getEtcSitesData();
                        break;
                     default:
                        response = [];
                  }
               }
            }
            if(selected.cat == "nature"){//자연별
               console.log("🚧 자연별 관광지 API 개발 중");
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
   }, [selected]); // ✅ `selected state`가 변경될 때마다 다시 실행됨

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
   }, [selected]);

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