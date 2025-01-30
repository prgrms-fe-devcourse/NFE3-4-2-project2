"use client";

import React, { useState } from "react";
import RegionList from "../common/RegionList";
import SeasonTourBar from "./SeasonTourBar";
import NatureBar from "./NatureBar";
import CultureBar from "./CultureBar";

interface TourSearchBarProps {
   setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
   setSelectedCulture: React.Dispatch<React.SetStateAction<string | null>>;
}

const TourSearchBar: React.FC<TourSearchBarProps> = ({ setSelectedOption, setSelectedCulture }) => {
   const [selectedOption, setLocalSelectedOption] = useState<string>("계절별 관광지");
   const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
   const [selectedNature, setSelectedNature] = useState<string | null>(null);
   const [selectedCulture, setLocalSelectedCulture] = useState<string | null>(null);

   // 셀렉트 박스 값 변경 시 상태 업데이트
   const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selected = event.target.value;
      setLocalSelectedOption(selected);
      setSelectedOption(selected);
      setSelectedCulture(null); // 문화·역사별 관광지 초기화

      if (selected === "계절별 관광지") setSelectedSeason(null);
      else if (selected === "자연별 관광지") setSelectedNature(null);
      else if (selected === "문화·역사별 관광지") setLocalSelectedCulture(null);
   };

   const handleCultureSelect = (culture: string) => {
      setLocalSelectedCulture(culture);
      setSelectedCulture(culture);
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
            {selectedOption === "계절별 관광지" && <SeasonTourBar selectedSeason={selectedSeason} onSeasonSelect={setSelectedSeason} />}
            {selectedOption === "자연별 관광지" && <NatureBar selectedNature={selectedNature} onNatureSelect={setSelectedNature} />}
            {selectedOption === "문화·역사별 관광지" && <CultureBar selectedCulture={selectedCulture} onCultureSelect={handleCultureSelect} />}
         </div>
      </div>
   );
};

export default TourSearchBar;
