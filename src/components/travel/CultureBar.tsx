import React, { useEffect, useState } from "react";
import Image from "next/image";
import { SelectedChildParam } from "@/types/types";

const CultureBar: React.FC<SelectedChildParam> = ({ selected, changeUrl }) => {
   const [active, setActive] = useState("")

   useEffect(()=>{
      if(selected?.filter){setActive(selected.filter);}
   },[])

   const handleClick = (cultureQuery:string)=>{
      setActive(cultureQuery)
      changeUrl({cat:selected.cat, filter:cultureQuery, page:1})
   }

   const cultureData = [
      { culture: "미술관·박물관", imageSrc: "/images/culture/museum.png", description: "예술과 역사를 한눈에", query :"museum" },
      { culture: "유적지", imageSrc: "/images/culture/historic.png", description: "과거를 따라 유적지 탐방", query :"historic" },
      { culture: "종교", imageSrc: "/images/culture/religion.png", description: "신성한 여정, 종교 성지", query :"religion" },
      { culture: "기타", imageSrc: "/images/culture/etc.png", description: "다양한 매력, 특별한 장소", query :"etc" },
   ];

   return (
      <div className="flex justify-center items-center mt-2 w-full gap-16">
         {cultureData.map((culture) => (
            <div
               key={culture.query}
               className={`relative flex flex-col items-center cursor-pointer transition-all p-4 rounded-md 
                  ${ active === culture.query ? "scale-105" : "hover:scale-105 hover:shadow-xl"}`
               }
               onClick={()=>{handleClick(culture.query)}}
            >
               <Image src={culture.imageSrc} alt={culture.culture} width={72} height={72} className="object-cover rounded-md" />
               <span className="text-lg font-semibold text-neutral-800 mt-2">{culture.culture}</span>
               <span className="text-base font-normal text-neutral-500 mt-2">{culture.description}</span>

               {/* 🔹 선택된 항목에 밑줄 추가 */}
               <div
                  className={`
                     absolute bottom-0 left-0 right-0 h-[2px] bg-sky-500 transition-all duration-200 transform 
                     ${active === culture.query ? "scale-x-100" : "scale-x-0"}
                  `}
               />
            </div>
         ))}
      </div>
   );
};

export default CultureBar;
