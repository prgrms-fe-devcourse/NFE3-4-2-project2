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

const ITEMS_PER_PAGE = 12;

const FestivalCard: React.FC<SelectedChildParam> = ({ selected, changeUrl }) => {
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

            const response = await APIConnect.getFestivalList("20240101", undefined, selected.page);

            setFestivals(response);
            setTotalPages(Math.max(1, Math.ceil(100 / ITEMS_PER_PAGE)));
            setLoading(false);
         } catch (err) {
            console.log("❌ API 요청 실패:", err);
            setLoading(false);
         }
      };
      fetchData();
   }, [selected]);

   useEffect(() => {
      setTourData(
         festivals.map((item) => ({
            imageUrl: item.firstimage || "/images/ready.png",
            title: item.title || "",
            area: item.addr1 || "",
            contentId: item.contentid,
            contentTypeId: item.contenttypeid,
         })),
      );
   }, [selected, festivals]);

   if (loading) {
      return (
         <div className="w-[1280px] h-[1376px] mx-auto px-6 mt-16">
            <div className="grid grid-cols-3 gap-8">
               <EmptyListCard />
            </div>
         </div>
      );
   }

   if (!festivals.length) {
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
