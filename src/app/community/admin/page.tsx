"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { createPost, getChannels } from "@/utils/postapi";
import { AxiosResponse, AxiosError } from "axios";

export default function AdminPage() {
   const router = useRouter();
   const [channelId, setChannelId] = useState<string | null>(null);
   const [loadingChannel, setLoadingChannel] = useState(true);
   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [image, setImage] = useState<File | null>(null);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const fetchChannels = async () => {
         try {
            const response: AxiosResponse<{ _id: string; name: string }[]> = await getChannels();
            const channels = response.data;
            const targetChannel = channels.find((ch) => ch._id === "679f3aba7cd28d7700f70f40");
            if (targetChannel) {
               setChannelId(targetChannel._id);
            } else {
               alert("여행 동행 모집 채널이 존재하지 않습니다. 관리자에게 문의하세요.");
            }
         } catch (error) {
            console.error("❌ 채널 목록 불러오기 실패:", error);
         } finally {
            setLoadingChannel(false);
         }
      };
      fetchChannels();
   }, []);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!title || !content || !channelId || loading) return;

      setLoading(true);
      try {
         const formData = new FormData();
         formData.append("title", title);
         formData.append("content", content);
         formData.append("channelId", channelId);
         if (image) formData.append("image", image);

         await createPost(title, image, channelId, "admin_token");
         alert("채널이 성공적으로 생성되었습니다.");
         router.push(`/admin/channels`);
      } catch (error) {
         const axiosError = error as AxiosError;
         console.error("❌ 오류:", axiosError);
         alert(axiosError.response?.data?.message || axiosError.message || "채널 생성 중 오류가 발생했습니다.");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="min-h-screen flex flex-col">
         <Header />

         {loadingChannel ? (
            <div className="flex justify-center items-center min-h-[500px]">
               <p className="text-gray-500 text-lg">채널을 불러오는 중입니다...</p>
            </div>
         ) : (
            <>
               <div className="relative">
                  <div className="absolute top-1/2 left-12 transform -translate-y-1/2 text-white text-left">
                     <p className="text-[28px] font-medium">관리자 전용 채널 생성</p>
                     <h2 className="text-[36px] font-semibold mt-2">새로운 채널 추가</h2>
                  </div>
               </div>

               <div className="max-w-[800px] w-full mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg mb-16">
                  <button onClick={() => router.back()} className="mb-4 text-blue-500 hover:underline">
                     ◀ 채널 목록
                  </button>

                  <div className="mb-4">
                     <label className="block text-lg font-semibold">채널 이름 *</label>
                     <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                     />
                  </div>

                  <div className="mb-4">
                     <label className="block text-lg font-semibold">채널 설명 *</label>
                     <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md h-40"
                        required
                     />
                  </div>

                  <button
                     onClick={handleSubmit}
                     disabled={!title || !content || !channelId || loading}
                     className={`w-full p-4 text-lg font-semibold rounded-md ${
                        loading ? "bg-gray-300 cursor-not-allowed" : "bg-sky-500 text-white"
                     }`}>
                     {loading ? "생성 중..." : "채널 생성"}
                  </button>
               </div>
            </>
         )}

         <Footer />
      </div>
   );
}
