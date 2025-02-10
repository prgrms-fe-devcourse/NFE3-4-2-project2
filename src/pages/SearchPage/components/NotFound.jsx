const NotFound = () => {
  return (
    <div className="h-screen bg-[#F2F2F2] flex justify-center items-center  ">
      <div className="flex  flex-col justify-center items-center h-300 relative">
        <img src="/images/notfound.svg" className="w-300 h-300" />
        <div className="w-420 absolute top-250 text-center">
          <p className="text-60 font-bold mb-15">404 ERROR</p>
          <p className="mb-7 text-[#454545]">죄송합니다. 페이지를 찾을 수 없습니다.</p>
          <p className="text-[#454545]">
            주소가 변경되었거나 삭제되어 요청하신 페이지를 찾을 수 없습니다.
          </p>
          <button className="w-180 p-10 bg-primary-0 text-white rounded-6 mt-30">
            이전으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
