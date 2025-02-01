"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import DetailList from "@/components/travel/DetailList";
import APIConnect from "@/utils/api";
import { AccommodationDetailInfo, TourImg, CatList } from "@/types/types";
import catListJson from "@/utils/catList.json";
import KakaoMap from "@/components/common/KakaoMap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useSearchParams } from "next/navigation";

const catList = catListJson as CatList;

const AccommodationDetailPage: React.FC = () => {
  //  const params = useSearchParams();
  //  const contentId = params.get("contentId");

   const blankbox = <span className="bg-neutral-200 rounded px-24">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>;

   const swiperRef = useRef<any>(null);
   const prevBtnRef = useRef<HTMLButtonElement | null>(null);
   const nextBtnRef = useRef<HTMLButtonElement | null>(null);

   const [infoList, setAccommodationInfo] = useState<AccommodationDetailInfo | null>(null);
   const [imgList, setImgList] = useState<TourImg[]>([]);

   useEffect(() => {
      const loadData = async () => {
        //  if (!contentId) return;

         try {
            const contentId = 142816;
            const info: AccommodationDetailInfo = await APIConnect.getAccommodationInfo(contentId);
            const img = await APIConnect.getTourImg(contentId);

            setAccommodationInfo(info);
            setImgList(img);
         } catch (error) {
            console.error("데이터 로딩 오류:", error);
         }
      };

      loadData();

      if (swiperRef.current && prevBtnRef.current && nextBtnRef.current) {
         swiperRef.current.params.navigation.prevEl = prevBtnRef.current;
         swiperRef.current.params.navigation.nextEl = nextBtnRef.current;
         swiperRef.current.navigation.init();
         swiperRef.current.navigation.update();
      }
   }, []);

   const getContentCategory = (key: string | undefined) => {
      return (
         <>
            <span>{catList[key]?.cat2 || "카테고리 없음"}</span> · <span>{catList[key]?.cat3 || "상세 없음"}</span>
         </>
      );
   };

   const convertBrToSpan = (htmlString: string) => {
      const parts = htmlString.split(/<br\s*\/?>/gi);
      return parts.map((part, idx) => <p key={idx}>{part}</p>);
   };

   return (
      <div className="min-h-screen">
         <Header />
         <main className="mx-auto max-w-screen-xl px-4 py-8">
            {/* 뒤로 가기 버튼 */}
            <div className="flex justify-start mb-4">
               <button className="flex items-center space-x-2" onClick={() => window.history.back()}>
                  <Image src="/images/goback.png" alt="뒤로 가기" width={16} height={16} />
                  <span className="text-sky-500 text-lg font-semibold">목록</span>
               </button>
            </div>

            {/* Title Section */}
            <div className="text-center">
               <h2 className="text-4xl font-bold text-neutral-800 mb-2">{infoList?.title || blankbox}</h2>
               <p className="text-xl font-normal text-neutral-800">
            {infoList ? catList[infoList.cat3]?.cat2 + " · " + catList[infoList.cat3]?.cat3 : blankbox}
          </p>
            </div>

            {/* Image and Info */}
            <div className="flex gap-12 my-12">
               <div className="relative w-full max-w-[800px]">
                  <Swiper
                     onSwiper={(swiper) => (swiperRef.current = swiper)}
                     pagination={{ clickable: true }}
                     navigation={true}
                     autoplay={{ delay: 5000, disableOnInteraction: false }}
                     loop={true}
                     modules={[Pagination, Navigation, Autoplay]}
                     className="w-full aspect-[16/9] rounded-lg bg-neutral-200"
                  >
                     {Array.isArray(imgList) && imgList.length > 0 ? (
                        imgList.map((img) => (
                           <SwiperSlide key={img.serialnum} className="flex items-center justify-center">
                              <Image src={img.originimgurl} alt={img.imgname || "숙소 이미지"} width={800} height={450} className="rounded-lg object-cover mx-auto" />
                           </SwiperSlide>
                        ))
                     ) : (
                        <SwiperSlide>
                           <div className="flex items-center justify-center w-full h-full">
                              <p className="text-xl text-neutral-400">이미지가 없습니다.</p>
                           </div>
                        </SwiperSlide>
                     )}
                  </Swiper>
               </div>

               <div className="flex flex-col justify-between max-w-[480px] gap-12">
                  {/* Info Section */}
                  <DetailList iconUrl="/images/address.png" title="주소">{infoList?.addr || blankbox}</DetailList>
                  <DetailList iconUrl="/images/tel.png" title="문의처">{infoList?.tel || blankbox}</DetailList>
                  <DetailList iconUrl="/images/time.png" title="체크인 / 체크아웃">
                     {infoList ? `${infoList.checkin} / ${infoList.checkout}` : blankbox}
                  </DetailList>
                  <DetailList iconUrl="/images/parking.png" title="주차">{infoList?.parking || blankbox}</DetailList>
                  <DetailList iconUrl="/images/facilities.png" title="편의시설">{infoList?.facilities || blankbox}</DetailList>
               </div>
            </div>

            {/* 객실 정보 */}
            <section>
               <h3 className="text-2xl font-bold mb-6">객실 정보</h3>
               {infoList?.rooms && infoList.rooms.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                     {infoList.rooms.map((room, index) => (
                        <DetailList key={index} title={room.roomTitle}>
                           <p>크기: {room.roomSize}㎡</p>
                           <p>기본 인원: {room.baseCapacity}명</p>
                           <p>최대 인원: {room.maxCapacity}명</p>
                           <p>요금: {room.priceLow} ~ {room.priceHigh}원</p>
                        </DetailList>
                     ))}
                  </div>
               ) : blankbox}
            </section>

            <hr className="my-12" />

            {/* 소개 */}
            <section>
               <h3 className="text-2xl font-bold mb-6">숙소 소개</h3>
               <p className="text-neutral-800 leading-relaxed text-lg">{infoList?.overview || blankbox}</p>
            </section>

            <hr className="my-12" />

            {/* 위치 정보 */}
            <section>
               <h3 className="text-2xl font-bold mb-6">위치</h3>
               {infoList?.mapx && infoList?.mapy && (
                  <div className="h-[500px]">
                     <KakaoMap mapx={infoList.mapx} mapy={infoList.mapy} title={infoList.title} />
                  </div>
               )}
            </section>
         </main>
         <Footer />
      </div>
   );
};

export default AccommodationDetailPage;
