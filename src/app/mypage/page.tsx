"use client";

import { useState } from "react";
import Image from "next/image";
import { Edit } from "lucide-react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const Sidebar = ({ setActiveSection, activeSection }) => (
   <nav className="bg-gray-100 p-4 rounded-lg w-full max-w-[240px] max-h-[300px]">
      <ul className="space-y-3">
         {[
            { label: "📌 내 프로필", key: "profile" },
            { label: "나의 리뷰 및 후기", key: "reviews" },
            { label: "찜한 관광지", key: "savedPlaces" },
            { label: "다녀온 관광지", key: "visitedPlaces" },
         ].map((item) => (
            <li
               key={item.key}
               className={`cursor-pointer p-2 rounded-md transition-colors ${
                  activeSection === item.key
                     ? "text-white bg-blue-500"
                     : "text-gray-600 hover:text-blue-500 hover:bg-gray-200"
               }`}
               onClick={() => setActiveSection(item.key)}>
               {item.label}
            </li>
         ))}
         <li
            className="text-gray-600 cursor-pointer p-2 rounded-md hover:text-red-500 hover:bg-gray-200"
            onClick={() => alert("로그아웃 되었습니다.")}>
            🚪 로그아웃
         </li>
      </ul>
   </nav>
);

const ProfileCard = ({ profile, onEdit }) => (
   <div className="p-6 shadow-md bg-white rounded-lg w-full max-w-[800px] min-h-[450px]">
      <div className="flex items-center justify-between">
         <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full" />
            <div>
               <h2 className="text-xl font-semibold">{profile.name}</h2>
               <p className="text-gray-600">{profile.email}</p>
            </div>
         </div>
         <button className="border p-2 rounded-md" onClick={onEdit}>
            <Edit className="w-5 h-5" />
         </button>
      </div>
      <div className="mt-4">
         <p className="text-gray-800 font-medium">선호하는 여행 스타일</p>
         <p className="text-gray-600">{profile.travelStyle}</p>
      </div>
      <div className="mt-4">
         <p className="text-gray-800 font-medium">자기 소개</p>
         <p className="text-gray-500">{profile.bio}</p>
      </div>
   </div>
);

const StatsCard = ({ label, count }) => (
   <div className="p-4 text-center shadow bg-white rounded-lg cursor-pointer hover:bg-gray-100 w-[180px] min-h-[120px]">
      <p className="text-gray-500">{label}</p>
      <p className="text-xl font-bold">{count}개</p>
   </div>
);

export default function MyPage() {
   const [profile, setProfile] = useState({
      name: "홍길동",
      email: "hongildong@email.com",
      travelStyle: "문화 체험, 편안한 여행",
      bio: "자기 소개를 입력해주세요.",
      savedPlaces: 13,
      travelCourses: 0,
      companions: 0,
      reviews: 0,
   });
   const [activeSection, setActiveSection] = useState("profile");

   const handleEdit = () => {
      alert("프로필 수정 기능은 개발 중");
   };

   return (
      <div className="min-h-screen flex flex-col bg-gray-50">
         <Header />
         <div className="max-w-[1280px] w-full mx-auto px-4 py-12 flex gap-6 min-h-[850px]">
            <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} />
            <div className="flex flex-col flex-1">
               {activeSection === "profile" && <ProfileCard profile={profile} onEdit={handleEdit} />}
               <div className="flex flex-wrap justify-start gap-6 mt-6">
                  <StatsCard label="찜한 관광지" count={profile.savedPlaces} />
                  <StatsCard label="나의 여행 코스" count={profile.travelCourses} />
                  <StatsCard label="다녀온 관광지" count={profile.companions} />
                  <StatsCard label="작성한 리뷰" count={profile.reviews} />
               </div>
            </div>
         </div>
         <Footer />
      </div>
   );
}
