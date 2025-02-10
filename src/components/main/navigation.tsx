// 외부
import Image from "next/image";

// 내부
import ButtonGroup from "./buttonGroup";

export default function Navigation() {
  return (
    <div className="z-0 relative overflow-hidden w-full h-[450px] ">
      <div className="w-full h-full flex items-center md:mt-48 mt-0 justify-center scale-150">
        <img
          className="brightness-50"
          src="https://cdn.pixabay.com/photo/2022/10/08/14/03/gyeongbokgung-palace-7507027_1280.jpg"
          alt="Gyeongbokgung Palace"
          style={{
            objectFit: "contain",
            objectPosition: "center", // 상단 중심 정렬
          }}
        />
      </div>
      {/* 제목 */}
      <div className="flex flex-col gap-5 justify-center items-center absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-5xl text-white">
        <div className="">
          <span className="font-semibold text-6xl font-pretendard">감투 </span>
          <span className="font-semibold text-2xl font-pretendard">
            {" "}
            : [ 감춰진 역사 투어]
          </span>
        </div>
        {/* 검색창 */}
        <div className="relative flex flex-row">
          <input
            className="opacity-75 w-[550px] px-8 rounded-2xl h-10 text-lg font-semibold font-pretendard text-black"
            placeholder="검색어를 입력해주세요"
            type="text"
          />{" "}
          <button className="absolute top-2 right-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {/* 버튼 */}
        <div className="absolute top-[180px]">
          <ButtonGroup />
        </div>
      </div>
    </div>
  );
}
