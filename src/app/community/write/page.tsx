"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function WritePage() {
   const router = useRouter();

   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [date, setDate] = useState("");
   const [fee, setFee] = useState("");
   const [email, setEmail] = useState("");
   const [adultCount, setAdultCount] = useState(1);
   const [childCount, setChildCount] = useState(0);
   const [image, setImage] = useState<File | null>(null);

   // 사진 업로드 핸들러
   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
         setImage(e.target.files[0]);
      }
   };

   // 모든 필수 입력 필드가 채워졌는지 확인
   const isFormValid = title && content && date && fee && email;

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!isFormValid) return;
      alert("글이 작성되었습니다.");
      router.push("/community"); // 작성 완료 후 이동
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
               src="/images/community/banner.jpg"
               alt="banner"
               className="w-full h-[160px] object-cover"
            />
            <div className="absolute top-1/2 left-12 transform -translate-y-1/2 text-white text-left">
               <p className="text-[28px] font-medium">설레는 동행과 특별한 이야기가 머무는 곳</p>
               <h2 className="text-[36px] font-semibold mt-2">동행 모집 작성</h2>
            </div>
         </div>

         {/* 글 작성 폼 */}
         <div className="max-w-[800px] w-full mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
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

            {/* 모집 인원 */}
            <div className="mb-4">
               <label className="block text-lg font-semibold">몇 명을 모집하나요?</label>
               <div className="flex items-center gap-4">
                  <div className="flex items-center">
                     <span className="mr-2">👨‍💼 성인</span>
                     <input
                        type="number"
                        value={adultCount}
                        onChange={(e) => setAdultCount(Number(e.target.value))}
                        min="1"
                        className="w-[60px] p-2 border border-gray-300 rounded-md text-center"
                     />
                  </div>
                  <div className="flex items-center">
                     <span className="mr-2">👶 아동</span>
                     <input
                        type="number"
                        value={childCount}
                        onChange={(e) => setChildCount(Number(e.target.value))}
                        min="0"
                        className="w-[60px] p-2 border border-gray-300 rounded-md text-center"
                     />
                  </div>
               </div>
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

            {/* 주의사항 */}
            <div className="bg-gray-100 p-4 text-gray-700 text-sm rounded-md mb-6">
               저는 모든 참여자에게 공정하고 투명한 절차를 제공하며, 동행 중 발생할 수 있는 문제를 예방하기 위해 최선을
               다할 것을 서약합니다. 또한, 불법적인 모집이나 문제 발생 시 삭제 및 경고 조치를 시행할 수 있습니다.
            </div>

            {/* 등록하기 버튼 */}
            <button
               onClick={handleSubmit}
               disabled={!isFormValid}
               className={`w-full p-4 text-lg font-semibold rounded-md ${
                  isFormValid ? "bg-sky-500 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
               }`}
            >
               작성 완료
            </button>
         </div>

         <Footer />
      </div>
   );
}
