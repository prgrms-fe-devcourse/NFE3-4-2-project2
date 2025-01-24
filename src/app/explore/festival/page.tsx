import Image from "next/image";
import Header from "@/components/common/Header";



export default function Festival() {
  const selectedFestival = [
    {name: "전체"},
    {name: "축제"},
    {name: "공연"},
    {name: "행사"},

  ];

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
       <div className="bg-white mx-auto w-[700px] p-7 shadow-lg absolute top-2/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg">
        <div className="flex justify-between">
          <ul className="flex gap-3 text-lg font-bold text-neutral-800 cursor-pointer">
            {selectedFestival.map((festival)=>(
              <li key={festival.name} className="hover:text-sky-500 active:text-sky-600">
                {festival.name}
              </li>
              
            ))}
            
          </ul>
          <div className="flex">
            <div className="relative">
              <input type="text" placeholder="검색어를 입력해 주세요." className="h-[32px] w-72 p-3 border border-sky-500 rounded-lg placeholder:text-sm focus:border-sky-500 focus:outline-none focus:outline-sky-50"/>
              <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4 absolute top-1/2 right-2 transform -translate-y-1/2 text-sky-500">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd">
                </path>
              </svg>
            </div>
            <button className="h-[32px] px-4 text-white bg-sky-500 text-sm font-medium rounded-lg ml-2">
              검색
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="w-[150px] mr-2">
            <p className="text-neutral-500 text-sm pt-5 pb-2">지역</p>
            <select className="w-full bg-transparent focus:outline-none border-b border-sky-500">
              <option className="text-neutral-800">전체</option>
              <option className="text-neutral-800">원주시</option>
              <option className="text-neutral-800">춘천시</option>
              <option className="text-neutral-800">속초시</option>
              <option className="text-neutral-800">태백시</option>
              <option className="text-neutral-800">삼척시</option>
              <option className="text-neutral-800">동해시</option>
              <option className="text-neutral-800">강릉시</option>
              <option className="text-neutral-800">고성군</option>
              <option className="text-neutral-800">홍천군</option>
              <option className="text-neutral-800">영월군</option>
              <option className="text-neutral-800">철원군</option>
              <option className="text-neutral-800">인제군</option>
              <option className="text-neutral-800">횡성군</option>
              <option className="text-neutral-800">평창군</option>
              <option className="text-neutral-800">정선군</option>
              <option className="text-neutral-800">양양군</option>
              <option className="text-neutral-800">화천군</option>
              <option className="text-neutral-800">양구군</option>
            </select>
          </div>
          <div className="w-[150px]">
            <p className="text-neutral-500 text-sm pt-5 pb-2">날짜</p>
            <select className="w-full bg-transparent focus:outline-none border-b border-sky-500">
              <option className="text-neutral-800">전체</option>
              <option className="text-neutral-800">1월</option>
              <option className="text-neutral-800">2월</option>
              <option className="text-neutral-800">3월</option>
              <option className="text-neutral-800">4월</option>
              <option className="text-neutral-800">5월</option>
              <option className="text-neutral-800">6월</option>
              <option className="text-neutral-800">7월</option>
              <option className="text-neutral-800">8월</option>
              <option className="text-neutral-800">9월</option>
              <option className="text-neutral-800">10월</option>
              <option className="text-neutral-800">11월</option>
              <option className="text-neutral-800">12월</option>
            </select>
            
          </div>
        </div>
       </div>
     
    </div>
    
   
  );
}