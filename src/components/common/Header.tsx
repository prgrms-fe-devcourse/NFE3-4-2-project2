import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* 로고 */}
      <div className="text-2xl font-bold text-blue-600">
        <Link href="/">로고</Link>
      </div>

      {/* 네비게이션 메뉴 */}
      <nav className="space-x-6">
        <Link href="/home">홈</Link>
        <Link href="/community">커뮤니티</Link>
        <Link href="/reservations">예약</Link>
      </nav>

      {/* 로그인/회원가입 링크 */}
      <div className="space-x-4">
        <Link href="/login">로그인</Link>
        <Link href="/signup">회원가입</Link>
      </div>
    </header>
  );
};

export default Header;
