"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { getPostById, updatePost } from "@/utils/postapi";
import { checkAuthUser } from "@/utils/authapi"; // 인증 확인 함수 임포트
import { AxiosResponse } from "axios";

interface Post {
   _id: string;
   title: string;
   content: string;
   fee: number | string;
   people: number;
   status: string; // 모집 상태 (모집중, 모집마감)
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

export default function EditPostPage() {
   const router = useRouter();
   const { postId } = useParams();
   const searchParams = useSearchParams();
   const channelId = searchParams.get("channelId") || "679f3aba7cd28d7700f70f40"; // 기본값 설정
   console.log("Received channelId:", channelId); // URL에서 받은 channelId 확인

   const [post, setPost] = useState<Post | null>(null);
   const [title, setTitle] = useState<string>("");
   const [content, setContent] = useState<string>("");
   const [fee, setFee] = useState<number | "">("");
   const [people, setPeople] = useState<number>(1);
   const [date, setDate] = useState<string>("");
   const [endDate, setEndDate] = useState<string>("");
   const [image, setImage] = useState<File | null>(null);
   const [preview, setPreview] = useState<string | null>(null);
   const [loading, setLoading] = useState<boolean>(false);

   // 로그인 상태 확인
   useEffect(() => {
      const checkLogin = async () => {
         try {
            const response = await checkAuthUser();
            if (!response.data) {
               alert("로그인이 필요합니다.");
               router.push("/auth/login");
            }
         } catch (error) {
            console.error("로그인 확인 실패:", error);
            router.push("/auth/login");
         }
      };

      checkLogin(); // 로그인 상태 확인 함수 호출
   }, [router]);

   // 게시글 데이터 불러오기
   useEffect(() => {
      if (!postId) return;

      const fetchPostData = async () => {
         try {
            const response: AxiosResponse<Post> = await getPostById(postId);
            setPost(response.data);

            // title이 JSON 문자열이므로 파싱해야 함
            const parsedTitle = JSON.parse(response.data.title);

            setTitle(parsedTitle.title);
            setContent(parsedTitle.content);
            setFee(parsedTitle.fee);
            setPeople(parsedTitle.people);
            setDate(parsedTitle.date);
            setEndDate(parsedTitle.endDate);
            setPreview(response.data.image || "");
         } catch (error) {
            console.error("게시글 불러오기 실패:", error);
         }
      };
      fetchPostData();
   }, [postId]);

   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         setImage(file);
         const objectUrl = URL.createObjectURL(file);
         setPreview(objectUrl);
      }
   };

   // 모집 상태 자동 설정 함수
   const getStatus = (endDate: string) => {
      const today = new Date();
      const end = new Date(endDate);
      return today > end ? "모집마감" : "모집중";
   };

   // 수정 제출 처리
   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      console.log("channelId:", channelId);
      if (!title || !content || loading || fee === "" || !date || !endDate || !channelId) {
         alert("필수 항목을 모두 채워주세요.");
         return;
      }

      const status = getStatus(endDate);

      setLoading(true);
      try {
         const token = localStorage.getItem("accessToken");

         // 토큰이 없으면 로그인 페이지로 리다이렉트
         if (!token) {
            alert("로그인이 필요합니다.");
            router.push("/auth/login");
            return;
         }

         // title에 포함된 데이터를 JSON 문자열로 변환하여 API로 전달
         const postData = {
            title,
            content,
            fee,
            people,
            status, // 모집 상태
            date, // 모집 시작일
            endDate, // 모집 마감일
         };

         const imageToDeletePublicId = null;
         
         // 수정된 게시글 데이터를 업데이트
         const response = await updatePost(
            postId as string,
            title,
            content,
            fee,
            people,
            status,
            date,
            endDate,
            image,
            imageToDeletePublicId, // 이미지 삭제할 publicId (없으면 null)
            channelId, // 수정된 채널 ID를 전달
            token,
         );
         if (response.status === 200) {
            alert("게시글이 수정되었습니다.");
            router.push(`/community/post/${postId}`); // 수정된 게시글 상세 페이지로 이동
         } else {
            throw new Error("게시글 수정 실패");
         }
      } catch (error) {
         console.error("게시글 수정 실패:", error);
         alert("게시글 수정에 실패했습니다.");
      } finally {
         setLoading(false);
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
               <h2 className="text-[36px] font-semibold mt-2">동행 모집 수정</h2>
            </div>
         </div>
         <div className="max-w-4xl w-full mx-auto px-6 py-10 bg-white rounded-lg shadow-md mb-10">
            {post ? (
               <>
                  {/* 제목, 내용 수정 폼 */}
                  <div className="mb-6">
                     <label className="block text-lg font-semibold">제목</label>
                     <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md"
                     />
                  </div>
                  <div className="mb-6">
                     <label className="block text-lg font-semibold">내용</label>
                     <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md h-40"
                     />
                  </div>
                  <div className="mb-6">
                     <label className="block text-lg font-semibold">참여 요금</label>
                     <input
                        type="number"
                        value={fee}
                        onChange={(e) => setFee(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-md"
                     />
                  </div>
                  <div className="mb-6">
                     <label className="block text-lg font-semibold">인원 수</label>
                     <input
                        type="number"
                        value={people}
                        onChange={(e) => setPeople(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-md"
                     />
                  </div>
                  <div className="mb-6">
                     <label className="block text-lg font-semibold">모집 시작일</label>
                     <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md"
                     />
                  </div>
                  <div className="mb-6">
                     <label className="block text-lg font-semibold">모집 마감일</label>
                     <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md"
                     />
                  </div>
                  <div className="mb-6">
                     <label className="block text-lg font-semibold">이미지 업로드</label>
                     <input
                        type="file"
                        onChange={handleImageUpload}
                        className="w-full p-3 border border-gray-300 rounded-md"
                     />
                     {preview && <Image src={preview} alt="미리보기" width={300} height={200} className="mt-2" />}
                  </div>

                  {/* 수정 완료 버튼 */}
                  <button
                     onClick={handleSubmit}
                     disabled={loading || !title || !content || !fee || !people || !date || !endDate || !channelId}
                     className={`w-full p-4 text-lg font-semibold rounded-md ${
                        loading ? "bg-gray-300 cursor-not-allowed" : "bg-sky-500 text-white"
                     }`}>
                     {loading ? "수정 중..." : "수정 완료"}
                  </button>
               </>
            ) : (
               <p className="text-center">게시글을 불러오는 중...</p>
            )}
         </div>
         <Footer />
      </div>
   );
}
