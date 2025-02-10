'use client'

import React from 'react';
import { useSearchParams } from 'next/navigation';
import DetailMap from '../components/DetailMap';
import Comments from '../components/Comments';
import DetailMoreImage from '../components/DetailMoreImage';
import { useHeritageData } from '../types/useHeritageData';
import DetailHeroImage from '../components/DetailHeroImage';
import DetailVideo from '../components/DetailVideo';


export default function Detail() {
  const searchParams = useSearchParams();  
  const ccbaKdcd = searchParams.get('ccbaKdcd');
  const ccbaAsno = searchParams.get('ccbaAsno');
  const ccbaCtcd = searchParams.get('ccbaCtcd');
  const {
    gcodeName,
    bcodeName,
    mcodeName,
    scodeName,
    ccbaQuan,
    ccbaAsdt,
    ccbaLcad,
    ccceName,
    ccbaPoss,
    ccbaAdmin,
    content,
    longitude,
     latitude
  } = useHeritageData(ccbaKdcd, ccbaAsno, ccbaCtcd); 
  

  const formatDate = (date: string | null | undefined) => {
    if (!date) return ''; 
    return date.replace(/(\d{4})(\d{2})(\d{2})/, '$1년 $2월 $3일');
  };
  

  return (
    <div>
      <DetailHeroImage/>

      <div className="relative w-full flex items-start">

  {/* 왼쪽 콘텐츠 */}
  <div className="w-2/3 p-4 mt-[3vh] mr-32 ml-20">
    <h1 className="text-[#FF5DAB] font-pretendard text-xl ml-1 mt-1 font-semibold tracking-extra-wide">
      ABOUT
    </h1>
    <h1 className="text-black text-4xl font-pretendard tracking-wide font-extrabold mb-3 mt-3">
      국가유산 설명
    </h1>
    <div className="w-full h-[1px] bg-gray-400 mb-5"/>

    <p className="text-black text-xl font-pretendard font-medium whitespace-pre-line">
      {(content ?? "").replaceAll("\n", "\n\n")}
    </p>
  </div>

  {/* 오른쪽 콘텐츠 */}
  <div className="w-[800px] bg-white border-2 border-solid border-gray-400 p-4 mt-[4.5vh] mr-20 relative shadow-xl">
   
    {/* 회색 배경 div */}
    <div className="bg-gray-300 opacity-20 w-full h-[22%] absolute top-[0%] left-0 z-0"/>

    <h1 className="text-[#4F6CF3] font-pretendard text-xl font-semibold tracking-extra-wide z-20 relative mt-2 ml-3">
      INFORMATION
    </h1>
    <h1 className="text-black font-pretendard text-4xl font-extrabold z-20 tracking-wide relative ml-2 mt-4">
      국가유산 정보
      <svg
      className="inline-block transform -translate-y-1 translate-x-2 relative z-20"
      width="40"
      height="50"
      viewBox="0 0 48 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5 25.5C4.5 14.0574 13.2304 4.78125 24 4.78125C34.7696 4.78125 43.5 14.0574 43.5 25.5C43.5 36.9426 34.7696 46.2188 24 46.2188C13.2304 46.2188 4.5 36.9426 4.5 25.5ZM21.9125 22.4367C24.205 21.2188 26.7862 23.4188 26.1646 26.0608L24.7465 32.0874L24.8295 32.0433C25.5705 31.6496 26.4715 31.9688 26.842 32.756C27.2125 33.5433 26.9121 34.5006 26.1712 34.8943L26.0882 34.9384C23.7957 36.1562 21.2145 33.9562 21.8361 31.3143L23.2541 25.2877L23.1711 25.3318C22.4302 25.7254 21.5292 25.4063 21.1587 24.619C20.7882 23.8317 21.0885 22.8744 21.8295 22.4808L21.9125 22.4367ZM24 19.125C24.8284 19.125 25.5 18.4115 25.5 17.5312C25.5 16.651 24.8284 15.9375 24 15.9375C23.1716 15.9375 22.5 16.651 22.5 17.5312C22.5 18.4115 23.1716 19.125 24 19.125Z"
        fill="#0F172A"
      />
    </svg>
    </h1>

    {/* 정보 내용 */}
    <div className="font-pretendard text-lg font-medium z-20 relative space-y-11 mt-14 mb-2">
  {[
    { label: "분류", value: `${gcodeName} / ${bcodeName} / ${mcodeName} / ${scodeName}` },
    { label: "수량/면적", value: ccbaQuan },
     { label: "지정(등록)일", value: formatDate(ccbaAsdt) },
    { label: "소재지", value: ccbaLcad },
    { label: "시대", value: ccceName },
    { label: "소유자(소유단체)", value: ccbaPoss },
    { label: "관리자(관리단체)", value: ccbaAdmin },
  ].map((item, index) => (
    <div key={index} className="relative">
      <div className="grid grid-cols-[10rem_1fr] gap-4">
        <p className="font-semibold">{item.label}</p>
        <p className="text-gray-700">{item.value}</p>
      </div>
      {index !== 6 &&  <div className="absolute left-0 right-0 bottom-[-20px] w-full h-[1px] bg-gray-300" />}
    </div>
  ))}
</div>
  </div>
</div>
<DetailMap longitude={longitude} latitude={latitude} />
      <div className="flex w-full"> 
     <Comments ccbaAsno={ccbaAsno as string} ccbaCtcd={ccbaCtcd as string} ccbaKdcd={ccbaKdcd as string}/>
     <div className='w-[50%] pr-20'>
      <DetailVideo/>
      </div>
      </div>
      <div className='mb-10'>
      <DetailMoreImage/>
      </div>
     </div>
  );
}
