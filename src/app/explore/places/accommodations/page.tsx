// 숙소 페이지

"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import AccommodationCard from "@/components/places/accommodationCard";

export default function Accommodations() {
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
                  {/* 식당&숙소 카테고리 */}
                  <ul className="mb-2 flex gap-3 text-lg font-bold cursor-pointer">
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

                  {/* 지역 필터 */}
                  <div className="mt-2 flex">
                     <div className="w-[150px] mr-2">
                        <p className="text-neutral-500 text-sm pb-2">지역</p>
                        <select className="w-full bg-transparent focus:outline-none border-b border-sky-500">
                           <option className="text-neutral-800">전체</option>
                           <option className="text-neutral-800">원주시</option>
                           <option className="text-neutral-800">춘천시</option>
                           <option className="text-neutral-800">속초시</option>
                           <option className="text-neutral-800">태백시</option>
                           <option className="text-neutral-800">삼척시</option>
                           <option className="text-neutral-800">동해시</option>
                           <option className="text-neutral-800">강릉시</option>
                           <option className="text-neutral-800">고성군</option>
                           <option className="text-neutral-800">홍천군</option>
                           <option className="text-neutral-800">영월군</option>
                           <option className="text-neutral-800">철원군</option>
                           <option className="text-neutral-800">인제군</option>
                           <option className="text-neutral-800">횡성군</option>
                           <option className="text-neutral-800">평창군</option>
                           <option className="text-neutral-800">정선군</option>
                           <option className="text-neutral-800">양양군</option>
                           <option className="text-neutral-800">화천군</option>
                           <option className="text-neutral-800">양구군</option>
                        </select>
                     </div>
                  </div>

                  {/* 검색 바 */}
                  <div className="flex">
                     <div className="relative">
                        <input
                           type="text"
                           placeholder="검색어를 입력해 주세요."
                           value={searchTerm}
                           onChange={handleSearchChange}
                           className="h-[32px] w-72 pl-3 pr-10 border border-sky-500 rounded-lg placeholder:text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                        <svg
                           aria-hidden="true"
                           fill="currentColor"
                           viewBox="0 0 20 20"
                           className="w-4 h-4 absolute top-1/4 right-3 transform -translate-y-1/2 text-sky-500">
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

         {/* 숙소 카테고리 이미지 버튼 */}
         <div className="max-w-[1409px] mx-auto mb-[150px]">
            <div className="flex justify-between items-center mb-[145px]">
               {[
                  {
                     src: "/images/places/accommodations/hotel.png",
                     alt: "호텔",
                     text: "호텔",
                     onClick: () => alert("호텔 버튼 클릭됨"),
                  },
                  {
                     src: "/images/places/accommodations/pension.png",
                     alt: "펜션",
                     text: "펜션",
                     onClick: () => alert("펜션 버튼 클릭됨"),
                  },
                  {
                     src: "/images/places/accommodations/motel.png",
                     alt: "모텔",
                     text: "모텔",
                     onClick: () => alert("모텔 버튼 클릭됨"),
                  },
                  {
                     src: "/images/places/accommodations/b&b.png",
                     alt: "민박",
                     text: "민박",
                     onClick: () => alert("민박 버튼 클릭됨"),
                  },
                  {
                     src: "/images/places/accommodations/guestHouse.png",
                     alt: "게스트하우스",
                     text: "게스트하우스",
                     onClick: () => alert("게스트하우스 버튼 클릭됨"),
                  },
                  {
                     src: "/images/places/accommodations/hanok.png",
                     alt: "한옥",
                     text: "한옥",
                     onClick: () => alert("한옥 버튼 클릭됨"),
                  },
               ].map(({ src, alt, text, onClick }) => (
                  <div key={alt} className="flex flex-col items-center">
                     <button
                        className="w-[200px] h-[200px] rounded-full overflow-hidden focus:outline-none flex items-center justify-center bg-neutral-100 hover:bg-sky-100 hover:scale-105 hover:shadow-md relative"
                        onClick={onClick}>
                        <Image src={src} alt={alt} width={80} height={80} className="object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center"></div>
                     </button>
                     <span className="text-center text-xl font-bold mt-4">{text}</span>
                  </div>
               ))}
            </div>

            {/* ///////////////////////////////////////////////////////// */}
            {/* ///////////////////////////////////////////////////////// */}
            {/* ///////////////////////////////////////////////////////// */}
            {/* 카드 컴포넌트 부분 */}
            <div className="">
               <div className="flex justify-center items-center mb-44">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                     {[...Array(16)].map((_, index) => (
                        <AccommodationCard
                           key={index}
                           imageUrl="/images/places/accommodations/guestHouse.png"
                           title={`강릉 게스트하우스 ${index + 1}`}
                           area="강릉시"
                           category="게스트하우스"
                           buttonText="영업중"
                        />
                     ))}
                  </div>
               </div>
            </div>
         </div>
         <Footer />
      </div>
   );
}
