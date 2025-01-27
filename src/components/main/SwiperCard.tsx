"use client";

// 메인페이지 - 스와이퍼 카드 컴포넌트

import React from "react";
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
function SwiperCard({ imageUrl, title, name, imageSrc, isActive, onClick, hashtags, scale = 0.75 }: SwiperCardProps) {
   return (
      <div 
         className="relative w-full h-full rounded-2xl overflow-hidden bg-cover"
         style={{backgroundImage:`url(${imageUrl})`}}
      >
         {/* 배경이미지 */}
         {/* <Image src={} alt={title} fill className="object-cover" priority /> */}
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 to-black/50 p-6">
            <div className="flex flex-col text-left items-start justify-between h-full">
               {/* 타이틀, 해시태그 */}
               <div>
                  <div className="-ml-3 -mt-2 mb-2">
                  <RegionButton name={name} imageSrc={imageSrc} isActive={isActive} onClick={onClick} scale={scale} />
                  </div>
                  <h3 className="text-4xl font-bold text-white">{title}</h3>
                  <p className="text-base font-light text-white">
                     {hashtags.map((tag) => (
                        <span key={tag} className="mr-2">
                           #{tag}
                        </span>
                     ))}
                  </p>
               </div>

               {/* 바로예약 버튼 */}
               <button className="bg-white text-black font-semibold px-4 py-2 rounded-full shadow-md hover:bg-gray-100 self-end">
                  바로예약
               </button>
            </div>
         </div>
      </div>
   );
}

export default SwiperCard;
