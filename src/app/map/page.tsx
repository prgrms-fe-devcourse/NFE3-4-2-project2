"use client";

//라이브러리 정의
import axios from "axios";
import { Accordion} from "@szhsin/react-accordion";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import xml2 from "xml2js"

import { useRouter, useSearchParams } from "next/navigation";
//컴포넌트 정의
import MultiRange from "@/app/map/components/rangeSlider";
import SelectBox from "@/app/map/components/slelctBox";
import BasicMap from "@/app/map/components/kakaoMap";
import { MapItem, RoadItem } from "../../types/Map";
import { selectList } from "@/app/map/config/config";
import { AccordionItem } from "@/app/map/components/accordionItem";
import { Loading } from "@/app/map/components/loading";


export default function MapPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
// state
  const [filters, setFilters] = useState<Record<string, string | number | undefined>>({});
  const [item, setItem] = useState<MapItem[]>([]);
  const [load, setLoad] = useState<RoadItem>();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isLoadOpen, setIsLoadOpen] = useState<boolean>(false);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

//xml json 으로 변경해주는 함수
  const xmlToJsonFilterHandler = (data: MapItem) => {
    const parseString = xml2.parseString;
    parseString(
      data,
      { explicitArray: false },
      function (err, result) {
        if (result.result.totalCnt === "0") {
          setIsLoading(false)
          alert("검색결과가 없습니다.");
          return;
        }

        const filteredItems = Array.isArray(result.result.item)
          ? result.result.item.filter(
              (item: { latitude: string | undefined; longitude: string | undefined; }) =>
                item.latitude !== "0" &&
                item.longitude !== "0" &&
                item.latitude !== undefined &&
                item.longitude !== undefined
            )
          : result.result.item;
        setIsLoading(false)
        setItem(filteredItems); 
      }
    );
  };
// 데이터 불러오는 함수
  const getData = async (params: string) => {
    setIsLoading(true)
    const data = await axios.get(
      `http://www.khs.go.kr/cha/SearchKindOpenapiList.do?pageUnit=10000&${
        params ? params : "&ccbaCncl=N&ccbaKdcd=13&ccbaCtcd=11"
      }`
    );
    xmlToJsonFilterHandler(data.data);
  };

  // 내위치 기반 길찾기 함수
  const searchLoadHandler = async (item: MapItem) => {
    const url = "https://apis-navi.kakaomobility.com/v1/directions?";
    const key = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const data = await axios.get(
            `${url}origin=${position.coords.longitude},${position.coords.latitude}&destination=${item.longitude},${item.latitude}&priority=RECOMMEND`,
            {
              headers: {
                Authorization: `KakaoAK ${key}`,
              },
            }
          );
          if (data.status === 200) {
            if (data.data.routes[0].result_code === 103) {
              alert("주변에 도로가 없어서 길찾기에 실패하였습니다.");
            }
            setLoad(data.data.routes[0]);
            console.log(data.data.routes[0])
            setItem([]);
            setIsLoadOpen(true);
            setIsNavOpen(false);
            setIsLoading(false)
          }
        },
        (err) => {
          console.log(err);
          setIsLoading(false)
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert("내위치를 사용할 수 없습니다.")
    }
  };

  //onChange 핸들러
  const handleChange = (
    e:
      | ChangeEvent<HTMLSelectElement | HTMLInputElement>
      | { minValue: number; maxValue: number }
  ) => {
    if ("minValue" in e && "maxValue" in e) {
      const { minValue, maxValue } = e;
      setFilters((prev) => ({
        ...prev,
        stCcbaAsdt: minValue,
        enCcbaAsdt: maxValue,
      }));
    }
    else if ("target" in e) {
      const { name, value } = e.target;
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // 조건 검색 함수
  const filterButtonHandler = async () => {
    const cleanedFilters: Record<string, string> = Object.fromEntries(
      Object.entries(filters)
        .filter(([key, value]) => {
          if (!isOpen) {
            return key === "ccbaMnm1" && value !== undefined;
          }
          return value !== undefined;
        })
        .map(([key, value]) => [key, String(value)])
    );
    const params = new URLSearchParams(cleanedFilters);
    router.push(`?${params}`);
  };

  const convertSecondsToTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600); 
    const minutes = Math.floor((seconds % 3600) / 60); 
    return `${hours}시간 ${minutes}분`;
  }

  const convertToKRW = (amount: number | bigint) => {
    return new Intl.NumberFormat("ko-KR").format(amount);
  };

  // 길찾기 모달창 닫는 함수
  const backLoad = () => {
    setLoad({});
    setIsLoadOpen(false);
    getData("");
  };

  useEffect(() => {
    const params = searchParams.toString();
    getData(params);
  }, [searchParams]);

  useEffect(() => {
    const queryObject = Object.fromEntries(searchParams.entries());
    if (Object.keys(queryObject).length > 0) {
      setFilters(queryObject);
    }
  }, []);

  return (
    <section className="items-center  justify-center gap-4 ">
      <BasicMap searchLoadHandler={searchLoadHandler} data={item} load={load}>
        <div
          className={`absolute ${
            isNavOpen ? "-left-[383px]" : "left-10"
          } transition-all duration-300 max-w-96 z-50 top-36`}
        >
          {!isLoadOpen ? (
            <div className=" absolute w-10 h-10 flex items-center border-y-2 border-r-2 justify-center border-[#4a4a4a]  bg-white -right-10  rounded-r-lg top-10">
              <button onClick={() => setIsNavOpen(!isNavOpen)}>
                <div className={`${!isNavOpen ? "rotate-180" : null}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </button>
            </div>
          ) : null}
          <div className=" bg-white flex flex-col gap-3 p-8 w-full rounded-3xl shadow-lg">
            {!isLoadOpen && load ? (
              <>
                <Accordion
                  onStateChange={({ current }) => {
                    setIsOpen(current.isEnter);
                  }}
                  transition
                  initialEntered
                >
                  <AccordionItem header={"카테고리별 검색"}>
                    <div>
                      <div className="w-full flex gap-1 py-2 border-b-1">
                        <span>
                          <Image
                            alt="문화재 아이콘"
                            width={30}
                            height={23}
                            src="/icons/map-history-icon.svg"
                          />
                        </span>
                        <h4 className="text-xl text-neutral-900 font-bold ">
                          시대{" "}
                        </h4>
                      </div>
                      <MultiRange
                        fixedMinPrice={1000}
                        fixedMaxPrice={2025}
                        value={filters}
                        min={1000}
                        max={2025}
                        handleValueChange={(minValue, maxValue) =>
                          handleChange({ minValue, maxValue })
                        }
                      />
                    </div>
                    <div>
                      <div className="w-full flex gap-2 py-2   border-b">
                        <span>
                          <Image
                            alt="문화재 아이콘"
                            width={23}
                            height={30}
                            src="/icons/map_map_icon.svg"
                          />{" "}
                        </span>
                        <h4 className="text-xl font-bold ">지역 </h4>
                      </div>
                      <div className="py-4">
                        <div className="relative w-full lg:max-w-sm">
                          <select
                            name="ccbaCtcd"
                            value={filters.ccbaCtcd || ""}
                            onChange={(e) => handleChange(e)}
                            className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                          >
                            <option value={""}>지역선택</option>
                            <option value={11}>서울</option>
                            <option value={25}>대전</option>
                            <option value={22}>대구</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="w-full flex gap-2 py-2 border-b">
                        <h4 className="text-xl font-bold ">지정 종목별 </h4>
                      </div>
                      <div className="flex py-2 items-center justify-between flex-wrap gap-1">
                        {selectList.map((item) => {
                          return (
                            <SelectBox
                              key={`${item.name}-${item.value}`}
                              title={item.title}
                              checked={filters.ccbaKdcd === item.value}
                              handleChange={handleChange}
                              value={item.value}
                              name={item.name}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </AccordionItem>
                </Accordion>
                <div className="flex flex-col gap-4">
                  <input
                    onChange={(e) => handleChange(e)}
                    name="ccbaMnm1"
                    value={filters.ccbaMnm1 || ""}
                    className="border rounded-full h-12 p-2 px-5"
                    placeholder="이름으로 검색"
                    type="text"
                  />
                  <button
                    onClick={() => filterButtonHandler()}
                    className=" w-full h-10 bg-[#B23742] text-white rounded-xl"
                  >
                    검색
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col w-full gap-4">
                <div className="flex items-center justify-between gap-4 ">
                  <p className="text-lg text-gray-400">소요시간</p>
                  <p className="text-slate-800 font-semibold text-2xl">
                    {convertSecondsToTime(load?.sections?.[0]?.duration) ||
                      "정보 없음"}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-lg text-gray-400">총거리</p>
                  <p className="text-slate-800 font-semibold text-2xl">
                    {load?.sections?.[0]?.distance / 1000 || "정보 없음"}
                    <span className="font-normal text-gray-500 text-sm">
                      {" "}
                      KM
                    </span>
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-lg text-gray-400">택시요금</p>
                  <p className="text-slate-800 font-semibold text-2xl">
                    {convertToKRW(load?.summary?.fare.taxi) || "정보 없음"}
                    <span className="font-normal text-gray-500 text-sm">
                      {" "}
                      원
                    </span>
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-lg text-gray-400">톨게이트 비용</p>
                  <p className="text-slate-800 font-semibold text-2xl">
                    {convertToKRW(load?.summary?.fare.toll) || "정보 없음"}
                    <span className="font-normal text-gray-500 text-sm">
                      {" "}
                      원
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => backLoad()}
                  className=" w-full h-10 bg-[#B23742] text-white rounded-xl"
                >
                  돌아가기
                </button>
              </div>
            )}
          </div>
        </div>
      </BasicMap>
      {isLoading && (<Loading/>)}
      
    </section>
  );
}
