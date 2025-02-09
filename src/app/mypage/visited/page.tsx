"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import APIConnect from "@/utils/api";
import catList from "@/utils/catList.json";
import { getCookie, setCookie } from "@/utils/cookie"; // ✅ setCookie 추가

const getCategoryName = (cat3) => {
   return catList[cat3]?.cat3 || "카테고리 없음";
};

const VisitedPlaces = ({ updateCounts }) => {
   const [visited, setVisited] = useState([]);
   const userId = getCookie("userId");

   useEffect(() => {
      const fetchVisited = async () => {
         const storedVisited = JSON.parse(getCookie(`visited_${userId}`) || "[]");

         const visitedData = await Promise.all(
            storedVisited.map(async (contentId) => {
               try {
                  const data = await APIConnect.getTourAreaInfo(contentId, 12);
                  return data;
               } catch (error) {
                  console.error(`Failed to fetch details for contentId: ${contentId}`, error);
                  return null;
               }
            }),
         );

         setVisited(visitedData.filter((item) => item !== null));
      };

      fetchVisited();
   }, [userId]);

   const removeVisited = (contentId) => {
      // ✅ 쿠키에서 해당 contentId 제거
      const updatedVisited = visited.filter((place) => place.contentid !== contentId);
      setVisited(updatedVisited);
      setCookie(`visited_${userId}`, JSON.stringify(updatedVisited.map((p) => p.contentid)), 7);

      updateCounts(); // ✅ 다녀온 여행지 개수 업데이트
   };

   return (
      <div className="p-6 bg-white shadow rounded-lg w-full">
         <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <i className="bi bi-geo-alt-fill text-green-500"></i>
            내가 다녀온 장소
         </h2>{" "}
         {visited.length > 0 ? (
            <ul className="space-y-3">
               {visited.map((place) => (
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

                     <button
                        onClick={() => removeVisited(place.contentid)}
                        className="text-red-500 border border-red-500 px-3 py-1 rounded-md">
                        삭제
                     </button>
                  </li>
               ))}
            </ul>
         ) : (
            <p className="text-gray-500">아직 다녀온 관광지가 없습니다.</p>
         )}
      </div>
   );
};

export default VisitedPlaces;
