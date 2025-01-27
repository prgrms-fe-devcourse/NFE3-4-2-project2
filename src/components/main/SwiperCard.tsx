"use client";

// 메인페이지 - 스와이퍼 카드 컴포넌트

import React from "react";
import Image from "next/image";
import RegionButton from "@/components/common/RegionButton";

type SwiperCardProps = {
   imageUrl: string;
   title: string;
   name: string;
   imageSrc: string;
   isActive: boolean;
   onClick: () => void;
   hashtags: string[];
   scale?: number; // scale props 추가 -> 사이즈 조절용
};

// UI 테스트용
function SwiperCard({ imageUrl, title, name, imageSrc, isActive, onClick, hashtags, scale = 1 }: SwiperCardProps) {
   return (
      <div className="relative w-[400px] h-[474px] rounded-2xl overflow-hidden">
         {/* 배경이미지 */}
         <Image src={imageUrl} alt={title} fill className="object-cover" priority />

         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 to-black/50">
            <div className="flex flex-col h-full p-4 relative">
               <div className="absolute top-4 left-4 z-10">
                  <RegionButton name={name} imageSrc={imageSrc} isActive={isActive} onClick={onClick} scale={scale} />
               </div>

               {/* 타이틀, 해시태그 */}
               <div className="mb-auto">
                  <h3 className="text-2xl font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm font-light text-white">
                     {hashtags.map((tag) => (
                        <span key={tag} className="mr-2">
                           #{tag}
                        </span>
                     ))}
                  </p>
               </div>

               {/* 바로예약 버튼 */}
               <button className="bg-white text-black font-semibold px-4 py-2 rounded-full shadow-md hover:bg-gray-100 self-start ml-auto">
                  바로예약
               </button>
            </div>
         </div>
      </div>
   );
}

export default SwiperCard;
