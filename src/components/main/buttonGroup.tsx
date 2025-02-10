// 외부
import { useRouter } from "next/navigation";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
// 내부
import buttonGroup from "@/types/buttonGroup";

export default function ButtonGroup() {
  const router = useRouter();
  const buttonInfo: buttonGroup[] = [
    {
      destination: "/quiz",
      text: "역사 퀴즈",
      bgColor: "#CD933A",
    },
    {
      destination: "/festival",
      text: "행사 일정",
      bgColor: "#5E9399",
    },
    {
      destination: "/culture",
      text: "문화재 보기",
      bgColor: "#C47540",
    },
    {
      destination: "/qna",
      text: "QnA",
      bgColor: "#468854",
    },
  ];

  return (
    <div className="flex flex-row gap-16">
      {buttonInfo.map(({ destination, bgColor, text }, index) => (
        <div
          key={index}
          className={`rounded-tl-lg rounded-br-lg rounded-tr-3xl rounded-bl-3xl opacity-90`}
          style={{ backgroundColor: bgColor }} // 동적 배경색 설정
        >
          <button
            onClick={() => {
              router.push(destination);
            }}
            className="flex flex-col justify-center items-start w-[170px] h-20 p-4"
          >
            <span className="text-xl font-semibold font-pretendard">
              {text}
            </span>
            <div className="flex gap-1 justify-center items-center">
              <span className="font-semibold font-pretendard text-xs">
                자세히보기
              </span>
              <ArrowRightCircleIcon className="size-6 stroke-[2]" />
            </div>
          </button>
        </div>
      ))}
    </div>
  );
}
