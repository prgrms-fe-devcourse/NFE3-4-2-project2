"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import catList from "@/utils/catList.json";
import Link from "next/link";

const getCategoryName = (cat3) => {
   return catList[cat3]?.cat3 || "카테고리 없음";
};

const FavoritePlaces = ({ updateCounts }) => { // ✅ updateCounts를 props로 받음
   const [favorites, setFavorites] = useState([]);

   // ✅ localStorage에서 찜한 관광지 불러오기
   useEffect(() => {
      const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavorites(storedFavorites);
   }, []);

   // ✅ 찜 해제 기능 (카운트 업데이트 포함)
   const removeFavorite = (contentId) => {
      const updatedFavorites = favorites.filter((place) => place.contentid !== contentId);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      updateCounts(); // ✅ 카운트 즉시 업데이트
   };

   return (
      <div className="p-6 bg-white shadow rounded-lg w-full">
         <h2 className="text-xl font-bold mb-4">📌 찜한 관광지</h2>
         {favorites.length > 0 ? (
            <ul className="space-y-3">
               {favorites.map((place) => (
                  <li key={place.contentid} className="border p-4 rounded-md flex items-center gap-4">
                     <Link href={`/explore/travel/detail?contentId=${place.contentid}`} className="flex-1 flex gap-4">
                        {/* 대표 이미지 */}
                        <div className="w-24 h-24 bg-gray-200 rounded-md overflow-hidden relative">
                           {place.firstimage ? (
                              <Image 
                                 src={place.firstimage} 
                                 alt={place.title} 
                                 layout="fill" 
                                 objectFit="cover"
                              />
                           ) : (
                              <div className="flex items-center justify-center h-full text-gray-500">No Image</div>
                           )}
                        </div>

                        {/* 여행지 정보 */}
                        <div className="flex-1">
                           <h3 className="text-lg font-semibold">{place.title}</h3>
                           <p className="text-gray-600">{place.addr} | {getCategoryName(place.cat3)}</p>
                        </div>
                     </Link>

                     {/* 찜 해제 아이콘 (이미지 변경) */}
                     <button onClick={() => removeFavorite(place.contentid)}> 
                        <Image
                           src="/images/full_heart.png" // 🔴 기본 상태: 찜한 아이콘
                           alt="찜 해제"
                           width={30}
                           height={30}
                           className="hover:opacity-70 transition"
                           onMouseEnter={(e) => e.currentTarget.src = "/images/heart.png"} // 🔘 마우스 올리면 빈 하트로 변경
                           onMouseLeave={(e) => e.currentTarget.src = "/images/full_heart.png"} // 🔴 다시 원래 하트로 변경
                        />
                     </button>
                  </li>
               ))}
            </ul>
         ) : (
            <p className="text-gray-500">찜한 관광지가 없습니다.</p>
         )}
      </div>
   );
};

export default FavoritePlaces;








