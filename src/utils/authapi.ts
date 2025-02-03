import axios, { AxiosResponse } from "axios";

const baseURL = "http://13.209.75.182:5003"; // 서버 주소

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
   id: string;
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
      return { data: response.data }; // 로컬 스토리지 저장을 handleSubmit에서 처리
   } catch (error) {
      throw new Error(`로그인 요청 실패: ${error}`);
   }
};

export const logout = async (): Promise<void> => {
   try {
      // 서버에 로그아웃 요청을 보내기 전에 로컬스토리지에서 사용자 정보 제거
      localStorage.removeItem("userId");
      localStorage.removeItem("accessToken");

      // 서버에 로그아웃 요청
      await axios.post(`${baseURL}/logout`);
      console.log("로그아웃 성공");
   } catch (error) {
      throw new Error(`로그아웃 요청 실패: ${error}`);
   }
};

export const checkAuthUser = async (): Promise<ApiResponse<User>> => {
   try {
      const response: AxiosResponse<User> = await axios.get(`${baseURL}/auth-user`, {
         headers: {
            Authorization: `bearer ${localStorage.getItem("accessToken")}`, // 예시로 localStorage에 저장된 accessToken을 사용
         },
      });
      return { data: response.data };
   } catch (error) {
      throw new Error(`인증 확인 요청 실패: ${error}`);
   }
};
