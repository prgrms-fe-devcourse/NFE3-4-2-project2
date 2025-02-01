// 식당 페이지

"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Image from "next/image";
import RestaurantCard from "@/components/places/restaurantCard";
import Link from "next/link";

import { Restaurant } from "@/types/types";
import APIConnect from "@/utils/api";
import Pagination from "@/components/common/Pagination";

// 카테고리 코드와 텍스트 매핑
const categoryMap: { [key: string]: string } = {
   A05020100: "한식",
   A05020200: "양식",
   A05020300: "일식",
   A05020400: "중식",
   A05020700: "이색음식점",
   A05020900: "카페/전통찻집",
};

// 전체 주소에서 시/군/구만 추출하는 함수
const extractCityCounty = (address: string) => {
   const updatedAddress = address.replace("강원특별자치도", "").trim();
   return updatedAddress.split(" ")[0];
};

// 카테고리 코드에 맞는 텍스트를 반환하는 함수
const getCategoryText = (categoryCode: string | undefined): string => {
   if (!categoryCode) return "기타";
   return categoryMap[categoryCode] || "기타";
};

export default function Restaurants() {
   const [allRestaurants, setAllRestaurants] = useState<Restaurant[]>([]);
   const [selectedCategory, setSelectedCategory] = useState("식당");
   const [searchTerm, setSearchTerm] = useState("");
   const [loading, setLoading] = useState<boolean>(true);
   const [currentPage, setCurrentPage] = useState<number>(1);
   const [totalPages, setTotalPages] = useState<number>(1);
   const restaurantsPerPage = 12; // -> 한 페이지에 표시할 아이템 수

   const categories = [
      { name: "식당", link: "/places/restaurants" },
      { name: "숙소", link: "/places/accommodations" },
   ];

   // 식당 리스트 API 호출
   useEffect(() => {
      const fetchRestaurants = async () => {
         try {
            const result = await APIConnect.getRestaurantList(1, 1000);
            const { items } = result;
            const updatedRestaurants = (items as Restaurant[]).map((restaurant) => ({
               ...restaurant,
               addr1: extractCityCounty(restaurant.addr1),
               cat3Text: getCategoryText(restaurant.cat3),
            }));
            setAllRestaurants(updatedRestaurants);
         } catch (err) {
            console.error("음식점 리스트를 가져오는 데 실패했습니다:", err);
         } finally {
            setLoading(false);
         }
      };

      fetchRestaurants();
   }, []);

   // 카테고리별 필터링 부분
   const filteredRestaurants = useMemo(() => {
      let filtered = allRestaurants;
      if (selectedCategory === "식당") {
         filtered = allRestaurants.filter((restaurant) => restaurant.cat3Text !== "숙소");
      } else if (selectedCategory === "숙소") {
         filtered = allRestaurants.filter((restaurant) => restaurant.cat3Text === "숙소");
      } else {
         // 한식, 양식, 일식, 중식, 카페/전통찻집, 이색음식점 필터링
         filtered = allRestaurants.filter((restaurant) => restaurant.cat3Text === selectedCategory);
      }
      if (searchTerm.trim() !== "") {
         filtered = filtered.filter((restaurant) => restaurant.title.includes(searchTerm));
      }
      return filtered;
   }, [allRestaurants, selectedCategory, searchTerm]);

   // 필터링된 결과에 따른 총 페이지 수 계산과 현재 페이지 유효성 검사
   useEffect(() => {
      const pages = Math.ceil(filteredRestaurants.length / restaurantsPerPage);
      setTotalPages(pages);
      if (currentPage > pages) {
         setCurrentPage(1);
      }
   }, [filteredRestaurants, currentPage]);

   // 현재 페이지에 표시할 아이템 슬라이스
   const displayedRestaurants = useMemo(() => {
      const startIndex = (currentPage - 1) * restaurantsPerPage;
      return filteredRestaurants.slice(startIndex, startIndex + restaurantsPerPage);
   }, [filteredRestaurants, currentPage]);

   // 페이지네이션 처리
   const handlePageChange = (page: number) => {
      setCurrentPage(page);
   };

   // 검색어 변경 처리
   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1);
   };

   // 검색 버튼 클릭 시 처리
   const handleSearchClick = () => {
      console.log("카테고리:", selectedCategory, "검색어:", searchTerm);
   };

   if (loading) return <div>Loading...</div>;

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
                  {/* 식당 & 숙소 탭 */}
                  <ul className="mb-2 flex gap-3 text-lg font-bold cursor-pointer">
                     {categories.map((category) => (
                        <li
                           key={category.name}
                           onClick={() => {
                              setSelectedCategory(category.name);
                              setCurrentPage(1);
                           }}
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

         {/* 음식 카테고리 이미지 버튼 */}
         <div className="max-w-[1409px] mx-auto mb-[150px]">
            <div className="flex justify-between items-center mb-[145px]">
               {[
                  {
                     src: "/images/places/restaurants/bibimbap.png",
                     alt: "한식",
                     text: "한식",
                     onClick: () => {
                        setSelectedCategory("한식");
                        setCurrentPage(1);
                     },
                  },
                  {
                     src: "/images/places/restaurants/pizza.png",
                     alt: "양식",
                     text: "양식",
                     onClick: () => {
                        setSelectedCategory("양식");
                        setCurrentPage(1);
                     },
                  },
                  {
                     src: "/images/places/restaurants/manchow-soup.png",
                     alt: "중식",
                     text: "중식",
                     onClick: () => {
                        setSelectedCategory("중식");
                        setCurrentPage(1);
                     },
                  },
                  {
                     src: "/images/places/restaurants/nigiri.png",
                     alt: "일식",
                     text: "일식",
                     onClick: () => {
                        setSelectedCategory("일식");
                        setCurrentPage(1);
                     },
                  },
                  {
                     src: "/images/places/restaurants/hot-drink.png",
                     alt: "카페/전통찻집",
                     text: "카페/전통찻집",
                     onClick: () => {
                        setSelectedCategory("카페/전통찻집");
                        setCurrentPage(1);
                     },
                  },
                  {
                     src: "/images/places/restaurants/tacos.png",
                     alt: "이색음식점",
                     text: "이색음식점",
                     onClick: () => {
                        setSelectedCategory("이색음식점");
                        setCurrentPage(1);
                     },
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
         </div>

         {/* 카드 리스트 부분 */}
         <div className="max-w-[1409px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
               {displayedRestaurants.map((restaurant, index) => (
                  <Link key={index} href={`/explore/places/restaurants/detail?contentId=${restaurant.contentid}`}>
                     <RestaurantCard
                        imageUrl={restaurant.firstimage || "/images/ready.png"}
                        title={restaurant.title}
                        area={restaurant.addr1}
                        category={restaurant.cat3Text ?? "기타"}
                        buttonText="영업중"
                     />
                  </Link>
               ))}
            </div>

            {/* 페이지네이션 */}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
         </div>
         <Footer />
      </div>
   );
}
