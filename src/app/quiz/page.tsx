"use client";

import React, {
  useEffect,
  useRef,
  createRef,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useRouter, redirect } from "next/navigation";
import ProblemCard from "./components/ProblemCard";
import { useAppSelector } from "@/lib/redux/store";
import {
  heritageListRequest,
  heritageListResponse,
  getHeritageList,
} from "./components/heritageList";
import { quizResults } from "../quizResults/page";
import GyeongBokGungIcon from "@/components/quiz/svg/GyeongBokGungIcon";
import {
  GetProblem,
  ProblemFactoryInput,
  ProblemFactoryOutput,
} from "./components/problemFactory";
import useQuizInfoManager, {
  postQuizData,
} from "@/components/quiz/useQuizInfoManager";
import { CatCode2String, TotalNumItems } from "@/components/quiz/CHCategories";

type ProblemData = {
  id: string;
  problem: string;
  answer: string;
  url: string;
  selection: string[];
  linkTo: string;
  category: string;
};

interface UserSelection {
  [index: number]: number;
}

export default function QuizPage() {
  const router = useRouter();
  const { isAuth, userName, userId } = useAppSelector(
    (state) => state.authReducer.value
  );
  if (!isAuth || userName === "" || userId === "") {
    redirect("/login");
  }

  const defaultProblemData = {
    id: "",
    problem: "",
    answer: "",
    url: "",
    selection: [],
    linkTo: "",
  };
  const numProblems = 5;
  const problems = useRef<ProblemData[]>(
    new Array(numProblems).fill(defaultProblemData)
  );
  const [loaded, setLoaded] = useState(0);
  const mounted = useRef(false);

  const totalNumItems = useMemo(() => [...TotalNumItems], []);

  useEffect(() => {
    mounted.current = true;
    async function InitProblems() {
      const heritageList: heritageListResponse[] = [];
      const initResPromises: Promise<heritageListResponse[]>[] = [];
      for (let i = 0; i < Object.keys(CatCode2String).length; i++) {
        const initReq: heritageListRequest = {
          pageUnit: 10,
          pageIndex:
            Math.trunc(Math.random() * Math.trunc(TotalNumItems[i] / 10)) + 1,
          ccbaKdcd: Object.keys(CatCode2String)[i],
        };
        const initRes: Promise<heritageListResponse[]> =
          getHeritageList(initReq);
        initResPromises.push(initRes);
      }
      const results: PromiseSettledResult<heritageListResponse[]>[] =
        await Promise.allSettled(initResPromises);
      results.forEach((result) => {
        if (result.status === "fulfilled") {
          heritageList.push(...result.value);
        }
      });
      heritageList.sort(() => Math.random() - 0.5);
      if (!mounted.current) return;
      //TODO: 문제의 정답을 랜덥하게 고른다
      let problemInd = 0;
      let listInd = 0;
      while (problemInd < numProblems) {
        const input: ProblemFactoryInput = {
          Answer_ccbaAsno: heritageList[listInd].ccbaAsno,
          Answer_ccbaCtcd: heritageList[listInd].ccbaCtcd,
          Answer_ccbaKdcd: heritageList[listInd].ccbaKdcd,
          Answer_ccbaMnm1: heritageList[listInd].ccbaMnm1,
        };
        const problemFactoryOutput: ProblemFactoryOutput | null =
          await GetProblem(input);
        if (!mounted.current) return;
        if (problemFactoryOutput) {
          if (
            problemFactoryOutput.url === "" ||
            problemFactoryOutput.url.includes("no_image")
          ) {
            listInd++;
            continue;
          }
          const newProblemData: ProblemData = {
            ...problemFactoryOutput,
            id: (problemInd + 1).toString(),
            linkTo: `ccbaAsno=${heritageList[listInd].ccbaAsno}%26ccbaCtcd=${heritageList[listInd].ccbaCtcd}%26ccbaKdcd=${heritageList[listInd].ccbaKdcd}`,
            category: heritageList[listInd].ccbaKdcd,
          };
          problems.current[problemInd] = newProblemData;
          problemInd++;
          listInd++;
          setLoaded(problemInd);
        }
      }
    }
    InitProblems();
    return () => {
      mounted.current = false;
    };
  }, []);

  //TODO : Custom Hook
  const refs = useRef(problems.current.map(() => createRef<HTMLDivElement>()));
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (let i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            entries[i].target.classList.add("opacity-100");
            entries[i].target.classList.remove("opacity-0");
            observer.unobserve(entries[i].target);
          } else {
            entries[i].target.classList.add("opacity-0");
          }
        }
      },
      { threshold: 0.5 }
    );
    refs.current.forEach((elem) => {
      if (elem.current !== null) observer.observe(elem.current);
    });
  }, [loaded]);

  const userSelected: UserSelection = useMemo(() => {
    const temp: UserSelection = {};
    for (let i = 0; i < numProblems; i++) {
      temp[i] = -1;
    }
    return temp;
  }, []);
  const SelectAnswerCallback = useCallback(
    (id: string, selected: number) => {
      userSelected[parseInt(id)] = selected;
      const next = parseInt(id);
      if (next < refs.current.length && refs.current[next].current !== null) {
        window.scrollTo({
          top: refs.current[next].current.offsetTop,
          behavior: "smooth",
        });
      }
    },
    [userSelected]
  ); //userSelected 로 뭔가를 하는 것은 아니어서 빈칸이지만 찝찝하다

  function OnClickToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  const quizInfoManager = useQuizInfoManager();

  async function OnClickSubmit() {
    const data: quizResults[] = [];
    let score = 0;
    const categoryMap = new Map<string, number>();
    const correctMap = new Map<string, number>();

    for (let i = 0; i < problems.current.length; i++) {
      const temp: quizResults = {
        answer: problems.current[i].answer,
        id: i.toString(),
        problem: problems.current[i].problem,
        selected: problems.current[i].selection[userSelected[i]],
        correct:
          problems.current[i].selection[userSelected[i]] ===
          problems.current[i].answer,
        linkTo: problems.current[i].linkTo,
      };

      if (temp.correct) score++;

      const currentVal = categoryMap.get(problems.current[i].category);
      if (!currentVal) categoryMap.set(problems.current[i].category, 1);
      else categoryMap.set(problems.current[i].category, currentVal + 1);

      const currentCorrectVal = correctMap.get(problems.current[i].category);
      if (!currentCorrectVal)
        correctMap.set(problems.current[i].category, temp.correct ? 1 : 0);
      else
        correctMap.set(
          problems.current[i].category,
          temp.correct ? currentCorrectVal + 1 : currentCorrectVal
        );

      data.push(temp);
    }

    //한번 파싱 해서 해석이 안되는 문제
    score = (score / numProblems) * 100;
    sessionStorage.setItem(
      "recentQuizData",
      JSON.stringify({
        score: score,
        data: data,
      })
    );

    const postData: postQuizData = {
      score: score,
      errRate_Total: [],
      errRate_Correct: [],
    };
    categoryMap.entries().forEach((tuple) => {
      postData.errRate_Total.push([tuple[0], tuple[1]]);
    });
    correctMap.entries().forEach((tuple) => {
      postData.errRate_Correct.push([tuple[0], tuple[1]]);
    });
    if (quizInfoManager) quizInfoManager.postQuizResult(postData);
    router.push("/quizResults");
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="w-[100vw] h-[200px] bg-[#F0F0F0] flex justify-center items-center">
          <span className="text-[#FF8341] text-[36px] md:text-[48px] font-bold">
            문화재 퀴즈
          </span>
        </div>
        <div className="w-full flex">
          <div className="shrink w-[15%]"></div>
          <div className="w-[70%] flex flex-col items-center">
            <div className="w-full flex flex-col items-center mb-10">
              {problems.current.map((elem, index) => (
                <ProblemCard
                  key={index}
                  id={index}
                  ref={refs.current[index]}
                  url={elem.url}
                  selectAnswer={elem.selection}
                  problem={elem.problem}
                  selectAnswerCallback={SelectAnswerCallback}
                />
              ))}
            </div>
            {/* 페이지 밑의 메뉴 화면 크기가 xl이상이면 hidden */}
            <div className="xl:hidden w-full aspect-[6/1] flex justify-center items-center gap-10 mb-10">
              <div
                onClick={() => OnClickToTop()}
                className="flex-col h-[50%] min-h-[150px] aspect-square bg-red-700 rounded-full flex justify-center items-center opacity-75 hover:opacity-100 transition-opacity ease-in-out cursor-pointer"
              >
                <GyeongBokGungIcon width={40} height={40} color={"#FFFFFF"} />
                <span className="text-white font-bold text-sm mt-2">
                  처음으로
                </span>
              </div>
              <div
                onClick={OnClickSubmit}
                className="flex-col h-[50%] min-h-[150px] aspect-square bg-blue-700 rounded-full flex justify-center items-center opacity-75 hover:opacity-100 transition-opacity ease-in-out cursor-pointer"
              >
                <GyeongBokGungIcon width={40} height={40} color={"#FFFFFF"} />
                <span className="text-white font-bold text-sm mt-2">
                  제출하기
                </span>
              </div>
            </div>
          </div>
          <div className="shrink w-[15%]">
            {/* Sticky menu 화면 크기가 xl이하면 hidden */}
            <div className="hidden w-[50%] sticky top-[30%] xl:flex flex-col justify-center items-center gap-10 mt-10">
              <div
                onClick={() => OnClickToTop()}
                className="flex-col h-[50%] min-h-[150px] aspect-square bg-red-700 rounded-full flex justify-center items-center opacity-75 hover:opacity-100 transition-opacity ease-in-out cursor-pointer"
              >
                <GyeongBokGungIcon width={40} height={40} color={"#FFFFFF"} />
                <span className="text-white font-bold text-sm mt-2">
                  처음으로
                </span>
              </div>
              <div
                onClick={OnClickSubmit}
                className="flex-col h-[50%] min-h-[150px] aspect-square bg-blue-700 rounded-full flex justify-center items-center opacity-75 hover:opacity-100 transition-opacity ease-in-out cursor-pointer"
              >
                <GyeongBokGungIcon width={40} height={40} color={"#FFFFFF"} />
                <span className="text-white font-bold text-sm mt-2">
                  제출하기
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
