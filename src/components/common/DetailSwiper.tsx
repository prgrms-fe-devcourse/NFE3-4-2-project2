import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function DetailSwiper({ infoList, imgList }) {
   const swiperRef = useRef<any>(null);
   const prevBtnRef = useRef<HTMLButtonElement | null>(null);
   const nextBtnRef = useRef<HTMLButtonElement | null>(null);

   useEffect(() => {
      if (swiperRef.current && prevBtnRef.current && nextBtnRef.current) {
         swiperRef.current.params.navigation.prevEl = prevBtnRef.current;
         swiperRef.current.params.navigation.nextEl = nextBtnRef.current;
         swiperRef.current.navigation.init();
         swiperRef.current.navigation.update();
      }
   }, []);

   return (
      <div className="relative w-full max-w-[800px] group">
         <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)} //
            pagination={{ clickable: true }}
            navigation={true} // 🔥 useEffect에서 버튼 연결
            autoplay={{ delay: 5000, disableOnInteraction: false }} // 🔥 5초마다 자동 넘김
            loop={true}
            modules={[Pagination, Navigation, Autoplay]}
            className="w-full aspect-[16/9] rounded-lg bg-neutral-200">
            {imgList ? (
               imgList.map((img) => (
                  <SwiperSlide key={img.serialnum} className="flex items-center justify-center">
                     <Image
                        src={img.originimgurl}
                        alt={img.imgname || "축제 이미지"}
                        width={800}
                        height={450}
                        className="rounded-lg object-cover mx-auto"
                     />
                  </SwiperSlide>
               ))
            ) : infoList?.firstimage ? (
               <SwiperSlide>
                  <Image
                     src={infoList?.firstimage || "/images/no_img.jpg"}
                     alt={infoList?.title || "축제 이미지"}
                     width={800}
                     height={450}
                     className="rounded-lg object-cover mx-auto"
                  />
               </SwiperSlide>
            ) : (
               <SwiperSlide>
                  <div className="flex items-center justify-center w-full h-full">
                     <p className="text-xl text-neutral-400">축제 이미지를 준비중입니다.</p>
                  </div>
               </SwiperSlide>
            )}
         </Swiper>

         {/* 🔥 Swiper 내부 좌우 네비게이션 버튼 */}

         <button
            ref={prevBtnRef}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 rounded-full p-3 z-10 opacity-0 group-hover:opacity-100 transition-all">
            <Image src="/images/prev-icon.png" alt="이전" width={20} height={24} />
         </button>
         <button
            ref={nextBtnRef}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 rounded-full p-3 z-10 opacity-0 group-hover:opacity-100 transition-all">
            <Image src="/images/next-icon.png" alt="다음" width={20} height={24} />
         </button>
      </div>
   );
}
