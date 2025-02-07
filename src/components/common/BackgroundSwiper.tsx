import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

type BackgroundSwiperProps = {
   imgUrl: string;
   place: string;
};

export default function BackgroundSwiper({ bgList }: { bgList: BackgroundSwiperProps[] }) {
   return (
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="w-full h-full"
        speed={1100}
         >
        
         {bgList &&
            bgList.map((list, idx) => (
               <SwiperSlide
                  key={"bgSwiper" + idx}
                  className="w-full h-full bg-center bg-cover"
                  style={{ backgroundImage: `url(${list.imgUrl})` }}>
                  <p className="absolute bottom-4 right-5 text-white bg-neutral-800/30 rounded px-2 py-1 text-sm">{list.place}</p>
               </SwiperSlide>
            ))}
      </Swiper>
   );
}
