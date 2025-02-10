import { getHeritageDetailed, heritageDetailedRequest, heritageDetailedResponse } from "./heritageDetail";
import { getHeritageList, heritageListRequest, heritageListResponse } from "./heritageList";
import { CatCode2String, TotalNumItems } from "@/components/quiz/CHCategories";

export type ProblemFactoryOutput = {
  problem: string;
  answer: string;
  url:string;
  selection: string[];
}

export type ProblemFactoryInput = {
  Answer_ccbaAsno : string;
  Answer_ccbaCtcd : string;
  Answer_ccbaKdcd : string;
  Answer_ccbaMnm1 : string;
}

export type ProblemFactorySigniture = (input : ProblemFactoryInput)=>Promise<ProblemFactoryOutput | null>;

const factories : ProblemFactorySigniture[] = [ CategoryProblem, NameProblem ];

export async function GetProblem(input : ProblemFactoryInput) : Promise<ProblemFactoryOutput | null> {
  let output : ProblemFactoryOutput | null = null;
  const randNum = Math.trunc(Math.random() * factories.length);
  output = await factories[randNum](input);
  if(output) shuffle(output.selection);
  return output;
}

function shuffle(arr : string[]) {
  arr.sort(()=>Math.random() - 0.5);
}

async function NameProblem(input : ProblemFactoryInput) : Promise<ProblemFactoryOutput | null> {
  const heritageDetailedReqObj : heritageDetailedRequest = { ccbaAsno: input.Answer_ccbaAsno, ccbaCtcd: input.Answer_ccbaCtcd, ccbaKdcd: input.Answer_ccbaKdcd };
  const heritageDetailed : heritageDetailedResponse | null = await getHeritageDetailed(heritageDetailedReqObj);
  
  const pageIndex = Object.keys(CatCode2String).findIndex((catCode)=>catCode===input.Answer_ccbaKdcd);
  const randNum = Math.trunc(Math.random() * Math.trunc(TotalNumItems[pageIndex] / 4)) + 1;
  const heritageListReqObj : heritageListRequest = { pageUnit: 4, pageIndex: randNum, ccbaKdcd: input.Answer_ccbaKdcd };
  const heritageList : heritageListResponse[] = await getHeritageList(heritageListReqObj);

  if(heritageDetailed){
    const newProblem : ProblemFactoryOutput = {
      answer: input.Answer_ccbaMnm1,
      problem: '사진 속 문화유산의 이름은?',
      selection: [
        input.Answer_ccbaMnm1, 
        ...(heritageList.map((elem)=>elem.ccbaMnm1).filter((elem)=>elem!==input.Answer_ccbaMnm1).slice(0, 3))
      ],
      url: heritageDetailed.imageUrl
    }
    return newProblem;
  }
  return null;
}

async function CategoryProblem(input : ProblemFactoryInput) : Promise<ProblemFactoryOutput | null> {
  const heritageDetailedReqObj : heritageDetailedRequest = { ccbaAsno: input.Answer_ccbaAsno, ccbaCtcd: input.Answer_ccbaCtcd, ccbaKdcd: input.Answer_ccbaKdcd };
  const heritageDetailed : heritageDetailedResponse | null = await getHeritageDetailed(heritageDetailedReqObj);

  if(heritageDetailed){
    const catMap = new Map<string, string>(Object.entries(CatCode2String));
    const answer = catMap.get(heritageDetailed.ccbaKdcd);
    if(!answer) return null;

    const other = Object.values(CatCode2String);
    const otherSelected : string[] = [];
    for(let i = 0; i < 4; i++){
      const randomNum = Math.trunc(Math.random() * other.length);
      const selected = other[randomNum];
      if(selected){
        otherSelected.push(selected);
        other.splice(randomNum, 1);
      }
    }

    const newProblem : ProblemFactoryOutput = {
      answer: answer,
      problem: '사진 속 문화유산의 분류는?',
      selection: [ 
        answer,
        ...(otherSelected.filter((elem)=>elem!==answer).slice(0, 3))
      ],
      url: heritageDetailed.imageUrl
    }
    return newProblem;
  }
  return null;
}