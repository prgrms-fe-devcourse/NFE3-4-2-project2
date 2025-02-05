// 식당 페이지

"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PlaceSearchBar from "@/components/places/PlaceSearchBar";

import { PlaceParam } from "@/types/types";
import PlcaeDetailBar from "@/components/places/PlaceDetailBar";
import PlaceCardList from "@/components/places/PlaceCardList";

export default function Restaurants() {
   // 라우터 세팅
   const searchParams = useSearchParams();
   const router = useRouter();

   // 파라미터 가져오기
   const nowCategory = searchParams.get("cat");
   const nowFilter = searchParams.get("filter");
   const nowPage = Number(searchParams.get("page"));
   const nowDetail = searchParams.get("detail");
   const [selected, setSelected] = useState<PlaceParam>({ cat: "", page: 1 });

   // URL 변경 함수 (props로 전달)
   const handleUrlChange = (selectedParam: PlaceParam) => {
      let queryString = `?cat=${selectedParam.cat}&page=${selectedParam.page}`;
      if (selectedParam.filter) {
         queryString += `&filter=${selectedParam.filter}`;
      }
      if (selectedParam.detail) {
         queryString += `&detail=${selectedParam.detail}`;
      }
      router.push(queryString, { scroll: false });
      setSelected(selectedParam);
   };

   // 기본 파라미터 설정 (cat이 없을 경우 restaurants으로 설정)
   useEffect(() => {
      if (!nowCategory) {
         setSelected({ cat: "restaurants", page: 1 });
         router.push("?cat=restaurants&page=1", { scroll: false });
         return;
      }

      // 올바른 카테고리 값인지 확인 후 설정
      if (["restaurants", "accommodations"].includes(nowCategory)) {
         setSelected({ cat: nowCategory, filter: nowFilter, page: nowPage || 1, detail: nowDetail });
      }
   }, [nowCategory, nowFilter, nowPage, nowDetail, router]);

   return (
      <div>
         <Header />
         <div className="py-20 bg-[url(/images/places/banner_eat.png)] bg-cover">
            <div className="elative flex flex-col justify-center gap-10">
               <div className=" text-white text-center">
                  <h2 className="text-4xl font-bold mt-20 leading-normal">
                     완벽한 여행 계획을 위해 <br /> 강원도만의 맛집과 숙소를 만나보세요.
                  </h2>
               </div>
               <PlaceSearchBar selected={selected} changeUrl={handleUrlChange} />
            </div>
         </div>

         <PlcaeDetailBar selected={selected} changeUrl={handleUrlChange} />
         <PlaceCardList selected={selected} changeUrl={handleUrlChange} />

         <Footer />
      </div>
   );
}
