"use client"

import React, { useState, useEffect, useRef } from 'react'
import { CatCode2String } from '@/components/quiz/CHCategories';

import { Bar, Line } from 'react-chartjs-2';
import { ChartOptions, ChartData, ChartDataset } from 'chart.js';
import 'chartjs-adapter-moment';
import 'chart.js/auto';

import QuizScoreCard from './components/QuizScoreCard';
import RecentCommentsCard from './components/RecentCommentsCard';

import GagsiMaskIcon from '@/components/quiz/svg/GagsiMaskIcon';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import useQuizInfoManager from '@/components/quiz/useQuizInfoManager';
import { redirect, useSearchParams } from 'next/navigation';
import axios from 'axios';
import GetUserRankColor from '@/components/quiz/quizRankData';
import { getHeritageDetailed, heritageDetailedRequest, heritageDetailedResponse } from '../quiz/components/heritageDetail';

export default function RankingDetail() {
  const searchParams = useSearchParams();
  const uid = searchParams.get('userId');
  if(!uid){
    redirect('/quizRanking');
  }

  // 오답률 차트 관련련
  const [errRateData, setErrRateData] = useState<ChartData<"bar", number[], string>>({
    labels: [...Object.values(CatCode2String)],
    datasets:[
      {
        label: '내 오답률',
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        backgroundColor: '#9999FF'
      },
      {
        label: '전체 유저 오답률',
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        backgroundColor: '#CACACA'
      }
    ],
  });
  const {getAllQuizInfo} = useQuizInfoManager();
  const initErrRateOptions : ChartOptions<"bar"> = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: '문제 분류별 오답률' },
    },
    scales: {
      y: { stacked: true },
      x: { beginAtZero: true, min:0, max:1.0 },
    },
    datasets: {
      bar: { barPercentage: 0.5 },
    }
  };
  // 점수 차트 관련
  const [scoresData, setScoresData] = useState<ChartData<"line", number[], string>>({
    labels: [],
    datasets:[
      {
        data: [],
        backgroundColor: '#9999FF'
      }
    ],
  });
  const scoresOption : ChartOptions<"line"> = {
    scales: {
      x: {
        type: 'time',
        time: {
            unit: 'day'
        }
      },
      y: {
        min: 0,
        max: 100
      }
    },
    plugins: {
      legend: { display: false },
      title: { display: true, text: '이번주 일별 최고 기록' },
    },
  }
  const formattedData = useRef<[number, Date][]>([]);
  const recentQuizResultsData = useRef<[number, Date][]>([]);
  //댓글 관련 
  type CommentDataType = {
    url: string,
    name: string,
    comment: string
  };
  const [commentsData, setCommentsData] = useState<CommentDataType[]>([]);

  type PostDataType = {
    postId: string,
    cultureId: string
  }

  const [iconColor, setIconColor] = useState<[string, string, string]>(['','','']);
  useEffect(()=>{
    async function Init(){
      // 탈 아이콘 랭크에 따른 색 변경 관련
      if(uid) setIconColor(await GetUserRankColor(uid));
      //유저 기본 정보 초기화 관련
      const userObj = await axios.get(`${process.env.NEXT_PUBLIC_BASIC_URL}/users/${uid}`);
      if(userObj.status !== 200) redirect('/quizRanking');
      labels.current[0] = userObj.data.email ?? '';
      value.current[0] = userObj.data.fullName ?? '';
      value.current[1] = userObj.data.likes.length ?? '0';
      value.current[2] = userObj.data.comments.length ?? '0';

      const quizUsers = await getAllQuizInfo();
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
      if(uid){
        const myQuizData = quizUsers.find((elem)=>elem.id===uid);
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
      setErrRateData({
        labels: [...Object.values(CatCode2String)],
        datasets: newDataset
      });

      // 점수 차트 관련
      function getDiffCurTime(date : Date) {
        return (new Date()).valueOf() - date.valueOf();
      }
      const userQuizData = quizUsers.filter((elem)=>elem.id===uid)[0];
      //유저 기본 정보 초기화 관련 -> 효율성을 위해 밑에서 초기화화
      value.current[3] = userQuizData.highScore.toString() ?? '-';
      // 점수 차트 관련련
      formattedData.current = userQuizData.scores.map((elem)=>{
        const _elem : [number, Date] = [elem[0], new Date(elem[1].getTime())];
        _elem[1].setHours(0,0,0,0);
        return _elem;
      }).filter((elem)=>getDiffCurTime(elem[1]) < 6.048e+8).sort((a, b)=>{
        if(a[1].valueOf() - b[1].valueOf() === 0){
          return b[0] - a[0];
        }
        return (a[1].valueOf() - b[1].valueOf());
      });
      const noDupData = formattedData.current.filter((elem, index)=>{
        return formattedData.current.findIndex((elem2)=>elem2[1].valueOf()===elem[1].valueOf()) === index;
      });
      const chartData : number[] = [];
      const oneWeek : Date[] = [];
      const today = new Date();
      today.setHours(0,0,0,0);
      for(let i = 0; i < 7; i++){
        const day = new Date(today.valueOf() - i * 86400000);
        oneWeek.unshift(day);
        const temp = noDupData.find((elem)=>elem[1].getTime()===day.getTime());
        chartData.unshift(temp ? temp[0] : 0);
      }
      setScoresData({
        labels: oneWeek.map((e)=>e.toLocaleDateString()),
        datasets:[
          {
            data: chartData,
            backgroundColor: '#9999FF'
          }
        ],
      });
      // 최근 퀴즈 점수
      recentQuizResultsData.current = userQuizData.scores.filter((elem)=>getDiffCurTime(elem[1]) < 6.048e+8);

      // 댓글 관련
      type RawCommentData = { comment:string, postId:string };
      const rawCommentData : RawCommentData[] = userObj.data.comments.map((elem)=>{
        const comment = elem.comment;
        const post = elem.post;
        const ret : RawCommentData = {
          comment: comment,
          postId: post,
        }
        return ret;
      });
      const cultureDetailsChannelId = (await axios.get(`${process.env.NEXT_PUBLIC_BASIC_URL}/channels/cultureDetails`)).data._id;
      const postsData : PostDataType[] = (await axios.get(`${process.env.NEXT_PUBLIC_BASIC_URL}/posts/channel/${cultureDetailsChannelId}`)).data.map((item)=>{
        return {
          postId: item._id,
          cultureId: item.title,
        }
      });
      const commentsFormatPromise : Promise<CommentDataType>[] = [];
      for(let i = 0; i < rawCommentData.length; i++){
        async function FormatCommentData(commentData : RawCommentData) : Promise<CommentDataType> {
          const commentPostData = postsData.filter((post)=>post.postId===commentData.postId)[0];
          const request : heritageDetailedRequest = JSON.parse(commentPostData.cultureId);
          const detailedResponse : heritageDetailedResponse | null = await getHeritageDetailed(request);

          const ret : CommentDataType = {
            comment: commentData.comment,
            url: detailedResponse?.imageUrl ?? '',
            name: detailedResponse?.ccbaMnm1 ?? '',
          }
          return ret; 
        }
        commentsFormatPromise.push(FormatCommentData(rawCommentData[i]));
      }
      const commentsFormatPromiseSettled = await Promise.allSettled(commentsFormatPromise);
      const formattedCommentsData = commentsFormatPromiseSettled.map((promise)=>{
        if(promise.status === 'fulfilled'){
          return promise.value;
        };
        return null
      }).filter((res)=>res !== null);
      setCommentsData([...formattedCommentsData]);
    }
    Init();
  }, [getAllQuizInfo, uid]);
  
  //유저 정보
  const labels = useRef<string[]>(["", "좋아요", "댓글", "문화재 퀴즈 최고점수"]);
  const value = useRef<string[]>(["", "", "", ""]);
  function socialData(label: string, value: string, key: React.Key | null | undefined){
    return (
      <div key={key} className='w-[20%] aspect-[1.75/1] flex flex-col justify-center items-center'>
        <span className='font-bold text-sm'>{label}</span>
        <span className='text-sm'>{value}</span>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center'>
      <div 
        className='w-full aspect-[6/1] bg-[#00000080] flex flex-col justify-center items-center'
        style={{backgroundImage: 'url("/QuizRanking/bukchon.jpg")', backgroundSize:'cover', backgroundPosition: '0% 100%', backgroundAttachment:'fixed', backgroundBlendMode: 'multiply'}}
      >
      </div>
      <div className='w-full min-w-[900px] max-w-[1200px] flex flex-col justify-center items-center mb-4'>
        {/* Social info */}
        <div className='w-[80%] place-content-evenly flex items-end overflow-hidden lg:mt-[-100px] mt-4 mb-4'>
          <GagsiMaskIcon color={iconColor[0]} className={'w-[25%] aspect-square rounded-full overflow-hidden flex flex-col items-center justify-center bg-white border-4 ' + iconColor[1]}/>
          {labels.current.map((elem, index)=>socialData(elem, value.current[index], index))}
        </div>
        {/* 문화재 퀴즈 최근 결과 */}
        <div className='w-full flex flex-col justify-center items-center mb-4'>
          <div className='w-[80%] font-bold text-2xl border-t-2 pt-4'>문화재 퀴즈 최근 결과</div>
          <Swiper
            spaceBetween={10} 
            slidesPerView={3}
            className='w-[80%] min-h-[150px]'
            breakpoints={{
              1000: {
                slidesPerView: 5
              }
            }}
          >
            {recentQuizResultsData.current.map((elem, index)=><SwiperSlide key={index} ><QuizScoreCard className='w-[15%] min-w-[150px] aspect-[1.2/1] m-3' color='#5555ff' header={elem[1].toLocaleDateString()} content={elem[0].toString()} footer={elem[1].toLocaleTimeString()} /></SwiperSlide>)}
          </Swiper>
        </div>
        {/* 유저 통계 */}
        <div className='w-full flex flex-col justify-center items-center mb-4'>
          <div className='w-[80%] font-bold text-2xl border-t-2 pt-4'>유저 통계</div>
          <div className='w-[80%] flex flex-col justify-center items-center'>
            <div className='w-[80%] min-h-[200px] flex justify-center items-center m-1'>
              <Line data={scoresData} options={scoresOption} />
            </div>
            <div className='w-[80%] min-h-[400px] flex justify-center items-center m-1'>
              <Bar data={errRateData} options={initErrRateOptions} />
            </div>
          </div>
        </div>
        {/* 최근 평가한 문화재 */}
        <div className='w-full flex flex-col justify-center items-center mb-4'>
          <div className='w-[80%] font-bold text-2xl border-t-2 pt-4'>최근 평가한 문화재</div>
          <Swiper
            className='w-[80%] min-h-[200px]'
            spaceBetween={20} 
            slidesPerView={2} 
            breakpoints={{
              1000: {
                slidesPerView: 3
              }
            }}
          >
            {commentsData.map((commentObj, index)=><SwiperSlide key={index} ><RecentCommentsCard className='w-[20%] min-w-[275px] aspect-[1.5/1] m-3' url={commentObj.url} name={commentObj.name} comment={commentObj.comment} /></SwiperSlide>)}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
