"use client"

import React, { useEffect, useState } from 'react'

import KoreaCloudIcon from '@/components/quiz/svg/KoreaCloudIcon';
import ImportantRankCard from './ImportantRankCard';
import Table from '@/components/quiz/Table';
import useQuizInfoManager, { quizInfo } from '@/components/quiz/useQuizInfoManager';
import GagsiMaskIcon from '@/components/quiz/svg/GagsiMaskIcon';
import Link from 'next/link';
import GetUserRankColor from '@/components/quiz/quizRankData';

type DataType = {
  standings: number;
  rank: React.JSX.Element;
  id: React.JSX.Element;
  highScore: number;
  attempts: number;
  date: string;
}

type ImpRankData = {
  userId: string;
  color : string;
  bgColor: string;
}

export default function RankingCard() {
  const { getAllQuizInfo } = useQuizInfoManager();
  const [allQuizInfo, setAllQuizInfo] = useState<DataType[]>([]);
  const [impRankings, setImpRankings] = useState<ImpRankData[]>([]);
  function getDiffCurTime(date : Date) {
    return (new Date()).valueOf() - date.valueOf();
  }
  useEffect(()=>{
    const temp = getAllQuizInfo();
    temp.then(async (data : quizInfo[])=>{
      const ImpRankings : ImpRankData[] = [];
      // Weekly
      const weeklyData : [string, number, number, number][] = data.map<[string, number, number, number]>((elem)=>[
        elem.id, 
        elem.highScore, 
        Math.max(...elem.scores.filter((scores)=>getDiffCurTime(scores[1]) < 6.048e+8).map((elem)=>elem[0])),
        elem.scores.length
      ]);
      //TODO : 성능 개선 필요
      weeklyData.sort((a, b)=>b[2]-a[2]);
      ImpRankings.push({userId : weeklyData[0][0], color: '', bgColor:''});
      weeklyData.sort((a, b)=>b[3]-a[3]);
      ImpRankings.push({userId : weeklyData[0][0], color: '', bgColor:''});
      //Daily
      const dailyData : [string, number, number, number][] = data.map<[string, number, number, number]>((elem)=>[
        elem.id, 
        elem.highScore, 
        Math.max(...elem.scores.filter((scores)=>getDiffCurTime(scores[1]) < 8.64e+7).map((elem)=>elem[0])),
        elem.scores.length
      ]);
      dailyData.sort((a, b)=>b[2]-a[2]);
      ImpRankings.push({userId : dailyData[0][0], color: '', bgColor:''});
      dailyData.sort((a, b)=>b[3]-a[3]);
      ImpRankings.push({userId : dailyData[0][0], color: '', bgColor:''});

      const rankColorsPromise : Promise<[string, string, string]>[] = [];
      ImpRankings.forEach((impRankData : ImpRankData)=>{
        rankColorsPromise.push(GetUserRankColor(impRankData.userId));
      });
      const response = await Promise.allSettled(rankColorsPromise);
      response.forEach((res, index)=>{
        if(res.status === 'fulfilled'){
          ImpRankings[index].color = res.value[0];
          ImpRankings[index].bgColor = res.value[1];
        }
      });
      setImpRankings(ImpRankings);

      data.sort((a, b)=>b.highScore-a.highScore);
      const allConvData : DataType[] = [];
      for(let i = 0; i < data.length; i++){
        const elem = data[i];
        const convData : DataType = {
          standings: i + 1,
          rank: gagsiTalWithColor((await GetUserRankColor(elem.id))),
          id: userDetailsLink(elem.id, elem.name),
          highScore: elem.highScore,
          attempts: elem.scores.length,
          date: elem.scores.slice(-1)[0][1].toLocaleString(),
        }
        allConvData.push(convData);
      }
      setAllQuizInfo(allConvData);
    });
  }, [getAllQuizInfo]);

  function gagsiTalWithColor(color : [string, string, string]){
    return (
      <GagsiMaskIcon width={30} height={30} className={'rounded-full border-[1px] ' + color[1] } color={color[0]} />
    )
  }
  function userDetailsLink(userId: string, userName : string){
    return (
      <Link className='cursor-pointer' href={`/rankingDetail?userId=${userId}`}>{userName ?? '유저 이름 없음'}</Link>
    );
  }
  const desc = ["#", "랭크", "ID", "최고 점수", "시도 횟수", "날짜"];

  return (
    <div className='w-full min-w-[800px] max-w-[1000px] flex flex-col items-center backdrop-blur-xl pt-5 pb-5 rounded-lg shadow-2xl'>
      <KoreaCloudIcon width={75} height={75} color='#FFFFFF'/>
      <span className='text-white font-bold text-xl mb-10'>문화재 퀴즈 랭킹</span>
      <div className='w-[90%] flex place-content-around gap-1 mb-10'>
        <ImportantRankCard className='w-[22.5%] aspect-square' color='#c21616' header='이번주 점수 1위' uid={impRankings[0] ? impRankings[0].userId : ''} iconBgColor={impRankings[0] ? impRankings[0].bgColor: '#00000000'} iconColor={impRankings[0] ? impRankings[0].color : '#00000000'}/>
        <ImportantRankCard className='w-[22.5%] aspect-square' color='#c21616' header='이번주 시도 횟수 1위' uid={impRankings[1] ? impRankings[1].userId : ''} iconBgColor={impRankings[0] ? impRankings[1].bgColor: '#00000000'} iconColor={impRankings[1] ? impRankings[1].color : '#00000000'}/>
        <ImportantRankCard className='w-[22.5%] aspect-square' color='#c21616' header='오늘 점수 1위' uid={impRankings[2] ? impRankings[2].userId : ''} iconBgColor={impRankings[0] ? impRankings[2].bgColor: '#00000000'} iconColor={impRankings[2] ? impRankings[2].color : '#00000000'}/>
        <ImportantRankCard className='w-[22.5%] aspect-square' color='#c21616' header='오늘 시도 횟수 1위' uid={impRankings[3] ? impRankings[3].userId : ''} iconBgColor={impRankings[0] ? impRankings[3].bgColor: '#00000000'} iconColor={impRankings[3] ? impRankings[3].color : '#00000000'}/>
      </div>
      <div className='w-[80%] flex justify-center mb-10'>
        <Table<DataType> data={allQuizInfo} spacing={[1,1,3,1,1,3]} desc={desc} maxHeight={'300px'}/>
      </div>
    </div>
  )
}
