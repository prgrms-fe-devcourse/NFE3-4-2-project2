"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { getPostById } from "@/utils/postapi";
import { AxiosResponse } from "axios";

interface Post {
   _id: string;
   title: string;
   content: string;
   fee: number | string;
   people: number;
   status: string;
   date: string;
   endDate: string;
   createdAt: string;
   image?: string;
   author: {
      fullName: string;
      email: string;
   };
}

export default function PostDetail() {
   const router = useRouter();
   const params = useParams();
   const postId = params?.postId as string;

   const [post, setPost] = useState<Post | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (!postId) return;

      const fetchPost = async () => {
         try {
            const response: AxiosResponse<Post> = await getPostById(postId);
            console.log("📌 API 응답 데이터:", response.data); // 콘솔에서 응답 확인
            setPost(response.data);
         } catch (error) {
            console.error("❌ 게시글 불러오기 실패:", error);
         } finally {
            setLoading(false);
         }
      };
      fetchPost();
   }, [postId]);

   const formatDate = (date: string | undefined) => {
      if (!date) return "날짜 정보 없음";  
      const parsedDate = new Date(date);
      return isNaN(parsedDate.getTime()) ? "유효하지 않은 날짜" : parsedDate.toLocaleDateString();
   };

   const parseTitle = (title: string) => {
      try {
         return JSON.parse(title); 
      } catch (error) {
         console.error("Error parsing title:", error);
         return { title: "제목 없음", content: "내용 없음", fee: "정보 없음", people: 1, status: "정보 없음", date: "", endDate: "" };
      }
   };

   const parsedTitle = post ? parseTitle(post.title) : null;

   const getFieldValue = (value: any, fallback: string | number = "정보 없음") => {
      if (value === undefined || value === null || value === "") return fallback;
      return value;
   };

   return (
      <div className="min-h-screen flex flex-col">
         <Header />
         <div className="max-w-[1200px] w-full mx-auto px-4 py-10">
            {loading ? (
               <p className="text-gray-500 text-center">게시글을 불러오는 중...</p>
            ) : post ? (
               <div className="bg-white p-6 rounded-lg shadow-md">
                  {/* 제목 */}
                  <h1 className="text-[32px] font-bold text-gray-900 mb-6">
                     {parsedTitle ? parsedTitle.title : "제목 없음"}
                  </h1>

                  {/* 작성자 정보 */}
                  <div className="text-gray-500 text-sm mb-4">
                     <p><strong>작성자:</strong> {post.author.fullName} ({post.author.email})</p>
                  </div>

                  {/* 게시글 작성일 */}
                  <div className="text-gray-500 text-sm mb-6">
                     <p><strong>작성일:</strong> {formatDate(post.createdAt)}</p>
                  </div>

                  {/* 이미지 & 정보 섹션 */}
                  <div className="flex flex-wrap md:flex-nowrap gap-6">
                     {/* 이미지 */}
                     <div className="w-full md:w-[40%] h-[400px] overflow-hidden rounded-lg">
                        <Image
                           src={post.image || "/images/default-placeholder.png"}
                           alt={parsedTitle ? parsedTitle.title : "게시글 이미지"}
                           width={600}
                           height={400}
                           className="w-full h-full object-cover rounded-lg"
                        />
                     </div>

                     {/* 모집 정보 */}
                     <div className="w-full md:w-[55%] space-y-4">
                        <div className="flex justify-between text-gray-900 font-semibold">
                           <span>참여 요금:</span>
                           <span>{getFieldValue(parsedTitle?.fee, "무료")} 원</span>
                        </div>
                        <div className="flex justify-between text-gray-900 font-semibold">
                           <span>인원 수:</span>
                           <span>{getFieldValue(parsedTitle?.people, 1)} 명</span>
                        </div>
                        <div className="flex justify-between text-gray-900 font-semibold">
                           <span>모집 상태:</span>
                           <span className={`${parsedTitle?.status === "모집중" ? "text-green-600" : "text-red-600"} font-semibold`}>
                              {getFieldValue(parsedTitle?.status, "모집 상태 없음")}
                           </span>
                        </div>
                        <div className="flex justify-between text-gray-900 font-semibold">
                           <span>모집 시작일:</span>
                           <span>{formatDate(parsedTitle?.date)}</span>
                        </div>
                        <div className="flex justify-between text-gray-900 font-semibold">
                           <span>모집 마감일:</span>
                           <span>{formatDate(parsedTitle?.endDate)}</span>
                        </div>
                     </div>
                  </div>

                  {/* 본문 내용 */}
                  <div className="mt-8 text-gray-700 leading-relaxed whitespace-pre-line">
                     {parsedTitle ? parsedTitle.content : post.content}
                  </div>

                  {/* 돌아가기 버튼 */}
                  <div className="mt-6">
                     <button
                        onClick={() => router.back()}
                        className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg shadow hover:bg-gray-400 transition">
                        ◀ 돌아가기
                     </button>
                  </div>
               </div>
            ) : (
               <p className="text-gray-500 text-center">게시글을 찾을 수 없습니다.</p>
            )}
         </div>
         <Footer />
      </div>
   );
}
