"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { getPostById, deletePost, createComment, deleteComment } from "@/utils/postapi";
import { AxiosResponse } from "axios";
import { checkAuthUser } from "@/utils/authapi";
import { useSearchParams } from "next/navigation"; // useSearchParams 추가

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
   comments?: CommentResponse[];
   channelId?: string;
}

interface CommentResponse {
   _id: string;
   author: { _id: string; fullName: string; username: string };
   comment: string;
   createdAt: string;
}

export default function PostDetail() {
   const router = useRouter();
   const params = useParams();
   const postId = params?.postId as string;
   const searchParams = useSearchParams(); // searchParams를 사용하여 URL 파라미터 가져오기
   const channelId = searchParams.get("channelId") || "679f3aba7cd28d7700f70f40"; // 기본값 설정

   const [post, setPost] = useState<Post | null>(null);
   const [loading, setLoading] = useState(true);
   const [isAuthor, setIsAuthor] = useState(false);
   const [comments, setComments] = useState<CommentResponse[]>([]);
   const [commentContent, setCommentContent] = useState<string>("");

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

   // 게시글 데이터와 댓글 가져오기
   useEffect(() => {
      if (!postId) return;

      const fetchPost = async () => {
         try {
            const response: AxiosResponse<Post> = await getPostById(postId);
            setPost(response.data);
            setComments(response.data.comments || []); // 댓글 가져오기
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
         return JSON.parse(title); // title을 파싱하여 JSON 객체로 변환
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
         }; // 파싱 실패 시 기본 값 반환
      }
   };

   const parsedTitle = post ? parseTitle(post.title) : null;

   const getFieldValue = (value: string | number | undefined, fallback: string | number = "정보 없음") => {
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

   const handleCommentSubmit = async () => {
      if (commentContent.trim()) {
         const token = localStorage.getItem("accessToken");

         if (!token) {
            alert("로그인이 필요합니다.");
            router.push("/auth/login");
            return;
         }

         try {
            // 댓글 작성 API 호출
            const response: AxiosResponse<CommentResponse> = await createComment(commentContent, postId, token);

            if (!response.data) {
               alert("댓글 저장에 실패했습니다.");
               return;
            }

            console.log("서버 응답:", response.data); // 서버 응답 확인

            // 댓글 내용 초기화
            setCommentContent("");

            // 새로 작성된 댓글을 댓글 목록에 바로 추가
            setComments((prevComments) => [
               ...prevComments,
               {
                  _id: response.data._id,
                  author: { _id: response.data.author._id, fullName: response.data.author.fullName, username: response.data.author.username }, // 댓글 작성자 ID 추가
                  comment: response.data.comment, // 댓글 내용
                  createdAt: response.data.createdAt, // 댓글 작성 시간
               },
            ]);
         } catch (error) {
            console.error("❌ 댓글 작성 실패:", error);
            alert("댓글 작성에 실패했습니다.");
         }
      } else {
         alert("댓글 내용을 입력해주세요.");
      }
   };

   // 댓글 삭제
   const handleDeleteComment = async (commentId: string, authorId: string) => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
         alert("로그인이 필요합니다.");
         return;
      }

      // 현재 로그인된 사용자 ID를 가져옴
      const storedUserId = localStorage.getItem("userId");

      if (!storedUserId) {
         alert("사용자 정보가 없습니다.");
         return;
      }

      const currentUserId = storedUserId;

      if (authorId !== currentUserId) {
         alert("본인이 작성한 댓글만 삭제할 수 있습니다.");
         return;
      }

      try {
         // 댓글 삭제 API 호출
         const response = await deleteComment(commentId, token);

         // 댓글 삭제 성공 후 목록에서 제거
         if (response.status === 200) {
            setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
         } else {
            alert("댓글 삭제에 실패했습니다.");
         }
      } catch (error) {
         console.error("❌ 댓글 삭제 실패:", error.response ? error.response.data : error.message);
         alert("댓글 삭제에 실패했습니다.");
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
                     <h1 className="text-3xl font-semibold text-gray-800">
                        {parsedTitle ? parsedTitle.title : "제목 없음"}
                     </h1>
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
                           src={post.image || "/images/no_img.jpg"}
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
                              {parsedTitle?.status}
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
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line mb-12">
                     {parsedTitle ? parsedTitle.content : post.content}
                  </div>
                  {/* 돌아가기 버튼 */}
                  <div className="flex justify-between items-center mb-4">
                     {/* 수정, 삭제 버튼 (작성자만 보이게) */}
                     {isAuthor && (
                        <div className="flex gap-4">
                           <button
                              onClick={() => router.push(`/community/edit/${post._id}?channelId=${channelId}`)} // 수정 페이지로 이동
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

                     {/* 목록 보기 버튼 */}
                     <button
                        onClick={() => router.push("/community")} // /community로 이동
                        className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg shadow hover:bg-gray-400 transition">
                        목록보기
                     </button>
                  </div>
                  <hr className="my-8 border-t-2 border-gray-300" />
                  {/* 댓글 입력 */}
                  <div className="mt-14">
                     <label className="block text-lg font-semibold mb-2">Message</label>
                     <div className="flex flex-col gap-4">
                        <textarea
                           value={commentContent}
                           onChange={(e) => setCommentContent(e.target.value)}
                           placeholder="댓글을 입력하세요..."
                           className="w-full p-3 border border-gray-300 rounded-md mb-2"
                        />
                        <button
                           onClick={handleCommentSubmit}
                           className="bg-sky-500 text-white px-6 py-2 rounded-3xl ml-auto">
                           댓글 달기
                        </button>
                     </div>
                  </div>

                  <div className="mt-6">
                     {comments.length > 0 ? (
                        comments.map((comment) => (
                           <div key={comment._id} className="mb-4">
                              <div className="font-semibold text-gray-700">
                                 {/* 댓글 작성자의 username을 표시 */}
                                 {comment.author.username || comment.author.fullName}
                              </div>
                              <p className="text-gray-600">{comment.comment}</p>
                              <span className="text-sm text-gray-400">{formatDate(comment.createdAt)}</span>

                              {/* 댓글 삭제 버튼: 본인 작성 댓글만 보이게 */}
                              {comment.author._id === localStorage.getItem("userId") && (
                                 <button
                                    onClick={() => handleDeleteComment(comment._id, comment.author._id)}
                                    className="text-red-500 text-sm mt-2 mx-2">
                                    삭제
                                 </button>
                              )}
                           </div>
                        ))
                     ) : (
                        <p className="text-center">댓글이 없습니다.</p>
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
