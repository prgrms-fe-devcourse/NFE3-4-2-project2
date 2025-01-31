import axios, { AxiosResponse } from "axios";

// 서버 기본 URL 설정
const baseURL = "http://13.209.75.182:5003";

// Axios 인스턴스 생성 (JWT 토큰 자동 추가)
const api = axios.create({
   baseURL,
   headers: {
      "Content-Type": "application/json",
   },
});

// ✅ 요청 인터셉터에서 Authorization 헤더 추가
api.interceptors.request.use(
   (config) => {
      if (typeof window !== "undefined") {
         const token = localStorage.getItem("accessToken");
         console.log("🔹 현재 JWT 토큰:", token);

         if (token) {
            config.headers.Authorization = `Bearer ${token}`;
         } else {
            console.warn("⚠️ JWT 토큰이 없음 (로그인이 필요할 수도 있음)");
         }
      }
      return config;
   },
   (error) => {
      console.error("❌ 요청 인터셉터 오류:", error);
      return Promise.reject(error);
   },
);

// ✅ 특정 채널의 포스트 목록 불러오기
export const getPostsByChannel = async (channelId: string, offset?: number, limit?: number) => {
   try {
      const response: AxiosResponse = await api.get(`/posts/channel/${channelId}`, {
         params: { offset, limit },
      });
      return response.data;
   } catch (error: any) {
      console.error("❌ 채널 포스트 목록 요청 실패:", error.response || error);
      throw new Error(error.response?.data?.message || "채널 포스트 목록 요청 실패");
   }
};

// ✅ 특정 사용자의 포스트 목록 불러오기
export const getPostsByAuthor = async (authorId: string, offset?: number, limit?: number) => {
   try {
      const response: AxiosResponse = await api.get(`/posts/author/${authorId}`, {
         params: { offset, limit },
      });
      return response.data;
   } catch (error: any) {
      console.error("❌ 사용자 포스트 목록 요청 실패:", error.response || error);
      throw new Error(error.response?.data?.message || "사용자 포스트 목록 요청 실패");
   }
};

// ✅ 특정 채널에 포스트 작성
export const createPost = async (postData: FormData) => {
   try {
      const response: AxiosResponse = await api.post("/posts/create", postData, {
         headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
   } catch (error: any) {
      console.error("❌ 포스트 작성 실패:", error.response || error);
      throw new Error(error.response?.data?.message || "포스트 작성 실패");
   }
};

// ✅ 특정 포스트 상세 정보 불러오기
export const getPostById = async (postId: string) => {
   try {
      const response: AxiosResponse = await api.get(`/posts/${postId}`);
      return response.data;
   } catch (error: any) {
      console.error("❌ 포스트 상세 정보 요청 실패:", error.response || error);
      throw new Error(error.response?.data?.message || "포스트 상세 정보 요청 실패");
   }
};

// ✅ 내가 작성한 포스트 수정
export const updatePost = async (postData: FormData) => {
   try {
      const response: AxiosResponse = await api.put("/posts/update", postData, {
         headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
   } catch (error: any) {
      console.error("❌ 포스트 수정 실패:", error.response || error);
      throw new Error(error.response?.data?.message || "포스트 수정 실패");
   }
};

// ✅ 내가 작성한 포스트 삭제
export const deletePost = async (postId: string) => {
   try {
      const response: AxiosResponse = await api.delete("/posts/delete", {
         data: { id: postId },
      });
      return response.data;
   } catch (error: any) {
      console.error("❌ 포스트 삭제 실패:", error.response || error);
      throw new Error(error.response?.data?.message || "포스트 삭제 실패");
   }
};
