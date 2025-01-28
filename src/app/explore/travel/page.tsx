"use client";

import React, { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import TourSearchBar from "@/components/travel/TourSearchBar";
import CardList from "@/components/common/CardList";

const TravelPage: React.FC = () => {
   const [selectedOption, setSelectedOption] = useState<string>("계절별 관광지");

   return (
      <div className="min-h-screen">
         <Header />
         <TourSearchBar setSelectedOption={setSelectedOption} />
         <CardList selectedOption={selectedOption} />
         <Footer />
      </div>
   );
};

export default TravelPage;
