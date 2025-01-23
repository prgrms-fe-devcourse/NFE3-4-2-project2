import Link from "next/link";

const Header = () => {
  return (
    <header className="container mx-auto h-32 px-8 pt-6 bg-slate-100 min-w-full">
      <Link href="/" className="text-5xl mb-5">Header</Link>
      <nav className="flex gap-x-10 mt-4">
        <Link href="/explore/travel" className="font-semibold text-blue-500 hover:text-blue-300">주요 관광지</Link>
        <Link href="/explore/festival" className="font-semibold text-blue-500 hover:text-blue-300">축제·공연·행사</Link>
        <Link href="/explore/leisure" className="font-semibold text-blue-500 hover:text-blue-300">레저 및 체험</Link>
        <Link href="/reservations/accommodations" className="font-semibold text-blue-500 hover:text-blue-300">예약</Link>
        <Link href="/community/recruitment" className="font-semibold text-blue-500 hover:text-blue-300">커뮤니티</Link>
        <Link href="/auth/login" className="font-semibold text-blue-500 hover:text-blue-300">로그인</Link>
      </nav>
    </header>
  );
};

export default Header;
