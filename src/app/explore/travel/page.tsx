"use client";

import React from "react";
import Header from "@/components/common/Header";
import TourSearchBar from "@/components/common/TourSearchBar";

const TravelPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <TourSearchBar />
    </div>
  );
};

export default TravelPage;
