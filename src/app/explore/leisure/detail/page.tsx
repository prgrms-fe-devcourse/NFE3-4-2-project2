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

const catList = catListJson as CatList;

const LeisureDetailPage: React.FC = () => {

  const params = useSearchParams();
  const blankbox = <span className="bg-neutral-200 rounded px-24">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>;
  
  const swiperRef = useRef<any>(null);
  const prevBtnRef = useRef<HTMLButtonElement | null>(null);
  const nextBtnRef = useRef<HTMLButtonElement | null>(null);
  
  const [infoList, setInfoList] = useState<TourDetailInfo>();
  const [imgList, setImgList] = useState<TourImg[]>([]);
  useEffect(() => {
    const loadData = async () => {
      const key = Number(params.get("contentId"));
      const infoList: TourDetailInfo = await APIConnect.getLeisureInfo(key);
      const img = await APIConnect.getTourImg(key);

      setInfoList(infoList);
      setImgList(img);
    };

    loadData();

    if (swiperRef.current && prevBtnRef.current && nextBtnRef.current) {
      swiperRef.current.params.navigation.prevEl = prevBtnRef.current;
      swiperRef.current.params.navigation.nextEl = nextBtnRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  
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

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-screen-xl px-4 py-8">
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
              {imgList.length > 0 ? (
                imgList.map((img) => (
                  <SwiperSlide key={img.serialnum} className="flex items-center justify-center">
                    <Image src={img.originimgurl} alt={img.imgname || "레저 이미지"} width={800} height={450} className="rounded-lg object-cover mx-auto" />
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <div className="flex items-center justify-center w-full h-full">
                    <p className="text-xl text-neutral-400">레저 이미지를 준비중입니다.</p>
                  </div>
                </SwiperSlide>
              )}
            </Swiper>

            <button ref={prevBtnRef} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 rounded-full p-3 z-10">
              <Image src="/images/prev-icon.png" alt="이전" width={24} height={24} />
            </button>
            <button ref={nextBtnRef} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 rounded-full p-3 z-10">
              <Image src="/images/next-icon.png" alt="다음" width={24} height={24} />
            </button>
          </div>

          <div className="flex flex-col justify-between max-w-[480] gap-12">
            <div className="grid grid-cols-[auto_1fr] items-start gap-4">
              <DetailList iconUrl="/images/address.png" title="주소">{infoList?infoList.addr : blankbox}</DetailList>
              <DetailList iconUrl="/images/tel.png" title="문의처">{infoList?infoList.infocenter : blankbox}</DetailList>
              <DetailList iconUrl="/images/homepage.png" title="홈페이지">{infoList && infoList.homepage ? parseAnchors(infoList.homepage) : blankbox}</DetailList>
            </div>
            {/* Buttons */}
            <div className="flex items-center space-x-4">
                <button className="w-52 h-13 bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 border border-sky-500">
                  <span className="font-semibold text-lg leading-7 tracking-normal">예매하기</span>
                </button>
                <button className="w-52 h-13 bg-sky-50 py-2 px-4 rounded-lg border border-sky-500 hover:bg-sky-100">
                  <span className="font-semibold text-lg leading-7 tracking-normal text-sky-500">리뷰 작성</span>
                </button>
                <button className="w-28 h-13 bg-sky-50 py-2 px-4 rounded-lg border border-sky-500 hover:bg-sky-100 flex items-center justify-center">
                  <Image src="/images/heart.png" alt="찜하기" width={24} height={24} />
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
              {infoList.usetime && <DetailList title="운영시간">{infoList.usetime}</DetailList>}
              {infoList.restdate && <DetailList title="휴무일">{infoList.restdate}</DetailList>}
              {/* extraInfo 정보 동적 출력 */}
              {infoList.extraInfo.length > 0 &&
              infoList.extraInfo.map((exInfo) => {
                return (
                    <DetailList title={exInfo.infoname} key={exInfo.serialnum}>
                      {convertBrToSpan(exInfo.infotext)}
                    </DetailList>
                );
              })}
            </div>
          ) : blankbox}
        </section>

        <hr className="my-12" />

        <section>
          <h3 className="text-2xl font-bold mb-6">위치</h3>
          {infoList?.mapx && infoList?.mapy ? (
            <div className="h-[500]">
              <KakaoMap mapx={infoList.mapx} mapy={infoList.mapy} title={infoList.title} />
            </div>
          ) : "위치 정보 없음"}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LeisureDetailPage;
