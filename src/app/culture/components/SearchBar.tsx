'use client'

import React, { useState } from 'react';

interface SearchBarProps {
  searchHeritage: (query: string) => void;
}

export default function SearchBar({ searchHeritage }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    searchHeritage(query); 
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(); 
    }
  };

  return (
    <div className="flex items-center space-x-2 relative">
      <div className='focus:scale-105 hover:scale-105  transition-all duration-300 ease-in-out '>
  <input
    type="text"
    placeholder="검색어를 입력해주세요."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    onKeyDown={handleKeyDown}
    className="border rounded-3xl p-3 w-[33vw] bg-white bg-opacity-80
     placeholder-gray-700 placeholder:tracking-widest 
     placeholder:font-extrabold pl-6 focus:outline-none
     font-pretendard tracking-extra-wide font-semibold text-[16px]
    
     " 
  />
  <button
    onClick={handleSearch}
    className="text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out 
    absolute right-1 top-1/2 transform -translate-y-1/2 flex items-center 
     hover:scale-125"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#444444"
      stroke="#444444"
      strokeWidth="1"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
        clipRule="evenodd"
      />
    </svg>
  </button>
</div>
</div>

  );
}
