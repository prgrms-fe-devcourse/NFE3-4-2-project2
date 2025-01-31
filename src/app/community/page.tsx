"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import CommunityCard from "../../components/travel/CommunityCard";

export default function Places() {
   const [selectedCategory, setSelectedCategory] = useState("여행 동행 모집");
   const router = useRouter();

   const categories = [
      { name: "여행 동행 모집", icon: "bi bi-heart-fill text-red-500" },
      { name: "여행 리뷰", icon: "bi bi-star-fill text-yellow-500" },
   ];

   const travelData = [
      {
         category: "여행 동행 모집",
         imageUrl: "/images/travel1.jpg",
         title: "강릉 바다 여행 멤버 모집",
         location: "강릉시",
         buttonText: "참가",
      },
      {
         category: "여행 동행 모집",
         imageUrl: "/images/travel2.jpg",
         title: "설악산 단풍 여행 팀원 모집",
         location: "속초시",
         buttonText: "참가",
      },
      {
         category: "여행 리뷰",
         imageUrl: "/images/review1.jpg",
         title: "강릉 바다 여행 후기",
         location: "강릉시",
         buttonText: "보기",
      },
      {
         category: "여행 리뷰",
         imageUrl: "/images/review2.jpg",
         title: "제주도 여행 후기",
         location: "제주시",
         buttonText: "보기",
      },
   ];

   const filteredData = travelData.filter((item) => item.category === selectedCategory);

   return (
      <div className="min-h-screen flex flex-col">
         <Header />

         {/* 배너 */}
         <div className="relative">
            <Image
               width={0}
               height={0}
               sizes="100vw"
               src="/images/community/banner.jpg"
               alt="banner"
               className="w-full h-[392px] object-cover"
            />
            <div className="absolute top-1/2 left-12 transform -translate-y-1/2 text-white text-left">
               <p className="text-[36px] font-medium">설레는 동행과 특별한 이야기가 머무는 곳</p>
               <h2 className="text-[48px] font-semibold mt-2">강원도 커뮤니티</h2>
            </div>
         </div>

         {/* ✅ 배너 아래 컨텐츠를 1280px로 제한 */}
         <div className="w-[1280px] mx-auto">
            {/* 카테고리 메뉴 */}
            <div className="flex justify-center py-6">
               <div className="flex gap-8">
                  {categories.map((category) => (
                     <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className="flex flex-col items-center">
                        <div className="flex items-center gap-2">
                           <i className={category.icon}></i>
                           <span
                              className={`text-[24px] font-semibold ${
                                 selectedCategory === category.name ? "text-orange-500" : "text-gray-400"
                              }`}>
                              {category.name}
                           </span>
                        </div>
                        <div
                           className={`mt-1 h-[2px] w-full transition-all ${
                              selectedCategory === category.name ? "bg-sky-500" : "bg-gray-400"
                           }`}></div>
                     </button>
                  ))}
               </div>
            </div>

            {/* ✅ 글 작성하기 버튼을 카드 리스트 위, 오른쪽 정렬 */}
            <div className="flex justify-end px-6 mb-4">
               <button
                  onClick={() => router.push("/community/write")}
                  className="w-[170px] h-[48px] bg-sky-500 text-white text-[18px] font-semibold rounded-lg">
                  글 작성하기
               </button>
            </div>

            {/* 🔥 CommunityCard 리스트 */}
            <div className="flex flex-wrap justify-center gap-6 p-6">
               {filteredData.map((data, index) => (
                  <CommunityCard key={index} {...data} />
               ))}
            </div>
         </div>

         <Footer />
      </div>
   );
}
