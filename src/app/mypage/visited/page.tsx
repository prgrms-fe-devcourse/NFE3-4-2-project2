"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import catList from "@/utils/catList.json";

const getCategoryName = (cat3) => {
   return catList[cat3]?.cat3 || "카테고리 없음";
};

const VisitedPlaces = ({ updateCounts }) => { // ✅ updateCounts를 props로 받음
   const [visited, setVisited] = useState([]);

   // ✅ localStorage에서 다녀온 관광지 불러오기
   useEffect(() => {
      const storedVisited = JSON.parse(localStorage.getItem("visited") || "[]");
      setVisited(storedVisited);
   }, []);

   // ✅ 다녀온 관광지 삭제 기능 (카운트 업데이트 포함)
   const removeVisited = (contentId) => {
      const updatedVisited = visited.filter((place) => place.contentid !== contentId);
      setVisited(updatedVisited);
      localStorage.setItem("visited", JSON.stringify(updatedVisited));
      updateCounts(); // ✅ 카운트 즉시 업데이트
   };

   return (
      <div className="p-6 bg-white shadow rounded-lg w-full">
         <h2 className="text-xl font-bold mb-4">✅ 다녀온 관광지</h2>
         {visited.length > 0 ? (
            <ul className="space-y-3">
               {visited.map((place) => (
                  <li key={place.contentid} className="border p-4 rounded-md flex items-center gap-4">
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

                     {/* 다녀온 관광지 삭제 버튼 */}
                     <button 
                        className="text-red-500 hover:text-red-700 border border-red-500 px-3 py-1 rounded-md"
                        onClick={() => removeVisited(place.contentid)}
                     >
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




