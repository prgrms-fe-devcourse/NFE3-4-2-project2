import { PlaceSelectedChildParam } from "@/types/types";
import regionList from "@/utils/regionList.json";

const PlaceSearchBar: React.FC<PlaceSelectedChildParam> = ({ selected, changeUrl }) => {
   const categories = [
      { name: "식당", link: "explore/places/restaurants", value: "restaurants" },
      { name: "숙소", link: "explore/places/accommodations", value: "accommodations" },
   ];

   return (
      <div className="mx-auto w-[860]  p-7 shadow-xl bg-white rounded-lg">
         <div className="flex justify-between">
            {/* 식당 & 숙소 탭 */}
            <div className="flex gap-x-6 font-bold text-xl items-start">
               {categories.map((cat, idx) => (
                  <button
                     key={cat.value + idx}
                     onClick={()=>{
                        const { detail, ...rest } = selected; //detail 추출
                        changeUrl({ ...rest, cat: cat.value, page: 1 });
                     }}
                     className={`hover:text-sky-500 ${selected.cat === cat.value ? "text-sky-500" : ""}`}>
                     {cat.name}
                  </button>
               ))}
            </div>
            {/* 지역 필터 */}
            <div className="flex">
               <div className="w-[180] mr-2">
                  <p className="text-neutral-500 text-lg pb-2">지역</p>
                  <select
                     className="w-full bg-transparent focus:outline-none border-b border-sky-500 text-lg pb-2"
                     value={selected.filter? selected.filter : ""}
                     onChange={(e) => {
                        changeUrl({ ...selected, filter: e.target.value });
                     }}>
                     <option value="" className="text-neutral-800">
                        전체
                     </option>
                     {regionList.map((region) => (
                        <option key={region.code} value={region.code} className="text-neutral-800">
                           {region.name}
                        </option>
                     ))}
                  </select>
               </div>
            </div>

            {/* 검색 바 */}
            <div className="flex items-start">
               <div className="relative">
                  <input
                     type="text"
                     placeholder="검색어를 입력해 주세요."
                     className="text-lg placeholder:text-base w-72 px-4 py-1 border border-sky-500 rounded-lg  focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                  <i className="bi bi-search text-sky-500 absolute right-3 top-[4] text-lg"></i>
               </div>
               <button className="px-6 py-1 text-white bg-sky-500 text-lg font-medium rounded-lg ml-2 flex-grow"> 검색</button>
            </div>
         </div>
      </div>
   );
};

export default PlaceSearchBar;
