"use client";

import React, { useEffect, useState } from "react";
import { TourItem, ListProps, SelectedChildParam } from "@/types/types";
import ListCard from "./ListCard";
import APIConnect from "@/utils/api";
import Pagination from "./Pagination";
import EmptyListCard from "./EmptyListCard";
import EmptyData from "./EmptyData";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS_PER_PAGE = 12;

const CardList: React.FC<SelectedChildParam> = ({ selected, changeUrl }) => {

   const nowPath = usePathname();

   const [allTourData, setAllTourData] = useState<TourItem[]>([]);
   const [tourData, setTourData] = useState<ListProps[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [totalPages, setTotalPages] = useState<number>(1);

   useEffect(() => {
      //API관련
      const fetchData = async () => {
         // setLoading(true);
         try {
            let response: TourItem[] = [];
            let regionRes; //region의 경우 12개씩만 API에서 호출

            console.log(`🌸 [API 요청] 관광지 리스트 가져오기 🌸`);
            console.log(
               `📌 선택된 카테고리: ${selected.cat}, 선택된 필터: ${selected.filter ? selected.filter : "없음"}`,
            );
            if (selected.cat == "season") {
               //계절별
               if (selected.filter) {
                  console.log(`🚧 [계절별 관광지] ${selected.filter} 리스트 요청`);
                  response = await APIConnect.getSeasonTourList(
                     selected.filter as "spring" | "summer" | "autumn" | "winter",
                  );
               } else {
                  console.log(`🚧 [계절별 관광지] 전체 계절 리스트 요청`);
                  response = await APIConnect.getSeasonTourList(null);
               }
            }
            if (selected.cat == "region") {
               //지역별
               console.log(nowPath)
               if(nowPath == "/explore/leisure"){
                  if (selected.filter) {
                     regionRes = await APIConnect.getLeisureList(selected.filter, selected.page || 1);
                     response = regionRes.items;
                  } else {
                     regionRes = await APIConnect.getLeisureList("", selected.page || 1);
                     response = regionRes.items;
                  }
                  setTotalPages(Number(regionRes.totalLength));
               }else if(nowPath == "/explore/travel"){
                  if (selected.filter) {
                     regionRes = await APIConnect.getTourAreaList(selected.filter, selected.page || 1);
                     response = regionRes.items;
                  } else {
                     regionRes = await APIConnect.getTourAreaList("", selected.page || 1);
                     response = regionRes.items;
                  }
                  setTotalPages(Number(regionRes.totalLength));
               }
            }
            if (selected.cat == "culture") {
               //문화별
               if (!selected.filter) {
                  response = await APIConnect.getHistoricalTourList(1);
               } else {
                  switch (selected.filter) {
                     case "museum":
                        response = await APIConnect.getMuseumTourList();
                        break;
                     case "historic":
                        response = await APIConnect.getHistoricTourList();
                        break;
                     case "religion":
                        response = await APIConnect.getRegionSitesData();
                        break;
                     case "etc":
                        response = await APIConnect.getEtcSitesData();
                        break;
                     default:
                        response = [];
                  }
               }
            }
            if (selected.cat == "nature") {
               //자연별
               console.log("🚧 자연별 관광지 API 개발 중");
               response = [];
            }

            console.log(`🔍 API 응답 데이터 개수: ${regionRes?.totalLength || response.length}`);
            setAllTourData(response);
            if (selected.cat !== "region") {
               setTotalPages(Math.max(1, Math.ceil(response.length / ITEMS_PER_PAGE)));
            }
            setLoading(false);
         } catch (err) {
            console.log("❌ API 요청 실패:", err);
            setLoading(false);
         }
      };
      fetchData();
   }, [selected]); // ✅ `selected state`가 변경될 때마다 다시 실행됨

   useEffect(() => {
      //페이지네이션 관련
      if (selected.cat !== "region") {
         const paginatedData = allTourData.slice((selected.page - 1) * ITEMS_PER_PAGE, selected.page * ITEMS_PER_PAGE);
         setTourData(
            paginatedData.map((item) => ({
               imageUrl: item.firstimage || "/images/ready.png",
               title: item.title || "",
               area: item.addr1 || "",
               contentId: item.contentid,
               contentTypeId: item.contenttypeid,
            })),
         );
      }else{
         setTourData(
            allTourData.map((item)=>({
               imageUrl: item.firstimage || "/images/ready.png",
               title: item.title ,
               area: item.addr1 || "",
               contentId: item.contentid,
               contentTypeId: item.contenttypeid
            }))
         );
      }
   }, [selected, allTourData]);

   // useEffect(() => {
   //    setCurrentPage(1);
   // }, [selected]);

   if (loading) {
      return (
         <div className="w-[1280px] h-[1376px] mx-auto px-6 mt-16">
            <div className="grid grid-cols-3 gap-8">
               <EmptyListCard />
            </div>
         </div>
      );
   }

   if (!allTourData.length || allTourData.length < 0) {
      return <EmptyData />;
   }

   return (
      <div className="w-[1280px] mx-auto px-6 m-16">
         <div className="grid grid-cols-3 gap-8">
            {tourData.map((item) => (
               <Link key={item.contentId} href={`${nowPath}/detail?contentId=${item.contentId}`}>
                  <ListCard {...item} />
               </Link>
            ))}
         </div>

         {totalPages > 1 && <Pagination totalPages={totalPages} selected={selected} changeUrl={changeUrl} />}
      </div>
   );
};

export default CardList;
