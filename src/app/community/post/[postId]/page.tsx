"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { getPostById, deletePost } from "@/utils/postapi"; // deletePost 함수 추가
import { AxiosResponse } from "axios";
import { checkAuthUser } from "@/utils/authapi";

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
      _id: string;
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
   const [isAuthor, setIsAuthor] = useState(false);

   // 로그인된 사용자와 게시글 작성자 비교하는 useEffect
   useEffect(() => {
      if (typeof window !== "undefined") {
         const token = localStorage.getItem("accessToken");

         if (token) {
            const fetchUserData = async () => {
               try {
                  const response = await checkAuthUser();
                  if (response.data) {
                     const currentUserId = response.data._id;
                     if (currentUserId && post?.author._id === currentUserId) {
                        setIsAuthor(true);
                     }
                  }
               } catch (error) {
                  console.error("로그인 확인 실패:", error);
               }
            };
            fetchUserData();
         }
      }
   }, [post]);

   // 게시글 데이터 가져오기
   useEffect(() => {
      if (!postId) return;

      const fetchPost = async () => {
         try {
            const response: AxiosResponse<Post> = await getPostById(postId);
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
         return {
            title: "제목 없음",
            content: "내용 없음",
            fee: "정보 없음",
            people: 1,
            status: "정보 없음",
            date: "",
            endDate: "",
         };
      }
   };

   const parsedTitle = post ? parseTitle(post.title) : null;

   const getFieldValue = (value: any, fallback: string | number = "정보 없음") => {
      if (value === undefined || value === null || value === "") return fallback;
      return value;
   };

   const handleDelete = async () => {
      if (!post) return;

      const confirmDelete = window.confirm("정말로 이 게시글을 삭제하시겠습니까?");
      if (!confirmDelete) return;

      try {
         const token = localStorage.getItem("accessToken");
         if (!token) {
            alert("로그인이 필요합니다.");
            return;
         }

         const response = await deletePost(post._id, token);

         if (response.status === 200) {
            alert("게시글이 삭제되었습니다.");
            router.push("/community");
         } else {
            alert("게시글 삭제에 실패했습니다.");
         }
      } catch (error) {
         console.error("❌ 게시글 삭제 실패:", error);
         alert("게시글 삭제에 실패했습니다.");
      }
   };

   return (
      <div className="min-h-screen flex flex-col bg-gray-50">
         <Header />
         <div className="relative mb-10">
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
               <h2 className="text-[36px] font-semibold mt-2">동행 모집</h2>
            </div>
         </div>
         <div className="max-w-4xl w-full mx-auto px-6 py-10 bg-white rounded-lg shadow-md mb-10">
            {loading ? (
               <p className="text-gray-500 text-center">게시글을 불러오는 중...</p>
            ) : post ? (
               <>
                  {/* 제목, 작성자 정보, 작성일 */}
                  <div className="flex justify-between items-center mb-6">
                     <h1 className="text-3xl font-semibold text-gray-800">{parsedTitle ? parsedTitle.title : "제목 없음"}</h1>
                  </div>

                  {/* 작성자 정보 */}
                  <div className="text-gray-500 text-sm mb-4">
                     <p>
                        <strong>작성자:</strong> {post.author.fullName} ({post.author.email})
                     </p>
                  </div>

                  {/* 게시글 작성일 */}
                  <div className="text-gray-500 text-sm mb-6">
                     <p>
                        <strong>작성일:</strong> {formatDate(post.createdAt)}
                     </p>
                  </div>

                  {/* 이미지 & 정보 섹션 */}
                  <div className="flex flex-wrap md:flex-nowrap gap-6 mb-8">
                     {/* 이미지 */}
                     <div className="w-full md:w-[40%] h-[300px] overflow-hidden rounded-lg">
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
                           <span
                              className={`${
                                 parsedTitle?.status === "모집중" ? "text-green-600" : "text-red-600"
                              } font-semibold`}>
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
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line mb-8">
                     {parsedTitle ? parsedTitle.content : post.content}
                  </div>

                  {/* 돌아가기 버튼 */}
                  <div className="flex justify-between items-center">
                     <button
                        onClick={() => router.back()}
                        className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg shadow hover:bg-gray-400 transition">
                        목록보기
                     </button>

                     {/* 수정, 삭제 버튼 (작성자만 보이게) */}
                     {isAuthor && (
                        <div className="flex gap-4">
                           <button
                              onClick={() => router.push(`/community/edit/${post._id}`)}
                              className="bg-transparent border-2 border-sky-500 text-sky-500 px-4 py-2 rounded-lg shadow hover:bg-sky-500 hover:text-white transition">
                              수정
                           </button>
                           <button
                              onClick={handleDelete}
                              className="bg-transparent border-2 border-red-500 text-red-500 px-4 py-2 rounded-lg shadow hover:bg-red-500 hover:text-white transition">
                              삭제
                           </button>
                        </div>
                     )}
                  </div>
               </>
            ) : (
               <p className="text-gray-500 text-center">게시글을 찾을 수 없습니다.</p>
            )}
         </div>
         <Footer />
      </div>
   );
}
