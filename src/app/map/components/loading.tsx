import Portal from "@/components/Potal";

export function Loading({}) {
  return (
    <Portal>
      <div className="w-full h-full flex justify-center items-center flex-col z-[1000] fixed bg-white/90">
        <div className="w-28 h-28 overflow-hidden rounded-full bg-white flex flex-col items-center justify-center">
          <img
            src="/icons/map_loading_ani_icon.gif"
            alt="Loading icon"
            width={100}
            height={100}
          />
          {/* <div className="relative">
              <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
              <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-pink-500 border-t-transparent"></div>
            </div> */}
        </div>
        <div className="py-2">
          <p className=" font-medium">우리의 문화유산 들여다보는 중</p>
        </div>
      </div>
    </Portal>
  );
}
