"use client";

import PostCard from "@/components/common/Community/PostCard";

import { Post } from "../../../app/community/page"; // 부모에서 전달할 Post 타입

interface PostListProps {
   posts: Post[];
   loadingPosts: boolean;
   currentPage: number;
   postsPerPage: number;
}

const PostList: React.FC<PostListProps> = ({ posts, loadingPosts, currentPage, postsPerPage }) => {
   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

   return (
      <div className="w-fu1ll grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-between gap-4">
         {loadingPosts ? (
            <p className="text-gray-500 text-center col-span-3">게시글을 불러오는 중...</p>
         ) : currentPosts.length > 0 ? (
            currentPosts.map((post) => <PostCard key={post._id} post={post} />)
         ) : (
            <div className="flex flex-col items-center justify-center col-span-3 my-auto">
               <p className="text-gray-500 text-center mb-4">등록된 게시글이 없습니다.</p>
            </div>
         )}
      </div>
   );
};

export default PostList;
