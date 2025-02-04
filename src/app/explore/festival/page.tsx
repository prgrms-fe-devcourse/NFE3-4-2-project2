"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { SelectedParam } from "@/types/types";
import { useSearchParams, useRouter } from "next/navigation";
import FestivalCard from "@/components/fetival/FestivalCard";

export default function Festival() {
   // URL에서 파라미터 읽어오기
   const searchParams = useSearchParams();
   const router = useRouter();

   const nowCategory = searchParams.get("cat") || "festival"; // 기본값 'festival'
   const nowPage = Number(searchParams.get("page")) || 1;

   // 상태 관리
   const [selected, setSelected] = useState<SelectedParam>({
      cat: nowCategory,
      page: nowPage,
   });

   const festivalCategories = [
      { name: "전체", value: "festival", cat2: null }, // 전체 리스트 보기
      { name: "축제", value: "festivalList", cat2: "A0207" },
      { name: "공연/행사", value: "performancEventList", cat2: "A0208" },
   ];

   // 선택된 카테고리에 해당하는 cat2 값 찾기
   const selectedCategory = festivalCategories.find((category) => category.value === selected.cat);
   const selectedCat2 = selectedCategory?.cat2 || null; // 전체 선택 시 null 설정

   // URL 변경 함수
   const handleUrlChange = (selectedParam: SelectedParam) => {
      const selectedCategory = festivalCategories.find((category) => category.value === selectedParam.cat);
      const selectedCat2 = selectedCategory?.cat2 || null; // 전체 선택 시 null

      console.log("🔗 변경될 URL:", `?cat=${selectedParam.cat}&page=${selectedParam.page}&cat2=${selectedCat2}`);

      const queryString = selectedCat2
         ? `?cat=${selectedParam.cat}&page=${selectedParam.page}&cat2=${selectedCat2}`
         : `?cat=${selectedParam.cat}&page=${selectedParam.page}`; // 전체 선택 시 cat2 제거

      router.push(queryString, { scroll: false });
      setSelected(selectedParam);
   };

   console.log("📌 선택된 cat2 값:", selectedCat2);

   return (
      <div className="min-h-screen">
         <Header />
         {/* 배너 이미지 */}
         <div className="relative mb-40">
            <Image
               width={0}
               height={0}
               sizes="100vw"
               src="/images/festival/festivalBanner.png"
               alt="banner"
               className="w-full h-[392px] object-cover"
            />
            {/* 배너 텍스트 */}
            <div className="absolute top-1/2 right-0 left-auto transform -translate-x-1/4 -translate-y-1/2 text-white">
               <h2 className="text-5xl font-bold text-right">강원도 축제 · 공연 · 행사</h2>
               <p className="mt-2 font-bold text-5xl text-right">모든 정보를 한곳에서!</p>
            </div>

            {/* 검색창 */}
            <div className="absolute inset-x-0 top-[100%] mx-auto w-[700px] p-7 shadow-xl bg-white rounded-lg z-10 transform -translate-y-1/2">
               <div className="flex justify-between">
                  {/* 카테고리 */}
                  <ul className="flex gap-3 text-lg font-bold cursor-pointer">
                     {festivalCategories.map((category) => (
                        <li
                           key={category.value}
                           onClick={() =>
                              handleUrlChange({
                                 cat: category.value,
                                 page: 1,
                              })
                           }
                           className={
                              selected.cat === category.value ? "text-sky-500" : "text-neutral-800 hover:text-sky-500"
                           }>
                           {category.name}
                        </li>
                     ))}
                  </ul>
                  {/* 검색 바 */}
                  <div className="flex">
                     <div className="relative">
                        <input
                           type="text"
                           placeholder="검색어를 입력해 주세요."
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
                     <button className="h-[32px] px-4 text-white bg-sky-500 text-sm font-medium rounded-lg ml-2">
                        검색
                     </button>
                  </div>
               </div>
               <div className="flex mt-4">
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
                  <div className="w-[150px]">
                     <p className="text-neutral-500 text-sm pb-2">날짜</p>
                     <select className="w-full bg-transparent focus:outline-none border-b border-sky-500">
                        <option className="text-neutral-800">전체</option>
                        <option className="text-neutral-800">1월</option>
                        <option className="text-neutral-800">2월</option>
                        <option className="text-neutral-800">3월</option>
                        <option className="text-neutral-800">4월</option>
                        <option className="text-neutral-800">5월</option>
                        <option className="text-neutral-800">6월</option>
                        <option className="text-neutral-800">7월</option>
                        <option className="text-neutral-800">8월</option>
                        <option className="text-neutral-800">9월</option>
                        <option className="text-neutral-800">10월</option>
                        <option className="text-neutral-800">11월</option>
                        <option className="text-neutral-800">12월</option>
                     </select>
                  </div>
               </div>
            </div>
         </div>

         {/* FestivalCard에 selectedCat2 전달 */}
         <FestivalCard selected={selected} cat2={selectedCat2} changeUrl={handleUrlChange} />
         <Footer />
      </div>
   );
}
