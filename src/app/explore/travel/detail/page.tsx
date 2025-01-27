"use client";

import React, { useEffect } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Image from "next/image";
import APIConnect from "@/utils/api";

const TravelListPage: React.FC = () => {
  useEffect(()=>{
    const loadData = async()=>{
      const info = await APIConnect.getTourAreaInfo(127565, 12);
      console.log(info)
    };
    loadData();
  },[]);

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
            영랑호
          </h2>
          <p className="text-xl font-normal text-neutral-800">
            자연경관지 · 호수
          </p>
        </div>

        {/* Image and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="w-full h-auto">
              <Image
                src="/images/lake.png"
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
                  src="/images/address.png"
                  alt="주소"
                  width={20}
                  height={20}
                />
                <h3 className="text-xl font-semibold text-neutral-800">주소</h3>
                <p className="text-xl font-normal text-neutral-800">
                  강원특별자치도 속초시 영랑호반길 140
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/tel.png"
                  alt="문의처"
                  width={20}
                  height={20}
                />
                <h3 className="text-xl font-semibold text-neutral-800">
                  문의처
                </h3>
                <p className="text-xl font-normal text-neutral-800">
                  033-639-2690
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/homepage.png"
                  alt="홈페이지"
                  width={20}
                  height={20}
                />
                <h3 className="text-xl font-semibold text-neutral-800">
                  홈페이지
                </h3>
                <a
                  href="https://yeongrang-lake.co.kr"
                  className="text-xl font-normal text-neutral-800 underline hover:no-underline"
                >
                  www.sokctour.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/Facility.png"
                  alt="편의시설"
                  width={20}
                  height={20}
                />
                <h3 className="text-xl font-semibold text-neutral-800">
                  편의시설
                </h3>

                <Image
                  src="/images/parking.png"
                  alt="주차"
                  width={20}
                  height={20}
                />
                <p className="text-xl font-normal text-neutral-800">주차</p>

                <Image
                  src="/images/rest_man.png"
                  alt="남자 화장실"
                  width={16}
                  height={16}
                />
                <Image
                  src="/images/rest_wo.png"
                  alt="여자 화장실"
                  width={16}
                  height={16}
                />
                <p className="text-xl font-normal text-neutral-800">화장실</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center space-x-4">
              <button className="w-72 h-13 bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 border border-sky-500">
                <span className="font-semibold text-lg leading-7 tracking-normal">
                  다녀온 관광지 추가
                </span>
              </button>
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
            <li className="flex items-center space-x-2">
              <Image
                src="/images/break.png"
                alt="휴일"
                width={20}
                height={20}
              />
              <span>휴일: 연중무휴</span>
            </li>
            <li className="flex items-center space-x-2">
              <Image
                src="/images/time.png"
                alt="운영시간"
                width={20}
                height={20}
              />
              <span>운영시간: 07:00-20:00</span>
            </li>
            <li className="flex items-center space-x-2">
              <Image
                src="/images/cost.png"
                alt="입장료"
                width={20}
                height={20}
              />
              <span>입장료: 무료</span>
            </li>
          </ul>
        </section>

        {/* 소개 */}
        <section className="my-8">
          <h3 className="text-2xl font-bold mb-4">소개</h3>
          <p className="text-gray-600 leading-relaxed">
            영랑호는 해안 사구가 발달해 형성된 자연 석호로 둘레가 7.8㎞, 면적이
            약 1.2㎢에 이르며 수심이 8m를 훌쩍 넘길 만큼 넓고 깊다. 장천천에서
            흘러든 물이 영랑교 밑의 수로를 통해 동해와 연결된다. 속초시 장사동과
            영랑동, 동명동, 금호동에 둘러싸여 있으며 호숫가 둘레로 걷기 좋은
            산책로가 조성되어 있다. 산책로를 따라 맑고 잔잔한 호수와 벚꽃,
            영산홍, 갈대 등이 어우러진 서정적이고 아름다운 풍경이 이어진다.
            삼국유사에 따르면 영랑호는 신라의 화랑인 ‘영랑’의 이름에서 따온
            것으로 전해진다. 금강산에서 수련을 마친 영랑이 무술대회장을 가던 중
            이 호수를 지나게 되었는데 그만 수려한 경관에 반해 무술대회 출전도
            잊고 이곳에 오래 머물렀다고 한다. 옛 기록에도 남아 있을 만큼
            영랑호는 뛰어난 경치를 자랑한다. 특히 속초 8경 중 하나인 범바위는
            보는 이들마다 감탄을 자아낸다. 호랑이가 가만히 웅크리고 앉아 있는 것
            같은 신비로운 기운이 흐른다. 기암괴석이 여러 개 모여 있는 관음암과
            보광사도 놓쳐선 안 될 볼거리다. 호숫가 서쪽에는 있는 습지생태공원도
            가볼만하다.
          </p>
        </section>

        {/* 위치 */}
        <section className="my-8">
          <h3 className="text-2xl font-bold mb-4">위치</h3>
          <Image
            src="/images/map.png"
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

export default TravelListPage;
