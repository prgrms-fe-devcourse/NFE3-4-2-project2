"use client";

import Image from "next/image";
import React from "react";

interface RegionButtonProps {
   name: string;
   imageSrc: string;
   isActive: boolean;
   onClick: () => void;
   scale?: number; // scale 비율을 받기 위한 optional prop
   customClass?: string; // 스와이퍼에서 스타일을 다르게 적용할 수 있도록 추가
}

const RegionButton: React.FC<RegionButtonProps> = ({
   name,
   imageSrc,
   isActive,
   onClick,
   scale = 1,
   customClass = "",
}) => {
   return (
      <button
         onClick={onClick}
         className={`flex flex-row items-center justify-center gap-2 w-[103px] h-[36px] border rounded-[4px] bg-white transition-all duration-200 
            ${
               isActive
                  ? "bg-sky-100 border-blue-500 scale-105"
                  : "hover:bg-gray-100 hover:scale-105 hover:shadow-md text-neutral-800"
            } 
            ${customClass}
         `}
         style={{ scale: `${scale}` }}>
         <Image src={imageSrc} alt={`${name} 로고`} width={20} height={20} className="w-5 h-5" />
         <span className="text-lg font-semibold">{name}</span>
      </button>
   );
};

export default RegionButton;
