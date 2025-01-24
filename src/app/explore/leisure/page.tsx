"use client";

import React from "react";
import Header from "@/components/common/Header";
import LeisureSearchBar from "@/components/common/LeisureSearchBar";

const TravelPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <LeisureSearchBar />
    </div>
  );
};

export default TravelPage;
