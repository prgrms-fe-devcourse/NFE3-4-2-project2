"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Festival, ListProps, SelectedChildParam } from "@/types/types";
import APIConnect from "@/utils/api";
import Link from "next/link";
import { usePathname } from "next/navigation";
import EmptyListCard from "../common/EmptyListCard";
import EmptyData from "../common/EmptyData";
import ListCard from "../common/ListCard";
import Pagination from "../common/Pagination";

const ITEMS_PER_PAGE = 12; // 페이지당 표시할 개수

const FestivalCard: React.FC<SelectedChildParam & { cat2?: string | null }> = ({
   selected = { cat: "festival", page: 1 },
   changeUrl,
   cat2,
}) => {
   const nowPath = usePathname();
   const [festivals, setFestivals] = useState<Festival[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [totalPages, setTotalPages] = useState<number>(1);

   const currentPage = selected?.page ?? 1;

   useEffect(() => {
      const fetchData = async () => {
         setLoading(true);
         try {
            const response = await APIConnect.getFestivalList("20240101", undefined, 1, "");

            if (!response || !response.items) {
               console.warn("⚠️ API 응답 데이터가 올바르지 않음:", response);
               setFestivals([]);
               setTotalPages(1);
            } else {
               setFestivals(response.items);
            }

            setLoading(false);
         } catch (err) {
            console.error("❌ API 요청 실패:", err);
            setFestivals([]);
            setLoading(false);
         }
      };
      fetchData();
   }, [selected, cat2]);

   // ✅ useMemo로 필터링 최적화 (카테고리별 데이터 필터링)
   const filteredFestivals = useMemo(() => {
      return festivals.filter((item) => (!cat2 ? true : String(item.cat2) === String(cat2)));
   }, [festivals, cat2]);

   // ✅ 필터링된 데이터 개수를 기반으로 페이지 수 재계산
   useEffect(() => {
      setTotalPages(Math.max(1, Math.ceil(filteredFestivals.length / ITEMS_PER_PAGE)));
   }, [filteredFestivals]);

   // ✅ 페이지네이션 적용
   const paginatedData = useMemo(() => {
      return filteredFestivals.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
   }, [currentPage, filteredFestivals]);

   const tourData: ListProps[] = paginatedData.map((item) => ({
      imageUrl: item.firstimage || "/images/ready.png",
      title: item.title || "",
      area: item.addr1 || "",
      contentId: Number(item.contentid),
      contentTypeId: Number(item.contenttypeid),
   }));

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
