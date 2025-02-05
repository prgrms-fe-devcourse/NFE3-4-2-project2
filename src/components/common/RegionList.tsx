"use client";

import React from "react";
import RegionButton from "./RegionButton";
import { SelectedChildParam } from "@/types/types";

const RegionList: React.FC<SelectedChildParam> = ({ selected, changeUrl }) => {
   const handleRegionClick = (regionCode: string) => {
      if (selected.filter === regionCode) {
         changeUrl({ cat: selected.cat, filter: "", page: 1 }); // 전체 관광지 리스트 보기
      } else {
         changeUrl({ cat: selected.cat, filter: regionCode, page: 1 });
      }
   };

   const regions = [
      { name: "강릉시", imageSrc: "/images/region/강릉시.png", code: "1" },
      { name: "고성군", imageSrc: "/images/region/고성군.png", code: "2" },
      { name: "동해시", imageSrc: "/images/region/동해시.png", code: "3" },
      { name: "삼척시", imageSrc: "/images/region/삼척시.png", code: "4" },
      { name: "속초시", imageSrc: "/images/region/속초시.png", code: "5" },
      { name: "양구군", imageSrc: "/images/region/양구군.png", code: "6" },
      { name: "양양군", imageSrc: "/images/region/양양군.png", code: "7" },
      { name: "영월군", imageSrc: "/images/region/영월군.png", code: "8" },
      { name: "원주시", imageSrc: "/images/region/원주시.png", code: "9" },
      { name: "인제군", imageSrc: "/images/region/인제군.png", code: "10" },
      { name: "정선군", imageSrc: "/images/region/정선군.png", code: "11" },
      { name: "철원군", imageSrc: "/images/region/철원군.png", code: "12" },
      { name: "춘천시", imageSrc: "/images/region/춘천시.png", code: "13" },
      { name: "태백시", imageSrc: "/images/region/태백시.png", code: "14" },
      { name: "평창군", imageSrc: "/images/region/평창군.png", code: "15" },
      { name: "홍천군", imageSrc: "/images/region/홍천군.png", code: "16" },
      { name: "화천군", imageSrc: "/images/region/화천군.png", code: "17" },
      { name: "횡성군", imageSrc: "/images/region/횡성군.png", code: "18" },
   ];

   return (
      <div className="flex flex-wrap w-[1236] h-[128px] p-4 gap-4 justify-start items-center">
         {regions.map((region) => (
            <RegionButton
               key={region.name}
               name={region.name}
               imageSrc={region.imageSrc}
               isActive={selected.filter === region.code} // 선택된 버튼만 활성화
               onClick={() => handleRegionClick(region.code)} // 버튼 클릭 시 활성화 상태 설정
            />
         ))}
      </div>
   );
};

export default RegionList;
