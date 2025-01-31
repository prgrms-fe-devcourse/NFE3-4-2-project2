"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { createPost } from "@/utils/postapi"; // ✅ API 호출 함수 가져오기

export default function WritePage({ channelId }: { channelId: string }) {
   const router = useRouter();

   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [date, setDate] = useState("");
   const [fee, setFee] = useState("");
   const [email, setEmail] = useState("");
   const [image, setImage] = useState<File | null>(null);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
         alert("로그인이 필요합니다.");
         router.push("/auth/login");
      }
   }, [router]);

   // 사진 업로드 핸들러
   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
         setImage(e.target.files[0]);
      }
   };

   // 모든 필수 입력 필드가 채워졌는지 확인
   const isFormValid = title && content && date && fee && email;

   // 게시글 제출 핸들러
   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isFormValid || loading) return;

      setLoading(true);

      try {
         const formData = new FormData();
         formData.append("title", title);
         formData.append("channelId", channelId);
         formData.append("date", date);
         formData.append("fee", fee);
         formData.append("email", email);
         if (image) {
            formData.append("image", image);
         }

         console.log("🔹 전송할 데이터:", Object.fromEntries(formData.entries())); // 확인용 로그

         // ✅ API 호출
         const responseData = await createPost(formData);
         console.log("🔹 서버 응답:", responseData);

         alert("글이 성공적으로 작성되었습니다.");
         router.push("/community");
      } catch (error: any) {
         console.error("❌ 오류:", error);
         const errorMessage = error.response?.data?.message || "게시글 작성 중 오류가 발생했습니다.";
         alert(errorMessage);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="min-h-screen flex flex-col">
         <Header />

         {/* 배너 */}
         <div className="relative">
            <Image
               width={0}
               height={0}
               sizes="100vw"
               src="/images/community/banner.png"
               alt="banner"
               className="w-full h-[160px] object-cover"
            />
            <div className="absolute top-1/2 left-12 transform -translate-y-1/2 text-white text-left">
               <p className="text-[28px] font-medium">설레는 동행과 특별한 이야기가 머무는 곳</p>
               <h2 className="text-[36px] font-semibold mt-2">동행 모집 작성</h2>
            </div>
         </div>

         {/* 글 작성 폼 */}
         <div className="max-w-[800px] w-full mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg mb-16">
            <button onClick={() => router.back()} className="mb-4 text-blue-500 hover:underline">
               ◀ 게시글 목록
            </button>

            {/* 모집 제목 */}
            <div className="mb-4">
               <label className="block text-lg font-semibold">제목 *</label>
               <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="모집 제목을 입력하세요."
                  required
               />
            </div>

            {/* 모집 내용 */}
            <div className="mb-4">
               <label className="block text-lg font-semibold">내용 *</label>
               <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md h-40"
                  placeholder="내용을 입력하세요."
                  required
               />
            </div>

            {/* 이미지 업로드 (선택 사항) */}
            <div className="mb-6">
               <label className="block text-lg font-semibold">사진 추가하기 (선택사항)</label>
               <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 border border-gray-300 rounded-md"
               />
               {image && (
                  <div className="mt-2 flex items-center justify-center w-full h-[150px] border border-gray-300 rounded-md bg-gray-100">
                     <Image
                        src={URL.createObjectURL(image)}
                        alt="업로드된 이미지"
                        width={300}
                        height={150}
                        className="object-cover rounded-md"
                     />
                  </div>
               )}
            </div>

            {/* 일정 */}
            <div className="mb-4">
               <label className="block text-lg font-semibold">언제 갈 예정인가요? *</label>
               <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
               />
            </div>

            {/* 참가비 */}
            <div className="mb-4">
               <label className="block text-lg font-semibold">참가비 안내 *</label>
               <input
                  type="text"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="참가비를 입력하세요. (예: 50,000원)"
                  required
               />
            </div>

            {/* 연락 방법 */}
            <div className="mb-4">
               <label className="block text-lg font-semibold">연락 방법 (이메일) *</label>
               <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="이메일을 입력하세요."
                  required
               />
            </div>

            {/* 등록하기 버튼 */}
            <button
               onClick={handleSubmit}
               disabled={!isFormValid || loading}
               className={`w-full p-4 text-lg font-semibold rounded-md ${
                  isFormValid && !loading ? "bg-sky-500 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
               }`}
            >
               {loading ? "작성 중..." : "작성 완료"}
            </button>
         </div>

         <Footer />
      </div>
   );
}
