"use client";

import { useState, useEffect } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { PlaceParam } from "@/types/types";
import { useSearchParams, useRouter } from "next/navigation";
import FestivalCardList from "@/components/fetival/FestivalCardList";
import FestivalSearchBar from "@/components/fetival/FestivalSearchBar";

export default function Festival() {
   // URL에서 파라미터 읽어오기
   const searchParams = useSearchParams();
   const router = useRouter();

   //파라미터 가져오기
   const nowCategory = searchParams.get("cat"); // 기본값 'festival'
   const nowFilter = searchParams.get("filter");
   const nowPage = Number(searchParams.get("page"));
   const nowDetail = searchParams.get("detail");
   const [selected, setSelected] = useState<PlaceParam>({ cat: nowCategory, page: nowPage });

   // URL 변경 함수
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

   // 기본 파라미터 설정 (cat이 없을 경우 total로 설정)
   useEffect(() => {
      if (!nowCategory) {
         setSelected({ cat: "total", page: 1 });
         router.replace("?cat=total&page=1", { scroll: false });
         return;
      }

      // 올바른 카테고리 값인지 확인 후 설정
      if (["festival", "event"].includes(nowCategory)) {
         setSelected({ cat: nowCategory, filter: nowFilter, page: nowPage || 1, detail: nowDetail });
      }
   }, [nowCategory, nowFilter, nowPage, nowDetail, router]);

   return (
      <div>
         <Header />
         <div className="relative py-20 bg-[url(/images/festival/banner_festival.png)] flex flex-col items-center justify-center gap-6">
            <div className="text-white text-center">
               <h2 className="text-4xl font-bold leading-normal">
                  강원도에서 즐기는 <br /> 다채로운 축제와 공연/행사!
               </h2>
            </div>
            <FestivalSearchBar selected={selected} changeUrl={handleUrlChange} />
         </div>

         <FestivalCardList selected={selected} changeUrl={handleUrlChange} />
         <Footer />
      </div>
   );
}
