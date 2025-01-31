"use client";

import React, { useEffect,  useState} from "react";
import Image from "next/image";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import DetailList from "@/components/travel/DetailList";
import APIConnect from "@/utils/api";
import KakaoMap from "@/components/common/KakaoMap";
import { TourImg, TourDetailInfo, CatList } from "@/types/types";
import catListJson from "@/utils/catList.json";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const catList = catListJson as CatList;

const TravelListPage: React.FC = () => {
   // const router = useRouter();
   // const {contentId, contetnTypeId} = router.query;

   const blankbox = (
      <span className="bg-neutral-200 rounded px-24">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
   );
   const [infoList, setInfoList] = useState<TourDetailInfo>();
   const [imgList, setImgList] = useState<TourImg[]>([]);

   useEffect(() => {
      const loadData = async () => {
         // 기본적인 느낌
         // const key = 127565;

         //운영정보 적음
         const key = 2798406;

         //운영정보 많고 관광지 이미지 없음
         //const key = 125800;

         //운영정보 많은 페이지
         // const key = 125789;
         
         const infoList: TourDetailInfo = await APIConnect.getTourAreaInfo(key, 12);
         const img = await APIConnect.getTourImg(key);
         setInfoList(infoList);
         setImgList(img); // 상태 업데이트
         console.log("infoList : ", infoList);
         console.log("imgList : ", imgList);
      };
      loadData();
   }, []); // 빈 배열로 설정하여 마운트 시 한 번만 실행

   const getContentCategory = (key: string | undefined) => {
      return (
         <>
            <span>{catList[key].cat2}</span> · <span>{catList[key].cat3}</span>
         </>
      );
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
            <a href={anchor.href} title={anchor.title}>
               {""}
               {anchor.content}{" "}
            </a>
            <br />
         </div>
      ));
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
                  {infoList ? getContentCategory(infoList.cat3) : blankbox}
               </p>
            </div>

            {/* Image and Info */}
            <div className="flex gap-12 my-12">
               <Swiper
                  pagination={true}
                  modules={[Pagination]}
                  className="w-full aspect-[16/9] rounded-lg bg-neutral-200"
                  loop={true}>
                  {imgList ? (
                     imgList.map((img) => {
                        return (
                           <SwiperSlide
                              key={img.serialnum}
                              className="bg-right-bottom bg-cover"
                              style={{ backgroundImage: `url(${img.originimgurl})` }}></SwiperSlide>
                        );
                     })
                  ) : (
                     //이미지 리스트 없을 때 처리
                     <SwiperSlide>
                        <div className="flex items-center justify-center w-full h-full">
                           <p className="text-xl text-neutral-400">관광지 이미지를 준비중입니다.</p>
                        </div>
                     </SwiperSlide>
                  )}
               </Swiper>

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
                     <button className="w-72 h-13 bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 border border-sky-500">
                        <span className="font-semibold text-lg leading-7 tracking-normal">다녀온 관광지 추가</span>
                     </button>
                     <button className="w-52 h-13 bg-sky-50 py-2 px-4 rounded-lg border border-sky-500 hover:bg-sky-100">
                        <span className="font-semibold text-lg leading-7 tracking-normal text-sky-500">리뷰 작성</span>
                     </button>
                     {/* 찜하기 버튼 */}
                     <button className="w-28 h-13 bg-sky-50 py-2 px-4 rounded-lg border border-sky-500 hover:bg-sky-100 flex items-center justify-center">
                        <Image src="/images/heart.png" alt="찜하기" width={24} height={24} />
                        <span className="ml-2 font-semibold text-lg leading-7 tracking-normal text-sky-500">찜</span>
                     </button>
                  </div>
               </div>
            </div>

            {/* 운영 정보 */}
            <section className="">
               <h3 className="text-2xl font-bold mb-6"> 운영 정보 및 편의시설</h3>
               {infoList ? (
                  <div className="grid grid-cols-[auto_1fr] items-start gap-y-5 gap-x-3">
                     {infoList && infoList.parking && (
                        <DetailList title="주차">{convertBrToSpan(infoList.parking)}</DetailList>
                     )}
                     {infoList && infoList.restdate && (
                        <DetailList title="휴일">{convertBrToSpan(infoList.restdate)}</DetailList>
                     )}
                     {infoList && infoList.usetime && (
                        <DetailList title="운영시간">{convertBrToSpan(infoList.usetime)}</DetailList>
                     )}
                     {infoList && infoList.entranceFee && (
                        <DetailList title="입장료">{convertBrToSpan(infoList.entranceFee)}</DetailList>
                     )}
                     {infoList.extraInfo.length > 0 &&
                        infoList.extraInfo.map((exInfo) => {
                           if (exInfo.infoname != "주차요금" && exInfo.infoname != "주차") {
                              return (
                                 <DetailList title={exInfo.infoname} key={exInfo.serialnum}>
                                    {convertBrToSpan(exInfo.infotext)}
                                 </DetailList>
                              );
                           }
                        })}
                  </div>
               ) : (
                  blankbox
               )}
            </section>
            <hr className="my-12" />
            {/* 소개 */}
            <section>
               <h3 className="text-2xl font-bold mb-6">소개</h3>
               <p className="text-neutral-800 leading-relaxed text-lg">{infoList?.overview || blankbox}</p>
            </section>
            <hr className="my-12" />
            {/* 위치 */}
            <section>
               <h3 className="text-2xl font-bold mb-6">위치</h3>
               {infoList ? (
                  <div className="h-[500]">
                  <KakaoMap mapx={infoList.mapx} mapy={infoList.mapy} />
               </div>
               ) : ""}
            </section>
         </main>
         <Footer />
      </div>
   );
};

export default TravelListPage;
