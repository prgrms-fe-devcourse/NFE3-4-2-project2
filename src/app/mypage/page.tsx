"use client";
import React, { useEffect, useState } from "react";
import { checkAuthUser, updateUserInfo, uploadProfilePhoto } from "@/utils/authapi"; // api 호출 함수
import { getCookie } from "@/utils/cookie";
import Header from "@/components/common/Header"; // 헤더 컴포넌트
import Footer from "@/components/common/Footer"; // 푸터 컴포넌트
import FavoritePlaces from "./favorites/page";
import VisitedPlaces from "./visited/page";
import axios from "axios";
import MyPost from "./mypost/page";

const MyPage: React.FC = () => {
   const [user, setUser] = useState<User | null>(null);
   const [newUsername, setNewUsername] = useState<string>("");
   const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
   const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
   const [isEditing, setIsEditing] = useState<boolean>(false); // 수정 모드 상태
   const [activeMenu, setActiveMenu] = useState<string>("내 프로필"); // 사이드바 메뉴 활성화 상태

   // ✅ 찜한 여행지 & 다녀온 여행지 개수 상태
   const [favoriteCount, setFavoriteCount] = useState<number>(0);
   const [visitedCount, setVisitedCount] = useState<number>(0);

   // 현재 로그인한 사용자 정보 불러오기
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

      // ✅ 쿠키에서 찜한 여행지 & 다녀온 여행지 개수 가져오기
      setFavoriteCount(JSON.parse(getCookie("favorites") || "[]").length);
      setVisitedCount(JSON.parse(getCookie("visited") || "[]").length);
   }, []);

   // 사용자 닉네임 수정
   const handleSubmitProfileChange = async (e: React.FormEvent) => {
      e.preventDefault();

      if (newUsername !== user?.username) {
         try {
            await updateUserInfo(user?.fullName || "", newUsername); // fullName은 그대로 두고 username만 업데이트
            alert("닉네임이 변경되었습니다!");
         } catch (error) {
            console.error("닉네임 수정 실패", error);
            alert("닉네임 수정에 실패했습니다.");
         }
      }

      // 프로필 이미지 수정
      if (newProfileImage) {
         const formData = new FormData();
         formData.append("isCover", "false"); // 반드시 false로 설정
         formData.append("image", newProfileImage); // 이미지를 바이너리 형식으로 추가

         try {
            const response = await uploadProfilePhoto(formData);
            setUser(response.data); // 업데이트된 사용자 정보 반영
            alert("프로필 이미지가 변경되었습니다!");
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

      // 수정 상태 종료
      setIsEditing(false);
   };

   // 프로필 이미지 변경 처리
   const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         const file = e.target.files[0];
         setNewProfileImage(file);

         // 미리보기 처리
         const reader = new FileReader();
         reader.onloadend = () => {
            setProfileImagePreview(reader.result as string);
         };
         reader.readAsDataURL(file);
      }
   };

   // 수정 버튼 클릭 시
   const handleEditClick = () => {
      setIsEditing(true); // 수정 모드로 전환
   };

   // 취소 버튼 클릭 시
   const handleCancelClick = () => {
      setIsEditing(false); // 수정 모드 종료
      setNewUsername(user?.username || "");
      setNewProfileImage(null);
      setProfileImagePreview(null);
   };

   return (
      <div className="min-h-screen flex flex-col bg-gray-50">
         {/* 헤더 */}
         <Header />
         <div className="max-w-[1280px] w-full mx-auto px-4 py-8">
            <main className="flex-grow p-14 flex justify-between min-h-[600px]">
               {/* 사이드바 */}
               <div className="w-56 bg-gray-100 p-6 shadow-xl rounded-lg">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-6">마이페이지</h2>
                  <ul>
                     <li
                        className={`mb-4 py-2 px-4 font-semibold rounded-lg cursor-pointer ${
                           activeMenu === "내 프로필" ? "bg-amber-50 text-blue-600" : "text-gray-700"
                        }`}
                        onClick={() => setActiveMenu("내 프로필")}>
                        내 프로필
                     </li>
                     <li
                        className={`mb-4 py-2 px-4 font-semibold rounded-lg cursor-pointer ${
                           activeMenu === "찜한 여행지" ? "bg-amber-50 text-blue-600" : "text-gray-700"
                        }`}
                        onClick={() => setActiveMenu("찜한 여행지")}>
                        찜한 여행지 ({favoriteCount})
                     </li>
                     <li
                        className={`mb-4 py-2 px-4 font-semibold rounded-lg cursor-pointer ${
                           activeMenu === "다녀온 여행지" ? "bg-amber-50 text-blue-600" : "text-gray-700"
                        }`}
                        onClick={() => setActiveMenu("다녀온 여행지")}>
                        다녀온 여행지 ({visitedCount})
                     </li>
                     <li
                        className={`mb-4 py-2 px-4 font-semibold rounded-lg cursor-pointer ${
                           activeMenu === "내가 작성한 글" ? "bg-amber-50 text-blue-600" : "text-gray-700"
                        }`}
                        onClick={() => setActiveMenu("내가 작성한 글")}>
                        내가 작성한 글
                     </li>
                  </ul>
               </div>

               {/* 프로필 오른쪽 영역 */}
               <div className="flex-grow bg-white shadow-lg p-6 rounded-lg max-w-screen-xl mx-auto">
                  {user ? (
                     <div className="flex items-center space-x-14 mt-8 ml-4 mb-8">
                        {/* 프로필 왼쪽 */}
                        <div className="flex-shrink-0 w-48 h-48">
                           {/* 프로필 이미지 미리보기 */}
                           <div className="w-full h-full rounded-full border-2 border-gray-500 mb-6">
                              <img
                                 src={profileImagePreview || user.image || "/images/default_profile.png"} // 업로드된 이미지 미리보기 또는 기본 이미지
                                 alt="Profile"
                                 className="w-full h-full object-cover rounded-full"
                              />
                           </div>
                        </div>

                        {/* 프로필 오른쪽 */}
                        <div className="flex-grow">
                           <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                              {user.fullName}님{/* 수정 버튼 */}
                              <button
                                 className="ml-4 mt-4 px-2 py-2 hover:shadow-md rounded-md"
                                 onClick={handleEditClick}>
                                 <img src="/images/Edit.png" alt="수정" className="w-6 h-6" />
                              </button>
                           </h2>
                           <p className="text-gray-600 mb-6">
                              이메일 <span className="font-semibold mx-4">{user.email}</span>
                           </p>

                           {isEditing ? (
                              <div className="mb-6 flex items-center space-x-4">
                                 <label htmlFor="username" className="text-gray-700">
                                    닉네임
                                 </label>
                                 <input
                                    type="text"
                                    id="username"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                    className="p-2 border-2 border-gray-300 rounded-md"
                                    placeholder="새로운 닉네임"
                                 />
                              </div>
                           ) : (
                              <p className="mb-6 text-gray-700">
                                 닉네임 <span className="font-semibold mx-4">{newUsername}</span>
                              </p>
                           )}

                           {/* 프로필 파일 선택 필드 */}
                           {isEditing && (
                              <div className="my-6 flex items-center space-x-4">
                                 <label htmlFor="profile-photo" className="text-gray-700">
                                    프로필
                                 </label>
                                 <input
                                    type="file"
                                    id="profile-photo"
                                    accept="image/*"
                                    onChange={handleProfileImageChange}
                                    className="block w-3/4 text-sm text-gray-500 p-2"
                                 />
                              </div>
                           )}

                           <div className="flex space-x-4">
                              {isEditing && (
                                 <>
                                    <button
                                       type="submit"
                                       className="mt-2 px-5 py-2 bg-sky-400 text-white rounded-lg hover:bg-blue-500"
                                       onClick={handleSubmitProfileChange}>
                                       저장
                                    </button>
                                    <button
                                       className="mt-2 px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                                       onClick={handleCancelClick}>
                                       취소
                                    </button>
                                 </>
                              )}
                           </div>
                        </div>
                     </div>
                  ) : (
                     <p>로그인 상태가 아닙니다. 로그인 후 다시 시도해 주세요.</p>
                  )}
                  {activeMenu === "찜한 여행지" && (
                     <FavoritePlaces
                        updateCounts={() => setFavoriteCount(JSON.parse(getCookie("favorites") || "[]").length)}
                     />
                  )}
                  {activeMenu === "다녀온 여행지" && (
                     <VisitedPlaces
                        updateCounts={() => setVisitedCount(JSON.parse(getCookie("visited") || "[]").length)}
                     />
                  )}
                  {activeMenu === "내가 작성한 글" && <MyPost />}
               </div>
            </main>
         </div>
         {/* 푸터 */}
         <Footer />
      </div>
   );
};

export default MyPage;
