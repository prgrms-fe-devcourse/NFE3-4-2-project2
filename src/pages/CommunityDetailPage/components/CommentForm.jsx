import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { commentCreateApi } from '@/apis/commentApi';
import { getCookie } from '@/utils/cookie'; 

const CommentForm = ({ postId, onCommentCreated }) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const userId = useSelector((state) => state.user.userId);


  const token = getCookie('jwt');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || !userId) {
      navigate('/auth'); 
      return;
    }

    if (!comment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const newComment = await commentCreateApi(postId, comment.trim(), token);

      if (onCommentCreated) {
        onCommentCreated(newComment);
      }

      setComment(''); 
    } catch (error) {
      console.error('댓글 생성 실패:', error.response?.data || error.message);
      alert(
        error.response?.data?.message || '댓글 작성에 실패했습니다. 다시 시도해주세요.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full flex flex-col mt-30 mb-[70px]">
      <form onSubmit={handleSubmit} className="flex justify-between items-center w-full">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="댓글을 입력해주세요..."
          className="w-[639px] h-[44px] p-12 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
          disabled={isSubmitting}
        ></textarea>

        <button
          type="submit"
          className={`w-[72px] h-[44px] mr-128 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? '작성 중...' : '등록'}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
