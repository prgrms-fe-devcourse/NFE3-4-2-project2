import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';

const InfoCard = ({
    item,
    setOpenOverlayId,
    searchLoadHandler,
  }: {
    item: any;
    setOpenOverlayId: any;
    searchLoadHandler: (e: any) => void;
  }) => {
  const [activeSection, setActiveSection] = useState('#about');
 const router = useRouter()
  const handleButtonClick = (section: React.SetStateAction<string>) => {
    setActiveSection(section);
  };
const formatDate = (dateString:string) => {
    // 문자열을 년, 월, 일로 분할
    const year = dateString.slice(0, 4); // 처음 4자리 (년)
    const month = dateString.slice(4, 6); // 다음 2자리 (월)
    const day = dateString.slice(6, 8); // 마지막 2자리 (일)
  
    // 원하는 형식으로 조합
    return `${year}년${month}월${day}일`;
  }
  
  return (
    <CustomOverlayMap
    position={{
      lat: item.latitude,
      lng: item.longitude,
    }}
    zIndex={1000}
    clickable={true}
  >
    <div className='absolute bottom-6 left-0'>
        
      <div className={` w-[450px] bg-white rounded-lg shadow-lg  wrap  overflow-hidden transition-all duration-300 `}>
      <div
          onClick={() => setOpenOverlayId(null)}
          className="w-7 h-7 rounded-full flex items-center justify-center absolute right-2 top-2 z-50 transition-all duration-300 hover:opacity-100 opacity-30 bg-white"
        >
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
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
      {activeSection !== '#contact' && (
        <div className="relative h-80">
          <div className="absolute inset-0 bg-cover bg-center h-72  scale-125" style={{ backgroundImage: `url(${item.item.imageUrl})` }}>
          <div className=" absolute bottom-0 flex flex-col items-center justify-end py-2 h-full w-full bg-gradient-to-b   to-black from-transparent  ...">

          <h1 className="   text-white  text-lg tracking-tight font-bold ">{item.item.ccbaMnm1}</h1>
          <h2 className="   text-xs font-medium text-gray-600 uppercase">{item.item.ccbaMnm2}</h2>
          </div>
          </div>
          
        </div>
      )}
        <div className="p-5 pt-10">
          {activeSection === '#about' && (
            <div className="animate-fadeIn ">
              <div className="text-sm font-bold text-gray-700 mb-2">{item.item.ccbaLcad}</div>
              <p className="text-sm text-gray-600 leading-relaxed">{item.item.bcodeName}</p>
              <div className="flex space-x-3 mt-5">
                <p className=" flex items-center justify-center bg-gray-100 rounded-full px-3 py-1 hover:bg-gray-200">
                {item.item.mcodeName}
                </p>
                <p className="flex items-center justify-center bg-gray-100 rounded-full px-3 py-1 hover:bg-gray-200">
                {item.item.scodeName}
                </p>
                <p  className="flex items-center justify-center bg-gray-100 rounded-full px-3 py-1 hover:bg-gray-200">
                {item.item.gcodeName}
                </p>
                <p className="flex items-center justify-center bg-gray-100 rounded-full px-3 py-1 hover:bg-gray-200">
                {item.item.ccbaQuan}
                </p>
              </div>
            </div>
          )}
          {activeSection === '#experience' && (
            <div className="animate-fadeIn">
              <div className="text-sm font-bold text-gray-700 mb-2">지정</div>
              <div className="py-5">
                <div className="relative pl-10">
                  <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-[#ba46507b] to-[#B23742]"></div>
                  <div className="relative pb-8">
                    <div className="text-xs text-gray-500">{formatDate(item.item.ccbaAsdt)}</div>
                    <div className="text-sm font-medium">{item.item.ccbaPoss}</div>
                    <div className="text-sm text-gray-600">{item.item.ccceName}</div>
                  </div>
                  {/* Add more experience items here */}
                </div>
              </div>
              <button onClick={() => searchLoadHandler(item)} className="w-full bg-gradient-to-r from-[#ba46507b] to-[#B23742] text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">길찾기</button>

            </div>
          )}
          {activeSection === '#contact' && (
            <div className="animate-fadeIn">
              <div className="text-sm font-bold text-gray-700 mb-2">소개</div>
              <div className="mt-5">
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  {/* Location Icon */}
                  <span className='text-wrap'>{item.item.content}</span>
                </div>
                <button onClick={()=>router.push(`/culture/detail?ccbaKdcd=${item.ccbaKdcd}&ccbaAsno=${item.ccbaAsno}&ccbaCtcd=${item.ccbaCtcd}`)} className="w-full bg-gradient-to-r from-[#ba46507b] to-[#B23742] text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">상세보기</button>
              </div>
            </div>
          )}
        </div>
        <div className="flex sticky bottom-0 bg-white">
          <button
            onClick={() => handleButtonClick('#about')}
            className={`flex-1 py-3 text-sm font-medium ${activeSection === '#about' ? 'text-[#B23742] border-b-2 border-[#B23742]' : 'text-[#ba46507b]'}`}
          >
            소개
          </button>
          <button
            onClick={() => handleButtonClick('#experience')}
            className={`flex-1 py-3 text-sm font-medium ${activeSection === '#experience' ? 'text-[#B23742] border-b-2 border-[#B23742]' : 'text-[#ba46507b]'}`}
          >
            역사
          </button>
          <button
            onClick={() => handleButtonClick('#contact')}
            className={`flex-1 py-3 text-sm font-medium ${activeSection === '#contact' ? 'text-[#B23742]border-b-2 border-[#B23742]' : 'text-[#ba46507b]'}`}
          >
            자세히
          </button>
        </div>
      </div>
      </div>
      </CustomOverlayMap>
  );
};

export default InfoCard;