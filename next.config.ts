import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
/* 외부 도메인 추가 
이유: Next.js는 보안상의 이유로 허용된 도메인만 이미지를 로드하도록 제한하기 때문에 
*/
module.exports = {
  images: {
    domains: [
      "cdn.pixabay.com",
      "www.heritage.go.kr",
      "www.cha.go.kr",
      "via.placeholder.com",
    ], // 외부 이미지를 허용할 도메인 추가
  },
};

export default nextConfig;
