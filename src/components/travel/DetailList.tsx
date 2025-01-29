import Image from "next/image";

interface DetailListProps {
   children: React.ReactNode; // children의 타입을 ReactNode로 지정
   iconUrl?: string;
   title: string;
}

const DetailList: React.FC<DetailListProps> = ({ children, iconUrl, title }) => {
   return (
      <>
         <div className="flex items-center align-middle gap-2">
            {iconUrl && <Image src={iconUrl} alt={title + "아이콘"} width={20} height={20} />}
            <h3 className="text-xl font-bold text-neutral-800">{title}</h3>
         </div>
         <div className="text-xl">{children}</div>
      </>
   );
};
export default DetailList;
