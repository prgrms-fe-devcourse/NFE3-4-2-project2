import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import {
  GetProblem,
  ProblemFactoryInput,
  ProblemFactoryOutput,
} from "@/app/quiz/components/problemFactory";
import Ranking from "./rankingImg";
import { useState, useRef, useEffect } from "react";
import {
  heritageListRequest,
  heritageListResponse,
  getHeritageList,
} from "@/app/quiz/components/heritageList";

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

export default function TodayQuiz() {
  const defaultProblemData = {
    id: "",
    problem: "",
    answer: "",
    url: "",
    selection: [],
    linkTo: "",
  };
  const numProblems = 3;
  const problems = useRef<ProblemData[]>(
    new Array(numProblems).fill(defaultProblemData)
  );
  const [loaded, setLoaded] = useState(0);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    setLoaded(0);
    async function InitProblems() {
      const heritageListReqObj: heritageListRequest = { pageUnit: 30 };
      const heritageList: heritageListResponse[] = await getHeritageList(
        heritageListReqObj
      );
      if (!mounted.current) return;
      //TODO: 문제의 정답을 랜덥하게 고른다
      for (let i = 0; i < numProblems; i++) {
        const problemInd = i;
        const answerInd = i * 4 + Math.trunc(Math.random() * 4);
        const input: ProblemFactoryInput = {
          Answer_ccbaAsno: heritageList[answerInd].ccbaAsno,
          Answer_ccbaCtcd: heritageList[answerInd].ccbaCtcd,
          Answer_ccbaKdcd: heritageList[answerInd].ccbaKdcd,
          Answer_ccbaMnm1: heritageList[answerInd].ccbaMnm1,
        };
        const problemFactoryOutput: ProblemFactoryOutput | null =
          await GetProblem(input);
        if (!mounted.current) return;
        if (problemFactoryOutput) {
          const newProblemData: ProblemData = {
            ...problemFactoryOutput,
            id: i.toString(),
            linkTo: `ccbaAsno=${heritageList[answerInd].ccbaAsno}%26ccbaCtcd=${heritageList[answerInd].ccbaCtcd}%26ccbaKdcd=${heritageList[answerInd].ccbaKdcd}`,
            category: heritageList[answerInd].ccbaKdcd,
          };
          problems.current[problemInd] = newProblemData;
        }
      }
    }
    InitProblems().then(() => {
      setLoaded(numProblems - 1);
    });
    return () => {
      mounted.current = false;
    };
  }, []);

  //TEST DATA
  const dummyImage =
    "http://www.cha.go.kr/unisearch/images/treasure/1618146.jpg";

  const router = useRouter();
  const todayQuiz: ProblemData =
    problems.current[Math.floor(Math.random() * problems.current.length)];

  //  상태관리
  const selectionColors = [
    "bg-red-700",
    "bg-green-700",
    "bg-blue-700",
    "bg-yellow-700",
  ];
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function checkAnswer(selectedNum: number) {
    // 결과 메세지 Dom 조작
    if (resultMessageRef.current) {
      if (todayQuiz.selection[selectedNum] === todayQuiz.answer) {
        resultMessageRef.current.textContent = "정답입니다 ✅";
        resultMessageRef.current.className = "text-green-600";
      } else {
        resultMessageRef.current.textContent = "틀렸습니다 ❌";
        resultMessageRef.current.className = "text-red-500";
      }
    }

    // 이전에 클릭된 버튼이 있으면 원래 색상(검은색)으로 되돌리기
    buttonRefs.current.forEach((btn) => {
      if (btn) btn.classList.remove(...selectionColors);
    });

    // 클릭된 버튼에 해당 색상 적용
    const selectedButton = buttonRefs.current[selectedNum];
    if (selectedButton) {
      selectedButton.classList.add(selectionColors[selectedNum]);
    }
  }
  const resultMessageRef = useRef<HTMLSpanElement>(null);
  const setButtonRef = (el: HTMLButtonElement | null, index: number) => {
    if (el && !buttonRefs.current[index]) {
      buttonRefs.current[index] = el;
    }
  };

  return (
    <div className="z-0 relative w-[100%] h-[550px] m-auto mt-10 font-pretendard">
      <Image
        src="https://cdn.pixabay.com/photo/2019/01/15/12/44/gyeongbok-palace-3933996_1280.jpg"
        alt="Gyeongbokgung Palace"
        fill // 부모 컨테이너를 채우도록 설정
        priority // LCP로 감지된 이미지에 우선순위 부여
        sizes="99vw"
        style={{
          objectFit: "cover",
          objectPosition: "top", // 상단 중심 정렬
        }}
      />
      {/* 제목 */}
      <div className=" absolute w-full top-[13%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-10 pb-3">
        <div className=" w-[87%] flex flex-col justify-center gap-2 mx-auto ">
          {/* 제목 상단*/}
          <span className="text-xl text-white">
            Today's Cultural Heritage Quiz
          </span>
          {/* 제목 하단 */}
          <div className=" flex flex-row gap-3 items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="65"
              height="48"
              fill="none"
            >
              <path
                fill="#fff"
                d="M16.2599.2551c-.5482.5375-.153 2 .7777 2.8875l.6374.6125-.9944 1.6375c-1.4533 2.4375-1.7593 2.675-4.6405 3.6124-1.5171.4875-5.3417 1.4625-6.9736 1.7625-1.0581.2-1.4278.4875-1.4278 1.1125 0 .525.2677.825 1.0199 1.125.306.125.51.3875.9051 1.175.663 1.2875 1.1857 1.9875 2.2056 2.9125.9944.925 2.3712 1.775 3.6843 2.2874 1.0327.4 2.7283.875 3.2.875.2295.0125.204.075-.2168.425-.6629.575-1.976 1.2375-3.2254 1.6125-1.874.575-3.098.7375-6.3616.8l-3.047.075-.3569.35c-.7012.675-.3952 1.7.6247 2.1625.3825.1625.5482.35.7777.8875 1.1856 2.6625 3.9903 5.5124 6.7568 6.8499l1.0454.5125v5.075H6.5327c-3.5187 0-4.1561.025-4.3984.2-.3314.225-.3824.8125-.0892 1.1.1657.15.1912.6875.1912 3.2499v3.075h-.8286c-.7267 0-.8797.0375-1.1602.3125-.3442.3375-.3314.7375.051 1.0375.2932.225 63.5014.225 63.7946 0 .3824-.3.3952-.7.051-1.0375-.2805-.275-.4335-.3125-1.2239-.3125h-.8924v-3.0375c0-2.8874.0127-3.0624.255-3.2749.2932-.2625.3314-.6625.0765-1.0125-.1785-.225-.3953-.2375-4.3984-.275l-4.2198-.0375v-5.05l1.0964-.55c2.8175-1.4125 5.4055-4.0249 6.6293-6.6874.306-.6625.459-.85.8542-1.025.9944-.45 1.3004-1.425.6757-2.1375l-.306-.35-3.0469-.075c-3.2382-.0875-4.6406-.2625-6.4636-.8125-1.4024-.4375-3.5187-1.5875-3.5187-1.925 0-.05.2423-.125.5482-.175.8669-.1375 3.149-.925 4.0414-1.3999 2.1035-1.125 3.6334-2.6625 4.6023-4.625.3952-.8.5864-1.0625.8924-1.175.7266-.3 1.0071-.6 1.0071-1.1125 0-.3125-.0892-.55-.255-.7-.1529-.1375-1.1601-.425-2.6389-.75-3.6717-.825-6.3999-1.625-7.713-2.2625-.8669-.425-1.3641-1-2.4478-2.8124l-.9816-1.625.6247-.5875c.9561-.9125 1.3513-2.35.7904-2.9-.5355-.525-1.1219-.2125-1.2876.6875-.2678 1.425-.8032 1.6625-4.0541 1.85-3.0725.1625-18.1159.1625-21.1884 0-3.2509-.1875-3.8756-.475-4.0413-1.8625-.0893-.85-.7649-1.2-1.3004-.675Zm12.685 4.2125c2.7537.0375 6.846.0125 10.2117-.0875 3.0979-.075 5.7497-.1125 5.9027-.0625.1784.05.6501.7125 1.3513 1.8625 1.1856 1.9624 1.8613 2.725 2.9705 3.3 1.0199.5374 3.3784 1.2749 6.2468 1.9749l2.4605.6-.6756.2375c-2.792.925-6.8334 1.475-12.8507 1.7125-4.0414.1625-20.8187.1625-24.86 0-5.8517-.2375-9.944-.7875-12.7233-1.7125l-.6756-.2375 2.4605-.5875C11.581 10.78 13.965 10.03 15.0105 9.48c1.1092-.575 1.7849-1.3375 2.9705-3.2874.5992-.9875 1.1474-1.825 1.2366-1.8625.0893-.0375 1.2876-.05 2.6517-.0125 1.3642.0375 4.5513.1 7.0756.15ZM57.2343 14.03c-.8669 1.45-2.2948 2.75-3.9394 3.5625-.7139.3625-2.5752.9875-3.2127 1.1l-.5482.0875v-3.5125l.4208-.0625c.2167-.0375.9561-.125 1.619-.2 1.1857-.1375 4.5386-.7625 5.2908-.9875.2167-.0625.3952-.125.4207-.125.0255-.0125 0 .0625-.051.1375Zm-47.4762.475c1.0199.2 2.4477.4375 3.1871.5125 2.1546.2125 1.9124-.0375 1.9124 2V18.78l-.4717-.0875c-.9562-.1625-2.792-.8375-3.7354-1.35-1.02-.5625-2.8047-2.1875-3.2382-2.95l-.2422-.425.3697.075c.204.05 1.1984.25 2.2183.4625Zm38.2461 3.15v2.2249h-9.434v-1.4624c0-1.5625-.1275-1.9125-.6885-1.9125-.6629.0125-.8414.45-.8414 2.05v1.3249h-9.8165v-1.4874c0-1.4125-.0127-1.5125-.2805-1.6875-.3824-.2625-.6884-.25-.9944.05-.2294.225-.2549.4125-.2549 1.6875v1.4374h-9.3066v-4.4374h31.6168v2.2125Zm1.0836 4.2874c1.0837.7875 1.9888 1.2375 3.5187 1.7375 1.8358.6 3.3784.825 5.9664.9125 2.5625.0875 2.5752.15.1275.775-4.8955 1.2625-10.8364 1.725-23.3812 1.85-12.5192.1125-20.3469-.225-26.1986-1.15-2.0653-.3375-4.6532-.95-5.2142-1.25-.306-.1625-.1912-.175 1.1984-.1875 4.3218-.0125 7.8022-.9375 10.199-2.6875l.7649-.5625h32.2542l.7649.5625Zm-40.4771 5.55c5.2525.8625 12.5957 1.2625 23.5851 1.2625 12.9527 0 21.0736-.5625 26.3643-1.8125.6375-.15 1.1729-.25 1.1729-.2125 0 .025-.2677.45-.5992.95-1.1601 1.7-3.1234 3.4624-4.8445 4.3124l-.5482.2625v-.3125c0-.175-.1402-.4625-.3187-.625l-.306-.3125H11.2752l-.306.3125c-.1785.1625-.3187.45-.3187.625v.3125l-.5355-.2625c-1.7338-.8625-3.799-2.6999-4.8827-4.3624-.3187-.4625-.5737-.875-.5737-.9125 0-.025.5354.075 1.1856.225.6375.15 1.8868.4 2.7665.55Zm43.5751 5.8499.0382.7875H12.1803v-.725c0-.4.0383-.775.0893-.8125.0382-.05 9.0388-.075 19.9772-.0625l19.9007.0375.0383.775Zm-37.4557 3.975v1.6875h-2.5498v-3.375h2.5498v1.6875Zm5.6094 0v1.6875h-4.0796v-1.6c0-.8875.0383-1.65.0893-1.6875.0382-.05.9561-.0875 2.0397-.0875h1.9506v1.6875Zm4.2071.5c0 1.8625-.0255 2.1875-.1913 2.1875-.1529 0-.1912-.1625-.1912-.7375 0-.85-.1657-1.05-.7904-.9875-.306.025-.459.125-.5864.375-.1275.2625-.255.35-.5482.35h-.3698v-3.375h2.6773v2.1875Zm4.0796 0v2.1875h-2.5498v-4.375h2.5498v2.1875Zm5.6094 0v2.1875H30.156v-4.375h4.0796v2.1875Zm4.0796 0v2.1875h-2.5498v-4.375h2.5498v2.1875Zm4.2071-.5v1.6875h-.4462c-.255 0-.4463-.0625-.4463-.15 0-.275-.4207-.6-.7776-.6-.5227 0-.8032.475-.714 1.1875.0638.45.051.5625-.1019.5625-.1658 0-.1913-.3375-.1913-2.1875v-2.1875h2.6773v1.6875Zm5.4819 0v1.6875H44.0521v-3.375H48.0042v1.6875Zm4.2071 0v1.6875H49.534v-3.375h2.6773v1.6875Zm-29.7045 3.5875c0 .225-.0893 1.6124-.2167 3.0624l-.204 2.6625H3.7662v-2.975c0-1.6375.0382-3.0249.0892-3.0624.0383-.05 4.258-.0875 9.3703-.0875h9.2811v.4Zm37.9911 2.6624v3.0625H42.28l-.0637-.6625c-.0383-.35-.1275-1.4375-.204-2.4-.0765-.9625-.1657-2.05-.204-2.4124l-.0637-.65h18.7533v3.0624Zm-20.1429-1.75v.3125H24.0366v-.625H40.355v.3125Zm.1275 2.1875v.375H23.7817v-.2875c0-.1625.0382-.3375.0892-.375.0382-.05 3.7991-.0875 8.3504-.0875h8.2612v.375Zm.2294 2.275.0383.35h-17.096v-.75l8.5161.025 8.5034.0375.0382.3375Z"
              />
              <path
                fill="#fff"
                d="M18.9244 16.4927c-.3442.35-.3697.425-.3697 1.3875 0 1.15.102 1.4125.6374 1.6875.4717.2375 2.7155.2625 3.1872.025.5354-.2625.7904-.9.7394-1.8875-.0382-.775-.0892-.8875-.4589-1.2125-.408-.35-.4462-.3625-1.8868-.3625-1.4534 0-1.4789 0-1.8486.3625Zm2.69 1.45c0 .3-.0383.3125-.7649.3125-.7267 0-.765-.0125-.765-.3125s.0383-.3125.765-.3125c.7266 0 .7649.0125.7649.3125ZM30.5888 16.2545c-.5227.2-.6884.6125-.6884 1.6875 0 1.6125.3315 1.8625 2.4732 1.7875 1.2749-.0375 1.3642-.05 1.6956-.3875.3315-.325.357-.4125.357-1.4125 0-1.05-.0128-1.075-.4207-1.4375-.408-.35-.4462-.3625-1.7848-.35-.7522 0-1.4916.05-1.6319.1125Zm2.3713 1.6875c0 .3-.0383.3125-.7649.3125-.7267 0-.765-.0125-.765-.3125s.0383-.3125.765-.3125c.7266 0 .7649.0125.7649.3125ZM41.8845 16.2923c-.4589.225-.6374.6625-.6374 1.6125 0 1.6.3952 1.9 2.4605 1.825 1.3768-.0375 1.3896-.0375 1.7593-.45.3315-.3625.3697-.4875.3697-1.2875 0-1-.204-1.4875-.7012-1.7125-.4462-.2-2.8429-.1875-3.2509.0125Zm2.4223 1.65c0 .3-.0383.3125-.765.3125-.7266 0-.7649-.0125-.7649-.3125s.0383-.3125.7649-.3125c.7267 0 .765.0125.765.3125Z"
              />
            </svg>
            <div className="font-semibold text-2xl text-white">
              {" "}
              오늘의 문화재 퀴즈{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[87%] mx-auto flex flex-row items-center justify-between relative top-[27%] ">
        {" "}
        {/* 하단 부분 */}
        <div className="relative w-[62%] rounded-xl overflow-hidden ">
          <div className="flex flex-row bg-slate-100">
            {/* 퀴즈 부분 */}
            <div className="relative w-[100%] h-[360px]">
              {todayQuiz.url ? (
                <Image
                  src={todayQuiz.url}
                  alt="Quiz Image"
                  fill // 부모 컨테이너를 채우도록 설정
                  sizes="55vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center top",
                  }}
                />
              ) : (
                // src가 비어있을 때 표시할 대체 콘텐츠
                <div className="flex justify-center items-center w-full h-full bg-gray-300">
                  <span className="text-gray-700">이미지가 준비 중입니다.</span>
                </div>
              )}
            </div>
            {/* 문제 */}
            <div className="flex flex-col items-center justify-between w-[45%] ">
              <div className="flex flex-col gap-2 font-bold text-lg text-black mt-6">
                <span>
                  {todayQuiz.problem ? (
                    todayQuiz.problem
                  ) : (
                    <div className="flex justify-center items-center w-full h-full bg-gray-300">
                      <span className="">문제가 준비 중입니다.</span>
                    </div>
                  )}
                </span>{" "}
                {/* 문제 */}
                <span ref={resultMessageRef}></span> {/* 결과 */}
              </div>
              {/* 답안 부분 */}
              <div className="flex flex-col justify-end items-center w-[100%] gap-5 mb-6 text-white">
                {todayQuiz.selection.map((item: string, index: number) => (
                  <button
                    key={index}
                    ref={(el) => setButtonRef(el, index)}
                    onClick={() => checkAnswer(index)}
                    className="w-[90%] h-10 rounded-lg bg-black opacity-75 flex justify-center items-center transition-opacity ease-in-out hover:opacity-80"
                  >
                    <span className="text-sm md:text-lg">{item}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* 랭킹 */}
        <div className="relative w-[35%] ">
          <div className="flex flex-col items-center">
            {/* 퀴즈 부분 */}
            <Ranking />
            <div className="flex flex-row justify-center gap-3 w-[100%] mt-5">
              <div
                onClick={() => {
                  router.push("/quiz");
                }}
                className="w-[50%] bg-[#C44440] h-[40px] flex flex-row  items-center gap-14 rounded-xl hover:cursor-pointer relative"
              >
                <div className="flex flex-row items-center gap-9 text-xl text-white font-bold relative ml-8">
                  퀴즈 풀기
                </div>
                <ArrowRightCircleIcon className="size-8 stroke-[2] absolute text-white right-5 " />
              </div>
              <div
                onClick={() => {
                  router.push("/quizRanking");
                }}
                className="w-[50%] bg-[#C44440]  h-[40px] flex flex-row items-center gap-14  rounded-xl hover:cursor-pointer relative"
              >
                <div className="flex flex-row items-center gap-9 text-xl text-white font-bold ml-8">
                  전체 랭킹 보기
                </div>
                <ArrowRightCircleIcon className="size-8 stroke-[2] text-white absolute right-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
