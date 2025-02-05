"use client";

import SvgMap from "@/components/main/SvgMap";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Image from "next/image";
import PostList from "@/components/common/Community/PostList";
import { useState, useEffect } from "react";
import { getPostsByChannel } from "@/utils/postapi"; // 게시글 API를 가져옴
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import SwiperCard from "@/components/main/SwiperCard";
import APIConnect from "@/utils/api"; // API 요청 모듈
import { RestaurantDetailInfo } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
   const router = useRouter();
   const [posts, setPosts] = useState([]);
   const [loadingPosts, setLoadingPosts] = useState(false);
   const [restaurantData, setRestaurantData] = useState<RestaurantDetailInfo[]>([]);
   const [loadingRestaurant, setLoadingRestaurant] = useState<boolean>(true);

   // 스와이퍼 카드에 가져올 음식점 contentId 리스트 (총 7개)
   const contentIds = [2782092, 2991113, 2777869, 2777894, 2790453, 2789984, 2777718];

   // 스와이퍼 카드에 보여줄 해시태그
   const hashtagMapping: { [key: string]: string[] } = {
      2782092: ["힐링카페", "자연속커피", "와플맛집"], // 별그리는 자작나무 (카페)
      2991113: ["유럽풍", "로맨틱", "뷰좋은곳"], // 피오레토 (양식)
      2777869: ["쭈꾸미삼겹살", "강변뷰", "가족모임"], // 강변식당 (한식)
      2777894: ["정식전문", "한식정찬", "든든한식사"], // 고려회관 (한식)
      2790453: ["막국수", "강원도맛집", "현지인추천"], // 김박사봉평막국수 (한식)
      2789984: ["프리미엄한우", "고급스러운", "육즙가득"], // 대관령한우 (한식)
      2777718: ["정통베트남", "쌀국수맛집", "이국적인"], // 호치민 쌀국수 (이색음식점)
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
                        onClick={() => router.push("/explore/travel?cat=region")}>
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
                        className="relative w-[200px] h-[200px] rounded-full overflow-hidden focus:outline-none">
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
                        onClick={() => router.push("/explore/places/restaurants")}>
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
                           1920: { slidesPerView: 6 },
                           640: { slidesPerView: 4, spaceBetween: 15 },
                           320: { slidesPerView: 1.5, spaceBetween: 10 },
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
                        onClick={() => router.push("/community")}>
                        더보기
                        <Image src="/icons/main_arrow.svg" alt="arrow 아이콘" width={6} height={12} className="ml-2" />
                     </button>
                  </div>
               </div>
            </div>

            {/* 모집 카드 리스트 (최대 6개) */}
            <div className="flex justify-center items-center mb-44">
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
