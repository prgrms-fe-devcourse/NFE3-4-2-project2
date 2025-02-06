"use client";

import DBAPI from "@/utils/DBAPI";

export default function addData(){

    const handleFestivalDateLoad = async () => {
        DBAPI.updateFestivalDate();
    }

    return(
        <div className="">
            <div className="text-center py-12">
                <h1 className="text-4xl font-bold">데이터 추가 페이지</h1>
                <p className="text-lg">TourAPI에서 내부 DB로 데이터를 추가하는 페이지입니다.</p>
            </div>
            <hr/>
            <div className="flex justify-center gap-2 p-8">
                <button className="bg-sky-500 px-7 py-3 text-xl text-white font-semibold rounded">최신 데이터 불러오기</button>
                <button 
                    className="bg-sky-500 px-7 py-3 text-xl text-white font-semibold rounded"
                    onClick={handleFestivalDateLoad}
                    >축제 데이터 불러오기</button>
            </div>
        </div>
    )
}