import devAPI from '../config/axiosDevConfig';
import axios from 'axios';
import { serverURL, POST } from './endpoints';
import { getCookie } from '../utils/cookie';

export const getPostByChannelApi = async channelId => {
  try {
    const response = await devAPI.get(POST.getChannelPost(channelId));
    return response.data;
  } catch (error) {
    console.error('채널 게시글 가져오기 실패:', error);
    throw new Error('채널 게시글을 가져오는 데 실패했습니다.');
  }
};

export const getChannelNameByIdApi = async channelId => {
  try {
    const response = await devAPI.get(POST.getChannelPost(channelId));

    if (response.data.name) {
      return response.data.name;
    } else {
      throw new Error('채널 이름이 응답에 포함되어 있지 않습니다.');
    }
  } catch (error) {
    console.error('채널 이름 가져오기 실패:', error);
    throw new Error('채널 이름을 가져오는 데 실패했습니다.');
  }
};

export const deletePostApi = async contentID => {
  try {
    const response = await devAPI.delete(POST.delete, {
      data: { id: contentID },
    });
    return response.data;
  } catch (error) {
    console.error('게시글 삭제에 실패했습니다.', error);
    throw new Error('게시글 삭제에 실패했습니다');
  }
};

export const updatePostApi = async formData => {
  const token = getCookie('jwt');
  try {
    const response = await axios.put(POST.update, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('게시글 업데이트 실패:', error);
    throw new Error('게시글 업데이트에 실패했습니다.');
  }
};

export const createPostApi = async formData => {
  const token = getCookie('jwt');

  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }

  try {
    const response = await axios.post(POST.create, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getUserPost = async userId => {
  try {
    const response = await devAPI.get(POST.getAuthorPost(userId));

    return response.data;
  } catch (error) {
    console.error('유저의 포스트를 불러오지 못했습니다.', error);
    throw new Error('채널 데이터를 불러오는 데 실패했습니다.');
  }
};
