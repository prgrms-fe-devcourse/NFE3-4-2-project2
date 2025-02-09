import { useRouter } from "next/navigation";

import APIConnect from "@/utils/api"; // ✅ API 연결 (getTourAreaInfo 사용)

const useNavigateToDetail = () => {
   const router = useRouter(); // ✅ React Hook을 커스텀 Hook 안에서 사용 가능

   const navigateToDetail = async (contentId: number) => {
      try {
         // ✅ API 호출하여 카테고리 정보 가져오기
         const tourData = await APIConnect.getTourAreaInfo(contentId);
         const { cat1, cat2 } = tourData;

         if (!cat1) {
            console.error("❌ 카테고리 정보 없음");
            return;
         }

         // ✅ 조건별로 상세 페이지 경로 설정
         let detailPath = "";

         if (cat1 === "A01" || (cat1 === "A02" && cat2 !== "A0208")) {
            detailPath = `/explore/travel/detail?contentId=${contentId}`;
         } else if (cat1 === "A02" && cat2 === "A0208") {
            detailPath = `/explore/festival/detail?contentId=${contentId}`;
         } else if (cat1 === "A03") {
            detailPath = `/explore/leisure/detail?contentId=${contentId}`;
         } else if (cat1 === "B02") {
            detailPath = `/explore/places/accommodations/detail?contentId=${contentId}`;
         } else if (cat1 === "A05") {
            detailPath = `/explore/places/restaurants/detail?contentId=${contentId}`;
         } else {
            console.warn("🚨 알 수 없는 카테고리: 기본 travel/detail로 이동");
            detailPath = `/explore/travel/detail?contentId=${contentId}`;
         }

         // ✅ 페이지 이동
         router.push(detailPath);
      } catch (err) {
         console.error("❌ 콘텐츠 정보 가져오기 실패:", err);
      }
   };

   return { navigateToDetail };
};

export default useNavigateToDetail;
