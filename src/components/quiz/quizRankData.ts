import axios from "axios";

export type quizInfo = {
  id: string;
  name: string;
  highScore : number;
}

const Breakpoints = {
  10 : ['#DD4444', 'border-[#DD4444]', 'bg-[#DD4444]'],
  20 : ['#F67280', 'border-[#F67280]', 'bg-[#F67280]'],
  30 : ['#C06C84', 'border-[#C06C84]', 'bg-[#C06C84]'],
  40 : ['#6C5B7B', 'border-[#6C5B7B]', 'bg-[#6C5B7B]'],
  50 : ['#355C7D', 'border-[#355C7D]', 'bg-[#355C7D]'],
  100 :['#222222', 'border-[#222222]', 'bg-[#222222]']
}

export default async function GetUserRankColor(userId : string) : Promise<[string, string, string]> {
  const quizChannelId = (await axios.get(`${process.env.NEXT_PUBLIC_BASIC_URL}/channels/quiz`)).data._id;
  const quizChannelPosts = (await axios.get(`${process.env.NEXT_PUBLIC_BASIC_URL}/posts/channel/${quizChannelId}`)).data;
  const allUserData : quizInfo[] = []
  quizChannelPosts.map((post)=>{
    const data : {
      id: string;
      highScore : string;
      scores : [string, string][];
      errRate_Correct : [string, string][];
      errRate_Total : [string, string][];
      name : string;
    } = JSON.parse(post.title);
    const intData : quizInfo = {
      id : data.id,
      name: data.name,
      highScore: parseInt(data.highScore),
    };
    allUserData.push(intData);
  });
  allUserData.sort((a, b)=>b.highScore - a.highScore);
  const uInd = allUserData.findIndex((elem)=>elem.id===userId);
  const position = (uInd + 1) / allUserData.length;
  for(let i = 0; i < Object.entries(Breakpoints).length; i++){
    if(position * 100 <= parseInt(Object.entries(Breakpoints)[i][0])){
      return [
        Object.entries(Breakpoints)[i][1][0], 
        Object.entries(Breakpoints)[i][1][1],
        Object.entries(Breakpoints)[i][1][2],
      ];
    }
  }
  return ['#222222', 'border-[#FFFFFF00]', 'bg-[#222222]'];
}