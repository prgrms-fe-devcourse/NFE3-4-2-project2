"use client";

import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/redux/store";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer"; // 무한 스크롤 감지
import CalcCreateTimeToLocalTime from "@/components/CalcCreateTimeToLocalTime";
import { Post } from "@/types/PostType";

const url = process.env.NEXT_PUBLIC_BASIC_URL;

export default function QnaPage() {
  const router = useRouter();
  const { ref, inView } = useInView({ threshold: 0.5 }); // 마지막 요소 감지

  const { isAuth, userId } = useAppSelector((state) => state.authReducer.value);
  const [posts, setPosts] = useState<Post[]>([]);
  const [likePosts, setLikePosts] = useState<Set<string>>(new Set());
  const [offset, setOffset] = useState(0);
  const [isFetching, setIsFetching] = useState(false); // 로딩 상태 관리
  const [searchInput, setSearchInput] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]); // 필터링된 게시글 상태



  // JSON 파싱 함수
  const parserJson = (data: string, name: string) => {
    try {
      const dataJson = JSON.parse(data);
      return name === "title" ? dataJson.title : dataJson.content;
    } catch {
      return "";
    }
  };

  const searchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
 }
  // 좋아요 핸들러
  const likesPostHandler = async (id: string) => {
    if (likePosts.has(id)) return alert("이미 좋아요를 눌렀습니다.");

    try {
      const response = await axios.post(`${url}/likes/create`, { postId: id });
      if (response.status === 200) {
        setLikePosts((prev) => new Set([...prev, id])); // 좋아요 상태 업데이트
        setFilteredPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === id ? { ...post, likes: [...post.likes, userId] } : post
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 게시글 목록 불러오기
  const postListHandler = async () => {
    if (isFetching) return; // 중복 요청 방지
    setIsFetching(true);

    try {
      const response = await axios.get(
        `${url}/posts/channel/679ce5308b8d584759230494`,
        {
          params: { offset, limit: 5 },
        }
      );

      if (response.status === 200) {
        setPosts((prev) => [...prev, ...response.data]);
        setFilteredPosts((prev) => [...prev, ...response.data]) // 기존 데이터에 추가
        setOffset((prev) => prev + 5); // offset 증가
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const searchPostListHandler = async() => {
    if (!searchInput.trim()) {
      setFilteredPosts(posts); // 검색어가 없으면 전체 게시글 보여줌
    } else {
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(searchInput.trim().toLowerCase())
      );
      setFilteredPosts(filtered);
      
    }
  }
  const postDeleteHandler = async (id: string) => {
    try {
      const response = await axios.delete(`${url}/posts/delete`, {
        data: { id }, // 'data' 속성 안에 객체를 넣어야 합니다.
      });
      if (response.status === 200) {
        console.log(filteredPosts)
        console.log(id)
        setPosts(() => posts.filter((post) => post._id !== id));
        
        setFilteredPosts(() => posts.filter((post) => post._id !== id));
        console.log(filteredPosts)
      }
    } catch (error) {
      console.error(error);
    }
  };
  // `inView`가 true일 때 추가 데이터 로드
  useEffect(() => {
    if (inView && !isFetching) {
      postListHandler();
    }
  }, [inView]);
 
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 flex flex-col gap-12">
        <div className="flex flex-col items-center gap-6">
          <h3 className="lg:text-3xl tracking-wide text-xl sm:text-2xl font-light">
            <span className="font-semibold">
              총 <span className="text-[#B23742]">{filteredPosts.length}</span>개
            </span>
            의 글이 등록되어 있습니다.
          </h3>
          <div className=" md:flex md:flex-row gap-3 justify-center w-full flex flex-col   items-center">
            <div className=" md:w-80 w-full">
              <select className=" bg-[#F7F7F7] p-3 box-border w-full md:w-80 h-12 rounded-md">
                <option value="">제목</option>
              </select>
            </div>
            <div className="w-full ">
              <input
                onChange={(e)=>searchChange(e)}
                placeholder="검색어를 입력해주세요"
                className=" bg-[#F7F7F7] p-3 box-border h-12 w-full rounded-md"
                type="text"
              />
            </div>
            <div className="w-full md:w-24">
              <button onClick={()=>searchPostListHandler()} className="w-full md:w-24 py-3 rounded-lg text-white h-full bg-[#B23742] ">
                {" "}
                검색
              </button>
            </div>
          </div>
          {isAuth && (
            <div className="flex  justify-end w-full">
              <button
                onClick={() => router.push("qna/submit")}
                className="w-full h-10 hover:bg-[#ac464fbe] transition-all bg-[#B23742] text-white rounded-md"
              >
                글쓰기
              </button>
            </div>
          )}
        </div>

        {/* 게시글 목록 */}
        <div className="space-y-6">
        {filteredPosts.length === 0 ? (
            <div>검색 결과가 없습니다.</div>
          ) : (
            filteredPosts.map((post, index) => (
              <div
                key={post._id + index}
                className="bg-white relative shadow-lg hover:scale-105 transition-all rounded-lg p-6"
              >
                <div
                  className="cursor-pointer"
                  onClick={() => router.push(`qna/detail/${post._id}`)}
                >
                  <div className=" flex justify-between">
                    <h2 className="text-xl truncate font-semibold text-gray-800">
                      {parserJson(post.title, "title")}
                    </h2>
                  </div>
                  <p className="mt-2 truncate text-gray-600">
                    {parserJson(post.title, "content")}
                  </p>
                  <div className="mt-4 pb-9 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      작성자: {post.author.email}
                    </span>
                    <div className="text-sm text-gray-500">
                      {CalcCreateTimeToLocalTime(post.createdAt)}
                    </div>
                  </div>
                </div>

                <div className="mt-4 absolute bottom-3 left-5 gap-5 z-40 flex items-center">
                  <button
                    disabled={!isAuth}
                    onClick={() => likesPostHandler(post._id)}
                    className={`flex items-center text-gray-500 ${
                      isAuth ? "hover:text-red-500" : ""
                    } focus:outline-none`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={likePosts.has(post._id) ? "red" : "none"}
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke={likePosts.has(post._id) ? "red" : "currentColor"}
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                    <span className="ml-1">{post.likes.length}</span>
                  </button>
                  <div className="flex items-center text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                      />
                    </svg>
                    <span className="ml-1">{post.comments.length}</span>
                  </div>
                  {userId === post.author._id && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`qna/update/${post._id}`)}
                      >
                        수정
                      </button>
                      <button onClick={() => postDeleteHandler(post._id)}>
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div ref={ref}></div>
    </div>
  );
}
