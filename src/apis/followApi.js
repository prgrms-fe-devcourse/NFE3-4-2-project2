import devAPI from '../config/axiosDevConfig';
import { FOLLOW } from './endpoints';

export const followUser = async userId => {
  try {
    const response = await devAPI.post(FOLLOW.create, { userId });
    return response.data;
  } catch (error) {
    console.error('팔로우 요청 실패:', error);
    throw error;
  }
};

export const unfollowUser = async userId => {
  try {
    const response = await devAPI.delete(FOLLOW.delete, {
      data: { id: userId },
    });
    return response.data;
  } catch (error) {
    console.error('언팔로우 요청 실패:', error);
    throw error;
  }
};
