import { useRef, useState } from "react";
import Image from "next/image";
import { ListProps } from "@/types/types";
import Link from "next/link";

export default function SearchSection() {
   const [nowSearching, setNowSearching] = useState(false);
   const [totalLength, setTotalLength] = useState(0);
   const [tourData, setTourData] = useState<ListProps[]>([]);
   const [page, setPage] = useState(1); // 현재 페이지
   const searchRef = useRef<HTMLInputElement>(null);

   const handleSearch = async () => {
      if (searchRef.current) {
         if (searchRef.current.value === "") return;
         if (searchRef.current.value.length < 2) {
            alert("두 글자 이상 입력해주세요.");
            return;
         }

         try {
            console.log(`🌸 [API 요청] 관광지 리스트 가져오기 (page=1)`);
            const dataList = await fetch(`/api/places?keyword=${searchRef.current.value}&page=1`).then((response) =>
               response.json(),
            );

            if (dataList.data) {
               setTourData(dataList.data);
               setTotalLength(dataList.totalCount);
               setPage(1); // 검색할 때 page 초기화
               setNowSearching(true);
            }
         } catch (err) {
            console.log("❌ API 요청 실패:", err);
         }
      }
   };

   const loadMoreData = async () => {
      const nextPage = page + 1;

      try {
         console.log(`📌 [API 요청] 추가 데이터 가져오기 (page=${nextPage})`);
         const dataList = await fetch(`/api/places?keyword=${searchRef.current?.value}&page=${nextPage}`).then((response) =>
            response.json(),
         );

         if (dataList.data.length > 0) {
            setTourData((prev) => [...prev, ...dataList.data]); // 기존 데이터 + 새로운 데이터 추가
            setPage(nextPage);
         }
      } catch (err) {
         console.log("❌ 추가 데이터 로딩 실패:", err);
      }
   };

   return (
      <div>
        <div className="contents-wrap">
        <div
            className="w-full max-w-screen-lg mx-auto relative my-20 flex items-center gap-3
            rounded-full px-6 py-3 border-2 border-sky-400 outline outline-white outline-2 transition-all 
            group focus-within:outline-sky-200">
            <Image src="/icons/main_search.svg" alt="search 아이콘" width={18} height={18} />
            <input
               ref={searchRef}
               type="text"
               placeholder="가을 캠핑 관광지"
               className="border-none outline-none w-full text-2xl font-medium 
               placeholder:text-2xl placeholder:font-medium"
               onKeyDown={(e) => {
                  if (e.key === "Enter") {
                     handleSearch();
                  }
               }}
            />
         </div>
        </div>
         {nowSearching && (
            <div className="w-full bg-neutral-50 py-10 mb-12">
               <div className="contents-wrap overflow-visible text-center">
                  <h4 className="mb-4 text-2xl font-bold text-left">
                     검색결과{" "}
                     <span className="font-medium text-base text-neutral-400 ml-2">총 {totalLength}건</span>
                  </h4>
                  <div className={`w-full text-left grid gap-2 items-stretch  ${totalLength < 24 ? "grid-cols-2" : "grid-cols-3 max-lg:grid-cols-2"}`}>
                     {tourData.map((item) => {
                        const parsed = item.area.replace("강원특별자치도", "").trim().split(" ");
                        const addressParsing = parsed.slice(0, 2).join(" ");
                        let conType = "travel";

                        if(item.contentTypeId == 15){
                            conType="festival"
                        }else if(item.contentTypeId == 28){
                            conType="leisure"
                        }else if(item.contentTypeId == 32 || item.contentTypeId == 39){
                            conType="places"
                        }

                        return (
                           <Link key={item.contentId} href={`explore/${conType}/detail?contentId=${item.contentId}`}>
                              <div className="text-lg border border-neutral-300 rounded-xl px-4 py-3 flex gap-3 items-start h-full">
                                 <div
                                    className="w-14 aspect-square rounded-full relative bg-cover"
                                    style={{ backgroundImage: `url(${item.imageUrl})` }}></div>
                                 <div>
                                    <p className="text-sm">{addressParsing}</p>
                                    <p className="font-semibold">{item.title}</p>
                                 </div>
                              </div>
                           </Link>
                        );
                     })}
                  </div>
                  {tourData.length < totalLength && (
                     <button
                        onClick={loadMoreData}
                        className="
                            py-2 px-4 w-full max-w-[400] rounded-md text-lg font-normal text-neutral-500 outline outline-1 outline-neutral-300 hover:bg-neutral-200
                            mt-8
                        ">
                        더보기
                     </button>
                  )}
               </div>
            </div>
         )}
      </div>
   );
}
