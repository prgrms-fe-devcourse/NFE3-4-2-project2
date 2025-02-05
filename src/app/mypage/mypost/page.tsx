"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPostsByAuthor } from "@/utils/postapi"; // getPostsByAuthor 호출
import { AxiosResponse } from "axios";

// 게시글 인터페이스
interface Post {
   _id: string;
   title: string; // 제목
   image?: string; // 이미지 URL
   content: string; // 내용
   createdAt: string; // 작성일
   status: string; // 모집 상태 (모집중, 모집마감)
   endDate: string; // 마감일
   authorId: string; // 작성자 ID
}

export default function MyPost() {
   const router = useRouter();
   const [posts, setPosts] = useState<Post[]>([]); // 게시글 목록 상태
   const [loadingPosts, setLoadingPosts] = useState(false); // 로딩 상태

   useEffect(() => {
      const userId = localStorage.getItem("userId");

      if (userId) {
         fetchPosts(userId); // 게시글 불러오기
      }
   }, []);

   // 사용자 게시글을 가져오는 함수
   const fetchPosts = async (userId: string) => {
      setLoadingPosts(true);
      try {
         const response: AxiosResponse<Post[]> = await getPostsByAuthor(userId); // getPostsByAuthor API 호출
         setPosts(response.data); // 사용자 게시글 설정
      } catch (error) {
         console.error("❌ 게시글 불러오기 실패:", error);
      } finally {
         setLoadingPosts(false);
      }
   };

   // title을 파싱하여 실제 제목을 가져오는 함수
   const getTitle = (title: string) => {
      try {
         const parsed = JSON.parse(title); // title을 파싱하여 JSON 객체로 변환
         return parsed.title || "제목 없음"; // 파싱된 제목 반환
      } catch (error) {
         console.error("Error parsing title:", error);
         return "제목 없음"; // 파싱 실패 시 기본값
      }
   };

   return (
      <div className="p-6 bg-white shadow rounded-lg w-full">
         <h2 className="text-xl font-bold">🌟 내가 작성한 글</h2>

         <div className="w-full mx-auto px-4 py-6 flex-1">
            {loadingPosts ? (
               <p className="text-gray-500 text-center">게시글을 불러오는 중...</p>
            ) : posts.length > 0 ? (
               <div className="space-y-4">
                  {posts.map((post) => (
                     <div
                        key={post._id}
                        onClick={() => router.push(`/community/post/${post._id}`)} // 게시글 클릭 시 상세 페이지로 이동
                        className="border p-4 rounded-md flex items-center gap-4 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-start space-x-4">
                           {/* 게시글 이미지 */}
                           {post.image && (
                              <div className="w-20 h-20 relative rounded-md overflow-hidden">
                                 <img
                                    src={post.image || "/images/no_img.jpg"}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                 />
                              </div>
                           )}

                           {/* 게시글 제목, 작성일 */}
                           <div className="flex-grow">
                              <h3 className="text-xl font-semibold text-gray-800 mt-2 mb-4">{getTitle(post.title)}</h3>
                              <p className="text-sm text-gray-500">
                                 작성일 : {new Date(post.createdAt).toLocaleDateString()}
                              </p>
                           </div>

                           {/* 모집 상태 버튼 */}
                           <div className="flex items-center justify-end">
                              {post.status && (
                                 <button
                                    className={`py-1 px-3 rounded-md text-sm font-semibold ${
                                       post.status === "모집중"
                                          ? "bg-green-50 text-sky-500 hover:bg-amber-50 outline outline-1 outline-sky-500"
                                          : post.status === "모집마감"
                                          ? "bg-neutral-300 text-neutral-500 outline outline-1 outline-neutral-500 cursor-not-allowed"
                                          : "bg-gray-200 text-gray-500"
                                    }`}>
                                    {post.status}
                                 </button>
                              )}
                           </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{post.content}</p>
                     </div>
                  ))}
               </div>
            ) : (
               <div className="flex flex-col items-center justify-center my-auto">
                  <p className="text-gray-500 text-center">등록된 게시글이 없습니다.</p>
               </div>
            )}
         </div>
      </div>
   );
}
