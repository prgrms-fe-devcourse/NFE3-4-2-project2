"use client";

import React, { useEffect, useState } from "react";
import { Festival, ListProps, SelectedChildParam } from "@/types/types";
import APIConnect from "@/utils/api";
import Link from "next/link";
import { usePathname } from "next/navigation";
import EmptyListCard from "../common/EmptyListCard";
import EmptyData from "../common/EmptyData";
import ListCard from "../common/ListCard";
import Pagination from "../common/Pagination";

const ITEMS_PER_PAGE = 12; // 페이지당 표시할 개수

const FestivalCard: React.FC<SelectedChildParam & { cat2?: string | null }> = ({ selected, changeUrl, cat2 }) => {
   const nowPath = usePathname();
   const [festivals, setFestivals] = useState<Festival[]>([]);
   const [tourData, setTourData] = useState<ListProps[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [totalPages, setTotalPages] = useState<number>(1);

   // 축제 리스트 가져오기
   useEffect(() => {
      const fetchData = async () => {
         setLoading(true);
         try {
            setFestivals([]);

            // `null`일 경우 `undefined`로 변환
            const apiCat2 = cat2 ?? undefined;

            // API 요청
            const response = await APIConnect.getFestivalList("20240101", apiCat2, selected.page);

            if (!response || !Array.isArray(response)) {
               console.warn("⚠️ API 응답 데이터가 올바르지 않음:", response);
               setFestivals([]); // 오류 발생 시 빈 배열 설정
            } else {
               setFestivals(response as Festival[]);
            }

            setLoading(false);
         } catch (err) {
            console.error("❌ API 요청 실패:", err);
            setLoading(false);
         }
      };
      fetchData();
   }, [selected, cat2]); // cat2 값이 변경될 때도 다시 요청

   // 데이터 필터링 및 페이지네이션 적용
   useEffect(() => {
      const filteredData = festivals.filter((item) => (!cat2 ? true : String(item.cat2) === String(cat2)));

      // 페이지네이션 적용
      const startIndex = (selected.page - 1) * ITEMS_PER_PAGE;
      const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

      setTourData(
         paginatedData.map((item) => ({
            imageUrl: item.firstimage || "/images/ready.png",
            title: item.title || "",
            area: item.addr1 || "",
            contentId: Number(item.contentid),
            contentTypeId: Number(item.contenttypeid),
         })) as ListProps[],
      );

      // 전체 페이지 수 계산
      setTotalPages(Math.ceil(filteredData.length / ITEMS_PER_PAGE));
   }, [selected, festivals, cat2]);

   // ✅ 데이터 로딩 중일 때
   if (loading) {
      return (
         <div className="w-[1280px] h-[1376px] mx-auto px-6 mt-16">
            <div className="grid grid-cols-3 gap-8">
               <EmptyListCard />
            </div>
         </div>
      );
   }

   // ✅ 데이터가 없을 때
   if (!tourData.length) {
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

export default FestivalCard;
