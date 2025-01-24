"use client";

import React, { useState } from "react";
import RegionList from "./RegionList";
import SeasonLeisureBar from "./SeasonLeisureBar";

const LeisureSearchBar: React.FC = () => {
  const [selectedOption, setSelectedOption] =
    useState<string>("지역별 레저 및 체험");
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null); // 선택된 계절을 상태로 관리

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);

    // 선택한 옵션에 따라 상태 초기화
    if (option === "계절별 레저 및 체험") {
      setSelectedSeason(null);
    }
  };

  const handleSeasonSelect = (season: string) => {
    setSelectedSeason(season);
  };

  return (
    <div className="bg-sky-50 w-full h-[392px] flex justify-start items-start p-4">
      <div className="w-full max-w-[1280px] mx-auto flex flex-col justify-start gap-4 px-8">
        <div className="flex w-full justify-center mt-8">
          <button
            className={`${
              selectedOption === "지역별 레저 및 체험"
                ? "bg-sky-500 text-white border-b-2 border-sky-500"
                : "bg-transparent text-sky-500 border-b-2 border-sky-500"
            } text-[18px] font-semibold w-[640px] h-[40px] flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out`}
            onClick={() => handleOptionChange("지역별 레저 및 체험")}
          >
            지역별 레저 및 체험
          </button>
          <button
            className={`${
              selectedOption === "계절별 레저 및 체험"
                ? "bg-sky-500 text-white border-b-2 border-sky-500"
                : "bg-transparent text-sky-500 border-b-2 border-sky-500"
            } text-[18px] font-semibold w-[640px] h-[40px] flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out`}
            onClick={() => handleOptionChange("계절별 레저 및 체험")}
          >
            계절별 레저 및 체험
          </button>
        </div>

        {/* 메뉴바 조건부 렌더링 */}
        {selectedOption === "지역별 레저 및 체험" && (
          <div className="mt-8 flex justify-center items-center">
            <RegionList />
          </div>
        )}

        {selectedOption === "계절별 레저 및 체험" && (
          <div className="mt-4 flex justify-center items-center">
            <SeasonLeisureBar
              selectedSeason={selectedSeason}
              onSeasonSelect={handleSeasonSelect}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LeisureSearchBar;
