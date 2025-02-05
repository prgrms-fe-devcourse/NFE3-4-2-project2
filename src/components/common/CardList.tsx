"use client";

import React, { useEffect, useState } from "react";
import {ListProps, SelectedChildParam, SelectedParam } from "@/types/types";
import ListCard from "./ListCard";
import Pagination from "./Pagination";
import EmptyListCard from "@/components/common/EmptyListCard";
import EmptyData from "@/components/common/EmptyData";
import Link from "next/link";
import { usePathname} from "next/navigation";

const CardList: React.FC<SelectedChildParam> = ({ selected, changeUrl }) => {
   const nowPath = usePathname();

   const [tourData, setTourData] = useState<ListProps[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [totalPages, setTotalPages] = useState<number>(1);

   const createQueryString = (selected: SelectedParam): string => {
      const params = new URLSearchParams();

      if (selected.cat) params.append('cat', selected.cat);
      if (selected.page) params.append('page', selected.page.toString());
      if (selected.filter) params.append('filter', selected.filter);

      return params.toString();  // 쿼리 문자열 형식으로 반환
   };

   useEffect(() => {
      
      const fetchData = async () => {
         try {
            let response: ListProps[] = [];

            console.log(`🌸 [API 요청] 관광지 리스트 가져오기 🌸`);
            const queryString = createQueryString(selected)
            const dataList = await fetch(`/api/places?${queryString}`).then(response => response.json());
            console.log(dataList.message);
            response = dataList.data;
            setTotalPages(Number(dataList.totalPages));
            if(response){
               setTourData(
                  response.map((item)=>({
                     imageUrl: item.imageUrl,
                     title: item.title,
                     area: item.area,
                     contentId: item.contentId,
                     contentTypeId: item.contentTypeId
                  }))
               )
            }
            setLoading(false);
         } catch (err) {
            console.log("❌ API 요청 실패:", err);
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

   if (totalPages == 0 || !totalPages) {
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
