import Header from "../components/common/Header";
import TourSearchBar from "../components/common/TourSearchBar";

export default function Home() {
  return (
    <div className="text-3xl font-bold">
      {/* Header 컴포넌트 추가 */}
      <Header />
      <TourSearchBar />
    </div>
  );
}
