import { useQuery } from '@tanstack/react-query';
import { getPlaceByExplanationApi } from '@/apis/visitJejuApi';
import QUERY_KEY from '@/constants/querykey';

const useFetchPlace = contentId => {
  const { data: placeData, isLoading } = useQuery({
    queryKey: QUERY_KEY.place.detail(contentId),
    queryFn: () => getPlaceByExplanationApi(contentId),
  });
  return { placeData, isLoading };
};

export default useFetchPlace;
