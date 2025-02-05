import { PlaceSelectedChildParam } from "@/types/types";
import { useEffect, useState } from "react";

import restaurantList from "@/utils/restaurantList.json";
import accommodationList from "@/utils/accommodationList.json";
import style from "@/styles/placeDetail.module.css";

import Image from "next/image";

interface PlaceType {
   src: string;
   text: string;
   cat3: string;
   type: string;
}

const PlaceDetailBar: React.FC<PlaceSelectedChildParam> = ({ selected, changeUrl }) => {
   const [nowList, setNowList] = useState<PlaceType[]>([]);

   useEffect(() => {
      if (selected.cat === "restaurants") {
         setNowList(restaurantList);
      } else if (selected.cat === "accommodations") {
         setNowList(accommodationList);
      } else {
         setNowList(restaurantList);
      }
   }, [selected.cat]);

   const handleClick = (type: string) => {
      if (selected.detail === type) {
         changeUrl({ ...selected, detail: "", page: 1 }); // 전체 리스트 가져오기
      } else {
         changeUrl({ ...selected, detail: type, page: 1 });
      }
   };

   return (
      <div className="max-w-screen-xl mx-auto mt-10 mb-16">
         <div className="flex gap-6 justify-center items-center">
            {nowList.map(({ src, text, type, cat3 }) => (
               <button
                  key={cat3}
                  className={`${style.button} ${selected.detail === type ? style.active : ""}`}
                  onClick={() => {
                     changeUrl({ ...selected, page: 1, detail: type });
                     handleClick(type);
                  }}>
                  <div className="items-center justify-center bg-neutral-100">
                     <Image src={src} alt={text} width={128} height={128} />
                  </div>
                  <span className="text-lg mt-2">{text}</span>
               </button>
            ))}
         </div>
      </div>
   );
};

export default PlaceDetailBar;
