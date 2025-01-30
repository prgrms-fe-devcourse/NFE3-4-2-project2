"use client";

import React, { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import TourSearchBar from "@/components/travel/TourSearchBar";
import CardList from "@/components/common/CardList";

const TravelPage: React.FC = () => {
   const [selectedOption, setSelectedOption] = useState<string>("계절별 관광지");
   const [selectedCulture, setSelectedCulture] = useState<string | null>(null);

   return (
      <div className="min-h-screen">
         <Header />
         <TourSearchBar setSelectedOption={setSelectedOption} setSelectedCulture={setSelectedCulture} />
         <CardList selectedOption={selectedOption} selectedCulture={selectedCulture} />
         <Footer />
      </div>
   );
};

export default TravelPage;
