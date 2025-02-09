"use client";

import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import PostList from "@/components/common/Community/PostList";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { getPostsByChannel } from "@/utils/postapi";


export interface Post {
   _id: string;
   title: string;
   image?: string;
   content: string;
   createdAt: string;
   status: string;
   endDate: string;
}

export default function Community() {
   const router = useRouter();
   const [posts, setPosts] = useState<Post[]>([]);
   const [loadingPosts, setLoadingPosts] = useState(false);
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const postsPerPage = 9;
   const channelId = "679f3aba7cd28d7700f70f40";

   useEffect(() => {
      const fetchPosts = async () => {
         setLoadingPosts(true);
         try {
            const response: AxiosResponse<Post[]> = await getPostsByChannel(channelId);
            const sortedPosts = response.data.sort((a, b) => {
               const statusA = parseTitle(a.title);
               const statusB = parseTitle(b.title);

               if (statusA === "모집중" && statusB !== "모집중") return -1;
               if (statusB === "모집중" && statusA !== "모집중") return 1;
               return 0;
            });

            setPosts(sortedPosts);
         } catch (error) {
            console.error("❌ 게시글 불러오기 실패:", error);
         } finally {
            setLoadingPosts(false);
         }
      };
      fetchPosts();

      const token = localStorage.getItem("accessToken");
      setIsLoggedIn(!!token);
   }, []);

   const parseTitle = (title: string) => {
      try {
         const parsed = JSON.parse(title);
         return parsed.status;
      } catch (error) {
         console.error("Error parsing title:", error);
         return "정보 없음";
      }
   };

   const totalPages = Math.ceil(posts.length / postsPerPage);

   return (
      <div>
         <Header />
         <div className="h-[480px] pt-40 bg-[url(/images/community/banner_together.png)] bg-cover bg-center">
            <div className="relative flex flex-col justify-center gap-10">
               <div className="text-white text-center">
                  <h2 className="font-bold mt-20 leading-loose">
                     <span className="text-4xl block mb-5">함께하는 여행, 특별한 순간</span>
                     <span className="text-5xl block">강원도에서 만나는 새로운 동행</span>
                  </h2>
               </div>
            </div>
         </div>

         <div className="max-w-[1280px] min-h-[700px] w-full mx-auto px-2 py-16 flex-1">
            <div className="flex justify-between items-center py-6 mb-12 px-8">
               {/* 제목 섹션 */}
               <div className="flex items-center gap-4">
                  <div className="bg-sky-100 text-sky-500 p-3 rounded-full shadow">
                     <i className="bi bi-people-fill text-4xl"></i>
                  </div>
                  <div>
                     <h3 className="text-3xl font-bold text-gray-900">여행 동행 모집 게시판</h3>
                     <p className="text-gray-500 text-lg">같이 떠날 동행을 찾고, 여행을 함께 만들어 보세요!</p>
                  </div>
               </div>

               {/* 글쓰기 버튼 */}
               {isLoggedIn && (
                  <button
                     onClick={() => router.push(`/community/write?channelId=${channelId}`)}
                     className="flex items-center gap-3 bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 transition text-white text-lg font-semibold rounded-full px-6 py-3 shadow-lg">
                     <i className="bi bi-pencil-square text-xl"></i> 글쓰기
                  </button>
               )}
            </div>

            <PostList posts={posts} loadingPosts={loadingPosts} currentPage={currentPage} postsPerPage={postsPerPage} />

            {totalPages > 1 && (
               <div className="flex justify-center mt-8 space-x-4">
                  {[...Array(totalPages)].map((_, i) => (
                     <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 rounded-lg ${
                           currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}>
                        {i + 1}
                     </button>
                  ))}
               </div>
            )}
         </div>
         <Footer />
      </div>
   );
}
