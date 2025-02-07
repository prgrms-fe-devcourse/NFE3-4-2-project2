"use client";
import React, { useEffect, useState } from "react";
import { checkAuthUser, updateUserInfo, uploadProfilePhoto } from "@/utils/authapi";
import { getCookie } from "@/utils/cookie";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import FavoritePlaces from "./favorites/page";
import VisitedPlaces from "./visited/page";
import axios from "axios";
import MyPost from "./mypost/page";

const MyPage: React.FC = () => {
   const [user, setUser] = useState<User | null>(null);
   const [newUsername, setNewUsername] = useState<string>("");
   const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
   const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
   const [isEditing, setIsEditing] = useState<boolean>(false);
   const [activeMenu, setActiveMenu] = useState<string>("내 프로필");

   const [favoriteCount, setFavoriteCount] = useState<number>(0);
   const [visitedCount, setVisitedCount] = useState<number>(0);
   const storedUserId = getCookie("userId");

   useEffect(() => {
      const fetchUserInfo = async () => {
         try {
            const response = await checkAuthUser();
            setUser(response.data);
            setNewUsername(response.data.username || "");
         } catch (error) {
            console.error("사용자 정보를 불러오는 데 실패했습니다", error);
         }
      };

      fetchUserInfo();

      if (storedUserId) {
         setFavoriteCount(JSON.parse(getCookie(`favorites_${storedUserId}`) || "[]").length);
         setVisitedCount(JSON.parse(getCookie(`visited_${storedUserId}`) || "[]").length);
      }
   }, [storedUserId]);

   // 프로필 수정 버튼 클릭 시, "내 프로필" 메뉴로 이동
   const handleEditClick = () => {
      setActiveMenu("내 프로필");
      setIsEditing(true);
   };

   // 프로필 수정 취소
   const handleCancelClick = () => {
      setIsEditing(false);
      setNewUsername(user?.username || "");
      setNewProfileImage(null);
      setProfileImagePreview(null);
   };

   // 프로필 변경 저장
   const handleSubmitProfileChange = async (e: React.FormEvent) => {
      e.preventDefault();
      if (newUsername !== user?.username) {
         try {
            await updateUserInfo(user?.fullName || "", newUsername);
            alert("닉네임이 변경되었습니다!");
         } catch (error) {
            console.error("닉네임 수정 실패", error);
            alert("닉네임 수정에 실패했습니다.");
         }
      }

      if (newProfileImage) {
         const formData = new FormData();
         formData.append("isCover", "false");
         formData.append("image", newProfileImage);

         try {
            const response = await uploadProfilePhoto(formData);
            setUser(response.data);
         } catch (error) {
            if (axios.isAxiosError(error)) {
               console.error("서버 오류:", error.response?.data || error.message);
               alert("서버에서 오류가 발생했습니다. 나중에 다시 시도해주세요.");
            } else {
               console.error("일반 오류:", error);
               alert("알 수 없는 오류가 발생했습니다.");
            }
         }
      }
      setIsEditing(false);
   };

   // 프로필 이미지 변경 처리
   const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         const file = e.target.files[0];
         setNewProfileImage(file);

         const reader = new FileReader();
         reader.onloadend = () => {
            setProfileImagePreview(reader.result as string);
         };
         reader.readAsDataURL(file);
      }
   };

   return (
      <div className="min-h-screen flex flex-col bg-gray-50">
         <Header />
         {/* ✅ 헤더 fixed로 인해 패딩 추가 */}
         <div className="pt-[200px] max-w-[1280px] w-full mx-auto px-6 py-12 flex gap-8 pb-[160px]">
            {/* 사이드바 */}
            <aside className="w-1/4 bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
               <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
                  <img
                     src={profileImagePreview || user?.image || "/images/default_profile.png"}
                     alt="Profile"
                     className="w-full h-full object-cover"
                  />
               </div>
               <h2 className="text-xl font-semibold mt-4">{user?.fullName} 님</h2>
               <p className="text-gray-500 text-sm mt-2">{user?.email}</p>
               <button
                  className="mt-6 mb-2 bg-sky-500 text-white py-3 px-5 rounded-xl hover:bg-sky-600"
                  onClick={handleEditClick}>
                  프로필 수정
               </button>

               <nav className="mt-6 w-full">
                  <ul className="flex flex-col gap-4">
                     {[
                        { name: "내 프로필", icon: "bi-person-fill text-gray-500" },
                        { name: `찜한 장소 (${favoriteCount})`, icon: "bi-heart-fill text-red-500" },
                        { name: `다녀온 장소 (${visitedCount})`, icon: "bi-geo-alt-fill text-green-500" },
                        { name: "내가 작성한 글", icon: "bi-pencil-square text-blue-500" },
                     ].map((item) => (
                        <li
                           key={item.name}
                           className={`py-2 px-4 rounded-lg cursor-pointer flex items-center gap-3 transition-all ${
                              activeMenu === item.name.replace(/\s\(\d+\)$/, "")
                                 ? "bg-blue-100 text-blue-600 font-semibold"
                                 : "text-gray-700"
                           } hover:bg-gray-200 hover:text-sky-500`}
                           onClick={() => setActiveMenu(item.name.replace(/\s\(\d+\)$/, ""))}>
                           <i className={`bi ${item.icon} text-lg`}></i>
                           {item.name}
                        </li>
                     ))}
                  </ul>
               </nav>
            </aside>

            {/* 메인 컨텐츠 */}
            <main className="flex-grow bg-white shadow-md p-8 rounded-xl">
               <h1 className="text-2xl font-bold text-gray-800 mb-6">
                  <span className="text-sky-500">{user?.fullName}</span> 님의 {activeMenu}
               </h1>

               {/* ✅ 프로필 수정 모드 추가 */}
               {activeMenu === "내 프로필" && (
                  <div className="mt-20 flex items-center space-x-14 mx-4">
                     <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-gray-400">
                        <img
                           src={profileImagePreview || user?.image || "/images/default_profile.png"}
                           alt="Profile"
                           className="w-full h-full object-cover"
                        />
                     </div>
                     <div className="flex-grow">
                        <h2 className="text-3xl font-bold text-gray-800">{user?.fullName}</h2>
                        <p className="text-gray-500 text-sm mt-1">안녕하세요, {user?.fullName} 님!</p>

                        {isEditing ? (
                           <div className="mt-4">
                              <label className="block text-gray-700">닉네임</label>
                              <input
                                 type="text"
                                 value={newUsername}
                                 onChange={(e) => setNewUsername(e.target.value)}
                                 className="mt-1 mb-1 p-2 border-2 border-gray-300 rounded-md"
                              />
                              <label className="block text-gray-700 mt-2">프로필 이미지</label>
                              <input type="file" accept="image/*" onChange={handleProfileImageChange} />

                              <div className="flex gap-4 mt-5">
                                 <button
                                    className="bg-sky-500 text-white px-4 py-2 rounded-lg"
                                    onClick={handleSubmitProfileChange}>
                                    저장
                                 </button>
                                 <button
                                    className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                                    onClick={handleCancelClick}>
                                    취소
                                 </button>
                              </div>
                           </div>
                        ) : (
                           <div className="mt-5">
                              <p className="text-gray-700 text-md flex items-center gap-2">
                                 <i className="bi bi-person-circle text-lg text-gray-600"></i>{" "}
                                 {/* 👤 닉네임 아이콘 추가 */}
                                 닉네임 : <span className="text-gray-900">{newUsername}</span>
                              </p>
                              <p className="text-gray-600 text-md mt-2 flex items-center gap-2">
                                 <i className="bi bi-envelope-fill text-lg text-gray-500"></i>{" "}
                                 {/* ✉ 이메일 아이콘 추가 */}
                                 이메일 : <span className="text-gray-900">{user?.email}</span>
                              </p>
                           </div>
                        )}
                     </div>
                  </div>
               )}

               {activeMenu === "찜한 장소" && <FavoritePlaces />}
               {activeMenu === "다녀온 장소" && <VisitedPlaces />}
               {activeMenu === "내가 작성한 글" && <MyPost />}
            </main>
         </div>
         <Footer />
      </div>
   );
};

export default MyPage;
