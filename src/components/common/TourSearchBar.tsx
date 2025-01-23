"use client";

import React, { useState } from "react";
import RegionList from "./RegionList";
import SeasonBar from "./SeasonBar";
import NatureBar from "./NatureBar";

const TourSearchBar: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("계절별 관광지");
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null); // 선택된 계절을 상태로 관리
  const [selectedNature, setSelectedNature] = useState<string | null>(null); // 선택된 계절을 상태로 관리

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedOption(selected);

    // '계절별 관광지' 선택시 selectedSeason을 null로 설정
    if (selected === "계절별 관광지") {
      setSelectedSeason(null); // 계절을 선택하지 않았으므로 초기화
    }
  };

  const handleSeasonSelect = (season: string) => {
    setSelectedSeason(season); // 계절 선택 처리
  };

  const handleNatureSelect = (nature: string) => {
    setSelectedNature(nature); // 자연 선택 처리
  };

  return (
    <div className="bg-sky-50 w-full h-[392px] flex justify-start items-start p-4">
      {/* 텍스트 영역: 1000px 너비로 설정, 텍스트 왼쪽 정렬 */}
      <div className="w-full flex flex-col justify-start gap-4 px-8">
        <h2 className="text-neutral-800 text-4xl font-semi-bold">강원도의</h2>

        <div className="flex flex-row gap-6 items-center">
          <span className="text-neutral-600 text-2xl mt-2">인기</span>

          {/* 셀렉트 박스 */}
          <select
            className="border-b-2 border-sky-500 text-sky-500 text-5xl bg-transparent focus:outline-none cursor-pointer"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option>계절별 관광지</option>
            <option>지역별 관광지</option>
            <option>문화·역사별 관광지</option>
            <option>자연별 관광지</option>
          </select>

          <span className="text-neutral-600 text-2xl mt-2">찾아보기</span>
        </div>

        {/* "인기 지역별 관광지 찾아보기" 텍스트 아래에 RegionList 조건부 렌더링 */}
        {selectedOption === "지역별 관광지" && (
          <div className="mt-6 flex">
            <RegionList />
          </div>
        )}

        {selectedOption === "계절별 관광지" && (
          <div className="mt-6 flex justify-center items-center">
            <SeasonBar
              selectedSeason={selectedSeason}
              onSeasonSelect={handleSeasonSelect}
            />
          </div>
        )}

        {selectedOption === "자연별 관광지" && (
          <div className="mt-6 flex justify-center items-center">
            <NatureBar
              selectedNature={selectedNature}
              onNatureSelect={handleNatureSelect}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TourSearchBar;
