"use client"

import React from 'react'

import GagsiMaskIcon from '@/components/quiz/svg/GagsiMaskIcon'
import Link from 'next/link';

type ImportantRankCardProps = {
  className: string;
  color: string;
  header: string;
  uid: string;
  iconColor: string;
  iconBgColor: string;
}

export default function ImportantRankCard(props : ImportantRankCardProps) { 
  return (
    <div 
      className={'bg-white overflow-hidden flex flex-col justify-center rounded-lg ' + props.className + ' '}
      style={{border: '1px solid ' + props.color}}
    >
      <div className='text-black border-b-2 h-[20%] flex items-center justify-center text-sm font-bold'>
        <span className='text-xs' style={{color: props.color}}>{props.header}</span>
      </div>
      <div className={'text-black h-[60%] flex items-center justify-center text-sm font-bold '}>
        <GagsiMaskIcon color={props.iconColor} className={'h-[75%] aspect-square rounded-full border-[3px] ' + props.iconBgColor} />
      </div>
      <Link 
        href = {`/rankingDetail?userId=${props.uid}`}
        // onClick={OnClickDetails}
        className='cursor-pointer text-black h-[20%] flex items-center justify-center text-sm font-bold'
        style={{backgroundColor: props.color}}
      >
        <span className='text-white text-xs'>상세 보기</span>
      </Link>
    </div>
  )
}
