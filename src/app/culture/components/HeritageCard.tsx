'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Pagination from './Pagination';
import { fetchHeritageList } from '../types/useHeritageData';

interface HeritageCardProps {
  SearchResult: any[];
}

export default function HeritageCard(props: HeritageCardProps) {
  const [heritageData, setHeritageData] = useState<any[]>([]); 
  const [isSearching, setIsSearching] = useState(false); 
  const [paginationInfo, setPaginationInfo] = useState({
    totalCnt: 0, 
    pageUnit: 25, 
    pageIndex: 1, 
  });

  const loadHeritageData = async (pageIndex: number) => {
    if (props.SearchResult.length > 0) {
      setIsSearching(true);
      setPaginationInfo((prev) => ({
        ...prev,
        totalCnt: props.SearchResult.length,
        pageIndex,
      }));
    } else {
      setIsSearching(false);
      const { items, totalCnt } = await fetchHeritageList(pageIndex, paginationInfo.pageUnit);
      setHeritageData(items);
      setPaginationInfo((prev) => ({
        ...prev,
        totalCnt,
        pageIndex,
      }));
    }
  };

  useEffect(() => {
    setPaginationInfo((prev) => ({ ...prev, pageIndex: 1 }));
    loadHeritageData(1);
  }, [props.SearchResult]);

  const handlePageChange = (newPage: number) => {
    setPaginationInfo((prev) => ({ ...prev, pageIndex: newPage }));
    loadHeritageData(newPage);
  };

  const displayedData = isSearching
    ? props.SearchResult.slice(
        (paginationInfo.pageIndex - 1) * paginationInfo.pageUnit,
        paginationInfo.pageIndex * paginationInfo.pageUnit
      )
    : heritageData;

  return (
    <div>
      <div className="flex items-center font-pretendard text-gray-400 font-semibold text-xs pl-5 pr-4 space-x-2">
        <div className="flex-grow border-t border-gray-300"></div>
        <span>
          총 {paginationInfo.totalCnt}개의 국가유산이 검색되었습니다. (부속국가유산 포함)
        </span>
      </div>

      {/* 유산 카드 리스트 */}
      <div className="grid grid-cols-5 gap-14 p-5 pt-8">
        {displayedData.map((heritage, index) => (
          <Link
            key={index}
            href={`/culture/detail?ccbaKdcd=${heritage.ccbaKdcd}&ccbaAsno=${heritage.ccbaAsno}&ccbaCtcd=${heritage.ccbaCtcd}`}
            passHref
          >
            <div className="bg-white border border-gray-300 rounded-lg shadow-md h-72 flex flex-col items-start justify-between p-0 cursor-pointer 
                transition duration-300 ease-in-out hover:scale-105">
              {/*  이미지 영역 */}
              <div className="w-full h-48 mb-0 relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gray-200 z-10 rounded-t-lg"></div>
                <img
                  src={heritage.imageUrl && heritage.imageUrl !== "" ? heritage.imageUrl : "/default-image.png"}
                  alt="유산 이미지"
                  className="w-full h-full object-contain z-20 relative rounded-lg"
                />
              </div>
              {/*  텍스트 영역 */}
              <div className="text-left ml-2 mb-3">
                <span className="font-pretendard text-[#4F6CF3] font-semibold text-base">
                  {heritage.ccmaName}
                </span>
                <p className="text-black font-pretendard font-extrabold text-lg">
                  {heritage.ccbaMnm1}
                </p>
                <div className="flex items-center font-pretendard text-gray-600 text-sm font-bold relative translate-y-1">
                <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.57634 11.6889C5.59753 11.699 5.61418 11.7069 5.62598 11.7123L5.64557 11.7213C5.80193 11.7922 5.99588 11.7916 6.15239 11.7216L6.17249 11.7123C6.18429 11.7069 6.20094 11.699 6.22213 11.6889C6.26451 11.6687 6.32507 11.6391 6.40121 11.6004C6.55342 11.5231 6.7683 11.4091 7.02497 11.2595C7.53745 10.9609 8.22124 10.5178 8.90652 9.93896C10.2705 8.78696 11.6871 7.05613 11.6871 4.83018C11.6871 2.19322 9.09581 0.055542 5.89924 0.055542C2.70266 0.055542 0.111328 2.19322 0.111328 4.83018C0.111328 7.05613 1.52801 8.78696 2.89195 9.93896C3.57723 10.5178 4.26102 10.9609 4.7735 11.2595C5.03017 11.4091 5.24505 11.5231 5.39726 11.6004C5.4734 11.6391 5.53396 11.6687 5.57634 11.6889ZM5.89924 6.56642C7.06163 6.56642 8.00393 5.78908 8.00393 4.83018C8.00393 3.87129 7.06163 3.09395 5.89924 3.09395C4.73685 3.09395 3.79454 3.87129 3.79454 4.83018C3.79454 5.78908 4.73685 6.56642 5.89924 6.56642Z"
                  fill="#313131"
                />
              </svg> {heritage.ccbaCtcdNm} {heritage.ccsiName}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/*  페이지네이션 */}
      <Pagination
        currentPage={paginationInfo.pageIndex}
        totalCnt={paginationInfo.totalCnt}
        pageUnit={paginationInfo.pageUnit}
        onPageChange={handlePageChange}
      />
    </div>
  );
}