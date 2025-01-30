// 식당 및 숙소 페이지

"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Link from "next/link";

export default function Places() {
   const [selectedCategory, setSelectedCategory] = useState("식당");
   const [searchTerm, setSearchTerm] = useState("");

   const categories = [
      { name: "식당", link: "/places/restaurants" },
      { name: "숙소", link: "/places/accommodations" },
   ];

   // 입력된 검색어가 변경될 때 처리
   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
   };

   // 검색 버튼 클릭 시 처리
   const handleSearchClick = () => {
      // 실제 API 요청이나 필터링 로직을 넣을 부분
      console.log("카테고리:", selectedCategory, "검색어:", searchTerm);
   };

   return (
      <div className="min-h-screen">
         <Header />

         <div className="relative mb-[72px]">
            <Image
               width={0}
               height={0}
               sizes="100vw"
               src="/images/places/banner.png"
               alt="banner"
               className="w-full h-[392px] object-cover"
            />
            {/* 배너 텍스트 */}
            <div className="absolute top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
               <h2 className="text-4xl font-bold">강원도의 맛집과 숙박 정보</h2>
            </div>

            {/* 검색창 */}
            <div className="absolute inset-x-0 top-[60%] mx-auto w-[700px] p-7 shadow-xl bg-white rounded-lg z-20 transform -translate-y-1/2">
               <div className="flex justify-between">
                  {/* 식당/숙소 카테고리 */}
                  <ul className="flex gap-3 text-lg font-bold cursor-pointer">
                     {categories.map((category) => (
                        <li
                           key={category.name}
                           onClick={() => setSelectedCategory(category.name)}
                           className={`${
                              selectedCategory === category.name ? "text-sky-500" : "text-neutral-800"
                           } hover:text-sky-500`}>
                           <Link
                              href={`/explore/places/${category.name === "식당" ? "restaurants" : "accommodations"}`}>
                              {category.name}
                           </Link>
                        </li>
                     ))}
                  </ul>

                  {/* 검색 바 */}
                  <div className="flex">
                     <div className="relative">
                        <input
                           type="text"
                           placeholder="검색어를 입력해 주세요."
                           value={searchTerm}
                           onChange={handleSearchChange}
                           className="h-[32px] w-72 p-3 pr-10 border border-sky-500 rounded-lg placeholder:text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                        <svg
                           aria-hidden="true"
                           fill="currentColor"
                           viewBox="0 0 20 20"
                           className="w-4 h-4 absolute top-1/2 right-3 transform -translate-y-1/2 text-sky-500">
                           <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                        </svg>
                     </div>
                     <button
                        className="h-[32px] px-4 text-white bg-sky-500 text-sm font-medium rounded-lg ml-2"
                        onClick={handleSearchClick}>
                        검색
                     </button>
                  </div>
               </div>
            </div>
         </div>

         <Footer />
      </div>
   );
}
