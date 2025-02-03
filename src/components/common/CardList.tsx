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
      const fetchData = async () => {
         setLoading(true);
         try {
            setTourData([])
            setAllTourData([]);
            let response: TourItem[] = [];
            let regionRes;

            console.log(`🌸 [API 요청] 관광지 리스트 가져오기 🌸`);
            console.log(
               `📌 선택된 카테고리: ${selected.cat}, 선택된 필터: ${selected.filter ? selected.filter : "없음"}`,
            );

            if (selected.cat === "season") {
               if (nowPath === "/explore/leisure"){
                  if (selected.filter) {
                     console.log(`🚧 [계절별 레저] ${selected.filter} 리스트 요청`);
                     response = await APIConnect.getSeasonLeisureList(
                        selected.filter as "spring" | "summer" | "autumn" | "winter",
                     );
                  } else {
                     console.log(`🚧 [계절별 레저] 전체 계절 리스트 요청`);
                     response = await APIConnect.getSeasonLeisureList(null);
                  }
               } else if (nowPath === "/explore/travel"){
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
            }

            if (selected.cat === "region") {
               if (nowPath === "/explore/leisure") {
                  regionRes = await APIConnect.getLeisureList(selected.filter || "", selected.page || 1);
                  response = regionRes.items;
                  setTotalPages(Number(regionRes.totalLength));
               } else if (nowPath === "/explore/travel") {
                  regionRes = await APIConnect.getTourAreaList(selected.filter || "", selected.page || 1);
                  response = regionRes.items;
                  setTotalPages(Number(regionRes.totalLength));
               }
            }

            if (selected.cat === "culture") {
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
                        break;
                  }
               }
            }

            if (selected.cat === "nature") {
               console.log("🚧 [자연별 관광지] 리스트 요청 중");
               if (selected.filter && ["beach", "mountain", "lake", "forest"].includes(selected.filter)) {
                  response = await APIConnect.getNatureTourList(
                     selected.filter as "beach" | "mountain" | "lake" | "forest",
                     selected.page || 1,
                  );
               } else {
                  // 아무것도 선택되지 않았을 때 전체 리스트를 불러옵니다
                  response = await APIConnect.getNatureTourList(null, selected.page || 1); // null로 전체 데이터 요청
               }
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
   }, [selected, nowPath]);

   useEffect(() => {
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
      } else {
         setTourData(
            allTourData.map((item) => ({
               imageUrl: item.firstimage || "/images/ready.png",
               title: item.title || "",
               area: item.addr1 || "",
               contentId: item.contentid,
               contentTypeId: item.contenttypeid,
            })),
         );
      }
   }, [selected, allTourData]);

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
