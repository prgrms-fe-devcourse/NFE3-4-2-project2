"use client";

import { useEffect, useState, useMemo } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Image from "next/image";
import Link from "next/link";
import AccommodationCard from "@/components/places/accommodationCard";
import APIConnect from "@/utils/api";
import Pagination from "@/components/common/Pagination";
import { AccommodationItem } from "@/types/types";

const categoryMap: { [key: string]: string } = {
   B02010100: "관광호텔",
   B02010500: "콘도미니엄",
   B02010600: "유스호스텔",
   B02010700: "펜션",
   B02010900: "모텔",
   B02011000: "민박",
   B02011100: "게스트하우스",
   B02011200: "홈스테이",
   B02011300: "서비스드레지던스",
   B02011600: "한옥",
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

export default function Accommodations() {
   const [allAccommodations, setAllAccommodations] = useState<AccommodationItem[]>([]);
   const [selectedCategory, setSelectedCategory] = useState("숙소");
   const [searchTerm, setSearchTerm] = useState("");
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);
   const accommodationsPerPage = 12; // 페이지당 숙소 개수
   const [loading, setLoading] = useState<boolean>(true);

   // 카테고리 및 검색 필터링
   const categories = [
      { name: "식당", link: "/places/restaurants" },
      { name: "숙소", link: "/places/accommodations" },
   ];

   // 숙소 리스트 API 가져오기
   useEffect(() => {
      const fetchAccommodations = async () => {
         try {
            const accommodations = await APIConnect.getAccommodationList(1, 1000);
            
            const updatedAccommodations = accommodations.map((accommodation) => ({
               ...accommodation,
               addr1: extractCityCounty(accommodation.addr1),
               cat3Text: getCategoryText(accommodation.cat3),
            }));
            setAllAccommodations(updatedAccommodations);
         } catch (err) {
            console.error("숙소 정보를 불러오는 데 실패했습니다:", err);
         } finally {
            setLoading(false);
         }
      };

      fetchAccommodations();
   }, []);

   // 카테고리별 필터링 부분
   const filteredAccommodations = useMemo(() => {
      let filtered = allAccommodations;

      if (selectedCategory === "숙소") {
         // 기본적으로 숙소를 표시
         filtered = allAccommodations;
      } else {
         // 호텔, 펜션, 모텔, 민박, 게스트하우스, 한옥 등의 카테고리별 필터링
         filtered = allAccommodations.filter((accommodation) => accommodation.cat3Text === selectedCategory);
      }

      if (searchTerm.trim() !== "") {
         filtered = filtered.filter((accommodation) => accommodation.title.includes(searchTerm));
      }

      return filtered;
   }, [allAccommodations, selectedCategory, searchTerm]);


   // 총 페이지 수 계산
   useEffect(() => {
      const pages = Math.ceil(filteredAccommodations.length / accommodationsPerPage);
      setTotalPages(pages);
      if (currentPage > pages) {
         setCurrentPage(1);
      }
   }, [filteredAccommodations, currentPage]);

   // 현재 페이지의 숙소 목록
   const displayedAccommodations = useMemo(() => {
      const startIndex = (currentPage - 1) * accommodationsPerPage;
      return filteredAccommodations.slice(startIndex, startIndex + accommodationsPerPage);
   }, [filteredAccommodations, currentPage]);

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
         {/* 숙소 카테고리 이미지 버튼 */}
         <div className="max-w-[1409px] mx-auto mb-[150px]">
            <div className="flex justify-between items-center mb-[145px]">
               {[
                  {
                     src: "/images/places/accommodations/hotel.png",
                     alt: "호텔",
                     text: "호텔",
                     onClick: () => {
                        setSelectedCategory("호텔");
                        setCurrentPage(1);
                     },
                  },
                  {
                     src: "/images/places/accommodations/pension.png",
                     alt: "펜션",
                     text: "펜션",
                     onClick: () => {
                        setSelectedCategory("펜션");
                        setCurrentPage(1);
                     },
                  },
                  {
                     src: "/images/places/accommodations/motel.png",
                     alt: "모텔",
                     text: "모텔",
                     onClick: () => {
                        setSelectedCategory("모텔");
                        setCurrentPage(1);
                     },
                  },
                  {
                     src: "/images/places/accommodations/b&b.png",
                     alt: "민박",
                     text: "민박",
                     onClick: () => {
                        setSelectedCategory("민박");
                        setCurrentPage(1);
                     },
                  },
                  {
                     src: "/images/places/accommodations/guestHouse.png",
                     alt: "게스트하우스",
                     text: "게스트하우스",
                     onClick: () => {
                        setSelectedCategory("게스트하우스");
                        setCurrentPage(1);
                     },
                  },
                  {
                     src: "/images/places/accommodations/hanok.png",
                     alt: "한옥",
                     text: "한옥",
                     onClick: () => {
                        setSelectedCategory("한옥");
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
         {/* 숙소 리스트 */}
         <div className="max-w-[1409px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
               {displayedAccommodations.map((accommodation, index) => (
                  <Link key={index} href={`/explore/places/accommodations/detail?contentId=${accommodation.contentid}`}>
                     <AccommodationCard
                        imageUrl={accommodation.firstimage || "/images/ready.png"}
                        title={accommodation.title}
                        area={accommodation.addr1}
                        category={accommodation.cat3Text ?? "기타"}
                        buttonText="예약 가능"
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

