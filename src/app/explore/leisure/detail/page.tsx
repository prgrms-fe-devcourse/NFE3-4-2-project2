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
            횡성루지체험장
          </h2>
          <p className="text-xl font-normal text-neutral-800">
            레저 및 체험
          </p>
        </div>

        {/* Image and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="w-full h-auto">
              <Image
                src="/images/detail/ruge.png"
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
                  강원특별자치도 횡성군 우천면 전재로
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
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/detail/homepage.png"
                  alt="홈페이지"
                  width={20}
                  height={20}
                />
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-semibold text-neutral-800 whitespace-nowrap">
                    홈페이지:
                  </span>
                  <a
                    href="http://luge.hsg.go.kr/kor/main/index.html"
                    className="text-xl font-normal text-neutral-800 underline hover:no-underline"
                  >
                    http://luge.hsg.go.kr/kor/main/index.html
                  </a>
                </div>
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
            <li className="flex items-center space-x-2">
              <Image
                src="/images/detail/break.png"
                alt="휴일"
                width={20}
                height={20}
              />
              <span><span className="font-semibold" >휴일 : </span> 매월 마지막주 화요일(성수기 제외), 동계휴장(12월-2월)</span>
            </li>
            <li className="flex items-center space-x-2">
              <Image
                src="/images/detail/time.png"
                alt="운영시간"
                width={20}
                height={20}
              />
              <span><span className="font-semibold">운영시간 : </span> 비수기 09:30-17:30 성수기 09:30-18:30</span>
            </li>
            <li className="flex items-start space-x-2">
              <Image
                src="/images/detail/cost.png"
                alt="입장료"
                width={20}
                height={20}
              />
              <span>
                <span className="font-semibold">입장료 : </span> [ 비수기 ] 1회권 12,000원 2회권 21,000원<br />
                [ 성수기 (7/15~8/31) 및 주말, 공휴일 ] 1회권 15,000원, 2회권 24,000원<br />
                관내학생단체 - 50% 할인, 관외학생단체 - 30% 할인, 횡성군민, 군인, 단체, 숙박, 제휴 할인, 영월, 평창, 홍천, 원주 지역민, 주요 관광시설(횡성호수길, 풍수원유물전시관, 안흥찐빵모락모락마을, 횡성한우체험관) 이용객, 청소년(9세-24세) - 20% 할인<br />
                별도 입장료는 없음
              </span>
            </li>

            <li className="flex items-center space-x-2">
              <Image
                src="/images/detail/cost.png"
                alt="입장료"
                width={20}
                height={20}
              />
              <span><span className="font-semibold">추가정보 : </span>만 10세 이상이며 키120cm이상 단독탑승(만 10세 미만, 키 95-120cm, 총 몸무게 120kg 미만 시, 보호자(만 18세 이상)와 동반탑승)</span>
            </li>
          </ul>
        </section>

        {/* 소개 */}
        <section className="my-8">
          <h3 className="text-2xl font-bold mb-4">소개</h3>
          <p className="text-gray-600 leading-relaxed">
          육상 썰매로도 불리는 루지는 동계올림픽 썰매종목 중 하나인 루지 썰매에 바퀴를 달아 사계절용으로 변신한 무동력 레저스포츠이다. 별도의 조작없이 중력에 몸을 맡긴 채 스스로 속도를 제어하며 시원한 바람과 풍격을 만끽할 수 있다. 국도 42호선 전재-우천면 오원리 구간의 기존 도로와 숲, 자연 그대로에 다양한 테마구간을 더하여 다이나믹한 코스가 완성되었고 단일코스로는 길이 2.4km로 세계 최장 길이와 인위적으로 S자 코스를 꼬아 놓은 것이 아니라 실제 도로를 이용하여 조성된 코스이다.
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
