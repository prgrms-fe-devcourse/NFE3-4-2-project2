// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: ["tong.visitkorea.or.kr", "res.cloudinary.com"], // 외부 도메인 추가
   },
};

module.exports = nextConfig;
