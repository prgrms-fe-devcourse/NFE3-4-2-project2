"use client";

import React from "react";
import Image from "next/image";

interface RegionButtonProps {
  name: string;
  imageSrc: string;
  isActive: boolean; // 부모 컴포넌트에서 전달된 활성화 상태
  onClick: () => void; // 클릭 시 호출되는 함수
}

const RegionButton: React.FC<RegionButtonProps> = ({
  name,
  imageSrc,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-row items-center justify-center gap-2 w-[103px] h-[36px] border rounded-[4px] bg-white transition-all duration-200 ${
        isActive
          ? "bg-blue-500 text-white border-blue-500 scale-105" // 선택된 버튼 스타일 (배경색, 글씨색, 테두리 색상 변경)
          : "hover:bg-gray-100 hover:scale-105 hover:shadow-md text-neutral-800" // 기본 상태 스타일
      } mt-2`}
    >
      <Image
        src={imageSrc}
        alt={`${name} 로고`}
        width={20}
        height={20}
        className="w-5 h-5"
      />
      <span className="text-lg font-semibold">{name}</span>
    </button>
  );
};

export default RegionButton;
