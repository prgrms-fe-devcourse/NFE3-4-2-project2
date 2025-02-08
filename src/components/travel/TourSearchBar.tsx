"use client";

import React from "react";
import RegionList from "../common/RegionList";
import SeasonBar from "./SeasonTourBar";
import NatureBar from "./NatureBar";
import CultureBar from "./CultureBar";
import { SelectedChildParam } from "@/types/types";

const TourSearchBar: React.FC<SelectedChildParam> = ({ selected, changeUrl }) => {
   // 셀렉트 박스 값 변경 시 상태 업데이트
   const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selected = event.target.value;
      if (selected == "season") {
         changeUrl({ cat: selected, page: 1, filter: "spring" });
      } else if (selected == "culture") {
         changeUrl({ cat: selected, page: 1, filter: "museum" });
      } else if (selected == "nature") {
         changeUrl({ cat: selected, page: 1, filter: "ocean" });
      } else {
         changeUrl({ cat: selected, page: 1 });
      }
   };

   return (
      <div className="bg-sky-50 w-full flex justify-center items-start p-28 h-[480px]">
         <div className="w-full max-w-screen-xl mx-auto flex flex-col gap-6 px-6">

      <h2 className="text-gray-800 text-3xl font-bold tracking-wide mt-2">강원도의</h2>


<div className="flex flex-row items-center gap-3">
   <span className="text-gray-900 text-xl font-semibold">특별한</span>

   {/* 셀렉트 박스 */}
   <div className="relative">
      <select
         className="border-b-2 border-sky-600 text-sky-600 text-3xl font-bold bg-transparent focus:outline-none cursor-pointer w-fit 
         [&>option]:text-lg hover:text-sky-700 transition">
         <option value={"season"}>계절별 관광지</option>
         <option value={"region"}>지역별 관광지</option>
         <option value={"culture"}>문화·역사별 관광지</option>
         <option value={"nature"}>자연별 관광지</option>
      </select>
   </div>

               <span className="text-neutral-600 text-2xl font-semibold">찾아보기</span>
            </div>
            {selected.cat === "region" && <RegionList selected={selected} changeUrl={changeUrl} />}
            {selected.cat === "season" && <SeasonBar selected={selected} changeUrl={changeUrl} />}
            {selected.cat === "nature" && <NatureBar selected={selected} changeUrl={changeUrl} />}
            {selected.cat === "culture" && <CultureBar selected={selected} changeUrl={changeUrl} />}
         </div>
      </div>
   );
};

export default TourSearchBar;
