import ListCard from "./ListCard";

const CardList = () => {
  const items = [
    {
      imageUrl: "/images/lake.png",
      title: "횡성군",
      subtitle: "횡성자연휴양림",
    },
    { imageUrl: "/images/lake.png", title: "춘천", subtitle: "춘천호수" },
    { imageUrl: "/images/lake.png", title: "속초", subtitle: "속초해변" },
    { imageUrl: "/images/lake.png", title: "강릉", subtitle: "경포대" },
    { imageUrl: "/images/lake.png", title: "평창", subtitle: "평창올림픽" },
    { imageUrl: "/images/lake.png", title: "정선", subtitle: "정선아리랑" },
    {
      imageUrl: "/images/lake.png",
      title: "원주",
      subtitle: "원주 레일바이크",
    },
    { imageUrl: "/images/lake.png", title: "영월", subtitle: "영월 동강" },
    { imageUrl: "/images/lake.png", title: "고성", subtitle: "고성 해수욕장" },
    {
      imageUrl: "/images/lake.png",
      title: "홍천",
      subtitle: "홍천 자작나무숲",
    },
    { imageUrl: "/images/lake.png", title: "태백", subtitle: "태백산" },
    { imageUrl: "/images/lake.png", title: "동해", subtitle: "동해안" },
  ];

  return (
    <div className="w-[1280px] h-[1376px] mx-auto px-6 mt-16">
      <div className="grid grid-cols-3 gap-8">
        {items.map((item, index) => (
          <ListCard
            key={index}
            imageUrl={item.imageUrl}
            title={item.title}
            subtitle={item.subtitle}
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;
