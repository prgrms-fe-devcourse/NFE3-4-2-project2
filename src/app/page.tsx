"use client";

// 내부

import Navigation from "@/components/main/navigation";
import Heritage from "@/components/main/heritage";
import CultureFestival from "@/components/main/cultureFestival";
import TodayQuiz from "@/components/main/todayQuiz";
import Map from "@/components/main/map";
import VideoList from "@/components/main/videoList";

export default function Home() {
  return (
    <div className="main ">
      <Navigation />
      {/* 문화재 리스트 영역 */}
      <div className="mt-10 mx-6">
        <Heritage />
      </div>
      {/* 문화재 행사 */}
      <div className="mt-5 mx-6">
        <CultureFestival />
      </div>
      {/* 오늘의 퀴즈 */}
      <div className="mt-16">
        <TodayQuiz />
      </div>
      {/* 동영상 & 지도 */}
      <div className="flex flex-row justify-center mt-12 mb-[100px] ">
        <VideoList />
        <Map />
      </div>
    </div>
  );
}
