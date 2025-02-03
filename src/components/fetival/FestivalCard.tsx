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

            // API 요청 (페이지 번호 적용)
            const response = await APIConnect.getFestivalList("20240101", cat2, selected.page);

            console.log("📌 현재 페이지 데이터:", response);

            setFestivals(response);
            setTotalPages(Math.max(1, Math.ceil(100 / ITEMS_PER_PAGE))); // 전체 페이지 계산
            setLoading(false);
         } catch (err) {
            console.log("❌ API 요청 실패:", err);
            setLoading(false);
         }
      };
      fetchData();
   }, [selected, cat2]); // cat2 값이 변경될 때도 다시 요청

   useEffect(() => {
      console.log("📌 현재 cat2 값:", cat2);
      console.log("📌 API에서 가져온 전체 데이터 개수:", festivals.length);

      // cat2 값에 따라 필터링
      const filteredData = festivals.filter((item) => {
         if (!cat2) return true; // 전체 카테고리 → 필터링 없음
         return String(item.cat2) === String(cat2); // 축제(A0207) 또는 공연/행사(A0208) 필터링
      });

      console.log("🎯 필터링된 데이터 개수:", filteredData.length);

      // 페이지네이션 적용 (한 페이지에 12개씩만)
      const startIndex = (selected.page - 1) * ITEMS_PER_PAGE;
      const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

      console.log("📌 현재 페이지에 보여줄 데이터 개수:", paginatedData.length);

      setTourData(
         paginatedData.map((item) => ({
            imageUrl: item.firstimage || "/images/ready.png",
            title: item.title || "",
            area: item.addr1 || "",
            contentId: item.contentid,
            contentTypeId: item.contenttypeid,
         })),
      );

      // 체 페이지 수 계산 (필터링된 데이터 개수를 기준으로)
      setTotalPages(Math.ceil(filteredData.length / ITEMS_PER_PAGE));
   }, [selected, festivals, cat2]);

   if (loading) {
      return (
         <div className="w-[1280px] h-[1376px] mx-auto px-6 mt-16">
            <div className="grid grid-cols-3 gap-8">
               <EmptyListCard />
            </div>
         </div>
      );
   }

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
