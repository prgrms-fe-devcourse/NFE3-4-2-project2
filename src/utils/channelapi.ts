import axios from "axios";

const API_BASE_URL = "http://13.209.75.182:5003";

// axios 인스턴스 생성
const api = axios.create({
   baseURL: API_BASE_URL,
   headers: {
      "Content-Type": "application/json",
   },
});

// 채널 생성
export const createChannel = async (name: string, description: string, authRequired: boolean, token: string) => {
   return await api.post(
      "/channels/create",
      { name, description, authRequired },
      { headers: { Authorization: `Bearer ${token}` } },
   );
};

export default api;  // 기본 export는 api로 변경
