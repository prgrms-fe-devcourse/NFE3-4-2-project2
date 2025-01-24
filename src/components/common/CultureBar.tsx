"use client";

import React from "react";
import Image from "next/image";

interface CultureBarProps {
  selectedCulture: string | null;
  onCultureSelect: (culture: string) => void;
}

const CultureBar: React.FC<CultureBarProps> = ({
  selectedCulture,
  onCultureSelect,
}) => {
  const cultureData = [
    {
      culture: "미술관·박물관",
      imageSrc: "/images/culture/museum.png",
      description: "예술과 역사를 한눈에",
    },
    {
      culture: "유적지",
      imageSrc: "/images/culture/historic.png",
      description: "과거를 따라 유적지 탐방",
    },
    {
      culture: "종교",
      imageSrc: "/images/culture/religion.png",
      description: "신성한 여정, 종교 성지",
    },
    {
      culture: "기타",
      imageSrc: "/images/culture/etc.png",
      description: "다양한 매력, 특별한 장소",
    },
  ];

  return (
    <div className="flex justify-center items-center mt-3 w-full gap-16">
      {cultureData.map((culture) => (
        <div
          key={culture.culture}
          className={`flex flex-col items-center cursor-pointer transition-all p-4 rounded-md ${
            selectedCulture === culture.culture
              ? "scale-105"
              : "hover:scale-105 hover:shadow-xl"
          }`}
          onClick={() => onCultureSelect(culture.culture)}
        >
          <Image
            src={culture.imageSrc}
            alt={culture.culture}
            width={72}
            height={72}
            className="object-cover rounded-md"
          />
          <span className="text-lg font-semibold text-neutral-800 mt-2">
            {culture.culture}
          </span>
          <span className="text-base font-normal text-neutral-500 mt-2">
            {culture.description}
          </span>
          <div
            className={`absolute bottom-0 left-0 right-0 h-[2px] bg-sky-500 transition-all duration-200 transform ${
              selectedCulture === culture.culture ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default CultureBar;
