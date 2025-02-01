"use client";

import React, { useState } from "react";
import RegionList from "../common/RegionList";
import SeasonBar from "./SeasonTourBar";
import NatureBar from "./NatureBar";
import CultureBar from "./CultureBar";
import { SeasonType } from "@/types/types"; // ✅ 타입 가져오기

interface TourSearchBarProps {
   selectedOption?:string,
   setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
   setSelectedSeason: React.Dispatch<React.SetStateAction<SeasonType>>; // ✅ SeasonType 사용
   setSelectedCulture: React.Dispatch<React.SetStateAction<string | null>>;
}

const TourSearchBar: React.FC<TourSearchBarProps> = ({ selectedOption, setSelectedOption, setSelectedSeason, setSelectedCulture }) => {
   // const [selectedOption, setLocalSelectedOption] = useState<string>("계절별 관광지");
   const [selectedSeason, setLocalSelectedSeason] = useState<SeasonType>(null); // ✅ 타입 변경
   const [selectedNature, setSelectedNature] = useState<string | null>(null);
   const [selectedCulture, setLocalSelectedCulture] = useState<string | null>(null);

   // 셀렉트 박스 값 변경 시 상태 업데이트
   const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selected = event.target.value;
      setLocalSelectedOption(selected);
      setSelectedOption(selected);
      setSelectedSeason(null); // ✅ 계절 선택 초기화
      setSelectedCulture(null); // ✅ 문화·역사별 관광지 초기화

      if (selected === "자연별 관광지") setSelectedNature(null);
      else if (selected === "문화·역사별 관광지") setLocalSelectedCulture(null);
   };

   const handleSeasonSelect = (season: string) => {
      console.log(`🌍 선택한 계절: ${season}`); // ✅ 디버깅용
      setLocalSelectedSeason(season as SeasonType);
      setSelectedSeason(season as SeasonType); // ✅ CardList에도 적용
   };

   return (
      <div className="bg-sky-50 w-full flex justify-center items-start p-6 h-[392px]">
         <div className="w-full max-w-screen-xl mx-auto flex flex-col gap-6 px-6 mt-2">
            <h2 className="text-neutral-800 text-4xl font-semibold">강원도의</h2>

            <div className="flex flex-row gap-6 items-center">
               <span className="text-neutral-600 text-2xl font-semibold">인기</span>
               <select
                  className="border-b-2 border-sky-500 text-sky-500 text-4xl font-semibold bg-transparent focus:outline-none cursor-pointer p-2"
                  value={selectedOption}
                  onChange={handleSelectChange}>
                  <option>계절별 관광지</option>
                  <option>지역별 관광지</option>
                  <option>문화·역사별 관광지</option>
                  <option>자연별 관광지</option>
               </select>
               <span className="text-neutral-600 text-2xl font-semibold">찾아보기</span>
            </div>

            {selectedOption === "지역별 관광지" && <RegionList />}
            {selectedOption === "계절별 관광지" && (
               <SeasonBar selectedSeason={selectedSeason} onSeasonSelect={handleSeasonSelect} />
            )}
            {selectedOption === "자연별 관광지" && (
               <NatureBar selectedNature={selectedNature} onNatureSelect={setSelectedNature} />
            )}
            {selectedOption === "문화·역사별 관광지" && (
               <CultureBar selectedCulture={selectedCulture} onCultureSelect={setSelectedCulture} />
            )}
         </div>
      </div>
   );
};

export default TourSearchBar;
