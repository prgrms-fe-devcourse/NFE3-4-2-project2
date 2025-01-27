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
          라빈드라나트 타고르 탄생 163주년 기념식
          </h2>
          <p className="text-xl font-normal text-neutral-800">
            공연 행사
          </p>
        </div>

        {/* Image and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="w-full h-auto">
              <Image
                src="/images/detail/concert.png"
                alt="concert"
                width={720}
                height={420}
                className="rounded-lg object-cover mx-auto"
              />
            </div>
          </div>
          <div className="flex flex-col justify-between space-y-4">
            {/* Info Section */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/detail/address.png"
                  alt="주소"
                  width={20}
                  height={20}
                />

                <span className="text-xl font-semibold text-neutral-800 whitespace-nowrap">
                  주소
                </span>
              </div>
              <span className="text-xl font-normal text-neutral-800">
              강원특별자치도 춘천시 남산면 남이섬길 1
              </span>
            </div>
              
              
              <div className="space-y-2">
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
                </div>
                <p className="text-xl font-normal text-neutral-800">
                031-580-8015
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
                  href="http://www.namiartsedu.com"
                  className="text-xl font-normal text-neutral-800 underline hover:no-underline block"
                >
                  http://www.namiartsedu.com
                </a>
                <a
                  href="https://www.instagram.com/nami_a_e"
                  className="text-xl font-normal text-neutral-800 underline hover:no-underline block"
                >
                  https://www.instagram.com/nami_a_e
                </a>
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
              - 문화 공연 : 바울 음악, 타고르 춤, 퓨전 국악 & 타고르 음악, 타고르 시 낭독 <br></br>- 전시 : 타고르와 자연 : 강 <br></br>- 워크숍 : 티 세레모니 워크숍<br></br>- 이벤트 : 타고르 시(詩) 그림 그리기 대회
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
              <span><span className="font-semibold">운영시간 : </span> 11:30~15:30 </span>
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
                남이섬 입장 시 무료 관람 (남이섬 입장권 구매 필요)
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
          아시아인 최초로 노벨문학상을 수상한 시인, 음악가, 교육가이자 철학자인 라빈드라나트 타고르의 작품과 생애를 엿볼 수 있는 행사를 개최한다. 타고르의 생애와 그가 남긴 유산을 기리며 바울 음악, 타고르 춤 등의 다양한 공연이 진행된다. 또한 작년 남이섬에서 진행된 한국-인도 아티스트 캠프 작품들로 구성된 ‘타고르와 자연: 강’ 전시를 즐길 수 있으며 인도 타고르 전문가 베너르지 작가의 티 세레모니 워크숍, 아이들을 위한 타고르 시(詩) 그림 그리기 대회도 진행된다.
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