import Image from "next/image";

interface ListCardProps {
  imageUrl: string;
  title: string;
  subtitle: string;
}

const ListCard: React.FC<ListCardProps> = ({ imageUrl, title, subtitle }) => {
  return (
    <div className="relative bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:translate-y-[-5px] cursor-pointer">
      {" "}
      <div className="w-full h-[198px] relative">
        <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="px-4 py-2 h-[100px]">
        <div className="text-base text-neutral-600">{title}</div>
        <div className="text-lg font-semibold text-neutral-800">{subtitle}</div>
      </div>
    </div>
  );
};

export default ListCard;
