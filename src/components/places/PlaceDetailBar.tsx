import { PlaceSelectedChildParam } from "@/types/types";
import { useEffect, useState } from "react";

import restaurantList from "@/utils/restaurantList.json"
import accommodationList from "@/utils/accommodationList.json"
import style from "@/styles/placeDetail.module.css";

import Image from "next/image";

interface PlaceType{
    src:string,
    text:string,
    cat3:string
}


const PlaceDetailBar:React.FC<PlaceSelectedChildParam>=({selected, changeUrl})=>{
    const [nowList, setNowList] = useState<PlaceType[]>([]);

    useEffect(() => {
        if(selected.cat === "restaurant"){
            setNowList(restaurantList)
        }else if(selected.cat === "accommodation"){
            setNowList(accommodationList)
        }else{
            setNowList(restaurantList)
        }
    }, [selected.cat]);
    
    return(<div className="max-w-screen-xl mx-auto">
        <div className="flex gap-6 justify-center items-center mb-[145px]">
           {nowList.map(({src,text,cat3}) => (
              <button 
                    key={cat3} 
                    className={`${style.button} ${selected.detail === cat3 ? style.active : ""}`}
                    onClick={()=>{changeUrl({...selected, page:1, detail:cat3})}}
                >
                 <div className="items-center justify-center bg-neutral-100">
                    <Image src={src} alt={text} width={128} height={128} />
                 </div>
                <span className="text-lg mt-2">{text}</span>
              </button>
           ))}
        </div>
     </div>)
}

export default PlaceDetailBar;