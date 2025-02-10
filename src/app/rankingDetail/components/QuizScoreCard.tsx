import React from 'react'

type QuizScoreCardProps = {
  className: string,
  header: string,
  content: string,
  footer: string,
  color: string
};

export default function QuizScoreCard(props : QuizScoreCardProps) {
  return (
    <div className={props.className + ' border rounded-lg overflow-hidden shadow-lg'} style={{borderColor: props.color}}>
      <div className='w-full h-[20%] flex justify-center items-center' style={{backgroundColor: props.color}}>
        <span className='text-white text-xs font-bold'>{props.header}</span>
      </div>
      <div className='w-full h-[60%] flex justify-center items-center'>
        <span className='text-[#555555] text-lg font-bold'>{props.content}</span>
      </div>
      <div className='w-full h-[20%] flex justify-center items-center self-end self-justify-end' style={{backgroundColor: props.color}}>
        <span className='text-white text-xs font-bold'>{props.footer}</span>
      </div>
    </div>
  )
}
