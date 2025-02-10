'use client'

import SearchCategory from "./SearchCategory";
import { useCallback, useEffect, useState } from "react";
import { CatCode2String } from "@/components/quiz/CHCategories";

export default function SearchCard() {
  // 지정종목 카테고리
  const jjjm = Object.values(CatCode2String);
  const jjjmCode = Object.keys(CatCode2String).map((item)=>parseInt(item));
  const yhjm = ["유적건조물", "기록유산", "유물", "무형유산", "자연유산", "등록문화유산"]
  const jy = [ "서울", "부산", "대구", "인천", "광주", "대전", "울산", "제주", "세종", "경기", "강원", "충북", "충남", "전북", "전남", "경남", "제주", "전국일원"]
  const sd = ["선사시대", "석기시대", "청동기시대", "철기시대", "삼한시대", "삼국시대", "삼국:고구려", "삼국:백제", "삼국:신라", "발해", "통일신라", "고려시대", "조선시대", "대한제국시대", "일제강점기", "시대미상"]

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [jjjmChecked, setJjjmChecked] = useState(jjjm.map(() => false))
  const [yhjmChecked, setYhjmChecked] = useState(yhjm.map(() => false))
  const [jyChecked, setJyjmChecked] = useState(jy.map(() => false))
  const [sdChecked, setSdChecked] = useState(sd.map(() => false))

  const jjjmCheckedHandler = useCallback(
    (jjjmArray: boolean[]) => {
      setJjjmChecked(jjjmArray)
    },
    [],
  )
  const yhjmCheckedHandler = useCallback(
    (yhjmArray: boolean[]) => {
      setYhjmChecked(yhjmArray)
    },
    [],
  )
  const jyCheckedHandler = useCallback(
    (jyArray: boolean[]) => {
      setJyjmChecked(jyArray)
    },
    [],
  )
  
  const sdCCheckedHandler = useCallback(
    (sdArray: boolean[]) => {
      setSdChecked(sdArray)
    },
    [],
  )

  const selectedItems = [
    ...jjjm.map((item, index) => jjjmChecked[index] ? { category: "지정종목", label: item, checked: true } : null),
    ...yhjm.map((item, index) => yhjmChecked[index] ? { category: "유형분류", label: item, checked: true } : null),
    ...jy.map((item, index) => jyChecked[index] ? { category: "지역", label: item, checked: true } : null),
    ...sd.map((item, index) => sdChecked[index] ? { category: "시대", label: item, checked: true } : null),
  ].filter((item): item is { category: string; label: string; checked: boolean } => item !== null); 
  
  const toggleSearch = () => {
    setIsSearchOpen((prevState) => !prevState);
  };

  const resetSearch = () => {
    setJjjmChecked(jjjm.map(() => false));
    setYhjmChecked(yhjm.map(() => false));
    setJyjmChecked(jy.map(() => false));
    setSdChecked(sd.map(() => false));
  };

  return (
    <div className="relative w-full p-6 pb-2 pr-7">
    <div className="flex justify-end">
      <button
        onClick={toggleSearch}
        className="text-gray-500 text-sm font-semibold z-20 cursor-pointer mb-4 font-pretendard border border-solid border-gray-500 px-3 py-1.5 rounded-md
          hover:bg-gray-500 hover:text-white transition-colors duration-200"
      >
        {isSearchOpen ? "상세검색닫기" : "상세검색열기"}
      </button>
    </div>
  
    {/* 검색창 박스 */}
    <div
      className={`relative w-full bg-white transition-all duration-500 ease-in-out overflow-hidden ${
        isSearchOpen
          ? "max-h-[1000px] border-2 border-solid border-gray-300 p-4"
          : "max-h-0 border-0 p-0"
      }`}
    >
      {isSearchOpen && (
        <>
          <h3 className="text-black text-xl font-semibold font-pretendard">선택된 항목</h3>
          <div className="border-[0.5px] border-solid border-gray-400 w-[5vw] mb-4"></div>
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={resetSearch}
              className="font-pretendard px-3 py-1.5 border border-[#4F6CF3] text-[#4F6CF3] font-semibold rounded-lg 
                hover:text-white hover:bg-[#4F6CF3] transition duration-200"
            >
              검색 초기화
            </button>
            <div className="flex flex-wrap gap-2">
              {selectedItems.length > 0 &&
                selectedItems.map((item, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-2 text-pink-500 text-sm font-semibold"
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      readOnly
                      className="w-4 h-4 appearance-none border border-pink-500 bg-white checked:bg-white 
                        checked:border-pink-500 checked:after:content-['✔'] checked:after:text-xs checked:after:text-pink-500 
                        checked:after:block checked:after:text-center checked:after:relative checked:after:-top-[1.5px]"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
            </div>
          </div>
  
          <div className="relative">
            <button
              className="font-pretendard px-4 py-1.5 border border-[#FF5DAB] text-[#FF5DAB] font-semibold rounded-lg 
                hover:text-white hover:bg-[#FF5DAB] transition duration-200 absolute -top-16 right-1"
            >
              검색하기
            </button>
          </div>
  
          {/* 카테고리박스 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 w-full font-pretendard">
            {/* 지정종목 */}
            <div className="border p-4 rounded-lg shadow-md min-w-[250px] max-h-[300px] overflow-y-auto">
              <h3 className="font-semibold text-lg">지정종목</h3>
              <div className="border-[0.5px] border-solid border-gray-300 w-[62px] mb-4" />
              <SearchCategory
                Categories={[...jjjm]} // 카테고리 항목
                Changed={jjjmCheckedHandler} // 체크박스 상태 변경 함수
                checked={jjjmChecked} // 현재 체크 상태
                category="jjjm" // 카테고리 식별자
              />
            </div>
  
            {/* 지정연도 */}
            <div className="border p-4 rounded-lg shadow-md min-w-[250px] max-h-[200px] overflow-y-auto overflow-x-auto">
              <h3 className="font-semibold text-lg">지정연도</h3>
              <div className="border-[0.5px] border-solid border-gray-300 w-[62px] mb-4" />
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 justify-between mt-5 w-full">
                  <input
                    type="text"
                    placeholder="년"
                    className="border p-2 flex-1 min-w-[100px] rounded-md"
                  />
                  <span className="mt-5 whitespace-nowrap">부터</span>
                  <input
                    type="text"
                    placeholder="년"
                    className="border p-2 flex-1 min-w-[100px] rounded-md"
                  />
                  <span className="mt-5 whitespace-nowrap">까지</span>
                </div>
                <p className="text-base text-gray-500 mt-5 ml-5">예: 1963년부터 1970년까지</p>
              </div>
            </div>
  
            {/* 시대 */}
            <div className="border p-4 rounded-lg shadow-md min-w-[250px] max-h-[615px] overflow-y-auto row-span-2">
              <h3 className="font-semibold text-lg">시대</h3>
              <div className="border-[0.5px] border-solid border-gray-300 w-[32px] mb-4" />
              <SearchCategory
                Categories={[...sd]} // 카테고리 항목
                Changed={sdCCheckedHandler} // 체크박스 상태 변경 함수
                checked={sdChecked} // 현재 체크 상태
                category="sd" // 카테고리 식별자
              />
            </div>
  
            {/* 유형분류 */}
            <div className="border p-4 rounded-lg shadow-md min-w-[250px] max-h-[300px] overflow-y-auto">
              <h3 className="font-semibold text-lg">유형분류</h3>
              <div className="border-[0.5px] border-solid border-gray-300 w-[62px] mb-4" />
              <SearchCategory
                Categories={[...yhjm]} // 카테고리 항목
                Changed={yhjmCheckedHandler} // 체크박스 상태 변경 함수
                checked={yhjmChecked} // 현재 체크 상태
                category="yhjm" // 카테고리 식별자
              />
            </div>
  
            {/* 지역 */}
            <div className="border p-4 rounded-lg shadow-md min-w-[250px] max-h-[395px] overflow-y-auto -mt-24">
              <h3 className="font-semibold text-lg">지역</h3>
              <div className="border-[0.5px] border-solid border-gray-300 w-[32px] mb-4" />
              <SearchCategory
                Categories={[...jy]} // 카테고리 항목
                Changed={jyCheckedHandler} // 체크박스 상태 변경 함수
                checked={jyChecked} // 현재 체크 상태
                category="jy" // 카테고리 식별자
              />
            </div>
          </div>
        </>
      )}
    </div>
  </div>
  


  );
}
