"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import TourSearchBar from "@/components/travel/TourSearchBar";
import CardList from "@/components/common/CardList";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { SelectedParam } from "@/types/types";

const TravelPage: React.FC = () => {
   // 라우터 세팅
   const searchParams = useSearchParams();
   const router = useRouter();

   // 파라미터 가져오기
   const nowCategory = searchParams.get("cat");
   const nowFilter = searchParams.get("filter");
   const [selected, setSelected] = useState<SelectedParam>({ cat: "" });

   // 기본 파라미터 설정 (cat이 없을 경우 season으로 설정)
   useEffect(() => {
      if (!nowCategory) {
         console.log("🔄 기본 카테고리 'season' 적용");
         router.replace("?cat=season", { scroll: false });
         setSelected({ cat: "season" });
         return;
      }

      // 올바른 카테고리 값인지 확인 후 설정
      if (["season", "region", "nature", "culture"].includes(nowCategory)) {
         setSelected({ cat: nowCategory, filter: nowFilter });
      }
   }, [nowCategory, nowFilter, router]);

   // URL 변경 함수 (props로 전달)
   const handleUrlChange = (selectedParam: SelectedParam) => {
      const queryString = selectedParam.filter
         ? `?cat=${selectedParam.cat}&filter=${selectedParam.filter}`
         : `?cat=${selectedParam.cat}`;

      router.push(queryString, { scroll: false });
      setSelected(selectedParam);
   };

   return (
      <div className="min-h-screen">
         <Header />
         <TourSearchBar selected={selected} changeUrl={handleUrlChange} />
         <CardList selected={selected} changeUrl={handleUrlChange} />
         <Footer />
      </div>
   );
};

export default TravelPage;
