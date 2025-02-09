"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

//api

//types

//swiper
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import PostList from "@/components/common/Community/PostList";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import SearchSection from "@/components/main/SearchSection";
import SvgMap from "@/components/main/SvgMap";
import SwiperCard from "@/components/main/SwiperCard";

//components
import { RestaurantDetailInfo } from "@/types/types";
import APIConnect from "@/utils/api"; // API 요청 모듈
import { getPostsByChannel } from "@/utils/postapi"; // 게시글 API를 가져옴

export default function Home() {
   const router = useRouter();
   const [posts, setPosts] = useState([]);
   const [loadingPosts, setLoadingPosts] = useState(false);
   const [restaurantData, setRestaurantData] = useState<RestaurantDetailInfo[]>([]);
   const [loadingRestaurant, setLoadingRestaurant] = useState<boolean>(true);

   // 스와이퍼 카드에 가져올 음식점 contentId 리스트 (총 8개)
   const contentIds = [2789528, 2777894, 2925194, 2710947, 2789984, 2991113, 2837896, 2837935];

   // 스와이퍼 카드에 보여줄 해시태그
   const hashtagMapping: { [key: string]: string[] } = {
      2789528: ["산채돌솥밥", "건강한맛", "100%자연산"], // 점봉산산채산나물천국 (한식, 강릉)
      2777894: ["정식전문", "한식정찬", "든든한식사"], // 고려회관 (한식, 평창)
      2925194: ["힐링카페", "자연속커피", "소금빵맛집"], // 카페건널목 (카페, 태백)
      2710947: ["순대국", "국밥맛집", "현지인추천"], // 동해순대국집 (한식, 속초)
      2789984: ["프리미엄한우", "고급스러운", "육즙가득"], // 대관령한우 (한식, 평창)
      2991113: ["이탈리안레스토랑", "화덕피자", "분위기좋은"], // 피오레토 (양식, 원주)
      2837896: ["뷰맛집", "루프탑카페", "흑임자커피"], // 아야트커피 (카페, 고성)
      2837935: ["옹심이칼국수", "강원도맛집", "전통음식"], // 공가네감자옹심이 (한식, 양양)
   };

   useEffect(() => {
      // 게시글 데이터 불러오기
      const fetchPosts = async () => {
         setLoadingPosts(true);
         try {
            const response = await getPostsByChannel("679f3aba7cd28d7700f70f40"); // channelId 사용
            setPosts(response.data.slice(0, 6)); // 처음 6개의 게시글만 가져옴
         } catch (error) {
            console.error("❌ 게시글 불러오기 실패:", error);
         } finally {
            setLoadingPosts(false);
         }
      };

      // 특정 contentId들의 식당 데이터 가져오기
      const fetchRestaurants = async () => {
         try {
            console.log(`🌸 [API 요청] 특정 식당 데이터 가져오기 - contentIds=${contentIds.join(", ")} 🌸`);

            // 여러 개의 contentId를 병렬 요청
            const restaurantPromises = contentIds.map((id) => APIConnect.getRestaurantInfo(id));
            const restaurantResults = await Promise.all(restaurantPromises);

            console.log("🍽 가져온 식당 데이터:", restaurantResults); // ✅ 데이터 확인

            // 유효한 데이터만 필터링
            const validData = restaurantResults.filter((data) => data !== null);
            setRestaurantData(validData);
         } catch (error) {
            console.error("데이터 가져오기 실패:", error);
         } finally {
            setLoadingRestaurant(false);
         }
      };

      fetchPosts();
      fetchRestaurants();
   }, []);

   return (
      <div className="min-h-screen">
         {/* Header 컴포넌트 추가 */}
         <Header />
         {/* ////////////////////////////////// */}
         <SvgMap />
         {/* 메인페이지 */}
         <div className="bg-white mx-auto">
            {/* 검색창 */}
            <SearchSection />
            {/* 주요 관광지 소개 섹션 */}
            <div className="contents-wrap">
               <div className="flex w-full mb-16 flex-wrap">
                  <div className="flex items-center text-4xl font-normal text-neutral-800 mr-2">
                     각각의 매력이 살아있는{" "}
                  </div>
                  <div className="flex items-center text-4xl font-bold text-neutral-800">
                     강원도 주요 관광지
                     <Image
                        className="ml-2"
                        src="/icons/main_bluePin.svg"
                        alt="bluePin 아이콘"
                        width={30}
                        height={30}
                     />
                  </div>

                  {/* 더보기 버튼 */}
                  <div className="ml-auto flex items-center">
                     <button
                        type="button"
                        className="w-[72px] h-[28.8px] flex items-center justify-center rounded-md bg-white text-sm font-normal text-neutral-500 outline outline-1 outline-neutral-300 hover:bg-neutral-200"
                        onClick={() => router.push("/explore/travel?cat=region")}>
                        더보기
                        <Image src="/icons/main_arrow.svg" alt="arrow 아이콘" width={6} height={12} className="ml-2" />
                     </button>
                  </div>
               </div>
               {/* 이미지 버튼 */}
               <div className="flex flex-wrap justify-between gap-4 mb-20 max-xl:justify-center">
                  {[
                     {
                        src: "/images/main/circle_Chuncheon.png",
                        alt: "춘천",
                        text: "춘천",
                        code: 13,
                     },
                     {
                        src: "/images/main/circle_Gangneung.png",
                        alt: "강릉",
                        text: "강릉",
                        code: "1",
                     },
                     {
                        src: "/images/main/circle_Sokcho.png",
                        alt: "속초",
                        text: "속초",
                        code: "5",
                     },
                     {
                        src: "/images/main/circle_Yangyang.png",
                        alt: "양양",
                        text: "양양",
                        code: "7",
                     },
                     {
                        src: "/images/main/circle_Jeongseon.png",
                        alt: "정선",
                        text: "정선",
                        code: "11",
                     },
                  ].map(({ src, alt, text, code }) => (
                     <Link
                        href={`/explore/travel?cat=region&filter=${code}`}
                        key={alt}
                        className="relative w-[200px] max-xl:w-[160px] aspect-square rounded-full overflow-hidden focus:outline-none hover:scale-105 hover:shadow-lg hover:shadow-gray-500/50 hover:ring-2 hover:ring-gray-300 transition-all duration-300">
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
               <div className="flex mb-[55px] contents-wrap">
                  <div className="flex items-center text-4xl font-bold text-neutral-800 mr-2">강원도 Hot한 식당 </div>
                  <div className="flex items-center">
                     <Image src="/icons/main_yellowPin.svg" alt="bluePin 아이콘" width={30} height={30} />
                  </div>

                  {/* 더보기 버튼 */}
                  <div className="ml-auto flex items-center">
                     <button
                        type="button"
                        className="w-[72px] h-[28.8px] flex items-center justify-center rounded-md bg-white text-sm font-normal text-neutral-500 outline outline-1 outline-neutral-300 hover:bg-neutral-200"
                        onClick={() => router.push("/explore/places?cat=restaurants&page=1")}>
                        더보기
                        <Image src="/icons/main_arrow.svg" alt="arrow 아이콘" width={6} height={12} className="ml-2" />
                     </button>
                  </div>
               </div>

               {/* 스와이퍼 */}
               <div className="text-center w-screen max-w-full mx-auto">
                  {loadingRestaurant ? (
                     <p>로딩 중...</p>
                  ) : restaurantData.length > 0 ? (
                     <Swiper
                        slidesPerView={4}
                        centeredSlides={true}
                        spaceBetween={24} // 슬라이드 간격 설정
                        loop={true} // 무한 루프
                        autoplay={{ delay: 1000, disableOnInteraction: false }} // 자동 슬라이드 추가
                        className="w-full"
                        breakpoints={{
                           1600: { slidesPerView: 6 },
                           840: { slidesPerView: 4, spaceBetween: 15 },
                           670: { slidesPerView: 2.6, spaceBetween: 15 },
                           480: { slidesPerView: 2.2, spaceBetween: 10 },
                        }}>
                        {restaurantData.map((restaurant) => (
                           <SwiperSlide key={restaurant.contentid}>
                              <div className="relative aspect-[3/4] rounded-lg overflow-hidden transition-opacity duration-300">
                                 <SwiperCard
                                    imageUrl={restaurant.firstimage || "/images/main/test.png"}
                                    title={restaurant.title || "알 수 없음"}
                                    addr={restaurant.addr || "지역 없음"}
                                    contentId={restaurant.contentid}
                                    isActive={true}
                                    onClick={() => alert(`선택한 식당: ${restaurant.title}`)}
                                    hashtags={hashtagMapping[restaurant.contentid] || ["맛집", "추천"]}
                                 />
                              </div>
                           </SwiperSlide>
                        ))}
                     </Swiper>
                  ) : (
                     <p>데이터를 찾을 수 없습니다.</p>
                  )}
               </div>
            </div>

            {/* '강원도 같이 갈 사람' 섹션 */}
            <div className="flex contents-wrap mb-[55px] flex-col">
               <div className="flex items-center text-4xl font-normal text-neutral-800 mb-1 mt-2">
                  같이 떠나면 두 배로 즐거운 여행{" "}
               </div>

               <div className="flex items-center justify-center w-full">
                  <div className="text-4xl font-bold text-neutral-800">강원도 같이 갈 사람! </div>

                  {/* 더보기 버튼 */}
                  <div className="ml-auto flex items-center justify-between">
                     <button
                        type="button"
                        className="w-[72px] h-[28.8px] flex items-center justify-center rounded-md bg-white text-sm font-normal text-neutral-500 outline outline-1 outline-neutral-300 hover:bg-neutral-200"
                        onClick={() => router.push("/community")}>
                        더보기
                        <Image src="/icons/main_arrow.svg" alt="arrow 아이콘" width={6} height={12} className="ml-2" />
                     </button>
                  </div>
               </div>
            </div>

            {/* 모집 카드 리스트 (최대 6개) */}
            <div className="mb-44 contents-wrap">
               <PostList
                  posts={posts}
                  loadingPosts={loadingPosts}
                  currentPage={1}
                  postsPerPage={6} // 6개만 보여주도록 설정
               />
            </div>
         </div>
         {/* ////////////////////////////////// */}
         {/* Footer 컴포넌트 추가 */}
         <Footer />
      </div>
   );
}
