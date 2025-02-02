import axios from "axios";

const API_BASE_URL = "http://13.209.75.182:5003"; // 실제 API URL로 변경하세요.

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 채널 목록 조회
export const getChannels = async () => {
  return await api.get("/channels");
};

// 특정 채널 정보 조회
export const getChannelInfo = async (channelName: string) => {
  return await api.get(`/channels/${encodeURIComponent(channelName)}`);
};

// 채널 생성
export const createChannel = async (
  name: string,
  description: string,
  authRequired: boolean,
  token: string
) => {
  return await api.post(
    "/channels/create",
    { name, description, authRequired },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

// 특정 채널의 포스트 목록 조회
export const getPostsByChannel = async (channelId: string, offset?: number, limit?: number) => {
  return await api.get(`/posts/channel/${channelId}`, {
    params: { offset, limit },
  });
};

// 특정 사용자의 포스트 목록 조회
export const getPostsByAuthor = async (authorId: string, offset?: number, limit?: number) => {
  return await api.get(`/posts/author/${authorId}`, {
    params: { offset, limit },
  });
};

// 포스트 작성
export const createPost = async (
  title: string,
  image: File | null,
  channelId: string,
  token: string
) => {
  const formData = new FormData();
  formData.append("title", title);
  if (image) formData.append("image", image);
  formData.append("channelId", channelId);

  return await api.post("/posts/create", formData, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
  });
};

// 특정 포스트 상세 조회
export const getPostById = async (postId: string) => {
  return await api.get(`/posts/${postId}`);
};

// 포스트 수정
export const updatePost = async (
  postId: string,
  title: string,
  image: File | null,
  imageToDeletePublicId: string | null,
  channelId: string,
  token: string
) => {
  const formData = new FormData();
  formData.append("postId", postId);
  formData.append("title", title);
  if (image) formData.append("image", image);
  if (imageToDeletePublicId) formData.append("imageToDeletePublicId", imageToDeletePublicId);
  formData.append("channelId", channelId);

  return await api.put("/posts/update", formData, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
  });
};

// 포스트 삭제
export const deletePost = async (postId: string, token: string) => {
  return await api.delete("/posts/delete", {
    headers: { Authorization: `Bearer ${token}` },
    data: { id: postId },
  });
};

// 좋아요 추가
export const likePost = async (postId: string, token: string) => {
  return await api.post(
    "/likes/create",
    { postId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

// 좋아요 취소
export const unlikePost = async (likeId: string, token: string) => {
  return await api.delete("/likes/delete", {
    headers: { Authorization: `Bearer ${token}` },
    data: { id: likeId },
  });
};

// 댓글 추가
export const createComment = async (comment: string, postId: string, token: string) => {
  return await api.post(
    "/comments/create",
    { comment, postId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

// 댓글 삭제
export const deleteComment = async (commentId: string, token: string) => {
  return await api.delete("/comments/delete", {
    headers: { Authorization: `Bearer ${token}` },
    data: { id: commentId },
  });
};
