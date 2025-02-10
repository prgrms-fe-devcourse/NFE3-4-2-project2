'use client'

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useHeritageData } from '../types/useHeritageData';

export default function Video() {
  const searchParams = useSearchParams();
  const ccbaKdcd = searchParams.get('ccbaKdcd');
  const ccbaAsno = searchParams.get('ccbaAsno');
  const ccbaCtcd = searchParams.get('ccbaCtcd');
  const { videoUrl, heritageName, heritageHanja } = useHeritageData(ccbaKdcd, ccbaAsno, ccbaCtcd);
  const isValidVideoUrl =
    videoUrl && videoUrl !== 'http://116.67.83.213/webdata/file_data/media_data/videos/';

  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative w-full">
        <img
          src="https://cdn.pixabay.com/photo/2022/08/05/05/59/korea-7366036_1280.jpg"
          alt="CultureImage"
          className="w-full h-72 object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-72 bg-black bg-opacity-50"></div>

        <div className="absolute top-[70%] left-48">
          <p className="text-white text-4xl font-bold px-4 py-2 rounded-md">
            {heritageName} ({heritageHanja})
          </p>
        </div>
        <div className="absolute top-[90%] left-48 w-[80%] h-[2px] bg-white" />
      </div>
      <div className="w-[70vw] mx-auto my-8 p-4">
        {isValidVideoUrl ? (
          <video width="100%" height="auto" controls>
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <p className="font-pretendard text-xl ml-3">관련 동영상이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
