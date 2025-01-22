import "../styles/globals.css";

export const metadata = {
  title: "My Next App", // 프로젝트에 맞는 제목으로 수정
  description: "A custom Next.js app using TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
