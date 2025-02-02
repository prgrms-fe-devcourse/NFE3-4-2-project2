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
   image?: string;
   content: string;
   createdAt: string;
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
            setPost(response.data);
         } catch (error) {
            console.error("❌ 게시글 불러오기 실패:", error);
         } finally {
            setLoading(false);
         }
      };
      fetchPost();
   }, [postId]);

   return (
      <div className="min-h-screen flex flex-col">
         <Header />
         <div className="max-w-[1200px] w-full mx-auto px-4 py-10">
            {loading ? (
               <p className="text-gray-500 text-center">게시글을 불러오는 중...</p>
            ) : post ? (
               <div className="bg-white p-6 rounded-lg shadow-md">
                  {/* 제목 */}
                  <h1 className="text-[32px] font-bold text-gray-900 mb-6">{post.title}</h1>
                  
                  <div className="flex flex-wrap gap-8">
                     {/* 이미지 */}
                     {post.image && (
                        <div className="w-full sm:w-[40%] h-[400px] overflow-hidden rounded-lg">
                           <Image
                              src={post.image}
                              alt={post.title}
                              width={600}
                              height={400}
                              className="w-full h-full object-cover rounded-lg"
                           />
                        </div>
                     )}
                     
                     {/* 내용 */}
                     <div className="w-full sm:w-[55%]">
                        <p className="text-gray-500 text-sm mb-2">🕒 {new Date(post.createdAt).toLocaleDateString()}</p>
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line">{post.content}</div>
                     </div>
                  </div>
                  
                  {/* 댓글 작성 및 목록 */}
                  <div className="mt-6">
                     <h3 className="text-lg font-semibold">댓글</h3>
                     <textarea
                        placeholder="댓글을 남겨주세요..."
                        className="w-full p-3 border border-gray-300 rounded-md mt-2"
                     />
                     <button
                        onClick={() => {}}
                        className="mt-2 bg-sky-500 text-white px-4 py-2 rounded-md shadow hover:bg-sky-600 transition">
                        댓글 작성
                     </button>

                     {/* 댓글 목록 */}
                     <div className="mt-6">
                        <div className="border-t pt-4">
                           <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                              <div>
                                 <p className="text-sm font-semibold text-gray-900">사용자1</p>
                                 <p className="text-sm text-gray-700">댓글 내용입니다.</p>
                              </div>
                           </div>
                        </div>

                        <div className="border-t pt-4">
                           <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                              <div>
                                 <p className="text-sm font-semibold text-gray-900">사용자2</p>
                                 <p className="text-sm text-gray-700">다른 댓글 내용입니다.</p>
                              </div>
                           </div>
                        </div>
                     </div>
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
