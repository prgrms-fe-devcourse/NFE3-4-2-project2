"use client";

import React, { useState } from "react";
import RegionList from "./RegionList";
import SeasonBar from "./SeasonBar";
import NatureBar from "./NatureBar";
import CultureBar from "./CultureBar";

const TourSearchBar: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("계절별 관광지");
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null); // 선택된 계절을 상태로 관리
  const [selectedNature, setSelectedNature] = useState<string | null>(null); // 선택된 자연을 상태로 관리
  const [selectedCulture, setSelectedCulture] = useState<string | null>(null); // 선택된 문화·역사 상태로 관리

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedOption(selected);

    // 선택한 옵션에 따라 상태 초기화
    if (selected === "계절별 관광지") {
      setSelectedSeason(null);
    } else if (selected === "자연별 관광지") {
      setSelectedNature(null);
    } else if (selected === "문화·역사별 관광지") {
      setSelectedCulture(null);
    }
  };

  const handleSeasonSelect = (season: string) => {
    setSelectedSeason(season);
  };

  const handleNatureSelect = (nature: string) => {
    setSelectedNature(nature);
  };

  const handleCultureSelect = (culture: string) => {
    setSelectedCulture(culture);
  };

  return (
    <div className="bg-sky-50 w-full h-[392px] flex justify-start items-start p-4">
      <div className="w-full flex flex-col justify-start gap-4 px-8">
        <h2 className="text-neutral-800 text-4xl font-semibold">강원도의</h2>

        <div className="flex flex-row gap-6 items-center">
          <span className="text-neutral-600 text-2xl mt-2 font-semibold">
            인기
          </span>

          {/* 셀렉트 박스 */}
          <select
            className="border-b-2 border-sky-500 text-sky-500 text-5xl font-semibold bg-transparent focus:outline-none cursor-pointer"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option>계절별 관광지</option>
            <option>지역별 관광지</option>
            <option>문화·역사별 관광지</option>
            <option>자연별 관광지</option>
          </select>

          <span className="text-neutral-600 text-2xl mt-2 font-semibold">
            찾아보기
          </span>
        </div>

        {/* "인기 지역별 관광지 찾아보기" 텍스트 아래에 RegionList 조건부 렌더링 */}
        {selectedOption === "지역별 관광지" && (
          <div className="mt-8 flex">
            <RegionList />
          </div>
        )}

        {selectedOption === "계절별 관광지" && (
          <div className="mt-4 flex justify-center items-center">
            <SeasonBar
              selectedSeason={selectedSeason}
              onSeasonSelect={handleSeasonSelect}
            />
          </div>
        )}

        {selectedOption === "자연별 관광지" && (
          <div className="mt-4 flex justify-center items-center">
            <NatureBar
              selectedNature={selectedNature}
              onNatureSelect={handleNatureSelect}
            />
          </div>
        )}

        {selectedOption === "문화·역사별 관광지" && (
          <div className="mt-4 flex justify-center items-center">
            <CultureBar
              selectedCulture={selectedCulture}
              onCultureSelect={handleCultureSelect}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TourSearchBar;
