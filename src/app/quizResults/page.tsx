"use client"

import React from 'react'

import ChumSungDaeIcon from '../../components/quiz/svg/ChumSungDaeIcon';
import QuizResultsCard, { DataType } from './components/QuizResultsCard';
import GyeongBokGungIcon from '../../components/quiz/svg/GyeongBokGungIcon'
import CheckIcon from '@/components/quiz/svg/CheckedIcon';
import CrossedIcon from '@/components/quiz/svg/CrossedIcon';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { useAppSelector } from '@/lib/redux/store';

export type quizResults = {
  id: string;
  problem: string;
  answer: string;
  selected: string;
  correct: boolean;
  linkTo: string;
}

export default function QuizResultsPage() {
  const {isAuth, userName, userId} = useAppSelector((state) => state.authReducer.value);
  if(!isAuth || userName==='' || userId===''){
    redirect('/');
  }

  const smallCheck = <CheckIcon width={25} height={25} color={"#44FF44"}/>;
  const smallCross = <CrossedIcon width={25} height={25} color={"#FF2222"}/>;
  const dataDesc = ["id", "문제", "정답", "선택된 답", "결과"];

  const interpretedData : DataType[] = [];
  const recentQuizData = sessionStorage.getItem('recentQuizData');
  if(!recentQuizData) redirect('/');
  const parsedRecentQuizData = JSON.parse(recentQuizData ?? '');
  const score = parseInt(parsedRecentQuizData.score ?? '0');
  const data : quizResults[] = (parsedRecentQuizData.data ?? []);

  function linkCreator(answer:string, linkTo:string){
    linkTo = linkTo.replaceAll('%26', '&');
    return (
      <Link href={`/culture/detail/?${linkTo}`}>{answer}</Link>
    )
  }
  try{
    data.forEach((elem)=>{
      const temp : DataType = {
        id: elem.id,
        problem: elem.problem,
        answer: linkCreator(elem.answer, elem.linkTo),
        userSelect: elem.selected,
        result: elem.correct ? smallCheck : smallCross,
      }
      interpretedData.push(temp);
    });
  }
  catch(e){
    console.log(e);
    redirect('/');
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <div 
        className='flex justify-end items-center bg-[#111111] w-full aspect-[1980/1222] pt-5 relative'
        style={{backgroundImage: 'url(/QuizRanking/chumsungdae.png)', backgroundSize: 'cover' }}
      >
        <div className='w-[100%] lg:w-[50%] flex flex-col items-center'>
          <ChumSungDaeIcon width={50} height={50} color={"#FFFFFF"}/>
          <span className='text-white font-bold mb-5 mt-1 text-2xl'>시험 결과</span>
          <QuizResultsCard data={interpretedData} dataDesc={dataDesc} score={score}/>
        </div>
      </div>
      <div className='w-full min-w-[1200px] aspect-[6/1] flex justify-center items-center gap-10 bg-slate-50'>
          <Link className='h-[50%] flex justify-center items-center rounded-full ' href='/'>
            <div className='cursor-pointer h-full aspect-square bg-blue-700 rounded-full flex flex-col justify-center items-center opacity-75 hover:opacity-90 transition-opacity'>
              <GyeongBokGungIcon width={40} height={40} color={'#FFFFFF'}/>
              <span className='text-sm font-bold m-1 text-white'>홈으로</span>
            </div>
          </Link>
          <Link className='h-[50%] flex justify-center items-center rounded-full ' href='/quiz'>
            <div className='cursor-pointer h-full aspect-square bg-yellow-700 rounded-full flex flex-col justify-center items-center opacity-75 hover:opacity-90 transition-opacity'>
              <GyeongBokGungIcon width={40} height={40} color={'#FFFFFF'}/>
              <span className='text-sm font-bold m-1 text-white'>다시 도전</span>
            </div>
          </Link>
          <Link className='h-[50%] flex justify-center items-center rounded-full ' href='/quizRanking'>
            <div className='cursor-pointer h-full aspect-square bg-red-700 rounded-full flex flex-col justify-center items-center opacity-75 hover:opacity-90 transition-opacity'>
              <GyeongBokGungIcon width={40} height={40} color={'#FFFFFF'}/>
              <span className='text-sm font-bold m-1 text-white'>랭킹 확인</span>
            </div>
          </Link>
        </div>
    </div>
  )
}
