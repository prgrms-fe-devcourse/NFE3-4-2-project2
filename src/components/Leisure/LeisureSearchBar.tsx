"use client";

import RegionList from "../common/RegionList";
import SeasonLeisureBar from "./SeasonLeisureBar";
import { SelectedChildParam } from "@/types/types";

const LeisureSearchBar: React.FC<SelectedChildParam> = ({ selected, changeUrl }) => {
   return (
      <div className="bg-sky-50 w-full flex justify-center items-start p-32 h-[480px]">
         <div className="w-full max-w-screen-xl mx-auto flex flex-col gap-6 px-6 mt-6">
            <div className="flex w-full justify-center">
               <button
                  className={`${
                     selected.cat === "region"
                        ? "bg-sky-500 text-white border-b-2 border-sky-500"
                        : "bg-transparent text-sky-500 border-b-2 border-sky-500"
                  } text-2xl font-semibold w-[50%] h-[48px] flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out`}
                  onClick={() => {
                     changeUrl({ cat: "region", page: 1 });
                  }}>
                  지역별 레저 및 체험
               </button>
               <button
                  className={`${
                     selected.cat === "season"
                        ? "bg-sky-500 text-white border-b-2 border-sky-500"
                        : "bg-transparent text-sky-500 border-b-2 border-sky-500"
                  } text-2xl font-semibold w-[50%] h-[48px] flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out`}
                  onClick={() => {
                     changeUrl({ cat: "season", page: 1 });
                  }}>
                  계절별 레저 및 체험
               </button>
            </div>

            {/* 조건부 렌더링 */}
            {selected.cat === "region" && (
               <div className="mt-4 flex justify-center items-center">
                  <RegionList selected={selected} changeUrl={changeUrl} />
               </div>
            )}

            {selected.cat === "season" && (
               <div className="mt-4 flex justify-center items-center">
                  <SeasonLeisureBar selected={selected} changeUrl={changeUrl} />
               </div>
            )}
         </div>
      </div>
   );
};

export default LeisureSearchBar;
