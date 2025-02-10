import { useAppSelector } from "@/lib/redux/store";
import axios from "axios";
import { CatCode2String } from "./CHCategories";
import { useCallback } from "react";

export type quizInfo = {
  id: string;
  name: string;
  highScore : number;
  scores : [number, Date][];
  errRate_Correct : [string, number][];
  errRate_Total : [string, number][];
  postId: string
}

export type postQuizData = {
  score: number;
  errRate_Total : [string, number][];
  errRate_Correct : [string, number][];
}

export default function useQuizInfoManager() {
  const {isAuth, userName, userId} = useAppSelector((state) => state.authReducer.value);

  const getAllQuizInfo = useCallback(async () : Promise<quizInfo[]> => {
    const quizChannelId = (await axios.get(`${process.env.NEXT_PUBLIC_BASIC_URL}/channels/quiz`)).data._id;
    const quizChannelPosts = (await axios.get(`${process.env.NEXT_PUBLIC_BASIC_URL}/posts/channel/${quizChannelId}`)).data;
    const ret : quizInfo[] = [];
    quizChannelPosts.map((post)=>{
      try{
        const data : {
          id: string;
          highScore : string;
          scores : [string, string][];
          errRate_Correct : [string, string][];
          errRate_Total : [string, string][];
          name : string;
        } = JSON.parse(post.title);
        const _scores = data.scores.map<[number, Date]>(([scoreVal, timestamp])=>{
          return [parseInt(scoreVal), new Date(timestamp)];
        });
        const _errRate_Correct = data.errRate_Correct.map<[string, number]>(([key, value])=>[key, parseInt(value)]);
        const _errRate_Total = data.errRate_Total.map<[string, number]>(([key, value])=>[key, parseInt(value)]);
        ret.push({
          id: data.id,
          name: data.name,
          highScore: parseInt(data.highScore),
          errRate_Correct: _errRate_Correct,
          errRate_Total: _errRate_Total,
          scores: [..._scores.map((elem)=>elem)],
          postId: post._id
        });
        // console.log(ret);
      }
      catch(e){
        console.log(e);
      }
    });
    return ret;
  }, []);
  const postQuizResult = useCallback(async (postData : postQuizData) => {
    if(!isAuth){
      console.log('Not authorized but attempting to POST');
      return;
    }
    try{
      const quizChannelId = (await axios.get(`${process.env.NEXT_PUBLIC_BASIC_URL}/channels/quiz`)).data._id;
      const allQuizData : quizInfo[] = await getAllQuizInfo();
      const initialQuizInfo : quizInfo = {
        id: userId,
        name: userName,
        highScore: 0,
        scores: [],
        errRate_Correct: Object.entries(CatCode2String).map(([key, value])=>[key, 0]),
        errRate_Total: Object.entries(CatCode2String).map(([key, value])=>[key, 0]),
        postId: ''
      }
      const quizPostExists = allQuizData.filter((elem)=>elem.id===userId)[0] ? true : false;
      const myQuizData = allQuizData.filter((elem)=>elem.id===userId)[0] ?? initialQuizInfo;
      postData.errRate_Correct.forEach(([key, value])=>{
        const prevData = myQuizData.errRate_Correct.find(([key2, value2])=>key===key2);
        if(prevData){
          prevData[1] += value;
        }
      });
      postData.errRate_Total.forEach(([key, value])=>{
        const prevData = myQuizData.errRate_Total.find(([key2, value2])=>key===key2);
        if(prevData){
          prevData[1] += value;
        }
      });

      //stringify 하기 전에 변수
      const dataToJson = JSON.stringify({
        ...myQuizData, 
        name: userName,
        highScore: Math.max(postData.score, myQuizData.highScore),
        scores: [...myQuizData.scores, [postData.score, new Date()]]
      });

      if(quizPostExists){
        const form = new FormData();
        form.append('postId', myQuizData.postId);
        form.append('title', dataToJson);
        form.append('channelId', quizChannelId);
        axios.putForm(`${process.env.NEXT_PUBLIC_BASIC_URL}/posts/update`, form);
      }
      else{
        const form = new FormData();
        form.append('title', dataToJson);
        form.append('channelId', quizChannelId);
        axios.postForm(`${process.env.NEXT_PUBLIC_BASIC_URL}/posts/create`, form);
      }
    }
    catch(e) {
      console.log(e);
    }
  }, [getAllQuizInfo, isAuth, userName, userId]);
  return { 
    getAllQuizInfo: getAllQuizInfo,
    postQuizResult: postQuizResult,
  };
}