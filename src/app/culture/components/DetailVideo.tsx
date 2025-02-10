'use client'

import { useSearchParams, useRouter } from 'next/navigation';
import { useHeritageData } from '../types/useHeritageData';

export default function DetailVideo() {
  const searchParams = useSearchParams();
  const ccbaKdcd = searchParams.get('ccbaKdcd');
  const ccbaAsno = searchParams.get('ccbaAsno');
  const ccbaCtcd = searchParams.get('ccbaCtcd');

  const { videoUrl } = useHeritageData(ccbaKdcd, ccbaAsno, ccbaCtcd);
  const isValidVideoUrl =
    videoUrl && videoUrl !== 'http://116.67.83.213/webdata/file_data/media_data/videos/';
  const router = useRouter();

  const handleVideoClick = () => {
    router.push(
      `/culture/videoPlayer?ccbaKdcd=${ccbaKdcd}&ccbaAsno=${ccbaAsno}&ccbaCtcd=${ccbaCtcd}`
    );
  };

  return (
    <div>
      <div className="w-full p-4 h-[430px] mt-[4.5vh] mr-20">
        <h1 className="text-[#FF5DAB] font-pretendard text-xl font-semibold tracking-extra-wide z-20 relative mt-2 ml-2">
          VIDEO
        </h1>
        <h1 className="text-black text-4xl font-pretendard font-semibold mb-3 ml-2 mt-3">
          관련 영상보기
        </h1>
        <div className="w-full h-[1px] bg-gray-400 mb-5 ml-1" />
  
        {isValidVideoUrl ? (
          <div className="relative ml-1 cursor-pointer" onClick={handleVideoClick}>
            <video
              width="100%"
              height="auto"
              controls 
              muted 
              preload="metadata" 
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
            <div 
              className="absolute inset-0" 
              style={{ backgroundColor: 'transparent' }}
            />
          </div>
        ) : (
          <div className="w-full h-96 flex justify-center items-center bg-gray-200 p-6 rounded-lg ml-1">
  <div className="w-fit flex items-center justify-center gap-2 bg-gray-200 p-6 rounded-lg">
    <svg width="25" height="26" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.25 10.8866C8.25 9.43685 9.42525 8.2616 10.875 8.2616C12.3247 8.2616 13.5 9.43685 13.5 10.8866C13.5 11.6117 13.207 12.2669 12.7312 12.7428C12.2553 13.2186 11.6001 13.5116 10.875 13.5116C9.42525 13.5116 8.25 12.3363 8.25 10.8866Z" fill="#0F172A"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2.2616C6.61522 2.2616 2.25 6.62682 2.25 12.0116C2.25 17.3964 6.61522 21.7616 12 21.7616C17.3848 21.7616 21.75 17.3964 21.75 12.0116C21.75 6.62682 17.3848 2.2616 12 2.2616ZM10.875 6.7616C8.59683 6.7616 6.75 8.60842 6.75 10.8866C6.75 13.1648 8.59683 15.0116 10.875 15.0116C11.7428 15.0116 12.5487 14.7431 13.2131 14.2853L15.2197 16.2919C15.5126 16.5848 15.9874 16.5848 16.2803 16.2919C16.5732 15.999 16.5732 15.5242 16.2803 15.2313L14.2737 13.2247C14.7315 12.5603 15 11.7544 15 10.8866C15 8.60842 13.1532 6.7616 10.875 6.7616Z" fill="#0F172A"/>
    </svg>
    <p className="font-pretendard text-xl text-gray-800">관련 동영상이 없습니다.</p>
  </div>
</div>
        )}
      </div>
    </div>
  );
}
