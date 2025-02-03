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
   title: string; // title은 실제 텍스트
   image?: string;
   content: string;
   createdAt: string;
   status: string; // 모집 상태 (모집중, 모집마감)
   endDate: string; // 마감일
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

   // title에서 status만 추출하는 함수
   const parseTitle = (title: string) => {
      try {
         const parsed = JSON.parse(title); // title을 파싱하여 JSON 객체로 변환
         return parsed.status; // status 값만 리턴
      } catch (error) {
         console.error("Error parsing title:", error);
         return "정보 없음"; // 파싱 실패 시 기본값
      }
   };

   const getTitle = (title: string) => {
      try {
         const parsed = JSON.parse(title); // title을 파싱하여 JSON 객체로 변환
         return parsed.title; // 실제 제목만 리턴
      } catch (error) {
         console.error("Error parsing title:", error);
         return "제목 없음"; // 파싱 실패 시 기본값
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
         <div className="max-w-[1280px] w-full mx-auto px-4 py-16">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-[32px] font-semibold text-gray-800">📌 여행 동행 모집 게시판</h3>
               {isLoggedIn && (
                  <button
                     onClick={() => router.push(`/community/write?channelId=${channelId}`)}
                     className="w-[200px] h-[50px] bg-sky-500 hover:bg-sky-600 transition text-white text-[18px] font-semibold rounded-md shadow-md">
                     ✏️ 동행 모집 글 작성하기
                  </button>
               )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {loadingPosts ? (
                  <p className="text-gray-500 text-center w-full">게시글을 불러오는 중...</p>
               ) : currentPosts.length > 0 ? (
                  currentPosts.map((post, index) => {
                     const postStatus = parseTitle(post.title); // title에서 status만 추출
                     const postTitle = getTitle(post.title);
                     return (
                        <div
                           key={`${post._id}-${index}`}
                           className="flex flex-col bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition border border-gray-300 hover:border-sky-500">
                           <div className="w-full h-[200px] relative mb-4">
                              <Image
                                 src={post.image || "/images/break.png"}
                                 alt={post.title}
                                 layout="fill"
                                 objectFit="cover"
                                 className="rounded-md"
                              />
                           </div>
                           <h3 className="text-xl font-bold text-gray-900 mb-2">{postTitle}</h3>
                           <p className="text-gray-500 text-sm mb-2">
                              작성일 {new Date(post.createdAt).toLocaleDateString()}
                           </p>
                           <p className="text-gray-700 text-sm line-clamp-2 mb-4">{post.content}</p>

                           {/* 모집 상태 버튼과 자세히 보기 버튼 나란히 */}
                           <div className="flex justify-between items-center mb-4 gap-4">
                              {postStatus && (
                                 <button
                                    disabled={true} // 클릭 불가
                                    className={`w-[48%] py-1 px-3 rounded-md ${
                                       postStatus === "모집중"
                                          ? "bg-green-50 text-sky-500 hover:bg-amber-50 outline outline-1 outline-sky-500"
                                          : postStatus === "모집마감"
                                          ? "bg-neutral-300 text-neutral-500 outline outline-1 outline-neutral-500 cursor-not-allowed"
                                          : "bg-gray-200 text-gray-500"
                                    } font-semibold`}>
                                    {postStatus}
                                 </button>
                              )}

                              <button
                                 onClick={() => router.push(`/community/post/${post._id}`)}
                                 className="w-[48%] py-1 px-3 rounded-md text-white text-lg font-semibold transition bg-sky-500 hover:bg-sky-600">
                                 자세히 보기
                              </button>
                           </div>
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
