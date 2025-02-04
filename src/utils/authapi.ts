import axios, { AxiosResponse } from "axios";

const baseURL = "http://13.209.75.182:5003"; // 서버 주소

/** 회원가입 요청 타입 */
interface SignUpRequest {
   email: string;
   fullName: string;
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
      return { data: response.data }; // 로그인 성공 시 반환 데이터
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

/** 사용자 프로필 저장 API */
export const saveUserProfile = async (userId: string, profileData: object): Promise<ApiResponse<void>> => {
   try {
      const token = localStorage.getItem("accessToken"); // 토큰 가져오기
      const response: AxiosResponse<void> = await axios.put(`${baseURL}/api/user/profile`, {
         userId,
         profile: profileData,
      }, {
         headers: {
            Authorization: `Bearer ${token}`, // 인증 헤더 포함
         },
      });
      return { data: response.data };
   } catch (error) {
      throw new Error(`프로필 저장 실패: ${error}`);
   }
};

/** 사용자 프로필 불러오기 API */
export const getUserProfile = async (userId: string): Promise<ApiResponse<{ profile: object }>> => {
   try {
      const token = localStorage.getItem("accessToken"); // 토큰 가져오기
      const response: AxiosResponse<{ profile: object }> = await axios.get(`${baseURL}/api/user/profile?userId=${userId}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return { data: response.data };
   } catch (error) {
      console.error("❌ 프로필 불러오기 실패:", error);
      throw new Error(`프로필 불러오기 실패: ${error}`);
   }
};

