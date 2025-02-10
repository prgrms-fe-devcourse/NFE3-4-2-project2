import Detail from '@pages/DetailPage/components/Detail';
import makePlaceObject from '../utils/makePlaceObject';
import { useFetchPlace } from '@/hooks/react-query';

const Details = ({ onNext, contentId, onBackClick }) => {
  // 컨텐츠 id로 데이터 가져오기
  const { placeData, isLoading } = useFetchPlace(contentId);

  if (isLoading) {
    return <div>여행지 상세정보 로딩중</div>;
  }

  return (
    <div>
      <div className="flex flew-row place-content-between mb-10">
        <button onClick={onBackClick} className="flex flex-row items-center">
          <img
            src="/icons/back-icon.svg"
            alt="back-icon"
            width="20"
            height="20"
            className="h-20 w-20"
          />
          <span className="text-gray-8 text-14 hover:font-semibold"> 검색 결과로 돌아가기</span>
        </button>
        <button
          className=" flex flex-row items-center justify-center bg-gray-4 w-100 h-30 rounded-10 hover:bg-gray-5"
          onClick={() => onNext(makePlaceObject(placeData))}
        >
          <img src="/icons/add-plan-icon.svg" alt="add-plan-icon" className="w-20 h-20" />
          <span className="text-gray-8 text-14 ml-4 font-semibold">일정 추가</span>
        </button>
      </div>
      <div className=" max-w-750 overflow-x-hidden">
        <Detail data={placeData} />
      </div>
    </div>
  );
};

export default Details;
