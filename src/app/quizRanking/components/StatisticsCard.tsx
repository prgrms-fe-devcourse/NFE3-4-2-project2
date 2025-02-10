"use client"

import React, { useCallback, createRef, useEffect, useState, useRef } from 'react';
import KoreaCloudIcon from '@/components/quiz/svg/KoreaCloudIcon';
import { Doughnut, Bar } from 'react-chartjs-2';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js/auto';
import 'chart.js/auto';
import CapsuleSelectMenu from './CapsuleSelectMenu';
import { CatCode2String } from '@/components/quiz/CHCategories';
import GagsiMaskIcon from '@/components/quiz/svg/GagsiMaskIcon';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';
import { useAppSelector } from '@/lib/redux/store';
import axios from 'axios';
import useQuizInfoManager, {quizInfo} from '@/components/quiz/useQuizInfoManager';
import GetUserRankColor from '@/components/quiz/quizRankData';

export default function StatisticsCard() {
  const {isAuth, userId} = useAppSelector((state) => state.authReducer.value);

  // 퀴즈 참여율 관련
  const [testData, setTestData] = useState<ChartData<"doughnut", number[], string>>({
    labels: ['😎👍', '😢'],
    datasets: [
      {
        label: '비율',
        data: [0, 100],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });
  const testOptions : ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  };
  const partRateChartRef = createRef<ChartJSOrUndefined<"doughnut", number[], string>>();
  // 랭킹 내 위치 관련
  const [testBarVertData, setTestBarVertData] = useState<ChartData<"bar", number[], string>>({
    labels: ['0~10','10~20','20~30','30~40','40~50','50~60','60~70','70~80','80~90','90~100'],
    datasets:[
      {
        label:'비율',
        data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor:[
          '#CACACA',
          '#CACACA',
          '#CACACA',
          '#CACACA',
          '#CACACA',
          '#CACACA',
          '#CACACA',
          '#CACACA',
          '#CACACA',
          '#CACACA'
        ]
      }
    ]
  });
  const testBarVertOptions : ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: '랭킹에서 내 위치 확인하기'
      }
    },
    scales: {
      y: {min:0, max:100}
    }
  };
  const testBarVertRef = createRef<ChartJSOrUndefined<"bar", number[], string>>();
  // 오답률 차트 관련
  const errRateChartRef = createRef<ChartJSOrUndefined<"bar", number[], string>>();
  const errRateData= useRef<ChartData<"bar", number[], string>>({
    labels: [...Object.values(CatCode2String)],
    datasets:[
      {
        label: '내 오답률',
        data: isAuth ? [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] : [],
        backgroundColor: '#9999FF'
      },
      {
        label: '전체 유저 오답률',
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        backgroundColor: '#CACACA'
      }
    ],
  });
  const [displayedErrRateData, setDisErrRateData] = useState<ChartData<"bar", number[], string>>({
    labels: [...Object.values(CatCode2String)],
    datasets:[
      {
        label: '내 오답률',
        data: isAuth ? [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] : [],
        backgroundColor: '#9999FF'
      },
      {
        label: '전체 유저 오답률',
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        backgroundColor: '#CACACA'
      }
    ],
  });
  const initErrRateOptions : ChartOptions<"bar"> = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: '문제 오답률' },
    },
    scales: {
      y: { stacked: true },
      x: { beginAtZero: true, min:0, max:1.0 },
    },
    datasets: {
      bar: { barPercentage: 0.5 },
    }
  };
  
  const testFunc = useCallback((selectedItems: [code:string, selected:boolean][])=>{
    const CatCode2StringMap = new Map<string, string>(Object.entries(CatCode2String));
    let selectedCat = new Set(selectedItems.filter((elem)=>elem[1]).map((elem)=>(CatCode2StringMap.get(elem[0]) ?? 'UNKNOWN')));
    if(selectedCat.size === 0){
      selectedCat = new Set(selectedItems.map((elem)=>(CatCode2StringMap.get(elem[0]) ?? 'UNKNOWN')));
    }
    const formattedAllData : [string, number][] = [];
    const formattedMyData : [string, number][] = [];
    if(errRateData.current.labels){
      if(!isAuth && errRateData.current.datasets[0] && errRateData.current.datasets[0].data){
        for(let i = 0; i < errRateData.current.labels.length; i++){
          if(!selectedCat.has(errRateData.current.labels[i]))
            continue;
          formattedAllData.push([errRateData.current.labels[i], errRateData.current.datasets[0].data[i]]);
        }
      }
      else if(isAuth && errRateData.current.datasets[1] && errRateData.current.datasets[1].data){
        for(let i = 0; i < errRateData.current.labels.length; i++){
          if(!selectedCat.has(errRateData.current.labels[i]))
            continue;
          formattedAllData.push([errRateData.current.labels[i], errRateData.current.datasets[1].data[i]]);
        }
      }

      if(isAuth && errRateData.current.datasets[0] && errRateData.current.datasets[0].data){
        for(let i = 0; i < errRateData.current.labels.length; i++){
          if(!selectedCat.has(errRateData.current.labels[i]))
            continue;
          formattedMyData.push([errRateData.current.labels[i], errRateData.current.datasets[0].data[i]]);
        }
      }
    }
    setDisErrRateData({
      labels: [...formattedAllData.map((elem)=>elem[0])],
      datasets:[
        {
          label: '내 오답률',
          data: isAuth ? formattedMyData.map((elem)=>elem[1]) : [],
          backgroundColor: '#9999FF'
        },
        {
          label: '전체 유저 오답률',
          data: formattedAllData.map((elem)=>elem[1]),
          backgroundColor: '#CACACA'
        }
      ],
    });
  }, [isAuth]);

  const {getAllQuizInfo} = useQuizInfoManager();
  useEffect(()=>{
    async function Init(){
      const allUsers = await axios.get(`${process.env.NEXT_PUBLIC_BASIC_URL}/users/get-users`);
      const quizUsers = await getAllQuizInfo();
      // partRateChart
      const numAllUsers = allUsers.data.length;
      const numQuizUsers = quizUsers.length;
      setTestData({
        labels: ['😎👍', '😢'],
        datasets: [
          {
            label: '비율',
            data: [100 * (numQuizUsers / numAllUsers), 100 * (1 - numQuizUsers / numAllUsers)],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });
      // 랭킹 내 위치
      const histogram : quizInfo[][] = [];
      const colors : string[] = [];
      for(let i = 0; i < 10; i++){
        histogram.push(quizUsers.filter((elem)=>elem.highScore >= i * 10 && elem.highScore < 10 * (i + 1)));
        if(userId !== '' && histogram[i].find((elem)=>elem.id===userId))
          colors.push('#9999FF');
        else
          colors.push('#CACACA');
      }
      setTestBarVertData({
        labels: ['0~10','10~20','20~30','30~40','40~50','50~60','60~70','70~80','80~90','90~100'],
        datasets:[
          {
            label:'비율',
            data: histogram.map((elem)=>100 * (elem.length / numQuizUsers)),
            backgroundColor: colors,
          }
        ]
      });
      // 오답률
      const newDataset : ChartDataset<"bar", number[]>[] = [];
      const countCorrect = new Map<string, number>();
      const countAll = new Map<string, number>();
      quizUsers.forEach((elem)=>{
        elem.errRate_Correct.forEach((elem2)=>{
          if(!countCorrect.get(elem2[0])) countCorrect.set(elem2[0], 0);
          const curVal = countCorrect.get(elem2[0]) ?? 0;
          const newVal = elem2[1] + curVal;
          countCorrect.set(elem2[0], newVal);
        });
        elem.errRate_Total.forEach((elem2)=>{
          if(!countAll.get(elem2[0])) countAll.set(elem2[0], 0);
          const curVal = countAll.get(elem2[0]) ?? 0;
          const newVal = elem2[1] + curVal;
          countAll.set(elem2[0], newVal);
        });
      });
      const newData : number[] = [];
      countCorrect.forEach((elem)=>{newData.push(elem);});
      let cnt = 0;
      countAll.forEach((elem)=>{newData[cnt++] /= elem});
      const formatData = newData.map((elem)=>isNaN(elem) ? 0 : 1 - elem);
      newDataset.push({
        label: '전체 유저 오답률',
        data: formatData,
        backgroundColor: '#CACACA'
      });
      if(userId){
        const myQuizData = quizUsers.find((elem)=>elem.id===userId);
        const myErrRateData = myQuizData?.errRate_Correct.map((elem)=>{
          const total = myQuizData.errRate_Total.find((errTot)=>errTot[0]===elem[0]);
          if(!total || total[1] === 0) return 0;
          return 1 - (elem[1] / total[1]);
        });
        newDataset.unshift({
          label: '내 오답률',
          data: myErrRateData ?? [],
          backgroundColor: '#9999FF'
        });
      }
      errRateData.current = ({
        labels: [...Object.values(CatCode2String)],
        datasets: newDataset
      });
      testFunc([...Object.keys(CatCode2String).map<[string, boolean]>((elem)=>[elem, false])]);
    }
    Init();
  }, [getAllQuizInfo, userId, testFunc]);

  const [iconColor, setIconColor] = useState<[string, string]>(['','']);
  useEffect(()=>{
    async function RankColor(){ setIconColor(await GetUserRankColor(userId)); };
    RankColor();
  }, [userId]);

  return (
    <div className='w-full min-w-[800px] max-w-[1000px] h-auto flex flex-col items-center backdrop-blur-xl rounded-lg shadow-2xl overflow-hidden pb-10'>
      {/* Card Header */}
      <div
        className='w-full aspect-[5/1] bg-[#00000080] flex flex-col justify-center items-center mb-5'
        style={{backgroundImage: 'url("/QuizRanking/bukchon.jpg")', backgroundSize:'cover', backgroundPosition: 'center 200%', backgroundBlendMode: 'multiply'}}
      >
        <KoreaCloudIcon width={75} height={75} color='#FFFFFF'/>
        <span className='text-white font-bold text-xl mb-5'>문화재 퀴즈 통계</span>
      </div>
      {/* Card Content */}
      <div className='flex flex-col items-center w-full'>
        {/* Participation Doughnut Chart */}
        <div className='w-[20%] mb-5 flex justify-center'>
          <Doughnut ref={partRateChartRef} data={testData} options={testOptions}></Doughnut>
        </div>
        {isAuth && <span className='text-black font-bold text-lg'>문화재 퀴즈에 도전한 {testData.datasets[0].data[0]}%의 유저 중 한명입니다!</span>}
        {!isAuth && <span className='text-black font-bold text-lg'>{testData.datasets[0].data[0]}%의 유저들이 이미 문화재 퀴즈에 도전했습니다!</span>}
        {/* Capsule Select Menu */}
        <CapsuleSelectMenu className='w-[80%] min-h-[100px] m-3 flex flex-wrap justify-center gap-1' items={Object.entries(CatCode2String)} onSelectedChanged={testFunc}/>
        <div className='flex justify-center w-[90%]'>
          {/* 오답률 차트 */}
          <div className='w-[60%] aspect-[1/1.1] flex justify-center'>
            <Bar ref={errRateChartRef} data={displayedErrRateData} options={initErrRateOptions} />
          </div>
          <div className='w-[40%] h-full flex flex-col'>
            {/* 랭킹 내 위치 */}
            <div className='w-full aspect-square mb-10'>
              <Bar ref={testBarVertRef} data={testBarVertData} options={testBarVertOptions}></Bar>
            </div>
            {/* 각시탈 아이콘 */}
            {/* TODO: 랭크에 맞게 색 설정하기 */}
            {!isAuth && <GagsiMaskIcon color='#000000' className=' w-[50%] aspect-square rounded-full border-[3px] border-black overflow-hidden self-end justify-self-end -rotate-[25deg] opacity-75' />}
            {isAuth && <GagsiMaskIcon color={iconColor[0]} className={' w-[50%] aspect-square rounded-full border-[3px] overflow-hidden self-end justify-self-end -rotate-[25deg] opacity-75 ' + iconColor[1]} />}
          </div>
        </div>
      </div>
    </div>
  )
}
