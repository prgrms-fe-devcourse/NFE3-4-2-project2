// 식당 및 숙소 - 식당 카드 컴포넌트
import Image from "next/image";

import { PlaceParam } from "@/types/types";
import accommodation from "@/utils/accommodationList.json";
import restaurants from "@/utils/restaurantList.json";

interface RestaurantCardProps {
   selected: PlaceParam;
   imageUrl: string;
   title: string;
   area: string;
   category: string;
}

const RestaurantCard = ({ selected, imageUrl, title, area, category }: RestaurantCardProps) => {
   let categoryParsing;
   if(selected.cat === "restaurants"){
       categoryParsing= restaurants.find((item) => item.cat3 === category)?.text || "기타";
   }else{
      categoryParsing= accommodation.find((item) => item.cat3 === category)?.text || "기타";
   }
   const addressParsing = area.match(/(?<=강원특별자치도).{4}/);

   return (
      <div 
         className="relative bg-white rounded-xl overflow-hidden transition-all duration-300 
         group hover:shadow-xl hover:transform hover:translate-y-[-5px] 
         cursor-pointer flex flex-col border border-neutral-300   
      ">
         <div className="w-full aspect-video relative rounded-md overflow-hidden">
            <div className="w-full h-full absolute z-10 bg-gradient-to-b from-black/25 to-transparent via-transparent via-30%"></div>
            <Image
               src={imageUrl}
               alt={title}
               fill
               sizes="(max-width: 768px) 100vw, 50vw"
               style={{ objectFit: "cover" }}
            />
         </div>

         <div className="p-4 flex flex-col flex-grow-0 whitespace-nowrap">
            <div className="text-base font-normal text-neutral-500">{categoryParsing}</div>
            <div className="text-xl font-semibold text-neutral-800 overflow-hidden text-ellipsis">{title}</div>
            <button
               className={`
                  w-[60px] h-[28px] text-sm font-semibold rounded-sm bg-amber-100 text-sky-600 absolute z-20 top-3 left-3
                  group-hover:bg-sky-500 group-hover:text-amber-50 transition
               `}>
               {addressParsing}
            </button>
         </div>
      </div>
   );
};

export default RestaurantCard;
