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
      if(selected == "season"){
         changeUrl({ cat: selected, page:1, filter:"spring"}); 
      }else if (selected == "culture"){
         changeUrl({ cat: selected, page:1, filter:"museum"}); 
      }else if (selected == "nature"){
         changeUrl({ cat: selected, page:1, filter:"ocean"}); 
      }else{
         changeUrl({ cat: selected, page:1 });
      }
   };

   return (
      <div className="bg-sky-50 w-full flex justify-center items-start p-28 h-[480px]">
         <div className="w-full max-w-screen-xl mx-auto flex flex-col gap-6 px-6">
            {/* "강원도의" 글자만 아래로 이동 */}
            <h2 className="text-neutral-800 text-4xl font-semibold mt-2">강원도의</h2> 
            <div className="flex flex-row gap-4 items-center">
               <span className="text-neutral-600 text-2xl font-semibold">인기</span>
               <select
                  className="border-b-2 border-sky-500 text-sky-500 text-4xl font-semibold bg-transparent focus:outline-none cursor-pointer p-1"
                  value={selected.cat ? selected.cat : "season"}
                  onChange={handleSelectChange}>
                  <option value={"season"}>계절별 관광지</option>
                  <option value={"region"}>지역별 관광지</option>
                  <option value={"culture"}>문화·역사별 관광지</option>
                  <option value={"nature"}>자연별 관광지</option>
               </select>
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
