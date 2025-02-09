import Image from "next/image";

import { ListProps } from "@/types/types";

const ListCard: React.FC<ListProps> = ({ imageUrl, title, area }) => {
  return (
    <div className="relative bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:translate-y-[-5px] cursor-pointer">
      {" "}
      <div className="w-full h-[198px] relative">
        <Image src={imageUrl} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{objectFit:"cover"}} />
      </div>
      <div className="px-4 py-2 h-[100px]">
        <div className="text-base text-neutral-600">{area}</div>
        <div className="text-lg font-semibold text-neutral-800">{title}</div>
      </div>
    </div>
  );
};

export default ListCard;