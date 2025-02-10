export default function HeroImage() {
  return (
    <div className="relative w-full h-72">
      <img
        src="https://cdn.pixabay.com/photo/2015/12/16/03/45/korea-1095361_1280.jpg"
        alt="CultureImage"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
      <div className="absolute top-32 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center">
        <h1 className="text-white text-5xl font-extrabold font-pretendard">
          국가유산 조회
        </h1>
      </div>
    </div>
  );
}
