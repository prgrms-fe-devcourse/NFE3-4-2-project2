import { useQuery } from '@tanstack/react-query';
import { getAllTripsApi } from '@/apis/supabaseApi';
import QUERY_KEY from '@/constants/querykey';

const useFetchAllTrips = userId => {
  const { data: trips, isLoading: isLoadingTrips } = useQuery({
    queryKey: QUERY_KEY.trip.list(userId),
    queryFn: () => getAllTripsApi(userId),
  });

  return { trips, isLoadingTrips };
};

export default useFetchAllTrips;
