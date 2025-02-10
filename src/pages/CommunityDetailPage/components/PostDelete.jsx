import React, { useState } from 'react';
import { deletePostApi } from '@/apis/postApi';
import { useNavigate } from 'react-router-dom';
import moreIcon from '/icons/more.svg';
import PostEditModal from './PostEditModal';

const PostDelete = ({ postId, userId, authorId, setPosts, isLoggedIn, post, onUpdate }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const isAuthor = isLoggedIn && userId === authorId;

  const handleDeletePost = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      setLoading(true);
      await deletePostApi(postId);
      alert('게시글이 삭제되었습니다.');

      if (setPosts) {
        setPosts(prevPosts => prevPosts.filter(p => p._id !== postId));
      }

      navigate('/community');
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      alert('게시글 삭제에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthor) {
    return null;
  }

  return (
    <>
      <div className="relative mr-175 inline-block text-left">
        <button onClick={() => setDropdownOpen(prev => !prev)} className="focus:outline-none">
          <img src={moreIcon} alt="더보기" className="w-25 h-25" />
        </button>

        {dropdownOpen && (
          <ul className="absolute left-0 mt-1 w-100 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <li
              onClick={handleDeletePost}
              className="h-30 w-100 flex items-center justify-center hover:bg-gray-100 cursor-pointer text-md text-gray-800"
            >
              {loading ? '삭제 중...' : '삭제'}
            </li>
            <li
              onClick={() => {
                setDropdownOpen(false);
                setIsEditModalOpen(true);
              }}
              className="h-30 w-100 flex items-center justify-center hover:bg-gray-100 cursor-pointer text-md text-gray-800"
            >
              수정하기
            </li>
          </ul>
        )}
      </div>

      {isEditModalOpen && (
        <PostEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          post={post}
          onUpdate={updatedPost => {
            setPosts(prevPosts => {
              return prevPosts.map(p => (p._id === updatedPost._id ? updatedPost : p));
            });

            if (onUpdate) {
              onUpdate(updatedPost);
            }
          }}
        />
      )}
    </>
  );
};

export default PostDelete;
