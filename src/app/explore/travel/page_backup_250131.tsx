"use client";

import React, { useState } from "react";

import CardList from "@/components/common/CardList";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import TourSearchBar from "@/components/travel/TourSearchBar";
import { SeasonType } from "@/types/types"; // ✅ 타입 가져오기

const TravelPage: React.FC = () => {
   const [selectedOption, setSelectedOption] = useState<string>("계절별 관광지");
   const [selectedCulture, setSelectedCulture] = useState<string | null>(null);
   const [selectedSeason, setSelectedSeason] = useState<SeasonType>(null); // ✅ 타입 변경

   return (
      <div className="min-h-screen">
         <Header />
         <TourSearchBar
            setSelectedOption={setSelectedOption}
            setSelectedSeason={setSelectedSeason} // ✅ 수정
            setSelectedCulture={setSelectedCulture}
         />
         <CardList
            selectedOption={selectedOption}
            selectedSeason={selectedSeason} // ✅ 수정
            selectedCulture={selectedCulture}
            selectedNature={null}
         />
         <Footer />
      </div>
   );
};

export default TravelPage;
