"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-amber-50">
      <div className="mx-auto max-w-screen-xl px-4 py-6">
        {/* 주소 정보 */}
        <p className="text-sm font-medium text-neutral-500 border-b border-neutral-500 pb-3">
          강원특별자치도 원주시 세계로 10 (반곡동) <br />
          서울센터 - 서울특별시 중구 청계천로 40, 6층 (다동) &copy; 2025 Gangwon
          GO All Rights Reserved.
        </p>

        {/* 로고 이미지 섹션 */}
        <div className="flex justify-end items-center pt-4 space-x-4">
          <Image
            className="mr-2"
            width={90}
            height={90}
            src="/images/dataLogo.webp"
            alt="Data Logo"
          />
          <Image
            width={90}
            height={90}
            src="/images/ktoLogo.webp"
            alt="KTO Logo"
          />
        </div>
      </div>
    </footer>
  );
}
