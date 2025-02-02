"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { SelectedChildParam } from "@/types/types";

const SeasonLeisureBar: React.FC<SelectedChildParam> = ({ selected, changeUrl }) => {
   const [active, setActive] = useState<string | null>(null); // 기본 선택 없음

   const seasonData = [
      {
         season: "spring",
         imageSrc: "/images/season/spring.png",
         title: "봄 추천 레저 및 체험",
         description: "봄바람 속, 레저를 즐기다",
      },
      {
         season: "summer",
         imageSrc: "/images/season/summer.png",
         title: "여름 추천 레저 및 체험",
         description: "시원한 여름, 액티비티로 가득",
      },
      {
         season: "autumn",
         imageSrc: "/images/season/autumn.png",
         title: "가을 추천 레저 및 체험",
         description: "가을의 매력, 체험으로 채우다",
      },
      {
         season: "winter",
         imageSrc: "/images/season/winter.png",
         title: "겨울 추천 레저 및 체험",
         description: "겨울 액티비티, 신나는 모험",
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
      changeUrl({ cat: selected.cat, filter: seasonQuery });
   };

   return (
      <div className="flex justify-center items-center mt-3 w-full gap-16">
         {seasonData.map((season) => (
            <div
               key={season.season}
               className={`flex flex-col items-center cursor-pointer transition-all p-4 rounded-md relative 
                ${active === season.season ? "scale-105" : "hover:scale-105 hover:shadow-xl"}`}
              onClick={() => handleClick(season.season)}
               >
               <Image
                  src={season.imageSrc}
                  alt={season.season}
                  width={72}
                  height={72}
                  className="object-cover rounded-md"
               />
               <span className="text-lg font-semibold text-neutral-800 mt-2">{season.title}</span>
               <span className="text-base font-normal text-neutral-500 mt-2">{season.description}</span>
               <div
                  className={`absolute bottom-0 left-0 right-0 h-[2px] bg-sky-500 transition-all duration-200 transform 
                    ${active === season.season ? "scale-x-100" : "scale-x-0"}`}
               />
            </div>
         ))}
      </div>
   );
};

export default SeasonLeisureBar;
