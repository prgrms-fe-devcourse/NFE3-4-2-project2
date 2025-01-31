"use client";

import Link from "next/link";

export default function Header() {
   const menus = [
      { name: "주요 관광지", href: "/explore/travel" },
      { name: "축제·공연·행사", href: "/explore/festival" },
      { name: "레저 및 체험", href: "/explore/leisure" },
      { name: "식당 및 숙소", href: "/explore/places/restaurants" }, // -> default 식당페이지
      { name: "커뮤니티", href: "/community" },
   ];

   return (
      <header className="bg-white w-full h-[107px] border-b border-b-neutral-800">
         <nav className="mx-auto max-w-screen-xl p-4">
            <div className="flex flex-col items-start w-full">
               {/* 로고 */}
               <div className="w-full flex justify-between items-center">
                  <Link href="/" className="text-2xl font-bold text-sky-500 no-underline mb-2">
                     Gangwon GO
                  </Link>
                  <Link href="/auth/login">
                     <button
                        className="h-[32px] px-4 text-neutral-800 text-sm font-medium border-2 border-solid border-neutral-800 rounded-md 
                                hover:text-white hover:bg-sky-500 hover:border-sky-500 active:bg-sky-600 active:border-sky-600">
                        로그인
                     </button>
                  </Link>
               </div>

               {/* 데스크탑 메뉴 */}
               <div>
                  <ul className="flex gap-10 text-neutral-800 mt-3">
                     {menus.map((menu) => (
                        <li key={menu.name}>
                           <Link
                              href={menu.href}
                              className="text-base font-medium hover:text-sky-500 active:text-sky-600">
                              {menu.name}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </nav>
      </header>
   );
}
