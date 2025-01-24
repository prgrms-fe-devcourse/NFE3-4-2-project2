
"use client";

import Image from "next/image";

export default function Footer() {
  
  return (
    <footer className="bg-amber-50">
      <div className="mx-auto max-w-7xl p-4">
        
        <p className="w-full text-sm font-medium text-neutral-500 border-b-2 border-solid border-neutral-500 pb-3">
          강원특별자치도 원주시 세계로 10 (반곡동) 서울센터 - 서울특별시 중구 청계천로 40, 6층 (다동) <br />  
         
          &copy; 2025 Gangwon GO All Rights Reserved.
        </p>
        
        <div className="flex justify-end pt-2">
          <Image
          className="mr-2" 
          width={90}
          height={90}
          src="/images/dataLogo.webp"
          alt="dataLogo"
          />
          <Image 
          width={90}
          height={90}
          src="/images/ktoLogo.webp"
          alt="dataLogo"
          />
        
        </div>
      </div>
    </footer>
  )
}