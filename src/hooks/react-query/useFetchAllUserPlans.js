// 사용자의 모든 trip을 조회하여 모든 plans를 가져오는 훅
import { useQuery } from '@tanstack/react-query';
import { getPlanApi, getAllTripsApi } from '@/apis/supabaseApi';
import QUERY_KEY from '@/constants/querykey';

const useFetchAllUserPlans = userId => {
  // 1. 유저가 가진 모든 trip을 조회
  const { data: trips, isLoading: isLoadingTrips } = useQuery({
    queryKey: QUERY_KEY.trip.list(userId),
    queryFn: () => getAllTripsApi(userId),
  });

  // 2. 모든 trip에 대해 plans를 조회
  const { data: planData, isLoading: isLoadingPlans } = useQuery({
    queryKey: QUERY_KEY.plan.all(userId),
    queryFn: () => {
      if (!trips) return [];
      return Promise.all(trips.map(trip => getPlanApi(userId, trip.trip_id)));
    },
    enabled: !!trips, // trips 데이터가 있을 경우에만 조회
  });

  let plans = [];
  if (planData) {
    // trips별 배열로 구분되어 오는 plans를 하나의 배열로 변환
    plans = planData.flat();
  }

  return { trips, plans, isLoadingTrips, isLoadingPlans };
};
export default useFetchAllUserPlans;
