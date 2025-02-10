import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postPlanApi } from '@/apis/supabaseApi.js';
import { useNavigate } from 'react-router';
import QUERY_KEY from '@/constants/querykey';

const usePostPlan = tripId => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const postPlanMutation = useMutation({
    mutationFn: postPlanApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY.plan.detail(tripId),
      });
      // mytrip으로 이동
      navigate(`/trip/my?trip_id=${tripId}`);
    },
    onError: error => {
      console.log('plan데이터를 보내는데 실패하였습니다.', error);
    },
  });

  return { postPlanMutation };
};

export default usePostPlan;
