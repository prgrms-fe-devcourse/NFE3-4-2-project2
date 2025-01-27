"use client";

import React, { useState } from "react";
import Header from "@/components/common/Header";
import LeisureSearchBar from "@/components/Leisure/LeisureSearchBar";
import CardList from "@/components/common/CardList";
import Footer from "@/components/common/Footer";
import Pagination from "@/components/common/Pagination";

const TravelPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // 예시로 10페이지로 설정

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <LeisureSearchBar />
      <CardList />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Footer />
    </div>
  );
};

export default TravelPage;
