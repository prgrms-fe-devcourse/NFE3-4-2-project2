"use client";

import React from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Image from "next/image";

const TravelPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-screen-xl px-4 py-8">
        {/* 뒤로 가기 버튼 */}
        <div className="flex justify-start mb-4">
          <button
            className="flex items-center space-x-2"
            onClick={() => window.history.back()}
          >
            <Image
              src="/images/goback.png"
              alt="뒤로 가기"
              width={16}
              height={16}
            />
            <span className="text-sky-500 text-lg font-semibold">목록</span>
          </button>
        </div>

        {/* Title Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-semibold text-neutral-800 mb-2">
          얼음나라화천 산천어축제
          </h2>
          <p className="text-xl font-normal text-neutral-800">
            축제
          </p>
        </div>

        {/* Image and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="w-full h-auto">
              <Image
                src="/images/detail/sancheon.png"
                alt="Lake"
                width={720}
                height={420}
                className="rounded-lg object-cover mx-auto"
              />
            </div>
          </div>
          <div className="flex flex-col justify-between space-y-4">
            {/* Info Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/detail/address.png"
                  alt="주소"
                  width={20}
                  height={20}
                />
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-semibold text-neutral-800 whitespace-nowrap">
                    주소
                  </span>
                  <span className="text-xl font-normal text-neutral-800">
                  강원특별자치도 화천군 화천읍 산천어길 137
                  </span>
                </div>
              
              </div>
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/detail/tel.png"
                  alt="문의처"
                  width={20}
                  height={20}
                />
                <h3 className="text-xl font-semibold text-neutral-800">
                  문의처
                </h3>
                <p className="text-xl font-normal text-neutral-800">
                033-342-5503, 5504
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Image
                    src="/images/detail/homepage.png"
                    alt="홈페이지"
                    width={20}
                    height={20}
                  />
                  <span className="text-xl font-semibold text-neutral-800 whitespace-nowrap">
                    홈페이지
                  </span>
                </div>
                <a
                  href="https://www.narafestival.com/01_icenara/"
                  className="text-xl font-normal text-neutral-800 underline hover:no-underline block"
                >
                  https://www.narafestival.com/01_icenara/
                </a>
                <a
                  href="www.narafestival.com"
                  className="text-xl font-normal text-neutral-800 underline hover:no-underline block"
                >
                  www.narafestival.com
                </a>
              </div>

            </div>

            {/* Buttons */}
            <div className="flex items-center space-x-4">
              {/* 예매하기 버튼 */}
              <button className="w-52 h-13 bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 border border-sky-500">
                <span className="font-semibold text-lg leading-7 tracking-normal">
                  예매하기
                </span>
              </button>

              {/* 리뷰 작성 버튼 */}
              <button className="w-52 h-13 bg-sky-50 py-2 px-4 rounded-lg border border-sky-500 hover:bg-sky-100">
                <span className="font-semibold text-lg leading-7 tracking-normal text-sky-500">
                  리뷰 작성
                </span>
              </button>

              {/* 찜하기 버튼 */}
              <button className="w-28 h-13 bg-sky-50 py-2 px-4 rounded-lg border border-sky-500 hover:bg-sky-100 flex items-center justify-center">
                <Image
                  src="/images/heart.png"
                  alt="찜하기"
                  width={24}
                  height={24}
                />
                <span className="ml-2 font-semibold text-lg leading-7 tracking-normal text-sky-500">
                  찜
                </span>
              </button>
            </div>


          </div>
        </div>

        {/* 운영 정보 */}
        <section className="my-8">
          <h3 className="text-2xl font-bold mb-4">운영 정보</h3>
          <ul className="space-y-2 text-gray-600">
          <li className="flex space-x-2 items-start">
            {/* 행사 내용 아이콘 */}
            <Image
              src="/images/detail/info.png"
              alt="휴일"
              width={20}
              height={20}
            />

            {/* 행사 내용 텍스트 */}
            <div>
              <span className="font-semibold">행사 내용</span>
              <div className="mt-2 text-neutral-800">
                산천어 체험: 얼음낚시(현장/예약), 맨손잡기, 루어낚시<br />
                눈/얼음 체험: 눈썰매, 얼음썰매, 하늘가르기, 얼곰이성 미끄럼틀, 얼음축구, 컬링, 피겨 스케이트, 빙판 버블슈트<br />
                문화/이벤트: 축제 여는 마당, 화천 복불복 이벤트, 얼음나라 방송국, 호국이 체험존, 화천 관광 홍보관 등<br />
                편의/안전: 종합안내센터, 낚시 가이드, 몸녹임/유아쉼터, 이동 도우미, 의료 센터, 재난구조대, 화천소방서 등<br />
                먹거리/살거리: 산천어식당, 산천어 회센터/구이터, 향토주전부리장, 농특산물 판매점, 기념품 판매점 등<br />
                연계 행사 및 관광지: 선등거리 페스티벌, 세계 최대 실내 얼음조각광장, 화천 산천어 파크골프장, 산타우체국 한국 본점, 백암산 케이블카 등
              </div>
            </div>
          </li>

            <li className="flex items-start space-x-2">
              <Image
                src="/images/detail/time.png"
                alt="운영시간"
                width={20}
                height={20}
              />
              <span><span className="font-semibold">운영시간 : </span> 9:00 ~ 18:00 (밤낚시 18:00 ~ 21:00)</span>
            </li>
            <li className="flex items-start space-x-2">
              <Image
                src="/images/detail/cost.png"
                alt="입장료"
                width={20}
                height={20}
              />
              <span>
                <span className="font-semibold">입장료 : </span> 
                유료 (자세한 사항은 홈페이지 참조.)
              </span>
            </li>

            <li className="flex items-center space-x-2">
              <Image
                src="/images/detail/cost.png"
                alt="입장료"
                width={20}
                height={20}
              />
              <span><span className="font-semibold">추가정보 : </span></span>
            </li>
          </ul>
        </section>

        {/* 소개 */}
        <section className="my-8">
          <h3 className="text-2xl font-bold mb-4">소개</h3>
          <p className="text-gray-600 leading-relaxed">
          강원특별자치도 화천에서 열리는 얼음나라화천 산천어축제는 2011년 미국 CNN이 선정한 겨울의 7대 불가사의 중 하나로 꼽힌 이색 겨울축제다. 물 맑기로 유명한 화천천이 꽁꽁 얼어붙는 매년 1월에 축제가 열리며 얼음낚시, 맨손잡기 등으로 계곡의 여왕이라고 불리는 산천어를 잡는 체험을 할 수 있다. 산천어 얼음낚시의 손맛은 물론 바로 회나 구이로 맛있게 먹을 수 있고 낚시 외에도 얼음썰매, 눈썰매, 봅슬레이 등의 다양한 겨울놀이가 펼쳐져 매년 100만명 이상이 방문하고 있다.
          </p>
        </section>

        {/* 위치 */}
        <section className="my-8">
          <h3 className="text-2xl font-bold mb-4">위치</h3>
          <Image
            src="/images/detail/map.png"
            alt="위치"
            width={720}
            height={420}
            className="stroke-0F172A"
          />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TravelPage;
