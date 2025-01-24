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
    <div className="bg-sky-50 w-full flex justify-center items-start p-6 h-[392px]">
      <div className="w-full max-w-screen-xl mx-auto flex flex-col gap-6 px-6 mt-6">
        <div className="flex w-full justify-center">
          <button
            className={`${
              selectedOption === "지역별 레저 및 체험"
                ? "bg-sky-500 text-white border-b-2 border-sky-500"
                : "bg-transparent text-sky-500 border-b-2 border-sky-500"
            } text-2xl font-semibold w-[50%] h-[48px] flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out`}
            onClick={() => handleOptionChange("지역별 레저 및 체험")}
          >
            지역별 레저 및 체험
          </button>
          <button
            className={`${
              selectedOption === "계절별 레저 및 체험"
                ? "bg-sky-500 text-white border-b-2 border-sky-500"
                : "bg-transparent text-sky-500 border-b-2 border-sky-500"
            } text-2xl font-semibold w-[50%] h-[48px] flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out`}
            onClick={() => handleOptionChange("계절별 레저 및 체험")}
          >
            계절별 레저 및 체험
          </button>
        </div>

        {/* 조건부 렌더링 */}
        {selectedOption === "지역별 레저 및 체험" && (
          <div className="mt-6 flex justify-center items-center">
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
