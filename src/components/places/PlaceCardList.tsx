import Link from "next/link";
import { useEffect, useState } from "react";
import { ListProps, PlaceParam, PlaceSelectedChildParam } from "@/types/types";
import Pagination from "@/components/common/Pagination";
import RestaurantCard from "./restaurantCard";
import EmptyListCard from "@/components/common/EmptyListCard";
import EmptyData from "@/components/common/EmptyData";

const PlaceCardList: React.FC<PlaceSelectedChildParam> = ({ selected, changeUrl }) => {
   const [tourData, setTourData] = useState<ListProps[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [totalPages, setTotalPages] = useState<number>(1);

   const createQueryString = (selected: PlaceParam): string => {
      const params = new URLSearchParams();

      if (selected.cat) params.append("cat", selected.cat);
      if (selected.page) params.append("page", selected.page.toString());
      if (selected.filter) params.append("filter", selected.filter);
      if (selected.detail) params.append("detail", selected.detail);

      return params.toString(); // 쿼리 문자열 형식으로 반환
   };

   useEffect(() => {
      
      const fetchData = async () => {
         try {
            let response: ListProps[] = [];

            console.log(`🌸 [API 요청] 관광지 리스트 가져오기 🌸`);
            const queryString = createQueryString(selected)
            const dataList = await fetch(`/api/places?${queryString}`).then(response => response.json());
            response = dataList.data;
            setTotalPages(Number(dataList.totalPages));

            console.log(`🔍 API 응답 데이터 개수: ${dataList.totalCount}`);
            if(response){
               setTourData(
                  response.map((item)=>({
                     imageUrl: item.imageUrl,
                     title: item.title,
                     area: item.area,
                     contentId: item.contentId,
                     contentTypeId: item.contentTypeId,
                     cat3:item.cat3
                  }))
               )
            }
            setLoading(false);
         } catch (err) {
            console.log("❌ API 요청 실패:", err);
            setLoading(false);
         }
      };
      fetchData();
   }, [selected]);

   if (loading) {
      return (
         <div className="w-[1280px] h-[1376px] mx-auto px-6 mt-16">
            <div className="grid grid-cols-3 gap-8">
               <EmptyListCard />
            </div>
         </div>
      );
   }

   if (totalPages == 0 || !totalPages) {
      return <EmptyData />;
   }

   return (
      <div className="max-w-screen-xl mx-auto mb-28">
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {tourData.map((item, index) => {
               console.log("item is : ", item);
               return(
               <Link key={index} href={`/explore/places/restaurants/detail?contentId=${item.contentId}`}>
                  <RestaurantCard
                     imageUrl={item.imageUrl}
                     title={item.title}
                     area={item.area}
                     category={item.cat3 || ""}
                     buttonText="영업중"
                  />
               </Link>
            )
            })}
         </div>
         {totalPages > 1 && <Pagination totalPages={totalPages} selected={selected} changeUrl={changeUrl} />}
      </div>
   );
};
export default PlaceCardList;
