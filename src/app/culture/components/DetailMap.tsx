'use client'

import { useEffect, useRef } from 'react';

export default function DetailMap({ longitude, latitude }: { longitude: string | null, latitude: string | null }) {
  const mapContainer = useRef(null);

  const initializeMap = () => {
    if (window.kakao && mapContainer.current) {
      const { kakao } = window;

      const centerLatitude = latitude ? parseFloat(latitude) : 37.5665;
      const centerLongitude = longitude ? parseFloat(longitude) : 126.978;

      const options = {
        center: new kakao.maps.LatLng(centerLatitude, centerLongitude),
        level: 3,  // 지도 초기 확대 레벨
        draggable: true, // 지도를 드래그 가능하게 설정
        scrollwheel: true, // 마우스 휠로 확대/축소 가능하게 설정
        disableDoubleClick: false, // 더블 클릭으로 확대/축소 가능하게 설정
        zoomControl: true, // 줌 버튼 표시
        zoomControlPosition: kakao.maps.ControlPosition.RIGHT, // 줌 버튼 위치
      };

      

      const map = new kakao.maps.Map(mapContainer.current, options);

      const mapTypeControl = new kakao.maps.MapTypeControl();
      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      
      // 마커 위치 설정
      const markerPosition = new kakao.maps.LatLng(centerLatitude, centerLongitude);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);

      
      // 줌 버튼 설정
      const zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    } else {
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`; 
    script.onload = () => {
      window.kakao.maps.load(initializeMap);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [latitude, longitude]);

  return (
    <div>
      <div className="w-full p-6 mt-6 overflow-x-auto">
        <h1 className="text-[#eee047] text-xl mb-3 font-pretendard tracking-extra-wide font-semibold ml-[80]">LOCATION</h1>            
        <h1 className="text-black text-4xl font-pretendard font-semibold mb-3 ml-20">국가유산 위치</h1>
        <div className="w-[92%] h-[1px] bg-gray-400 ml-20 mb-5"/>
        
        <div className="w-[89vw] h-80 ml-[4%] flex items-center justify-center max-w-full relative">
          <div
            ref={mapContainer}
            className="w-full h-full ml-1"
            style={{ height: '300px' }}
          ></div>
        </div>
      </div>
    </div>
  )
}
