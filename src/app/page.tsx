"use client";

import SvgMap from "@/components/main/SvgMap";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import Image from "next/image";
import CommunityCard from "@/components/travel/CommunityCard";

// Swiper 관련 import
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
// import { FreeMode, Pagination } from "swiper/modules";
import SwiperCard from "@/components/main/SwiperCard";
import Link from "next/link";

export default function Home() {
   return (
      <div className="min-h-screen">
         {/* Header 컴포넌트 추가 */}
         <Header />
         {/* ////////////////////////////////// */}
         <SvgMap />
         {/* 메인페이지 */}
         <div className="bg-white mx-auto">
            {/* 검색창 */}
            <div className="mb-24 mt-8 flex items-center justify-center w-full">
               <div className="flex">
                  <div className="relative w-[992px]">
                     {/* 검색 입력창 */}
                     <input
                        type="text"
                        placeholder="가을 캠핑 관광지"
                        className="w-full h-[68px] border-2 text-2xl font-semibold border-sky-500 rounded-full placeholder:text-2xl placeholder:font-semibold focus:border-sky-500 focus:outline-none focus:outline-sky-50 pl-8 pr-12"
                     />
                     {/* 검색 버튼 */}
                     <button
                        className="absolute right-7 top-1/2 transform -translate-y-1/2"
                        onClick={() => alert("검색 버튼 클릭됨")}>
                        <Image src="/icons/main_search.svg" alt="search 아이콘" width={18} height={18} />
                     </button>
                  </div>
               </div>
            </div>

            {/* 주요 관광지 소개 섹션 */}
            <div className="max-w-screen-xl mx-auto">
               <div className="flex w-full mb-[55px] ">
                  <div className="flex items-center text-4xl font-normal text-neutral-800 mr-2">
                     각각의 매력이 살아있는{" "}
                  </div>
                  <div className="flex items-center text-4xl font-bold text-neutral-800 mr-1">강원도 주요 관광지 </div>
                  <div className="flex items-center">
                     <Image src="/icons/main_bluePin.svg" alt="bluePin 아이콘" width={30} height={30} />
                  </div>

                  {/* 더보기 버튼 */}
                  <div className="ml-auto flex items-center">
                     <button
                        type="button"
                        className="w-[72px] h-[28.8px] flex items-center justify-center rounded-md bg-white text-sm font-normal text-neutral-500 outline outline-1 outline-neutral-300 hover:bg-neutral-200"
                        onClick={() => alert("더보기 버튼 클릭됨")}>
                        더보기
                        <Image src="/icons/main_arrow.svg" alt="arrow 아이콘" width={6} height={12} className="ml-2" />
                     </button>
                  </div>
               </div>
               {/* 이미지 버튼 */}
               <div className="flex justify-between mb-[145px]">
                  {[
                     {
                        src: "/images/main/circle_Chuncheon.png",
                        alt: "춘천",
                        text: "춘천",
                        code: 13
                     },
                     {
                        src: "/images/main/circle_Gangneung.png",
                        alt: "강릉",
                        text: "강릉",
                        code:"1"
                     },
                     {
                        src: "/images/main/circle_Sokcho.png",
                        alt: "속초",
                        text: "속초",
                        code:"5",
                     },
                     {
                        src: "/images/main/circle_Yangyang.png",
                        alt: "양양",
                        text: "양양",
                        code:"7",
                     },
                     {
                        src: "/images/main/circle_Jeongseon.png",
                        alt: "정선",
                        text: "정선",
                        code:"11",
                     },
                  ].map(({ src, alt, text, code }) => (
                     <Link
                        href={`/explore/travel?cat=region&filter=${code}`}
                        key={alt}
                        className="relative w-[200px] h-[200px] rounded-full overflow-hidden focus:outline-none"
                        >
                        <Image src={src} alt={alt} fill className="object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 bg-opacity-30">
                           <span className="text-white text-2xl font-semibold">{text}</span>
                        </div>
                     </Link>
                  ))}
               </div>
            </div>

            {/* 강원도 Hot한 식당 섹션 */}
            <div className="bg-neutral-50 py-12 mb-12">
               <div className="flex w-full mb-[55px] max-w-screen-xl mx-auto">
                  <div className="flex items-center text-4xl font-bold text-neutral-800 mr-2">강원도 Hot한 식당 </div>
                  <div className="flex items-center">
                     <Image src="/icons/main_yellowPin.svg" alt="bluePin 아이콘" width={30} height={30} />
                  </div>

                  {/* 더보기 버튼 */}
                  <div className="ml-auto flex items-center">
                     <button
                        type="button"
                        className="w-[72px] h-[28.8px] flex items-center justify-center rounded-md bg-white text-sm font-normal text-neutral-500 outline outline-1 outline-neutral-300 hover:bg-neutral-200"
                        onClick={() => alert("더보기 버튼 클릭됨")}>
                        더보기
                        <Image src="/icons/main_arrow.svg" alt="arrow 아이콘" width={6} height={12} className="ml-2" />
                     </button>
                  </div>
               </div>

               {/* 스와이퍼 */}
               <div className="text-center w-screen max-w-full mx-auto">
                  <Swiper
                     slidesPerView={4} // 1920px에서 5개 슬라이드 보이도록 설정
                     centeredSlides={true}
                     spaceBetween={24} // 슬라이드 간격 설정
                     loop={true}
                     className="w-full" // Swiper 전체에 overflow-hidden 추가
                     breakpoints={{
                        1920: {
                           slidesPerView: 6,
                        },
                        640: {
                           slidesPerView: 4,
                           spaceBetween: 15,
                        },
                        320: {
                           slidesPerView: 1.5,
                           spaceBetween: 10,
                        },
                     }}>
                     {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                        <SwiperSlide key={index}>
                           <div
                              className={`relative aspect-[3/4] rounded-lg overflow-hidden transition-opacity duration-300`}>
                              <SwiperCard
                                 imageUrl="/images/main/test.png"
                                 title="P.E.I coffee"
                                 name="양양군"
                                 imageSrc="/images/region/양양군.png"
                                 isActive={true}
                                 onClick={() => alert(`버튼 클릭됨: 카드 ${index}`)}
                                 hashtags={["분위기", "전망좋은카페"]}
                              />
                           </div>
                        </SwiperSlide>
                     ))}
                  </Swiper>
               </div>
            </div>

            {/* '강원도 같이 갈 사람' 섹션 */}
            <div className="flex max-w-screen-xl mx-auto mb-[55px] flex-col">
               <div className="flex items-center text-4xl font-normal text-neutral-800 mb-1">
                  같이 떠나면 두 배로 즐거운 여행{" "}
               </div>

               <div className="flex items-center justify-center w-full">
                  <div className="text-4xl font-bold text-neutral-800">강원도 같이 갈 사람! </div>

                  {/* 더보기 버튼 */}
                  <div className="ml-auto flex items-center justify-between">
                     <button
                        type="button"
                        className="w-[72px] h-[28.8px] flex items-center justify-center rounded-md bg-white text-sm font-normal text-neutral-500 outline outline-1 outline-neutral-300 hover:bg-neutral-200"
                        onClick={() => alert("더보기 버튼 클릭됨")}>
                        더보기
                        <Image src="/icons/main_arrow.svg" alt="arrow 아이콘" width={6} height={12} className="ml-2" />
                     </button>
                  </div>
               </div>
            </div>

            {/* 모집 카드 */}
            <div className="flex justify-center items-center mb-44">
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  <CommunityCard
                     imageUrl="/images/community/surfing.png"
                     title="3기 양양 서핑 동호회 모집"
                     location="양양"
                     buttonText="참가"
                  />
                  <CommunityCard
                     imageUrl="/images/community/galaxy.png"
                     title="포토그래퍼와 함께 떠나는 강원도 밤하늘 여행"
                     location="영월"
                     buttonText="마감"
                  />
                  <CommunityCard
                     imageUrl="/images/community/climbing.png"
                     title="인천에서 출발하는 설악산 당일치기"
                     location="속초"
                     buttonText="참가"
                  />
                  <CommunityCard
                     imageUrl="/images/community/dog.png"
                     title="강릉 댕댕클럽카페 정기 모임 (누구나 환영!)"
                     location="강릉"
                     buttonText="참가"
                  />
                  <CommunityCard
                     imageUrl="/images/community/snow.png"
                     title="2025 제32회 태백산 눈축제"
                     location="태백"
                     buttonText="참가"
                  />
                  <CommunityCard
                     imageUrl="/images/community/coffee.png"
                     title="커피 투어 참가자 모집 (무료)"
                     location="강릉"
                     buttonText="마감"
                  />
               </div>
            </div>
         </div>
         {/* ////////////////////////////////// */}
         {/* Footer 컴포넌트 추가 */}
         <Footer />
      </div>
   );
}
