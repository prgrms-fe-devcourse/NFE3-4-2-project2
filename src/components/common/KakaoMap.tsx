import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps{
    mapx:string,
    mapy:string,
    title?: string,
}

const MapComponent:React.FC<MapProps> = ({mapx, mapy, title}) => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.kakao.maps.load(() => {
            //맵 표기
            const position = new window.kakao.maps.LatLng(mapy, mapx);
            const options = { center: position, level: 3};
            const map = new window.kakao.maps.Map(mapRef.current, options);
           
            if(title){
                const overlayConetent = `
                    <div class="text-center drop-shadow-md">
                        <div class="bg-white px-5 py-1 rounded-md border-sky-500 border text-lg relative translate-y-1">${title}</div>
                        <i class="bi bi-caret-down-fill text-sky-500 text-3xl"></i>
                    </div>
                `
                const customOverlay = new window.kakao.maps.CustomOverlay({
                    position:position ,
                    content:overlayConetent,
                });
                customOverlay.setMap(map)
            }
        });
    }, []);

  return <div ref={mapRef} className="h-full w-full"/>;
}

export default MapComponent;