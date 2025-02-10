import React from 'react'

type RecentCommentsCardProps = {
  className: string,
  url: string,
  name: string,
  comment: string
};

export default function RecentCommentsCard(props : RecentCommentsCardProps) {
  return (
    <div className={props.className + ' rounded-lg overflow-hidden shadow-lg'}>
      <div
        className='w-full h-[35%] bg-[#00000080] flex flex-col justify-center items-center'
        style={{backgroundImage: `url(${props.url})`, backgroundSize:'cover', backgroundPosition: 'center', backgroundBlendMode: 'multiply'}}
        >
        <span className='text-white text-sm font-bold'>{props.name}</span>
      </div>
      <div className='w-full h-[65%] flex flex-col justify-center items-center'>
        <span className='text-black text-sm italic'>{props.comment}</span>
      </div>
    </div>
  )
}
