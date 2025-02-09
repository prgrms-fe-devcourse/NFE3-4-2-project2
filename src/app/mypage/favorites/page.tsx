"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import APIConnect from "@/utils/api";
import catList from "@/utils/catList.json";
import { getCookie, setCookie } from "@/utils/cookie";

const getCategoryName = (cat3) => {
   return catList[cat3]?.cat3 || "카테고리 없음";
};

const FavoritePlaces = ({ updateCounts }) => {
   const [favorites, setFavorites] = useState([]);
   const userId = getCookie("userId");

   useEffect(() => {
      const fetchFavorites = async () => {
         const storedFavorites = JSON.parse(getCookie(`favorites_${userId}`) || "[]");

         const favoriteData = await Promise.all(
            storedFavorites.map(async (contentId) => {
               try {
                  const data = await APIConnect.getTourAreaInfo(contentId, 12);
                  return data;
               } catch (error) {
                  console.error(`Failed to fetch details for contentId: ${contentId}`, error);
                  return null;
               }
            }),
         );

         setFavorites(favoriteData.filter((item) => item !== null));
      };

      fetchFavorites();
   }, [userId]);

   const removeFavorite = (contentId) => {
      // ✅ 쿠키에서 해당 contentId 제거
      const updatedFavorites = favorites.filter((place) => place.contentid !== contentId);
      setFavorites(updatedFavorites);
      setCookie(`favorites_${userId}`, JSON.stringify(updatedFavorites.map((p) => p.contentid)), 7);

      updateCounts(); // ✅ 찜한 여행지 개수 업데이트
   };

   return (
      <div className="p-6 bg-white shadow rounded-lg w-full">
         <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <i className="bi bi-heart-fill text-red-500"></i> {/* ❤️ 하트 아이콘 */}
            내가 찜한 장소
         </h2>{" "}
         {favorites.length > 0 ? (
            <ul className="space-y-3">
               {favorites.map((place) => (
                  <li key={place.contentid} className="border p-4 rounded-md flex items-center gap-4">
                     <Link href={`/explore/travel/detail?contentId=${place.contentid}`} className="flex-1 flex gap-4">
                        <div className="w-24 h-24 bg-gray-200 rounded-md overflow-hidden relative">
                           {place.firstimage ? (
                              <Image src={place.firstimage} alt={place.title} layout="fill" objectFit="cover" />
                           ) : (
                              <div className="flex items-center justify-center h-full text-gray-500">No Image</div>
                           )}
                        </div>

                        <div className="flex-1">
                           <h3 className="text-lg font-semibold">{place.title}</h3>
                           <p className="text-gray-600">
                              {place.addr} | {getCategoryName(place.cat3)}
                           </p>
                        </div>
                     </Link>

                     <button onClick={() => removeFavorite(place.contentid)}>
                        <Image
                           src="/images/full_heart.png"
                           alt="찜 해제"
                           width={30}
                           height={30}
                           className="hover:opacity-70 transition"
                           onMouseEnter={(e) => (e.currentTarget.src = "/images/heart.png")}
                           onMouseLeave={(e) => (e.currentTarget.src = "/images/full_heart.png")}
                        />
                     </button>
                  </li>
               ))}
            </ul>
         ) : (
            <p className="text-gray-500">찜한 여행지가 없습니다.</p>
         )}
      </div>
   );
};

export default FavoritePlaces;
