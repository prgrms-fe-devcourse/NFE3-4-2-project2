import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps{
    mapx:string | undefined,
    mapy:string | undefined
}

const MapComponent:React.FC<MapProps> = ({mapx, mapy}) => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.kakao.maps.load(() => {
            const options = { center: new window.kakao.maps.LatLng(mapy, mapx), level: 3};
            new window.kakao.maps.Map(mapRef.current, options);
        });
    }, []);

  return <div ref={mapRef} className="h-full w-full"/>;
}

export default MapComponent;