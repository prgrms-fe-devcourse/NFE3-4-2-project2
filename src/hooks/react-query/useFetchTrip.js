import { useQuery } from '@tanstack/react-query';
import { getTripApi } from '@/apis/supabaseApi.js';
import { useSelector } from 'react-redux';
import QUERY_KEY from '@/constants/querykey';

const useFetchTrip = tripId => {
  const userId = useSelector(state => state.user.userId);
  const { data: trip, isLoading } = useQuery({
    queryKey: QUERY_KEY.trip.detail(tripId),
    queryFn: () => getTripApi(userId, tripId),
  });

  return { trip, isLoading };
};

export default useFetchTrip;
