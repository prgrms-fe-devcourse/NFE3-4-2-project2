import { getPlaceByExplanationApi } from '@/apis/visitJejuApi';
import { useQuery } from '@tanstack/react-query';
import makePlaceObject from '@/utils/makePlaceObject';

const Detail = ({ onNext, contentId }) => {
  // 컨텐츠 id로 데이터 가져오기
  const { data, isLoading } = useQuery({
    queryFn: () => getPlaceByExplanationApi(contentId),
    queryKey: ['jejuplace', contentId],
  });
  if (isLoading) {
    return <div>여행지 상세정보 로딩중</div>;
  }

  return (
    <div>
      Detail
      <button className="text-gray-8 text-14" onClick={() => onNext(makePlaceObject(data))}>
        일정 추가
      </button>
      <div>{data.title}</div>
    </div>
  );
};

export default Detail;
