import "../styles/globals.css";
// import localFont from "next/font/local"; // localFont를 import

// // Pretendard 폰트 설정
// const pretendard = localFont({
//   src: [
//     {
//       path: "../../public/fonts/PretendardVariable.woff2", // public 폴더 내 폰트 경로
//       weight: "45 920", // 폰트의 가변적인 굵기 범위
//       style: "normal", // 폰트 스타일 (italic 등)
//     },
//   ],
//   display: "swap", // 폰트 로딩 전략
//   variable: "--font-pretendard", // CSS 변수로 사용할 이름
// });

export const metadata = {
  title: "My Next App",
  description: "A custom Next.js app using TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
