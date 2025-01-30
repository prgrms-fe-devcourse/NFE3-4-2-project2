// 식당 및 숙소 - 숙소 카드 컴포넌트
import Image from "next/image";

interface AccommodationCardProps {
   imageUrl: string;
   title: string;
   area: string;
   category: string;
   buttonText: string;
}

const AccommodationCard = ({ imageUrl, title, area, category, buttonText }: AccommodationCardProps) => {
   return (
      <div className="relative w-[300px] h-[326px] bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:translate-y-[-5px] cursor-pointer flex flex-col">
         {/* 이미지 */}
         <div className="w-full h-[198px] relative">
            <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
         </div>

         <div className="px-4 py-2 flex flex-col flex-grow">
            {/* 지역 텍스트 */}
            <div className="text-base font-light text-neutral-500">{area}</div>
            {/* 타이틀 */}
            <div className="text-2xl font-semibold text-neutral-800">{title}</div>
            {/* 숙소 카테고리 */}
            <div className="text-xl font-semibold text-neutral-500 mb-2">{category}</div>
            {/* 영업중 여부 버튼 */}
            <div className="mt-auto ml-auto">
               <button
                  className={`w-[69px] h-[28px] flex justify-center items-center text-sm font-semibold rounded-lg ${
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

export default AccommodationCard;
