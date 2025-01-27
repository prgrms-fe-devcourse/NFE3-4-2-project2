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
      {/* 검색창 */}
      <div className="flex justify-center">
        <div className="w-full max-w-[1279px]">
          <div className="flex items-center justify-end mt-8 mx-6">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="검색어를 입력해 주세요."
                className="w-[450px] h-[52px] px-4 pr-12 border border-sky-500 rounded-3xl placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />

              <svg
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                className="w-5 h-5 absolute top-1/2 right-4 transform -translate-y-1/2 text-neutral-400"
              >
                <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
              </svg>
            </div>
            <button className="ml-4 w-[80px] h-[52px] bg-sky-500 text-white rounded-3xl hover:bg-sky-600 transition">
              검색
            </button>
          </div>
        </div>
      </div>
      <CardList />
      <Footer />
    </div>
  );
};

export default TravelPage;
