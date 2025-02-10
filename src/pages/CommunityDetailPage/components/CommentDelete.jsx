import React, { useState } from 'react';
import deleteIcon from '/icons/delete.svg';
import { deleteCommentApi } from '@/apis/commentApi';

const CommentDelete = ({ commentId, userId, authorId, isLoggedIn, onDelete }) => {
  const [loading, setLoading] = useState(false);
  
  const isAuthor = isLoggedIn && String(userId) === String(authorId);

  if (!isAuthor) return null;

  const handleDeleteComment = async () => {
    if (!window.confirm('정말 이 댓글을 삭제하시겠습니까?')) return;
    try {
      setLoading(true);
      await deleteCommentApi(commentId);
      onDelete(commentId);
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      alert('댓글 삭제에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDeleteComment} 
      disabled={loading} 
      className="w-[20px] h-[20px] p-0 hover:opacity-75 mr-128"
    >
      <img src={deleteIcon} alt="댓글 삭제" className="w-full h-full " />
    </button>
  );
};

export default CommentDelete;
