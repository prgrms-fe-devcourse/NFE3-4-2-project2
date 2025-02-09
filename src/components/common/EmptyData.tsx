"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Lottie = dynamic(() => import("react-lottie-player"), {
   ssr: false, // 서버 사이드 렌더링 시 로드하지 않도록 설정
});

const EmptyData = () => {
   const [animation, setAnimation] = useState(null);

   useEffect(() => {
      fetch("/animation/empty_ani.json")
         .then((res) => res.json())
         .then((ani) => setAnimation(ani))
         .catch(() => {
            return "데이터가 없습니다.";
         });
   }, []);

   return (
      <div className="max-w-screen-xl mx-auto text-center py-12">
         <div className="max-w-80 mx-auto">{animation && <Lottie animationData={animation} play />}</div>
         <p className="text-neutral-500 text-lg my-2">리스트에 데이터가 없습니다!</p>
         <p className="text-sky-500 text-2xl font-semibold">
            더 많은 콘텐츠를 준비중입니다. <br /> 불편을 끼쳐드려 죄송합니다.
         </p>
      </div>
   );
};
export default EmptyData;
