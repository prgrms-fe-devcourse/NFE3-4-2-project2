"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Edit } from "lucide-react";
import { getUserProfile, saveUserProfile } from "@/utils/authapi"; // ✅ API 연동
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ProfileEditModal from "@/components/common/ProfileEditModal";
import FavoritePlaces from "./favorites/page";
import VisitedPlaces from "./visited/page";

const Sidebar = ({ setActiveSection, activeSection }) => (
   <nav className="bg-gray-100 p-4 rounded-lg w-full max-w-[240px] max-h-[220px]">
      <ul className="space-y-3">
         {[
            { label: "내 프로필", key: "profile" },
            { label: "나의 리뷰 및 후기", key: "reviews" },
            { label: "📌 찜한 관광지", key: "savedPlaces" },
            { label: "✅ 다녀온 관광지", key: "visitedPlaces" },
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
      </ul>
   </nav>
);

const ProfileCard = ({ profile, onEdit }) => (
   <div className="p-6 shadow-md bg-white rounded-lg w-full max-w-[800px] min-h-[450px]">
      <div className="flex items-center justify-between">
         <div className="flex items-center space-x-4">
            <img src={profile.image} alt="프로필" className="w-16 h-16 rounded-full object-cover" />
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
   <div className="w-[180px] h-[120px] shadow bg-white rounded-lg cursor-pointer hover:bg-gray-100 flex flex-col items-center justify-center text-center">
      <p className="text-gray-500">{label}</p>
      <p className="text-xl font-bold">{count}개</p>
   </div>
);

export default function MyPage() {
   const [profile, setProfile] = useState({
      image: "/images/default-profile.png",
      name: "",
      email: "",
      travelStyle: "문화 체험, 편안한 여행",
      bio: "자기 소개를 입력해주세요.",
      savedPlaces: 0,
      travelCourses: 0,
      companions: 0,
      reviews: 0,
   });

   const [activeSection, setActiveSection] = useState("profile");
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

   useEffect(() => {
      const storedName = localStorage.getItem("nickname") || "사용자";
      const storedEmail = localStorage.getItem("userEmail") || "example@email.com";
      const userId = localStorage.getItem("userId");

      if (userId) {
         getUserProfile(userId).then((data) => {
            if (data) {
               setProfile((prev) => ({
                  ...prev,
                  travelStyle: data.profile.travelStyle || prev.travelStyle,
                  bio: data.profile.bio || prev.bio,
               }));
            }
         });
      }

      setProfile((prev) => ({
         ...prev,
         name: storedName,
         email: storedEmail,
      }));
   }, []);

   // ✅ 프로필 수정 버튼 클릭 시
   const handleEdit = () => {
      setIsEditModalOpen(true);
   };

   // ✅ 프로필 저장 핸들러 (API 호출)
   const handleSaveProfile = async (updatedProfile) => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
         alert("로그인이 필요합니다.");
         return;
      }

      try {
         await saveUserProfile(userId, updatedProfile);
         setProfile(updatedProfile);
         alert("프로필이 저장되었습니다!");
      } catch (error) {
         alert("프로필 저장에 실패했습니다.");
      }
   };

   // ✅ 찜한 관광지 & 다녀온 관광지 개수 업데이트
   const updateCounts = () => {
      const savedPlaces = JSON.parse(localStorage.getItem("favorites") || "[]").length;
      const visitedPlaces = JSON.parse(localStorage.getItem("visited") || "[]").length;

      setProfile((prev) => ({
         ...prev,
         savedPlaces,
         companions: visitedPlaces, // ✅ companions → 다녀온 관광지 개수로 사용
      }));
   };

   useEffect(() => {
      updateCounts(); // ✅ 초기 로드 시 개수 업데이트

      // ✅ localStorage 변경 감지 → 숫자 자동 업데이트
      window.addEventListener("storage", updateCounts);
      return () => window.removeEventListener("storage", updateCounts);
   }, []);

   return (
      <div className="min-h-screen flex flex-col bg-gray-50">
         <Header />
         <div className="max-w-[1280px] w-full mx-auto px-4 py-12 flex gap-6 min-h-[850px]">
            <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} />
            <div className="flex flex-col flex-1">
               {activeSection === "profile" && <ProfileCard profile={profile} onEdit={handleEdit} />}

               {/* ✅ StatsCard가 localStorage 반영하여 즉시 업데이트됨 */}
               <div className="flex flex-wrap justify-start gap-6 mt-6 mb-10">
                  <StatsCard label="📌 찜한 관광지" count={profile.savedPlaces} />
                  <StatsCard label="나의 여행 코스" count={profile.travelCourses} />
                  <StatsCard label="✅ 다녀온 관광지" count={profile.companions} />
                  <StatsCard label="작성한 리뷰" count={profile.reviews} />
               </div>

               <div className="mt-10">
                  {activeSection === "savedPlaces" && <FavoritePlaces updateCounts={updateCounts} />}
                  {activeSection === "visitedPlaces" && <VisitedPlaces updateCounts={updateCounts} />}
               </div>
            </div>
         </div>

         {/* ✅ 프로필 수정 모달 */}
         <ProfileEditModal 
            isOpen={isEditModalOpen} 
            onClose={() => setIsEditModalOpen(false)} 
            profile={profile} 
            onSave={handleSaveProfile} 
         />

         <Footer />
      </div>
   );
}




