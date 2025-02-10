import axios from 'axios';
import devAPI from '../config/axiosDevConfig';
import { AUTH, USER } from './endpoints';
import { getCookie } from '@/utils/cookie';

export const postSignupApi = async data => {
  const { email, password, nickname } = data;
  try {
    const response = await devAPI.post(AUTH.signup, {
      email,
      password,
      fullName: nickname,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postSigninApi = async data => {
  const { email, password } = data;
  try {
    const response = await devAPI.post(AUTH.login, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postProfileImage = async data => {
  const jwt = getCookie('jwt');
  try {
    // 헤더 추가
    const response = await axios.post(USER.updatePhoto, data, {
      headers: {
        Authorization: `bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const putUserPassword = async data => {
  const { password } = data;
  try {
    const response = await devAPI.put(USER.updatePassword, {
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const putUserFullname = async data => {
  const { fullName } = data;
  try {
    const response = await devAPI.put(USER.updateUser, {
      fullName,
      userName: fullName,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserApi = async userId => {
  try {
    const response = await devAPI.delete(USER.deleteUser, {
      id: userId,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postLogoutUserApi = async () => {
  try {
    const response = await devAPI.post(AUTH.logout);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 유저정보 가져오기
export const getUserApi = async userId => {
  try {
    const response = await devAPI.get(USER.getUser(userId));

    return response.data;
  } catch (error) {
    console.error('유저의 데이터를 불러오지 못했습니다.', error);
  }
};

// 팔로우 정보 가져오기
export const getUserFollowersApi = async userId => {
  try {
    const response = await devAPI.get(USER.getUser(userId));
    return {
      followers: response.data.followers || [],
      following: response.data.following || [],
    };
  } catch (error) {
    console.error('사용자 팔로워 정보 가져오기 실패:', error);
  }
};
