import { useQuery } from '@tanstack/react-query';
import { getPlaceBySearchApi } from '@/apis/visitJejuApi.js';
import QUERY_KEY from '@/constants/querykey';

const useFetchSearchedPlaceList = (keyword, category) => {
  const { data: placeList, refetch } = useQuery({
    queryKey: QUERY_KEY.place.list(category, keyword),
    queryFn: () => getPlaceBySearchApi(keyword, category),
  });

  return { placeList, refetch };
};

export default useFetchSearchedPlaceList;
