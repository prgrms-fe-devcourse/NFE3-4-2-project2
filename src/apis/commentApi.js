import devAPI from '../config/axiosDevConfig';
import { COMMENT } from './endpoints';

export const commentCreateApi = async (postId, comment) => {
  try {
    const response = await devAPI.post(COMMENT.create, {
      postId,
      comment,
    });
    return response.data;
  } catch (error) {
    console.error('댓글 생성 실패:', error.response?.data || error.message);
    throw new Error('댓글 생성 중 문제가 발생했습니다.');
  }
};

export const deleteCommentApi = async commentId => {
  try {
    const response = await devAPI.delete(COMMENT.delete, {
      data: { id: commentId },
    });
    return response.data;
  } catch (error) {
    console.error('댓글 삭제 실패:', error.response?.data || error.message);
  }
};
