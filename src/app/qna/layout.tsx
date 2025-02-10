import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col gap-32 ">
        <div className=" relative lg:h-[540px] md:h-[300px] sm:h-[250px] h-[250px]  overflow-hidden">
          <div className="w-full h-full absolute z-50 flex justify-center items-center">
            <p className="text-5xl text-white font-bold">Q&A</p>
          </div>
          <div className=" w-full h-full brightness-50">
            <Image
              src="/icons/qna_visual_background.jpg"
              alt="비주얼 이미지"
              layout="fill" // 부모 크기에 맞게 채움
              objectFit="cover" // 이미지를 부모 크기에 맞게 자르거나 맞춤
            />
          </div>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
}
