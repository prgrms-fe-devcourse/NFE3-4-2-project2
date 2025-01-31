// authapi.ts

import axios, { AxiosResponse } from 'axios';

const baseURL = 'http://13.209.75.182:5003'; // 서버 주소

interface SignUpRequest {
  email: string;
  fullName: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface User {
  // Define the structure of your User object here
  // Example:
  id: number;
  email: string;
  fullName: string;
}

interface ApiResponse<T> {
  data: T;
}

export const signUp = async (userData: SignUpRequest): Promise<ApiResponse<User>> => {
  try {
    const response: AxiosResponse<User> = await axios.post(`${baseURL}/signup`, userData);
    return { data: response.data };
  } catch (error) {
    throw new Error(`회원가입 요청 실패: ${error}`);
  }
};

export const login = async (userData: LoginRequest): Promise<ApiResponse<{ user: User; token: string }>> => {
  try {
    const response: AxiosResponse<{ user: User; token: string }> = await axios.post(`${baseURL}/login`, userData);
    return { data: response.data };
  } catch (error) {
    throw new Error(`로그인 요청 실패: ${error}`);
  }
};

export const logout = async (): Promise<void> => {
  try {
    await axios.post(`${baseURL}/logout`);
    // 성공적으로 로그아웃되었음을 처리하는 로직 추가 가능
  } catch (error) {
    throw new Error(`로그아웃 요청 실패: ${error}`);
  }
};

export const checkAuthUser = async (): Promise<ApiResponse<User>> => {
  try {
    const response: AxiosResponse<User> = await axios.get(`${baseURL}/auth-user`, {
      headers: {
        Authorization: `bearer ${localStorage.getItem('accessToken')}`, // 예시로 localStorage에 저장된 accessToken을 사용
      },
    });
    return { data: response.data };
  } catch (error) {
    throw new Error(`인증 확인 요청 실패: ${error}`);
  }
};
