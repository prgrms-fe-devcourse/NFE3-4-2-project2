"use client";

import React from "react";
import Header from "@/components/common/Header";
import LeisureSearchBar from "@/components/common/LeisureSearchBar";
import Footer from "@/components/common/Footer";

const TravelPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <LeisureSearchBar />
      <Footer />
    </div>
  );
};

export default TravelPage;
