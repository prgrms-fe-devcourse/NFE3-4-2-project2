'use client'

import React from 'react'

interface SearchCategoryProps {
  Categories: string[];  // 카테고리 리스트 (예: 시대, 지역 등)
  Changed: (checked: boolean[], category: string) => void;  // 체크 상태 변경 함수
  checked: boolean[];  // 부모 컴포넌트에서 전달받은 checked 상태
  className?: string;
  category: string;  // 카테고리 이름 (예: 시대, 지역 등)
}

export default function SearchCategory(props: SearchCategoryProps) {

  // 개별 체크박스 상태 변경
  const onChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newChecked = props.checked.map((item, _index) => {
      if (index === _index) {
        return !props.checked[_index];  // 체크 상태 변경
      }
      return props.checked[_index];  // 다른 항목은 그대로 유지
    });
    props.Changed(newChecked, props.category);  // 상태 변경 함수 호출
  };

  // "전체 선택" 체크박스 상태 변경
  const onSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = props.checked.map(() => e.target.checked);  // 전체 선택
    props.Changed(newChecked, props.category);  // 상태 변경 함수 호출
  };

  return (
    <div>
      <div className={`flex flex-col gap-2 ${props.className}`}>
        {/* "전체 선택" 체크박스 */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id={`selectAll-${props.category}`}  // 각 카테고리별로 ID를 다르게 설정
            checked={props.checked.every(item => item)}  // 모든 항목이 선택되었을 때 전체 체크박스가 체크됨
            onChange={onSelectAllChange}  // 전체 선택 체크박스 클릭 시
            className="peer hidden"
          />
          <label
            htmlFor={`selectAll-${props.category}`}  // 각 카테고리별로 ID를 다르게 설정
            className="w-4 h-4 border border-gray-300 rounded-sm 
              peer-checked:border-pink-500 
              flex justify-center items-center 
              peer-checked:before:content-['✔'] 
              peer-checked:before:text-pink-500
              peer-checked:before:text-sm"
          >
          </label>
          <label htmlFor={`selectAll-${props.category}`} className="text-base font-bold">
            전체
          </label>
        </div>

        {/* 카테고리 체크박스들 */}
        {props.Categories.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type="checkbox"
              name={item}
              id={item}
              checked={props.checked[index]}  // 부모 상태를 사용
              onChange={(e) => onChange(e, index)}  // 개별 항목 체크 상태 변경
              className="peer hidden"
            />
            <label
              htmlFor={item}
              className="w-4 h-4 border border-gray-300 rounded-sm 
                peer-checked:border-pink-500 
                flex justify-center items-center 
                peer-checked:before:content-['✔'] 
                peer-checked:before:text-pink-500
                peer-checked:before:text-sm"
            >
            </label>
            <label htmlFor={item} className={`text-base font-bold ${props.checked[index] ? 'text-pink-500' : ''}`}>
              {item}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
