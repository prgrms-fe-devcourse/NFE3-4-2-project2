"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import { SelectedChildParam } from "@/types/types";

const SeasonBar: React.FC<SelectedChildParam> = ({ selected, changeUrl }) => {
   const [active, setActive] = useState<string | null>(null); // 기본 선택 없음

   const seasonData = [
      {
         season: "spring",
         imageSrc: "/images/season/spring.png",
         title: "봄 추천 여행지",
         description: "봄의 길목, 꽃향기에 취하다",
      },
      {
         season: "summer",
         imageSrc: "/images/season/summer.png",
         title: "여름 추천 여행지",
         description: "푸른 바다, 여름을 만나다",
      },
      {
         season: "autumn",
         imageSrc: "/images/season/autumn.png",
         title: "가을 추천 여행지",
         description: "가을의 품, 단풍을 만끽하다",
      },
      {
         season: "winter",
         imageSrc: "/images/season/winter.png",
         title: "겨울 추천 여행지",
         description: "겨울의 정수, 눈꽃 속 여행",
      },
   ];

   useEffect(() => {
      if (selected?.filter) {
         setActive(selected.filter);
      } else {
         setActive(null); // 기본 선택 없음
      }
   }, [selected.filter]);

   const handleClick = (seasonQuery: string) => {
      setActive(seasonQuery);
      changeUrl({ cat: selected.cat, filter: seasonQuery, page: 1 });
   };

   return (
      <div className="flex justify-center items-center mt-2 w-full gap-16">
         {seasonData.map((season) => (
            <div
               key={season.season}
               className={`flex flex-wrap flex-col items-center cursor-pointer transition-all p-4 rounded-md relative ${
                  active === season.season ? "scale-105  border-sky-500" : "hover:scale-105 hover:shadow-xl"
               }`}
               onClick={() => handleClick(season.season)}>
               <Image
                  src={season.imageSrc}
                  alt={season.season}
                  width={72}
                  height={72}
                  className="object-cover rounded-md"
               />
               <span className="text-lg font-semibold text-neutral-800 mt-2">{season.title}</span>
               <span className="text-base font-normal text-neutral-500 mt-2">{season.description}</span>
               {active === season.season && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-sky-500 transition-all duration-200" />
               )}
            </div>
         ))}
      </div>
   );
};

export default SeasonBar;
