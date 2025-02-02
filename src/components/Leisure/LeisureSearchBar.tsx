"use client";

import React, { useEffect, useState } from "react";
import RegionList from "../common/RegionList";
import SeasonLeisureBar from "./SeasonLeisureBar";
import { useRouter, useSearchParams } from "next/navigation";
import { SelectedParam } from "@/types/types";

const LeisureSearchBar: React.FC = () => {
   //라우터 세팅
   const searchParams = useSearchParams();
   const router = useRouter();

   //파라미터 가지고오기
   const nowCategory = searchParams.get("cat");
   const nowFilter = searchParams.get("filter");
   const nowPage = Number(searchParams.get("page"));
   const [selected, setSelected] = useState<SelectedParam>({ cat: "", page:1 });

   //props로 전달할 url 변환 함수
   const handleUrlChange = (selectedParam: SelectedParam) => {
         const queryString = selectedParam.filter
            ? `?cat=${selectedParam.cat}&filter=${selectedParam.filter}&page=${selectedParam.page}`
            : `?cat=${selectedParam.cat}&page=${selectedParam.page}`;
         router.push(queryString, { scroll: false });
         setSelected(selectedParam);
      };
   // 기본 파라미터 설정 (cat이 없을 경우 season으로 설정)
   useEffect(() => {
      if (!nowCategory) {
         console.log("🔄 기본 카테고리 'season' 적용");
         setSelected({ cat: "region", page:1 });
         router.replace("?cat=region&page=1", { scroll: false });
         return;
      }

      // 올바른 카테고리 값인지 확인 후 설정
      if (["season", "region"].includes(nowCategory)) {
         setSelected({ cat: nowCategory, filter: nowFilter, page:nowPage });
      }
   }, [nowCategory, nowFilter, nowPage, router]);

   return (
      <div className="bg-sky-50 w-full flex justify-center items-start p-6 h-[392px]">
         <div className="w-full max-w-screen-xl mx-auto flex flex-col gap-6 px-6 mt-6">
            <div className="flex w-full justify-center">
               <button
                  className={`${
                     selected.cat === "region"
                        ? "bg-sky-500 text-white border-b-2 border-sky-500"
                        : "bg-transparent text-sky-500 border-b-2 border-sky-500"
                  } text-2xl font-semibold w-[50%] h-[48px] flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out`}
                  onClick={()=>{handleUrlChange({cat:"region", page:1})}}
                  >
                  지역별 레저 및 체험
               </button>
               <button
                  className={`${
                     selected.cat === "season"
                        ? "bg-sky-500 text-white border-b-2 border-sky-500"
                        : "bg-transparent text-sky-500 border-b-2 border-sky-500"
                  } text-2xl font-semibold w-[50%] h-[48px] flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out`}
                  onClick={()=>{handleUrlChange({cat:"season", page:1})}}
                  >
                  계절별 레저 및 체험
               </button>
            </div>

            {/* 조건부 렌더링 */}
            {selected.cat === "region" && (
               <div className="mt-4 flex justify-center items-center">
                  <RegionList selected={selected} changeUrl={handleUrlChange}/>
               </div>
            )}

            {selected.cat === "season" && (
               <div className="mt-4 flex justify-center items-center">
                  <SeasonLeisureBar selected={selected} changeUrl={handleUrlChange} />
               </div>
            )}
         </div>
      </div>
   );
};

export default LeisureSearchBar;
