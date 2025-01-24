import Image from "next/image";
import Header from "@/components/common/Header";



export default function Festival() {


  return (
    <div className="min-h-screen">
      <Header />
     
       <div>
        <Image
          width={0}
          height={0}
          sizes="100vw"
          src="/images/festival/festivalBanner.png"
          alt="banner"
          className="mr-2 w-full"  
        />
       </div>
       <div className="bg-white mx-auto w-[600px] p-4 shadow-lg absolute top-2/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg">
        <div>
          <ul className="flex gap-3 text-lg font-bold text-neutral-800 cursor-pointer">
            <li>전체</li>
            <li>축제</li>
            <li>공연</li>
            <li>행사</li>
          </ul>
          <div>
            <input type="text" placeholder="검색어를 입력해 주세요."/>
            <button className="h-[32px] px-4 text-neutral-800 text-sm font-medium">검색</button>
          </div>
        </div>
       </div>
     
    </div>
    
   
  );
}