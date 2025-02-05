import axios, { AxiosResponse } from "axios";
import { getCookie, setCookie } from "@/utils/cookie";

const baseURL = "http://13.209.75.182:5003"; // 서버 주소

/** 회원가입 요청 타입 */
interface SignUpRequest {
   email: string;
   fullName: string;
   username: string;
   password: string;
}

/** 로그인 요청 타입 */
interface LoginRequest {
   email: string;
   password: string;
}

/** 사용자 정보 타입 */
interface User {
   id: string;
   email: string;
   fullName: string;
   username?: string;
   profileImage?: string;
}

/** API 응답 타입 */
interface ApiResponse<T> {
   data: T;
}

/** 회원가입 API */
export const signUp = async (userData: SignUpRequest): Promise<ApiResponse<User>> => {
   try {
      const response: AxiosResponse<User> = await axios.post(`${baseURL}/signup`, userData);
      return { data: response.data };
   } catch (error) {
      throw new Error(`회원가입 요청 실패: ${error}`);
   }
};

/** 로그인 API */
export const login = async (userData: LoginRequest): Promise<ApiResponse<{ user: User; token: string }>> => {
   try {
      const response: AxiosResponse<{ user: User; token: string }> = await axios.post(`${baseURL}/login`, userData);

      // 로그인 성공 시 쿠키에 userId 저장
      setCookie("userId", response.data.user.id, 7); // 7일 유지

      return { data: response.data };
   } catch (error) {
      throw new Error(`로그인 요청 실패: ${error}`);
   }
};

/** 로그아웃 API */
export const logout = async (): Promise<void> => {
   try {
      // 로컬스토리지에서 사용자 정보 제거
      localStorage.removeItem("userId");
      localStorage.removeItem("accessToken");

      // ✅ 쿠키에서도 사용자 데이터 삭제
      setCookie("userId", "", -1);
      setCookie(`favorites_${getCookie("userId")}`, "", -1);
      setCookie(`visited_${getCookie("userId")}`, "", -1);

      // 서버에 로그아웃 요청
      await axios.post(`${baseURL}/logout`);
      console.log("로그아웃 성공");
   } catch (error) {
      throw new Error(`로그아웃 요청 실패: ${error}`);
   }
};

/** 사용자 인증 확인 API */
export const checkAuthUser = async (): Promise<ApiResponse<User>> => {
   try {
      const response: AxiosResponse<User> = await axios.get(`${baseURL}/auth-user`, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // 토큰 인증 헤더 포함
         },
      });
      return { data: response.data };
   } catch (error) {
      throw new Error(`인증 확인 요청 실패: ${error}`);
   }
};

/** 사용자 목록 API */
export const getUsers = async (offset?: number, limit?: number): Promise<ApiResponse<User[]>> => {
   try {
      const params = {
         offset,
         limit,
      };
      const response: AxiosResponse<User[]> = await axios.get(`${baseURL}/users/get-users`, { params });
      return { data: response.data };
   } catch (error) {
      throw new Error(`사용자 목록 요청 실패: ${error}`);
   }
};

/** 현재 접속 중인 사용자 목록 API */
export const getOnlineUsers = async (): Promise<ApiResponse<User[]>> => {
   try {
      const response: AxiosResponse<User[]> = await axios.get(`${baseURL}/users/online-users`);
      return { data: response.data };
   } catch (error) {
      throw new Error(`현재 접속 중인 사용자 목록 요청 실패: ${error}`);
   }
};

/** 특정 사용자 정보 조회 API */
export const getUserInfo = async (userId: string): Promise<ApiResponse<User>> => {
   try {
      const response: AxiosResponse<User> = await axios.get(`${baseURL}/users/${userId}`);
      return { data: response.data };
   } catch (error) {
      throw new Error(`사용자 정보 조회 요청 실패: ${error}`);
   }
};

/** 프로필 이미지 변경 API */
export const uploadProfilePhoto = async (formData: FormData): Promise<ApiResponse<User>> => {
   try {
      const response: AxiosResponse<User> = await axios.post(`${baseURL}/users/upload-photo`, formData, {
         headers: {
            "Content-Type": "multipart/form-data", // 파일 전송을 위한 Content-Type 설정
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // JWT 토큰
         },
      });
      return { data: response.data };
   } catch (error) {
      console.error("프로필 이미지 변경 요청 실패", error);
      throw error; // 에러 던지기
   }
};

/** 내 정보 변경 API */
export const updateUserInfo = async (fullName: string, username: string): Promise<ApiResponse<User>> => {
   try {
      const response: AxiosResponse<User> = await axios.put(
         `${baseURL}/settings/update-user`,
         {
            fullName,
            username,
         },
         {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
         },
      );
      return { data: response.data };
   } catch (error) {
      throw new Error(`내 정보 변경 요청 실패: ${error}`);
   }
};

/** 비밀번호 변경 API */
export const updatePassword = async (password: string): Promise<ApiResponse<User>> => {
   try {
      const response: AxiosResponse<User> = await axios.put(
         `${baseURL}/settings/update-password`,
         {
            password,
         },
         {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
         },
      );
      return { data: response.data };
   } catch (error) {
      throw new Error(`비밀번호 변경 요청 실패: ${error}`);
   }
};
