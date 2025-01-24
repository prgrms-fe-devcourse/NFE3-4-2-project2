"use client";

import React from "react";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import TourSearchBar from "@/components/travel/TourSearchBar";
import CardList from "@/components/common/CardList";

const TravelPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <TourSearchBar />
      <CardList />
      
      <Footer />
    </div>
  );
};

export default TravelPage;
