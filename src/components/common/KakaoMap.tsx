import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  mapx: string;
  mapy: string;
  title?: string;
}

const KakaoMap: React.FC<MapProps> = ({ mapx, mapy, title }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRY = 10; // 🔥 최대 10번 재시도 (예: 5초마다 10번 → 최대 50초)

  useEffect(() => {
    console.log("🗺️ KakaoMap useEffect 실행됨");

    // Kakao Maps API가 이미 로드되었는지 확인
    if (window.kakao && window.kakao.maps) {
      console.log("✅ Kakao Maps API가 이미 로드됨");
      setIsScriptLoaded(true);
      return;
    }

    // 스크립트 중복 로딩 방지
    const scriptId = "kakao-map-script";
    if (document.getElementById(scriptId)) {
      console.log("✅ Kakao Maps 스크립트가 이미 추가됨");
      return;
    }

    console.log(" Kakao Maps 스크립트 추가 중...");
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&autoload=false`;
    script.async = true;
    script.onload = () => {
      if (window.kakao) {
        console.log("Kakao Maps 스크립트 로드 완료");
        window.kakao.maps.load(() => setIsScriptLoaded(true));
      }
    };

    document.head.appendChild(script);
  }, []);

  // 일정 시간마다 `kakao.maps`가 있는지 확인 (최대 10번 시도)
  useEffect(() => {
    if (isScriptLoaded || retryCount >= MAX_RETRY) return;

    const checkKakaoMaps = () => {
      if (window.kakao && window.kakao.maps) {
        console.log(" Kakao Maps API 로드 완료");
        setIsScriptLoaded(true);
      } else if (retryCount < MAX_RETRY) {
        console.warn(` Kakao Maps API 로딩 대기 중... (${retryCount + 1}/${MAX_RETRY})`);
        setRetryCount((prev) => prev + 1);
        setTimeout(checkKakaoMaps, 5000); // 5초 후 다시 시도
      }
    };

    checkKakaoMaps();
  }, [retryCount, isScriptLoaded]);

  useEffect(() => {
    if (!isScriptLoaded || !window.kakao?.maps || !mapRef.current) {
      console.warn(" Kakao Maps API가 아직 로드되지 않았습니다.");
      return;
    }

    console.log("Kakao Maps API 로드 완료, 지도 생성 시작");

    const latitude = Number(mapy);
    const longitude = Number(mapx);

    if (isNaN(latitude) || isNaN(longitude)) {
      console.error("지도 좌표가 유효하지 않음:", { latitude, longitude });
      return;
    }

    console.log("지도 위치:", { latitude, longitude });

    const position = new window.kakao.maps.LatLng(latitude, longitude);
    const options = { center: position, level: 3 };
    const map = new window.kakao.maps.Map(mapRef.current, options);

    if (title) {
      const overlayContent = `
        <div class="text-center drop-shadow-md">
          <div class="bg-white px-5 py-1 rounded-md border-sky-500 border text-lg relative translate-y-1">${title}</div>
          <i class="bi bi-caret-down-fill text-sky-500 text-3xl"></i>
        </div>
      `;

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position,
        content: overlayContent,
      });

      customOverlay.setMap(map);
    }
  }, [isScriptLoaded, mapx, mapy, title]);

  return (
    <div ref={mapRef} className="h-full w-full">
      {!isScriptLoaded ? (
        retryCount >= MAX_RETRY ? (
          <p className="text-center text-red-500"> 카카오 지도 로드 실패</p>
        ) : (
          <p className="text-center text-gray-500"> 지도 로딩 중...</p>
        )
      ) : (
        <p className="hidden"> 지도 로드 완료</p>
      )}
    </div>
  );
};

export default KakaoMap;
