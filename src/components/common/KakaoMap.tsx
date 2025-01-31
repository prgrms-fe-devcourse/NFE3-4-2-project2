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
            const position = new window.kakao.maps.LatLng(mapy, mapx);
            const options = { center: position, level: 3};
            new window.kakao.maps.Map(mapRef.current, options);
            const marker = new window.kakao.maps.Marker({
                position: position,
                title:title
            });
            marker.setMap(mapRef.current);
        });
    }, []);

  return <div ref={mapRef} className="h-full w-full"/>;
}

export default MapComponent;