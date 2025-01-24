"use client";

import React from "react";
import Image from "next/image";

interface NatureBarProps {
  selectedNature: string | null;
  onNatureSelect: (nature: string) => void;
}

const NatureBar: React.FC<NatureBarProps> = ({
  selectedNature,
  onNatureSelect,
}) => {
  const natureData = [
    {
      nature: "바다 · 해변",
      imageSrc: "/images/nature/beach.png",
      description: "푸른 바다, 여유로운 해변",
    },
    {
      nature: "산 · 등산로",
      imageSrc: "/images/nature/mountain.png",
      description: "고요한 산, 자연을 오르다",
    },
    {
      nature: "호수 · 강 · 계곡",
      imageSrc: "/images/nature/lake.png",
      description: "맑은 호수, 흐르는 강과 계곡",
    },
    {
      nature: "숲 · 생태관광지",
      imageSrc: "/images/nature/forest.png",
      description: "자연을 품은 숲, 생명의 숨결",
    },
  ];

  return (
    <div className="flex justify-center items-center mt-3 w-full gap-16">
      {natureData.map((nature) => (
        <div
          key={nature.nature}
          className={`flex flex-col items-center cursor-pointer transition-all p-4 rounded-md relative ${
            selectedNature === nature.nature
              ? "scale-105"
              : "hover:scale-105 hover:shadow-xl"
          }`}
          onClick={() => onNatureSelect(nature.nature)}
        >
          <Image
            src={nature.imageSrc}
            alt={nature.nature}
            width={72}
            height={72}
            className="object-cover rounded-md"
          />
          <span className="text-lg font-semi-bold text-neutral-800 mt-2">
            {nature.nature}
          </span>
          <span className="text-base font-normal text-neutral-500 mt-2">
            {nature.description}
          </span>
          <div
            className={`absolute bottom-0 left-0 right-0 h-[2px] bg-sky-500 transition-all duration-200 transform ${
              selectedNature === nature.nature ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default NatureBar;
