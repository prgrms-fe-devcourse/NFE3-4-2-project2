"use client";


import { useAppSelector } from "@/lib/redux/store";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import CalcCreateTimeToLocalTime from "@/components/CalcCreateTimeToLocalTime";
import { Post } from "@/types/PostType";

const url = process.env.NEXT_PUBLIC_BASIC_URL;
const QnaDetailPage = () => {
  const [detailData, setDetailData] = useState<Post | null>(null);
  const { isAuth } = useAppSelector((state) => state.authReducer.value);
  const [newComment, setNewComment] = useState("");
  const { postId } = useParams();


  const postListHandler = async () => {
    try {
      const response = await axios.get(
        `${url}/posts/channel/679ce5308b8d584759230494`,
        {}
      );

      if (response.status === 200) {
        const data = response.data;
        const filters = data.find((d: Post) => d._id === postId);
        setDetailData(filters);      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };


  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}.${month}.${day}.${hours}:${minutes}`;
  };

  const parserJson = (data: string, name: string) => {
    try {
      const dataJson = JSON.parse(data);
      return name === "title" ? dataJson.title : dataJson.content;
    } catch {
      return "";
    }
  };


  const addComment = async () => {
    if (newComment.trim() === "") return;
    const payload = {
      postId,
      comment: newComment,
    };
    await axios.post(`${url}/comments/create`, payload);
    setNewComment("");
  };


  useEffect(() => {
    postListHandler();
  }, [newComment]);
  return (
    <div className="max-w-4xl mx-auto p-4 pb-32 flex flex-col gap-16">
      <div className="flex flex-col ">
        <h1 className="text-2xl font-bold">
          {detailData ? parserJson(detailData.title, "title") : ""}
        </h1>
        <p className="text-gray-500 pb-3 pt-1 border-b text-sm">
          작성자: {detailData?.author.email} /{" "}
          {detailData ? formatDate(detailData.createdAt) : ""}
        </p>
        <div className="mt-4 bg-[#F6F6F6] p-4 rounded-lg">
          <p className="text-gray-700">
            {detailData ? parserJson(detailData.title, "content") : ""}
          </p>
        </div>
      </div>
      <div className="">
        <div className="flex border-b gap-4">
          <h5 className="text-md text-[#3D3D3D]  py-2 font-semibold">
            댓글{" "}
            <span className="text-[#B23742]">
              {detailData?.comments.length}
            </span>{" "}
          </h5>
          <h5 className="text-md text-[#3D3D3D]  py-2 font-semibold">
            좋아요{" "}
            <span className="text-[#B23742]">{detailData?.likes.length}</span>{" "}
          </h5>
        </div>
        <ul>
          {detailData?.comments.length !== 0 ? detailData?.comments.map((comment) => (
            <li
              key={comment._id}
              className="border-b border-gray-200 py-4 flex items-center justify-start gap-4"
            >
              <div>
                <div className="w-9 h-9 bg-gray-50 border rounded-full"></div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <p className="font-bold text-gray-800">{comment.author.email}</p>
                  <p className="text-gray-600 ">{comment.comment}</p>
                </div>
                <div className="flex gap-2 text-xs">
                  <p className="text-[#959595] font-medium">{CalcCreateTimeToLocalTime(comment.createAt)}</p>
                </div>
              </div>
            </li>
          )): <div className=" w-full py-10 text-gray-500 flex items-center justify-center">
            등록된 댓글이 없습니다
            </div>}
        </ul>
        {isAuth && (
          <div className="mt-6">
            <div className=" flex gap-4">
              <div className="w-9 h-9 bg-gray-50 border rounded-full"></div>
              <textarea
                className="w-full border border-gray-300  p-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 입력해주세요..."
              ></textarea>
            </div>
            <div className=" w-full flex justify-end">
              <button
                onClick={addComment}
                className="mt-2 px-10 py-2 bg-[#B23742] text-sm text-white  hover:bg-red-600"
              >
                등록
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QnaDetailPage;
