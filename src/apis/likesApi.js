import devAPI from '../config/axiosDevConfig';
import { LIKE } from './endpoints';

export const createLikesApi = async postId => {
  try {
    const response = await devAPI.post(LIKE.create, { postId });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteLikesApi = async likeId => {
  try {

    const response = await devAPI.delete(LIKE.delete,{
      data: { id: likeId },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
