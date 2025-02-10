export interface Author {
  role: "Regular" | "Admin" | "Moderator"; // 역할이 정해져 있다면 유니온 타입으로 지정
  emailVerified: boolean;
  banned: boolean;
  email: string;
  isOnline: boolean;
  _id: string;
}

export interface Channel {
  authRequired: boolean;
  posts: string[]; // 게시물 ID 목록
  _id: string;
}

export interface Like {
    createdAt: Date;
    post: string;
    updatedAt:Date;
    user:string;
    __v:number;
    _id:string // ISO 날짜 문자열
}
export interface LikePost {
    userId: string;
    likedAt: string; // ISO 날짜 문자열
  }
export interface PostContent {
  title: string;
  content: string;
}

export interface Post {
  _id: string;
  author: Author;
  channel: Channel;
  comments: any[]; // 만약 Comment 인터페이스가 있다면 해당 타입으로 변경
  createdAt: string; // ISO 날짜 문자열
  updatedAt: string; // ISO 날짜 문자열
  likes: any; // 좋아요한 유저 정보 리스트
  title: string; // JSON 문자열이므로 파싱 필요
  __v: number;
}
