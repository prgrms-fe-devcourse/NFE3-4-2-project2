import { getPlanApi } from '@apis/supabaseApi';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import QUERY_KEY from '@/constants/querykey';

const useFetchPlansByTrip = tripId => {
  const userId = useSelector(state => state.user.userId);
  const { data: plans, isLoading: isLoadingPlan } = useQuery({
    queryKey: QUERY_KEY.plan.list(userId, tripId),
    queryFn: () => getPlanApi(userId, tripId),
  });

  return { plans, isLoadingPlan };
};
export default useFetchPlansByTrip;
