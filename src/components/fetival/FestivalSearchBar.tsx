import { SelectedParam } from "@/types/types";
import regionList from "@/utils/regionList.json";
import { useRef } from "react";

// 축제 = a0207
// 공연/행사 = a0208
const categories = [
   { name: "전체", value: "total" }, // 전체 리스트 보기
   { name: "축제", value: "festival" },
   { name: "공연/행사", value: "event" },
];

type ExtraSearchBarProps = {
      selected: SelectedParam & ExtraType;
      changeUrl: (url: SelectedParam & ExtraType) => void;
}
type ExtraType = {
   month?: string;
   keyword?: string;
};

const FestivalSearchBar: React.FC<ExtraSearchBarProps> = ({ selected, changeUrl }) => {
   const searchRef = useRef<HTMLInputElement>(null);
   const handleSearch = () => {
      if(searchRef.current){
         changeUrl({ ...selected, keyword: searchRef.current.value});
      }
   };
   return (
      <div className="mt-6 w-full max-w-[800px] p-6 shadow-lg bg-white rounded-lg">
         <div className="flex justify-between items-center mb-4">
            {/* 카테고리 */}
            <ul className="flex gap-5 text-xl font-bold cursor-pointer">
               {categories.map((category) => (
                  <li
                     key={category.value}
                     onClick={() => changeUrl({ cat: category.value, page: 1 })}
                     className={
                        selected.cat === category.value ? "text-sky-500" : "text-neutral-800 hover:text-sky-500"
                     }>
                     {category.name}
                  </li>
               ))}
            </ul>
            {/* 검색 바 */}
            <div className="flex">
               <div className="relative">
                  <input
                     ref={searchRef}
                     type="text"
                     placeholder="검색어를 입력해 주세요."
                     className="h-[32px] w-72 p-3 pr-10 border border-sky-500 rounded-lg placeholder:text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                     onKeyDown={(e)=>{
                        if(e.key === "Enter"){handleSearch()}
                     }}
                  />
                  <svg
                     aria-hidden="true"
                     fill="currentColor"
                     viewBox="0 0 20 20"
                     className="w-4 h-4 absolute top-1/2 right-3 transform -translate-y-1/2 text-sky-500">
                     <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                  </svg>
               </div>
               <button
                  className="h-[32px] px-4 text-white bg-sky-500 text-sm font-medium rounded-lg ml-2"
                  onClick={handleSearch}>
                  검색
               </button>
            </div>
         </div>
         <div className="flex mt-4 gap-4">
            <div className="w-[180]">
               <p className="text-neutral-500 text-lg pb-2">지역</p>
               <select
                  className="w-full bg-transparent focus:outline-none border-b border-sky-500 text-lg pb-2 text-neutral-800"
                  value={selected.filter ? selected.filter : ""}
                  onChange={(e) => {
                     changeUrl({ ...selected, filter: e.target.value });
                  }}>
                  <option value="">전체</option>
                  {regionList.map((region) => (
                     <option key={region.code} value={region.code}>
                        {region.name}
                     </option>
                  ))}
               </select>
            </div>
            <div className="w-[150px]">
               <p className="text-neutral-500 text-lg pb-2">날짜</p>
               <select
                  className="w-full bg-transparent focus:outline-none border-b border-sky-500 text-lg pb-2 text-neutral-800"
                  onChange={(e) => {
                     changeUrl({ ...selected, month: e.target.value });
                  }}>
                  <option value="" className="text-neutral-800">
                     전체
                  </option>
                  <option value={"01"} className="text-neutral-800">
                     1월
                  </option>
                  <option value={"02"} className="text-neutral-800">
                     2월
                  </option>
                  <option value={"03"} className="text-neutral-800">
                     3월
                  </option>
                  <option value={"04"} className="text-neutral-800">
                     4월
                  </option>
                  <option value={"05"} className="text-neutral-800">
                     5월
                  </option>
                  <option value={"06"} className="text-neutral-800">
                     6월
                  </option>
                  <option value={"07"} className="text-neutral-800">
                     7월
                  </option>
                  <option value={"08"} className="text-neutral-800">
                     8월
                  </option>
                  <option value={"09"} className="text-neutral-800">
                     9월
                  </option>
                  <option value={"10"} className="text-neutral-800">
                     10월
                  </option>
                  <option value={"11"} className="text-neutral-800">
                     11월
                  </option>
                  <option value={"12"} className="text-neutral-800">
                     12월
                  </option>
               </select>
            </div>
         </div>
      </div>
   );
};

export default FestivalSearchBar;
