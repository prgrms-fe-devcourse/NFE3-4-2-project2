import "../styles/globals.css";
// import Script from "next/script";
import 'bootstrap-icons/font/bootstrap-icons.css';


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
      <head>
        {/* <Script 
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&autoload=false`}
          type="text/javascript"
          strategy="beforeInteractive"
        /> */}
      </head>
      <body>{children}</body>
    </html>
  );
}
