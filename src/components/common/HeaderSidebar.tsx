import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface HeaderSidebarProps {
   isMenuOpen: boolean;
   setIsMenuOpen: (isOpen: boolean) => void;
   isLoggedIn: boolean;
   nickname: string | null;
   profileImage: string | null;
   isLoading: boolean;
   handleLogout: () => void;
}

const menus = [
   { name: "주요 관광지", href: "/explore/travel" },
   { name: "축제·공연·행사", href: "/explore/festival" },
   { name: "레저 및 체험", href: "/explore/leisure" },
   { name: "식당 및 숙소", href: "/explore/places" },
   { name: "커뮤니티", href: "/community" },
];

export default function HeaderSidebar({
   isMenuOpen,
   setIsMenuOpen,
   isLoggedIn,
   nickname,
   profileImage,
   isLoading,
   handleLogout,
}: HeaderSidebarProps) {
   return (
      <>
         {/* 배경 오버레이 */}
         <div
            className={`fixed inset-0 bg-black bg-opacity-50 ${isMenuOpen ? "block" : "hidden"}`}
            onClick={() => setIsMenuOpen(false)}></div>

         {/* 사이드바 */}
         <div
            className={`fixed top-0 right-0 h-full w-64 bg-white shadow-md transform ${
               isMenuOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 ease-in-out`}>
            {/* 닫기 버튼 */}
            <button className="absolute top-4 right-4 !text-neutral-800" onClick={() => setIsMenuOpen(false)}>
               <X size={28} />
            </button>

            {/* 프로필 영역 */}
            <div className="flex flex-col items-center pt-10 pb-10 border-b !border-gray-200">
               <div className="w-24 h-24 rounded-full overflow-hidden border-2 !border-gray-300">
                  <Image
                     src={profileImage || "/images/default_profile.png"}
                     alt="Profile"
                     width={96}
                     height={96}
                     className="object-cover cursor-pointer"
                  />
               </div>
               <h2 className="text-xl font-semibold mt-4 !text-neutral-800">
                  {isLoggedIn ? `${nickname}님` : "GUEST"}
               </h2>
               {!isLoggedIn && <p className="!text-neutral-500 text-sm mt-2">로그인이 필요합니다!</p>}
            </div>

            {/* 카테고리 메뉴리스트 */}
            <div className="flex flex-col mt-8 px-6">
               {menus.map((menu) => (
                  <Link
                     key={menu.name}
                     href={menu.href}
                     className="py-3 text-lg font-medium !text-neutral-800 hover:bg-gray-100 px-4 rounded-md transition"
                     onClick={() => setIsMenuOpen(false)}>
                     {menu.name}
                  </Link>
               ))}
            </div>

            {/* 로그인/로그아웃 버튼 */}
            {!isLoading && (
               <div className="absolute bottom-6 left-0 w-full flex justify-center">
                  {isLoggedIn ? (
                     <div className="flex flex-row items-center gap-3">
                        <Link href="/mypage">
                           <button className="px-4 py-2 text-sm font-medium border !border-neutral-500 !text-neutral-800 rounded-md hover:bg-sky-500 hover:!text-white transition">
                              마이페이지
                           </button>
                        </Link>
                        <button
                           onClick={handleLogout}
                           className="px-4 py-2 text-sm font-medium border !border-red-500 !text-red-500 rounded-md hover:bg-red-500 hover:!text-white transition">
                           로그아웃
                        </button>
                     </div>
                  ) : (
                     <Link href="/auth/login">
                        <button className="px-4 py-2 text-sm font-medium border !border-sky-500 !text-sky-500 rounded-md hover:bg-sky-500 hover:!text-white transition">
                           로그인
                        </button>
                     </Link>
                  )}
               </div>
            )}
         </div>
      </>
   );
}
