'use client'

import { useSearchParams } from 'next/navigation';
import { useHeritageData } from '../types/useHeritageData';

export default function DetailHeroImage(){
  const searchParams = useSearchParams();  
  const ccbaKdcd = searchParams.get('ccbaKdcd');
  const ccbaAsno = searchParams.get('ccbaAsno');
  const ccbaCtcd = searchParams.get('ccbaCtcd');
  const {
    imageUrl,
    heritageName,
    heritageHanja,
    heritageCategory,
    ccbaLcad,
    
  } = useHeritageData(ccbaKdcd, ccbaAsno, ccbaCtcd);  


return(
<div className="relative">
<div className="absolute inset-0 bg-black opacity-50"></div>
<img
  src={imageUrl || "이미지가 없습니다"}
  alt="CultureImage"
  className="bg-slate-300 w-full h-96 object-cover"
/>
<h1 className="absolute top-[46%] left-[10.5%] font-pretendard text-white text-3xl font-semibold">{heritageCategory}</h1>
<h1 className="absolute top-[60%] left-[10%] font-pretendard text-white text-5xl font-bold">{heritageName} ({heritageHanja})</h1>
<h1 className="absolute top-[75%] left-[10%] font-pretendard text-white text-lg font-normal flex items-center">
  <svg
    width="20"
    height="21"
    viewBox="0 0 30 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="ml-1 mr-2 mb-0.5"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.4247 28.604C14.4624 28.6264 14.4921 28.6437 14.5131 28.6558L14.548 28.6757C14.8266 28.8323 15.1722 28.8311 15.4511 28.6762L15.4869 28.6558C15.5079 28.6437 15.5376 28.6264 15.5753 28.604C15.6508 28.5592 15.7587 28.4939 15.8944 28.4084C16.1656 28.2374 16.5484 27.9853 17.0058 27.6545C17.9189 26.9941 19.1372 26.0143 20.3582 24.7344C22.7883 22.187 25.3125 18.3597 25.3125 13.4375C25.3125 7.60645 20.6954 2.87946 15 2.87946C9.30456 2.87946 4.6875 7.60645 4.6875 13.4375C4.6875 18.3597 7.21165 22.187 9.64182 24.7344C10.8628 26.0143 12.0811 26.9941 12.9942 27.6545C13.4516 27.9853 13.8344 28.2374 14.1056 28.4084C14.2413 28.4939 14.3492 28.5592 14.4247 28.604ZM15 17.2768C17.0711 17.2768 18.75 15.5579 18.75 13.4375C18.75 11.3171 17.0711 9.59821 15 9.59821C12.9289 9.59821 11.25 11.3171 11.25 13.4375C11.25 15.5579 12.9289 17.2768 15 17.2768Z"
      fill="#E4E4E4"
    />
  </svg>
  {ccbaLcad}
</h1>

<h1 className="absolute top-[75%] left-[12%] text-white text-xl font-bold"></h1>
</div>
)
}