"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { parseStringPromise } from "xml2js";

export default function DetailMoreImage() {
  const searchParams = useSearchParams();

  const ccbaKdcd = searchParams.get("ccbaKdcd");
  const ccbaAsno = searchParams.get("ccbaAsno");
  const ccbaCtcd = searchParams.get("ccbaCtcd");

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (!ccbaKdcd || !ccbaAsno || !ccbaCtcd) {
      return;
    }

    const fetchImages = async () => {
      try {
        const imageResponse = await fetch(
          `http://www.khs.go.kr/cha/SearchImageOpenapi.do?ccbaKdcd=${ccbaKdcd}&ccbaAsno=${ccbaAsno}&ccbaCtcd=${ccbaCtcd}`
        );
        const imageXmlData = await imageResponse.text();
        const imageResult = await parseStringPromise(imageXmlData);
        const imageList = imageResult?.result?.item?.reduce((acc: string[], item: any) => {
          if (Array.isArray(item.imageUrl)) {
            acc.push(...item.imageUrl);
          }
          return acc;
        }, []) || [];

        if (imageList.length === 0) {
          setImages([ 'https://via.placeholder.com/150' ]);
        } else {
          setImages(imageList.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchImages();
  }, [ccbaKdcd, ccbaAsno, ccbaCtcd]);

  return (
    <div>
      <div className="w-full p-6 mt-6 overflow-x-auto h-[60vh]">
        <h1 className="text-[#FF5DAB] font-pretendard text-xl font-semibold tracking-extra-wide z-20 relative mt-2 ml-20">
          SEE MORE
        </h1>
        <h1 className="text-black text-4xl font-pretendard font-semibold mb-3 ml-20 mt-3">
          이미지 더보기
        </h1>
        <div className="w-[92%] h-[1px] bg-gray-400 ml-20" />

        <div className="w-full h-auto">
          <div className="w-[91%] ml-20 flex items-center justify-center h-full">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6 w-full pt-8 pb-8">
              {images.length > 0 ? (
                images.map((img, index) => (
                  <div key={index} className="relative w-full aspect-square pb-6">
                    <img
                      src={img}
                      alt={`문화재 이미지 ${index}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))
              ) : (
                <p className="w-full text-center">이미지가 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
