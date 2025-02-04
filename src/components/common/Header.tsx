import { useEffect, useState } from "react";
import Link from "next/link";
import { checkAuthUser, logout } from "@/utils/authapi"; // logout 함수 import

export default function Header() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [nickname, setNickname] = useState<string | null>(null);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      if (typeof window !== "undefined") {
         const token = localStorage.getItem("accessToken");
         const storedNickname = localStorage.getItem("nickname");

         if (token && storedNickname) {
            setIsLoggedIn(true);
            setNickname(storedNickname);
         }

         const fetchUserData = async () => {
            try {
               if (token) {
                  const response = await checkAuthUser();
                  if (response.data) {
                     setIsLoggedIn(true);
                     setNickname(response.data.fullName || "사용자");
                     localStorage.setItem("nickname", response.data.fullName || "사용자");
                  } else {
                     setIsLoggedIn(false);
                     setNickname(null);
                  }
               }
            } catch (error) {
               console.error("로그인 확인 실패:", error);
               setIsLoggedIn(false);
               setNickname(null);
            } finally {
               setIsLoading(false);
            }
         };

         fetchUserData();
      }
   }, []);

   const handleLogout = async () => {
      try {
         // 서버에서 로그아웃 요청 처리
         await logout(); // 서버 로그아웃 호출

         // 클라이언트에서 로컬스토리지 항목 제거
         localStorage.removeItem("accessToken");
         localStorage.removeItem("nickname");

         // 상태 업데이트
         setIsLoggedIn(false);
         setNickname(null);

         alert("로그아웃 되었습니다.");
         window.location.replace("/auth/login"); // 홈 화면으로 리다이렉션
      } catch (error) {
         console.error("로그아웃 실패:", error);
         alert("로그아웃에 실패했습니다.");
      }
   };

   const menus = [
      { name: "주요 관광지", href: "/explore/travel" },
      { name: "축제·공연·행사", href: "/explore/festival" },
      { name: "레저 및 체험", href: "/explore/leisure" },
      { name: "식당 및 숙소", href: "/explore/places" },
      { name: "커뮤니티", href: "/community" },
   ];

   return (
      <header className="bg-white w-full h-[107px] border-b border-b-neutral-800">
         <nav className="mx-auto max-w-screen-xl p-4">
            <div className="flex w-full justify-between items-start">
               {/* 왼쪽 로고 및 메뉴 */}
               <div className="flex flex-col items-start">
                  <Link href="/">
                     <span className="text-2xl font-bold text-sky-500 no-underline mb-2 cursor-pointer">
                        Gangwon GO
                     </span>
                  </Link>

                  <ul className="flex gap-6 text-neutral-800 mt-4">
                     {menus.map((menu) => (
                        <li key={menu.name}>
                           <Link href={menu.href}>
                              <span className="text-base font-medium cursor-pointer hover:text-sky-500 active:text-sky-600">
                                 {menu.name}
                              </span>
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* 오른쪽 로그인/로그아웃 및 마이페이지 버튼 */}
               <div className="flex items-center gap-4">
                  {!isLoading &&
                     (isLoggedIn ? (
                        <div className="flex flex-col items-end gap-4 mt-3">
                           {/* 사용자 이름과 환영 메시지 */}
                           <span className="text-neutral-800 text-sm font-medium">
                              {nickname ?? "사용자"}님 환영합니다!
                           </span>
                           <div className="flex gap-4">
                              {/* 마이페이지 및 로그아웃 버튼 */}
                              <Link href="/mypage">
                                 <button
                                    className="h-[32px] px-4 text-neutral-800 text-sm font-medium border-2 border-solid border-neutral-800 rounded-md 
                                             hover:text-white hover:bg-sky-500 hover:border-sky-500 active:bg-sky-600 active:border-sky-600">
                                    마이페이지
                                 </button>
                              </Link>
                              <button
                                 onClick={handleLogout}
                                 className="h-[32px] px-4 text-neutral-800 text-sm font-medium border-2 border-solid border-neutral-800 rounded-md 
                                         hover:text-white hover:bg-red-500 hover:border-red-500 active:bg-red-600 active:border-red-600">
                                 로그아웃
                              </button>
                           </div>
                        </div>
                     ) : (
                        <Link href="/auth/login">
                           <button
                              className="h-[32px] px-4 mt-6 text-neutral-800 text-sm font-medium border-2 border-solid border-neutral-800 rounded-md 
                                      hover:text-white hover:bg-sky-500 hover:border-sky-500 active:bg-sky-600 active:border-sky-600">
                              로그인
                           </button>
                        </Link>
                     ))}
               </div>
            </div>
         </nav>
      </header>
   );
}
