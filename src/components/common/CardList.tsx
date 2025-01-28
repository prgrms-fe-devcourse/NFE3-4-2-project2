import { ListProps } from "@/types/types";
import ListCard from "./ListCard";

// dummyItems 데이터를 외부에서 정의
const dummyItems: ListProps[] = [
   { imageUrl: "/images/lake.png", area: "횡성군", title: "횡성자연휴양림", contentId: "127565", contentTypeId: "12" },
   { imageUrl: "/images/lake.png", area: "춘천", title: "춘천호수", contentId: "127565", contentTypeId: "12" },
   { imageUrl: "/images/lake.png", area: "속초", title: "속초해변", contentId: "127565", contentTypeId: "12" },
   { imageUrl: "/images/lake.png", area: "강릉", title: "경포대", contentId: "127565", contentTypeId: "12" },
   { imageUrl: "/images/lake.png", area: "평창", title: "평창올림픽", contentId: "127565", contentTypeId: "12" },
   { imageUrl: "/images/lake.png", area: "정선", title: "정선아리랑", contentId: "127565", contentTypeId: "12" },
   { imageUrl: "/images/lake.png", area: "원주", title: "원주 레일바이크", contentId: "127565", contentTypeId: "12" },
   { imageUrl: "/images/lake.png", area: "영월", title: "영월 동강", contentId: "127565", contentTypeId: "12" },
   { imageUrl: "/images/lake.png", area: "고성", title: "고성 해수욕장", contentId: "127565", contentTypeId: "12" },
   { imageUrl: "/images/lake.png", area: "홍천", title: "홍천 자작나무숲", contentId: "127565", contentTypeId: "12" },
   { imageUrl: "/images/lake.png", area: "태백", title: "태백산", contentId: "127565", contentTypeId: "12" },
   { imageUrl: "/images/lake.png", area: "동해", title: "동해안", contentId: "127565", contentTypeId: "12" },
];

const CardList = ({ items = dummyItems }: { items?: ListProps[] }) => {
   return (
      <div className="w-[1280px] h-[1376px] mx-auto px-6 mt-16">
         <div className="grid grid-cols-3 gap-8">
            {items.map((item, index) => (
               <ListCard
                  key={index}
                  imageUrl={item.imageUrl}
                  area={item.area}
                  title={item.title}
                  contentId={item.contentId}
                  contentTypeId={item.contentTypeId}
               />
            ))}
         </div>
      </div>
   );
};

export default CardList;
