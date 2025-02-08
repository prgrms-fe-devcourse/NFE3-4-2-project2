"use client";

import React, { useEffect, useState } from "react";
import { ListProps, SelectedChildParam } from "@/types/types";
import ListCard from "./ListCard";
import Pagination from "./Pagination";
import EmptyListCard from "@/components/common/EmptyListCard";
import EmptyData from "@/components/common/EmptyData";
import useNavigateToDetail from "@/hooks/useNavigateToDetail"; // ✅ 커스텀 Hook 가져오기

const CardList: React.FC<SelectedChildParam> = ({ selected, changeUrl }) => {
   const [tourData, setTourData] = useState<ListProps[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [totalPages, setTotalPages] = useState<number>(1);
   const { navigateToDetail } = useNavigateToDetail(); // ✅ 커스텀 Hook 사용

   useEffect(() => {
      const fetchData = async () => {
         try {
            const params: Record<string, string> = {};

            if (selected.cat) params["cat"] = selected.cat; // ✅ undefined가 아닌 값만 추가
            params["page"] = selected.page.toString();
            if (selected.filter) params["filter"] = selected.filter; // ✅ undefined가 아닌 값만 추가

            const queryString = new URLSearchParams(params).toString();

            const dataList = await fetch(`/api/places?${queryString}`).then((res) => res.json());

            setTotalPages(Number(dataList.totalPages));
            setTourData(dataList.data || []);
         } catch (err) {
            console.error("❌ API 요청 실패:", err);
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, [selected]);

   if (loading) {
      return (
         <div className="w-[1280px] h-[1376px] mx-auto px-6 mt-16">
            <div className="grid grid-cols-3 gap-8">
               <EmptyListCard />
            </div>
         </div>
      );
   }

   if (totalPages < 1) {
      return <EmptyData />;
   }

   return (
      <div className="contents-wrap px-6 m-20">
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {tourData.map((item) => (
               <div key={item.contentId} onClick={() => navigateToDetail(item.contentId)} className="cursor-pointer">
                  <ListCard {...item} />
               </div>
            ))}
         </div>

         {totalPages > 1 && <Pagination totalPages={totalPages} selected={selected} changeUrl={changeUrl} />}
      </div>
   );
};

export default CardList;
