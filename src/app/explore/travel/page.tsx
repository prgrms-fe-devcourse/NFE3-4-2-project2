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
   //라우터 세팅
   const searchParams = useSearchParams();
   const router = useRouter();

   //파라미터 가지고오기
   const nowCategory = searchParams.get("cat");
   const nowFilter = searchParams.get("filter");
   const [selected, setSelected] = useState<SelectedParam>({cat: ""});

   //props로 전달할 url 변환 함수
   const handleUrlChange = (selectedParam: SelectedParam) => {
      if(selectedParam.filter){
         router.push(`?cat=${selectedParam.cat}&filter=${selectedParam.filter}` ,{scroll:false});
      }else{
         router.push(`?cat=${selectedParam.cat}`,{scroll:false});
      }
      setSelected(selectedParam);
   };

   //기본 파라미터 설정
   // const setDefaultCat =()=>{
   //    router.replace("?cat=season" ,{scroll:false});
   //    setSelected({cat:"season"} )
   // }
   // setDefaultCat();

  useEffect(() => {
    if ( nowCategory == "season" || nowCategory == "region" || nowCategory == "nature" || nowCategory == "culture") {
       setSelected({ cat: nowCategory, filter: nowFilter });
      }
  },[nowCategory, nowFilter]);

   return (
      <div className="min-h-screen">
         <Header />
         <TourSearchBar selected={selected} changeUrl={handleUrlChange} />
         <CardList selected={selected} changeUrl={handleUrlChange}/>
         <Footer />
      </div>
   );
};

export default TravelPage;
