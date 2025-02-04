// 식당 및 숙소 - 식당 카드 컴포넌트
import Image from "next/image";
import restaurants from "@/utils/restaurantList.json";

interface RestaurantCardProps {
   imageUrl: string;
   title: string;
   area: string;
   category: string;
   buttonText: string;
}

const RestaurantCard = ({ imageUrl, title, area, category, buttonText }: RestaurantCardProps) => {
   
   const categoryParsing = restaurants.find(item => item.cat3 === category)?.text || "기타";
   const addressParsing = area.match(/(?<=강원특별자치도).{4}/);

   return (
      <div className="relative h-[288px] bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:transform hover:translate-y-[-5px] cursor-pointer flex flex-col border border-neutral-200">
         <div className="w-full h-3/5 relative">
            <Image src={imageUrl} alt={title} fill style={{objectFit:"cover"}} />
         </div>

         <div className="p-4 flex flex-col flex-grow">
            <div className="text-base font-medium text-neutral-500">{addressParsing ? addressParsing[0] : "오류"}</div>
            <div className="text-2xl font-semibold text-neutral-800">{title}</div>
            <div className="text-lg font-semibold text-neutral-500">{categoryParsing}</div>
            <div className="mt-auto ml-auto">
               <button
                  className={`w-[72px] h-[28px] flex justify-center items-center text-sm font-semibold rounded-lg ${
                     buttonText === "영업중"
                        ? "bg-amber-100 text-sky-500 hover:bg-amber-50 "
                        : "bg-sky-100 text-neutral-500 cursor-not-allowed"
                  }`}
                  disabled={buttonText !== "영업중"}
                  onClick={() => alert("영업중 버튼 클릭됨")}>
                  {buttonText}
               </button>
            </div>
         </div>
      </div>
   );
};

export default RestaurantCard;
