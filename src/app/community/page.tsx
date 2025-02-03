"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { getPostsByChannel } from "@/utils/postapi";
import { AxiosResponse } from "axios";

interface Post {
   _id: string;
   title: string;
   image?: string;
   content: string;
   createdAt: string;
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
            setPosts(response.data);
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
         return JSON.parse(title);
      } catch (error) {
         console.error("Error parsing title:", error);
         return { title: "제목 없음", body: "내용 없음" };
      }
   };

   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
   const totalPages = Math.ceil(posts.length / postsPerPage);

   return (
      <div className="min-h-screen flex flex-col">
         <Header />
         <div className="relative">
            <Image
               width={0}
               height={0}
               sizes="100vw"
               src="/images/community/banner.png"
               alt="banner"
               className="w-full h-[392px] object-cover"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
               <p className="text-[36px] font-medium">함께하는 여행, 특별한 동행</p>
               <h2 className="text-[48px] font-semibold mt-2">강원도 여행 동행 모집</h2>
            </div>
         </div>
         <div className="max-w-[1280px] w-full mx-auto px-4 py-10">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-[32px] font-semibold text-gray-800">📌 여행 동행 모집 게시판</h3>
               {isLoggedIn && (
                  <button
                     onClick={() => router.push(`/community/write?channelId=${channelId}`)}
                     className="w-[200px] h-[50px] bg-orange-500 hover:bg-orange-600 transition text-white text-[18px] font-semibold rounded-xl shadow-md">
                     ✏️ 글 작성하기
                  </button>
               )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {loadingPosts ? (
                  <p className="text-gray-500 text-center w-full">게시글을 불러오는 중...</p>
               ) : currentPosts.length > 0 ? (
                  currentPosts.map((post, index) => {
                     const parsedTitle = parseTitle(post.title);
                     return (
                        <div
                           key={`${post._id}-${index}`}
                           className="border rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition">
                           {post.image && (
                              <Image
                                 src={post.image || "/images/break.png"}
                                 alt={parsedTitle.title}
                                 width={300}
                                 height={200}
                                 className="rounded-lg object-cover w-full"
                              />
                           )}
                           <h3 className="text-xl font-bold mt-4 text-gray-900">{parsedTitle.title}</h3>
                           <p className="text-gray-500 text-sm mt-2">작성일 {new Date(post.createdAt).toLocaleDateString()}</p>
                           <p className="mt-3 text-gray-700 line-clamp-2">{parsedTitle.body}</p>
                           <button
                              onClick={() => router.push(`/community/post/${post._id}`)}
                              className="block text-center bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-lg w-full font-medium transition mt-4">
                              자세히 보기
                           </button>
                        </div>
                     );
                  })
               ) : (
                  <p className="text-gray-500 text-center w-full">등록된 게시글이 없습니다.</p>
               )}
            </div>
            {totalPages > 1 && (
               <div className="flex justify-center mt-8 space-x-4">
                  {[...Array(totalPages)].map((_, i) => (
                     <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 rounded-lg ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                     >
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