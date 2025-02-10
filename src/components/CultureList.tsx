import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import CultureCard from "./CultureCard";
import { HeritageData } from "@/app/culture/types/HeritageData";
import { parseStringPromise } from "xml2js"; // xml2js 임포트\
import debounce from "lodash/debounce";

interface Category {
  category: number;
}

export default function Card(category: Category) {
  const [page, setPage] = useState(1); // 현재 페이지
  const [paginatedItems, setPaginatedItems] = useState<HeritageData[]>([]); // 렌더링할 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 이미지 데이터 상태 추가
  const [imageData, setImageData] = useState<Map<string, string>>(new Map());

  // itemsPerPage 리스트 개수 계산
  function calcListNum() {
    const newItemsPerPage = Math.round(window.innerWidth / 350);
    return newItemsPerPage;
  }

  // 문화유산 가져오기
  const fetchHeritageData = async () => {
    const newItemsPerPage = calcListNum();
    setLoading(true); // 요청 시작 시 로딩 상태 활성화
    try {
      const response = await fetch(
        `http://www.khs.go.kr/cha/SearchKindOpenapiList.do?ccbaKdcd=${category.category}&pageIndex=${page}&pageUnit=${newItemsPerPage}`
      );
      const xmlData = await response.text(); // 텍스트로 응답 받기
      const result = await parseStringPromise(xmlData); // XML을 JSON으로 변환

      // XML에서 필요한 데이터 추출
      const items = result.result.item.map((item: any) => ({
        ccmaName: item.ccmaName[0],
        ccbaMnm1: item.ccbaMnm1[0],
        ccbaCtcdNm: item.ccbaCtcdNm[0],
        ccsiName: item.ccsiName[0],
        ccbaKdcd: item.ccbaKdcd[0],
        ccbaAsno: item.ccbaAsno[0],
        ccbaCtcd: item.ccbaCtcd[0],
      }));

      // 각 아이템에 대해 이미지 데이터 요청
      items.forEach((heritage: HeritageData) => {
        fetchImageData(heritage.ccbaKdcd, heritage.ccbaAsno, heritage.ccbaCtcd);
      });

      setPaginatedItems(items);
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    } finally {
      setLoading(false); // 요청 종료 후 로딩 상태 해제
    }
  };

  // 이미지 데이터 가져오기
  const fetchImageData = async (
    ccbaKdcd: string,
    ccbaAsno: string,
    ccbaCtcd: string
  ) => {
    try {
      const response = await fetch(
        `http://www.khs.go.kr/cha/SearchImageOpenapi.do?ccbaKdcd=${ccbaKdcd}&ccbaAsno=${ccbaAsno}&ccbaCtcd=${ccbaCtcd}`
      );
      const xmlData = await response.text(); // 응답을 텍스트로 받아오기
      const result = await parseStringPromise(xmlData); // xml을 JSON으로 변환

      // 이미지 URL 추출
      const imageUrl = result.result.item?.[0]?.imageUrl?.[0];
      if (imageUrl) {
        setImageData((prev) =>
          new Map(prev).set(`${ccbaKdcd}_${ccbaAsno}_${ccbaCtcd}`, imageUrl)
        );
      }
    } catch (error) {
      console.error("이미지 데이터 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchHeritageData();

    const debouncedFetch = debounce(() => {
      fetchHeritageData();
    }, 1000);

    window.addEventListener("resize", debouncedFetch);

    return () => {
      debouncedFetch.cancel(); // lodash debounce 취소 메서드
      window.removeEventListener("resize", debouncedFetch);
    };
  }, []);

  // itemsPerPage와 page가 변경될 때마다 데이터를 가져오기
  useEffect(() => {
    // itemsPerPage가 0이 아닌 경우에만 데이터를 가져옵니다.

    fetchHeritageData();
  }, [page]);

  // 카테고리 버튼 클릭시 종목 코드 변경
  useEffect(() => {
    fetchHeritageData();
    setPage(1);
  }, [category]);

  // 페이지 변경
  const handleNextPage = () => {
    const newPage = page + 1;
    setPage(newPage > 3 ? 1 : newPage);
  };
  const handlePreviousPage = () => {
    const newPage = page - 1;
    setPage(newPage < 1 ? 3 : newPage);
  };

  return (
    <>
      {loading ? (
        // 로딩 상태일 때 표시할 UI (예: 스피너 또는 메시지)
        <div className="flex justify-center items-center h-[388px]">
          <p className="font-pretendard">Loading...</p>
        </div>
      ) : (
        <>
          {/* 데이터 로딩 완료 후 카드 리스트 렌더링 */}
          <div className="w-[100%]">
            <CultureCard item={paginatedItems} imageData={imageData} />
          </div>

          {/* Pagination */}
          <div className="flex flex-row justify-center items-center m-auto bg-white pl-10 mt-3">
            <div className="hidden sm:flex sm:flex-1 sm:items-center">
              <nav
                aria-label="Pagination"
                className="isolate inline-flex rounded-md shadow-xs"
              >
                <span className="relative inline-flex items-center hover:bg-gray-50">
                  <ChevronLeftIcon
                    onClick={handlePreviousPage}
                    className="size-8 text-stone-500"
                  />
                </span>
                {Array.from({ length: 3 }, (_, i) => (
                  <span
                    onClick={() => setPage(i + 1)}
                    key={i}
                    aria-current="page"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:cursor-pointer font-pretendard"
                  >
                    {i + 1}
                  </span>
                ))}
                <span className="relative inline-flex items-center hover:bg-gray-50">
                  <ChevronRightIcon
                    onClick={handleNextPage}
                    className="size-8 text-stone-500"
                  />
                </span>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}
