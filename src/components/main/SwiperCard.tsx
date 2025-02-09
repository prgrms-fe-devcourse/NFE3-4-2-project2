"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import RegionButton from "@/components/common/RegionButton";


const regionMapping: { [key: string]: { name: string; imageSrc: string } } = {
   강릉: { name: "강릉시", imageSrc: "/images/region/강릉시.png" },
   고성: { name: "고성군", imageSrc: "/images/region/고성군.png" },
   동해: { name: "동해시", imageSrc: "/images/region/동해시.png" },
   삼척: { name: "삼척시", imageSrc: "/images/region/삼척시.png" },
   속초: { name: "속초시", imageSrc: "/images/region/속초시.png" },
   양구: { name: "양구군", imageSrc: "/images/region/양구군.png" },
   양양: { name: "양양군", imageSrc: "/images/region/양양군.png" },
   영월: { name: "영월군", imageSrc: "/images/region/영월군.png" },
   원주: { name: "원주시", imageSrc: "/images/region/원주시.png" },
   인제: { name: "인제군", imageSrc: "/images/region/인제군.png" },
   정선: { name: "정선군", imageSrc: "/images/region/정선군.png" },
   철원: { name: "철원군", imageSrc: "/images/region/철원군.png" },
   춘천: { name: "춘천시", imageSrc: "/images/region/춘천시.png" },
   태백: { name: "태백시", imageSrc: "/images/region/태백시.png" },
   평창: { name: "평창군", imageSrc: "/images/region/평창군.png" },
   홍천: { name: "홍천군", imageSrc: "/images/region/홍천군.png" },
   화천: { name: "화천군", imageSrc: "/images/region/화천군.png" },
   횡성: { name: "횡성군", imageSrc: "/images/region/횡성군.png" },
};

type SwiperCardProps = {
   imageUrl: string;
   title: string;
   addr: string;
   contentId: string;
   isActive: boolean;
   onClick: () => void;
   hashtags: string[];
   scale?: number;
};

function SwiperCard({ imageUrl, title, addr, contentId, isActive, onClick, hashtags, scale = 0.75 }: SwiperCardProps) {
   const router = useRouter();

   // 주소에서 지역명 추출
   const regionKey = Object.keys(regionMapping).find((region) => addr.includes(region));
   const regionInfo = regionKey
      ? regionMapping[regionKey]
      : { name: "알 수 없음", imageSrc: "/images/region/default.png" };

   // 상세정보 페이지로 이동하는 함수
   const handleDetailClick = () => {
      router.push(`/explore/places/restaurants/detail?contentId=${contentId}`);
   };

   return (
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-cover">
         {/* 이미지 중앙쪽 보이게 */}
         <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="rounded-lg"
         />

         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 to-black/50 p-6">
            <div className="flex flex-col text-left items-start justify-between h-full">
               {/* 타이틀, 해시태그 */}
               <div>
                  <div className="-ml-3 -mt-2 mb-2">
                     <RegionButton
                        name={regionInfo.name}
                        imageSrc={regionInfo.imageSrc}
                        isActive={isActive}
                        onClick={onClick}
                        scale={scale}
                        customClass="border-none shadow-none"
                     />
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

               {/* 상세정보 버튼 */}
               <button
                  onClick={handleDetailClick}
                  className="flex items-center justify-center bg-white text-sky-600 font-semibold px-4 py-2 rounded-full shadow-md hover:bg-amber-100 self-end transition">
                  상세정보
                  <Image src="/icons/main_arrow.svg" alt="arrow 아이콘" width={6} height={12} className="ml-2" />
               </button>
            </div>
         </div>
      </div>
   );
}

export default SwiperCard;
