"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import DetailList from "@/components/travel/DetailList";
import APIConnect from "@/utils/api";
import { TourDetailInfo, TourImg, CatList } from "@/types/types";
import catListJson from "@/utils/catList.json";
import KakaoMap from "@/components/common/KakaoMap";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useSearchParams } from "next/navigation";

import { getCookie, setCookie } from "@/utils/cookie";

const catList = catListJson as CatList;

const FestivalDetailPage: React.FC = () => {

  const params = useSearchParams();
  const key = Number(params.get("contentId"));

  const blankbox = <span className="bg-neutral-200 rounded px-24">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>;

  const swiperRef = useRef<any>(null); // 🔥 Swiper 인스턴스 저장
  const prevBtnRef = useRef<HTMLButtonElement | null>(null);
  const nextBtnRef = useRef<HTMLButtonElement | null>(null);
 
  const [infoList, setInfoList] = useState<TourDetailInfo>();
  const [imgList, setImgList] = useState<TourImg[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isVisited, setIsVisited] = useState(false);
  const [stateTrigger, setStateTrigger] = useState(0);
  const [storedUserId, setStoredUserId] = useState<string | null>(null);
  
    useEffect(() => {
      setStoredUserId(getCookie("userId"));
    }, []);

   useEffect(() => {
      const loadData = async () => {
         const infoList: TourDetailInfo = await APIConnect.getFestivalInfo(key);
         const img = await APIConnect.getTourImg(key);

         setInfoList(infoList);
         setImgList(img);
      };

      loadData();

      if (storedUserId) {
         // ✅ 사용자별 찜 & 다녀온 여행지 데이터 로드
         const favoritePlaces = JSON.parse(getCookie(`favorites_${storedUserId}`) || "[]");
         setIsFavorite(favoritePlaces.includes(key));

         const visitedPlaces = JSON.parse(getCookie(`visited_${storedUserId}`) || "[]");
         setIsVisited(visitedPlaces.includes(key));
      }

      if (swiperRef.current && prevBtnRef.current && nextBtnRef.current) {
        swiperRef.current.params.navigation.prevEl = prevBtnRef.current;
        swiperRef.current.params.navigation.nextEl = nextBtnRef.current;
        swiperRef.current.navigation.init();
        swiperRef.current.navigation.update();
      }
   }, [key, storedUserId, stateTrigger]);

   // ✅ 찜하기 토글
   const handleFavoriteToggle = () => {
      if (!storedUserId) {
         console.warn("🚨 userId 없음. 찜 목록을 저장할 수 없음.");
         return;
      }

      let favorites = JSON.parse(getCookie(`favorites_${storedUserId}`) || "[]");

      if (isFavorite) {
         favorites = favorites.filter((id) => id !== key);
      } else {
         favorites.push(key);
      }

      setCookie(`favorites_${storedUserId}`, JSON.stringify(favorites), 7);
      setIsFavorite(!isFavorite);
      setStateTrigger((prev) => prev + 1); // ✅ 상태 변경 감지 (UI 업데이트)
   };

   // ✅ 다녀온 관광지 토글
   const handleVisitedToggle = () => {
      if (!storedUserId) {
         console.warn("🚨 userId 없음. 다녀온 관광지 목록을 저장할 수 없음.");
         return;
      }

      let visitedPlaces = JSON.parse(getCookie(`visited_${storedUserId}`) || "[]");

      if (isVisited) {
         visitedPlaces = visitedPlaces.filter((id) => id !== key);
      } else {
         visitedPlaces.push(key);
      }

      setCookie(`visited_${storedUserId}`, JSON.stringify(visitedPlaces), 7);
      setIsVisited(!isVisited);
      setStateTrigger((prev) => prev + 1); // ✅ 상태 변경 감지 (UI 업데이트)
   };


   const parseAnchors = (htmlString: string) => {
      const anchorRegex = /<a\s+[^>]*href="([^"]+)"[^>]*title="([^"]*)"[^>]*>(.*?)<\/a>/g;
      const anchors = [];
      let match;
      while ((match = anchorRegex.exec(htmlString)) !== null) {
         const [_, href, title, content] = match;
         anchors.push({ href, title, content });
      }
      return anchors.map((anchor, idx) => (
         <div key={idx}>
            <a href={anchor.href} title={anchor.title} className="underline text-blue-600 hover:no-underline">
               {anchor.content}
            </a>
            <br />
         </div>
      ));
   };

   const convertBrToSpan = (htmlString: string) => {
      const parts = htmlString.split(/<br\s*\/?>/gi);
      return parts.map((part, idx) => <p key={idx}>{part}</p>);
   };

   const getContentCategory = (key: string) => {
      return (
         <>
            <span>{catList[key].cat2}</span> · <span>{catList[key].cat3}</span>
         </>
      );
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
               {infoList ? getContentCategory(infoList.cat3) : blankbox}
               </p>
            </div>

            {/* Image and Info */}
            <div className="flex gap-12 my-12">

            <div className="relative w-full max-w-[800px]">
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)} //
                pagination={{ clickable: true }}
                navigation={true} // 🔥 useEffect에서 버튼 연결
                autoplay={{ delay: 5000, disableOnInteraction: false }} // 🔥 5초마다 자동 넘김
                loop={true}
                modules={[Pagination, Navigation, Autoplay]}
                className="w-full aspect-[16/9] rounded-lg bg-neutral-200">
                
                {imgList.length > 0 ? (
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
                ) : (
                    <SwiperSlide>
                      <div className="flex items-center justify-center w-full h-full">
                          <p className="text-xl text-neutral-400">축제 이미지를 준비중입니다.</p>
                      </div>
                    </SwiperSlide>
                )}
              </Swiper>

              {/* 🔥 Swiper 내부 좌우 네비게이션 버튼 */}
              
              <button ref={prevBtnRef} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 rounded-full p-3 z-10">
                  <Image src="/images/prev-icon.png" alt="이전" width={24} height={24} />
              </button>
              <button ref={nextBtnRef} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 rounded-full p-3 z-10">
                  <Image src="/images/next-icon.png" alt="다음" width={24} height={24} />
              </button>
            </div>  
              
              
            
               <div className="flex flex-col justify-between max-w-[480] gap-12">
                  {/* Info Section */}
                  <div className="grid grid-cols-[auto_1fr] items-start gap-4">
                     <DetailList iconUrl={"/images/address.png"} title="주소">
                        {infoList ? infoList.addr : blankbox}
                     </DetailList>
                     <DetailList iconUrl={"/images/tel.png"} title="문의처">
                        {infoList ? infoList.infocenter : blankbox}
                     </DetailList>
                     <DetailList iconUrl={"/images/homepage.png"} title="홈페이지">
                        {infoList && infoList.homepage ? parseAnchors(infoList.homepage) : blankbox}
                     </DetailList>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center space-x-4">
                     {/* 다녀온 관광지 추가 버튼 */}
                     <button
                        className={`w-72 h-13 py-2 rounded-lg border ${
                           isVisited ? "bg-gray-300 text-black" : "bg-sky-500 text-white hover:bg-sky-600 border-sky-500"
                        }`}
                        onClick={handleVisitedToggle}
                     >
                        <span className="font-semibold text-lg leading-7 tracking-normal">
                           {isVisited ? "다녀온 장소" : "다녀온 장소 추가"}
                        </span>
                     </button>

                     {/* 찜하기 버튼 */}
                     <button
                        className="w-28 h-13 bg-sky-50 py-2 px-4 rounded-lg border border-sky-500 hover:bg-sky-100 flex items-center justify-center"
                        onClick={handleFavoriteToggle}
                     >
                        <Image
                           src={isFavorite ? "/images/full_heart.png" : "/images/heart.png"}
                           alt="찜하기"
                           width={24}
                           height={24}
                        />
                        <span className="ml-2 font-semibold text-lg leading-7 tracking-normal text-sky-500">찜</span>
                     </button>
                  </div>
               </div>
            </div>

            {/* 운영 정보 */}
            <section className="">
              <h3 className="text-2xl font-bold mb-6">운영 정보</h3>
              {infoList ? (
                  <div className="grid grid-cols-[auto_1fr] items-start gap-y-5 gap-x-3">
                    {infoList.usetime && <DetailList title="운영시간">{convertBrToSpan(infoList.usetime)}</DetailList>}
                    {infoList.entranceFee && (
                        <DetailList title="입장료">{convertBrToSpan(infoList.entranceFee)}</DetailList>
                    )}
                  </div>
              ) : (
                  blankbox
              )}
            </section>

            <hr className="my-12" />

            {/* 행사 내용 추가 */}
            {infoList?.extraInfo?.map((exInfo) => {
              if (exInfo.infoname === "행사내용") {
                  return (
                    <section key={exInfo.serialnum} className="my-12">
                        <h3 className="text-2xl font-bold mb-6">{exInfo.infoname}</h3>
                        <div className="text-neutral-800 leading-relaxed text-lg">
                          {convertBrToSpan(exInfo.infotext)}
                        </div>
                    </section>
                  );
              }
              return null;
            })}

            
            {/* 소개 */}
            <section>
               <h3 className="text-2xl font-bold mb-6">소개</h3>
               <p className="text-neutral-800 leading-relaxed text-lg">{infoList?.overview || blankbox}</p>
            </section>

            <hr className="my-12" />

            {/* 위치 */}
            {/* <section>
               <h3 className="text-2xl font-bold mb-6">위치</h3>
               {infoList?.mapx && infoList?.mapy ? (
                  <div className="h-[500]">
                  <KakaoMap mapx={infoList.mapx} mapy={infoList.mapy} title={infoList.title}/>
               </div>
               ) : ""}
            </section> */}
         </main>
         <Footer />
      </div>
   );
};

export default FestivalDetailPage;
